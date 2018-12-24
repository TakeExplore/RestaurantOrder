const express = require('express');//引入express模块
const router = express.Router()
const con = require('./connect.js').connection;

//查询表o_content是否有相同记录
function SelectFood(id,foodid,foodname,price,count,orderid){
	var sql = `SELECT orderid FROM o_content WHERE orderid = '${id}' AND foodid = '${foodid}' AND state = '0'`
	var search = new Promise(function(resolve,reject){
		con.query(sql,(err,results,fields) => {
		  if (err) {
		    console.log('[SELECTFOOD ERROR] -', err.message);
		    return;
		  }
		  judge = JSON.stringify(results)
		  resolve()
		})
	})
	search.then(function(){
		if (judge === '[]') {
			InsertFood(id,foodid,foodname,price,count)
		}else{
			ChangeNum(id,foodid,count)
		}
	})
}

//增加商品记录
function InsertFood(id,foodid,foodname,price,count){
	// console.log(req.body.foodname)
	var sql = `INSERT INTO o_content(orderid,foodid,foodname,price,num,state) VALUES ('${id}','${foodid}','${foodname}','${price}','${count}',0)`
	con.query(sql,(err,results,fields) => {
	  if (err) {
	    console.log('[INSERTFOOD ERROR] -', err.message);
	    return;
	  }
	  console.log('crease success')
	})
}

//增加或删除商品更改o_content记录的num
function ChangeNum(id,foodid,count){
	if (count === '0') {
		var sql_1 = `DELETE FROM o_content WHERE orderid = '${id}' AND foodid = '${foodid}' AND state = '0'`
		con.query(sql_1,(err,results,fields) => {
		  if (err) {
		    console.log('[DELETE ERROR] -', err.message);
		    return;
		  }else{
		  	console.log('delete success',count,id,foodid)
		  }
		})
	}else{
		var sql_2 = `UPDATE o_content SET num = '${count}' WHERE orderid = '${id}' AND foodid = '${foodid}' AND state = '0'`
		con.query(sql_2,(err,results,fields) => {
		  if (err) {
		    console.log('[CHANGE ERROR] -', err.message);
		    return;
		  }else{
		  	console.log('change success',count,id,foodid)
		  }
		})
	}
}

//插入订单表
function InsertOrder(orderid,ordertime,name){
	var sql = `INSERT INTO o_order(orderid,ordertime,orderman,paystate) VALUES ('${orderid}','${ordertime}','${name}','0')`
	con.query(sql,(err,results,fields) => {
	  if (err) {
	    console.log('[INSERTORDER ERROR] -', err.message);
	    return;
	  }
	  console.log('insert order success')
	})
}

router.post('/api/order',function(req,res){
	var name = req.body.name
	var foodid = req.body.foodid
	var foodname = req.body.foodname
	// console.log(foodname)
	var count = req.body.num
	console.log(count)
	var price = req.body.price
	console.log(req.url);
	// console.log(req.headers.cookie)
	var result
	var condition
	//生成随机数
	var num = Math.random()*99999999
	var orderid = Math.floor(num)
	//取当前日期
	var date = new Date()
	var ordertime = date.toLocaleDateString()
	//取出id
	var id
	//先判断是否已有该订单号
	var sql_3 = `SELECT orderid FROM o_order WHERE orderman = '${name}' AND paystate = '0'` 
	var search = new Promise(function(resolve,reject){ 
		var sql_3 = `SELECT orderid FROM o_order WHERE orderman = '${name}' AND paystate = '0'` 
		con.query(sql_3,(err,results,fields) => {
		  if (err) {
		    console.log('[JUDGEORDER ERROR] -', err.message);
		    return;
		  }
		  result = results;
		  condition = JSON.stringify(results)
		  resolve()
		  console.log(result,87)
		});
		
	})

	//若为空 则插入订单表 插入细节表
	search.then(function(){
		if (condition === '[]') {
			InsertOrder(orderid,ordertime,name)
		}
		for(var a in result){
			id = result[a].orderid
		}
		console.log(id,125)
		SelectFood(id,foodid,foodname,price,count,orderid)
		res.json({msg:1})
	})
})

module.exports = router