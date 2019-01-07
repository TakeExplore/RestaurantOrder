const express = require('express');//引入express模块
const router = express.Router()
const con = require('./connect.js').connection;

function GetContent(name,counts,resolve){
	sql = `SELECT num,price FROM o_content,o_order WHERE o_order.orderid = o_content.orderid AND o_order.state = '0' AND o_content.state = '0' AND o_order.orderman = '${name}'`
	con.query(sql,function(err,results,fields){
		if (err) {
			console.log("GETCONTENT ",err.message)
			return
		}else{
			counts = results
			// console.log(counts,14)
			resolve()
		}
	})
}

//计算总共价格
function TotalPrice(counts,total){
	console.log(counts,22)
	for(var key in counts){
		var num = +counts[key].num
		var price = +counts[key].price
		total += num * price
	}
	// console.log(total,27)
	return total
}

//计算折扣
function GetDiscount(total,response,name){
	var result
	var discount
	sql = `SELECT * FROM zhekou WHERE need <= ${total}`
	con.query(sql,function(err,results,fields){
		if (err) {
			console.log("GETCONTENT ",err.message)
			return
		}else{
			result = results
			if (JSON.stringify(result) === '[]') {
				console.log(total)
				InsertPrice(total,total,name)
				response.json({
					initPrice:total,
					discount:total
				})
			}else{
				console.log(result,'GetDiscount')
				for(var key in result){
					discount = +result[key].redu
				}
				var disprice =  total - discount
				console.log(disprice)
				InsertPrice(total,disprice,name)
				response.json({
					initPrice:total,
					discount:disprice
				})
			}	
		}
	})
}

function InsertPrice(pre,ne,name){
	console.log(name)
	sql = `UPDATE o_order SET be_money = '${pre}',af_money = '${ne}' WHERE state = '0' AND orderman = '${name}'`
	con.query(sql,function(err,results,fields){
		if (err) {
			console.log("InsertPrice",err.message)
			return
		}else{
			console.log('InsertPrice success')
		}
	})
}

router.post('/api/price',function(req,res){
	console.log(req.url)
	var name = req.body.name
	var response = res
	var counts
	var totalNum = new Number
	var total = new Number
	//取出对应用户的购物车内容，并且计算
	var search = new Promise(function(resolve,reject){
		sql = `SELECT num,price FROM o_content,o_order WHERE o_order.orderid = o_content.orderid AND o_order.state = '0' AND o_content.state = '0' AND o_order.orderman = '${name}'`
		con.query(sql,function(err,results,fields){
			if (err) {
				console.log("GETCONTENT ",err.message)
				return
			}else{
				counts = results
				// console.log(counts,14)
				resolve()
			}
		})
	})
	search.then(function(){
		// console.log(counts,41)
		total = TotalPrice(counts,total)
		// console.log(total,78)
		GetDiscount(total,response,name)


	})
	// res.json({

	// })


})

module.exports = router