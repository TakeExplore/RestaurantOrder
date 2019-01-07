const express = require('express');//引入express模块
const router = express.Router()
const con = require('./connect.js').connection;

router.post('/api/form',function(req,res){
	var name = req.body.name
	console.log(req.url)
	sql = `SELECT foodid,foodname,price,num FROM o_content,o_order WHERE o_content.state = 0 AND o_order.state = 0 AND o_order.orderman = '${name}'`
	con.query(sql,(err,results,fields) => {
	  if (err) {
	    console.log('[PAY ERROR] -', err.message);
	    return;
	  }else{
	  	console.log(results)
	  	res.json(results)
	  }
	})
})

module.exports = router