const express = require('express');//引入express模块
const router = express.Router()
const connection = require('./connect.js').connection;

router.post('/api/registered',function(req,res){
	console.log(req.url);
	var result;
	var sql_1 = `SELECT username FROM user WHERE username = '${req.body.user}'`;
	var sql_2 = `INSERT INTO user(username,password) VALUES ('${req.body.user}','${req.body.password}')`;
	var search = new Promise(function(resolve,reject){
		connection.query(sql_1,(err,results,fields) => {
			if (err) {
				console.log('[SELECT ERROR] -', err.message);
				return;
			}
			console.log(results);
			result = JSON.stringify(results);
			resolve();
		});
	})

	search.then(function(){
		if (result !== '[]') {
			console.log(typeof('[]'));
			res.json({msg:0})
		}else{
			connection.query(sql_2,(err,results,fields) =>{
				if (err) {
					console.log('[SELECT ERROR] -', err.message);
					return false;
				}
				console.log(123);
				res.json({msg:1})
			});
		}
	},function(err){
		console.log('err')
	})
	
})



module.exports = router;