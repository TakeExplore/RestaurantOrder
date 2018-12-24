var express = require('express');//引入express模块
var bodyParser = require('body-parser'); 
const route = require('./api/index.js')
const app = express();
const connection = require('./api/connect.js').connection;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); 

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
 });

app.set('port', (process.env.port || 3003))
route(app)
console.log(route(app))

app.listen(app.get('port'), function () {
    console.log('GetData http://localhost:' + app.get('port'))
    console.log(app.get('port'));
})

//连接数据库
connection.connect(function (err) {
  if(err){
    console.log('[query] - :'+err);
  }
  console.log('[connection connect]  succeed!');
});
