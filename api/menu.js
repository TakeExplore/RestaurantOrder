const express = require('express');//引入express模块
const router = express.Router()
const connection = require('./connect.js').connection;

//获取数据
var result;
var sql = 'SELECT * FROM menu';
connection.query(sql,(err,results,fields) => {
  if (err) {
    console.log('[SELECT ERROR] -', err.message);
    return;
  }
  result = JSON.stringify(results);
});

//解析get
router.get('/api/menu',function(req,res){
  console.log(req.url);
  //连接数据库
  res.status(200),
  res.json(result),
  res.end('hello world\n');
});


module.exports = router;