const express = require('express');//引入express模块
const router = express.Router()
const connection = require('./connect.js').connection
var cookieParser = require('cookie-parser')
var app = express()
app.use(cookieParser())

router.post('/api/login',function(req,res){
	console.log(req.url);
	var result
	var sql = `SELECT username FROM user WHERE username = '${req.body.user}' AND password = '${req.body.password}'`
	var search = new Promise(function(resolve,reject){ 
		connection.query(sql,(err,results,fields) => {
			if (err) {
				console.log('[SELECT ERROR] -', err.message)
				return
			}
			result = JSON.stringify(results)
			resolve()//获得信号量时才执行then里面的方法
		});
	})
	search.then(function(){
		if (result === '[]') {
			res.json({msg:0})
		}
		else{
			// res.setHeader('Set-Cookie','name=binbinfang')//设置cookie
			res.cookie('name',`${req.body.user}`)
			// res.locals.name = req.cookies.name;
			// console.log(req.headers.cookie)
			res.json({msg:1})
		}
	})
})

module.exports = router