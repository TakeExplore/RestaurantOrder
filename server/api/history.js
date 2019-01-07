const express = require('express');//引入express模块
const router = express.Router()
const con = require('./connect.js').connection;

router.post('/api/history',function(req,res){
	var name = req.body.name
	console.log(req.url)
	sql = `SELECT orderid,ordertime,orderman,be_money,af_money,state FROM o_order WHERE o_order.orderman = '${name}'`
	con.query(sql,(err,results,fields) => {
	  if (err) {
	    console.log('[history ERROR] -', err.message);
	    return;
	  }else{
	  	console.log(results)
	  	res.json(results)
	  }
	})
})

module.exports = router