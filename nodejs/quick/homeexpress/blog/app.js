
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var engine = require('./expand_modules/ejs');  //ejs引擎
var path = require('path');

var app = express();

app.engine('ejs',engine);//使用ejs模板引擎
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.locals._layoutFile="layout"
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
//路由
app.get('/',routes.index);//首页
app.get('/u/:user',routes.user);//用户主页
app.post('/post',routes.post);//表单信息
app.get('/reg',routes.reg);//用户注册
app.post('/doReg',routes.doReg);
app.get('/login',routes.login);//用户登录
app.post('/doLogin',routes.doLogin);
app.get('/logout',routes.logout);//退出

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
