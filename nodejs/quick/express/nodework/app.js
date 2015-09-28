
/**
 * Module dependencies.
 */

/*引用模块*/
var express = require('express');
var routes = require('./routes');    //默认打开的是routes下面的index.js
var user = require('./routes/user');
var http = require('http');
var path = require('path');

/*实例化express*/
var app = express();

// app的参数配置并且启用中间件
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));  //项目目录下的views
app.set('view engine', 'ejs');   //指定引擎
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());    //方法重写 
app.use(app.router);		
app.use(express.static(path.join(__dirname, 'public')));   //静态文件服务器配置

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//路由控制
app.get('/', routes.index);
app.get('/users', user.list);
//自定义一个路由规则
app.get('/qiansimin/:someinfo',function (req,res) {	//app.get 第二个参数可以是个回调 localhost:3000/qiansimin
	res.send('这是我自定义的路由规则：'+req.params.someinfo);  //打印
});
app.get('/time',routes.time);


http.createServer(app).listen(app.get('port'), function(){
	//console.log(path.join(__dirname))  项目的根目录
  console.log('Express server listening on port ' + app.get('port'));
});
