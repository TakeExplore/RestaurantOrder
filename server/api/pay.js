const express = require('express');//引入express模块
const router = express.Router()
const con = require('./connect.js').connection;

router.post('/api/pay',function(req,res){
	var name = req.body.name
	sql = `UPDATE o_content,o_order SET o_content.state = 1,o_order.state = 1 
			WHERE o_content.state = 0 AND o_order.state = 0 AND o_order.orderman = '${name}'`
	con.query(sql,(err,results,fields) => {
	  if (err) {
	    console.log('[PAY ERROR] -', err.message);
	    return;
	  }else{
	  	res.json({
	  		paystate:1
	  	})
	  }
	})
})

module.exports = router