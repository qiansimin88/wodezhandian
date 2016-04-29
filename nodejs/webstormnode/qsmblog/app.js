var express = require('express');
//处理路径的 path.join path.resolve
// url querystring JSON .parse
var path = require('path');
//处理收藏夹图标的
var favicon = require('serve-favicon');
//写日志的
var logger = require('morgan');
//解析cookie req.cookies属性存放着客户端提交过来的cookie
// req.cookie(key,value) 向客户端写入cookie
var cookieParser = require('cookie-parser');
//处理请求体的 req.body 属性存放着请求体对象
var bodyParser = require('body-parser');
//主页路由
var routes = require('./routes/index');
//用户路由
var users = require('./routes/users');
//文章路由
var articles = require('./routes/articles');
//得到app
var app = express();
app.set('env',process.env.ENV);

// 设置模板的存放路径
app.set('views', path.join(__dirname, 'views'));
//设置模板引擎
app.set('view engine', 'html');
//指定HTML模板的渲染方法
app.engine('html',require('ejs').__express);

//在你把favicon图标放置在public目录之后取消注释
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//日志记录中间件
//:method :url :status :response-time ms - :res[content-length]
app.use(logger('dev'));
//处理content-type=json的请求体 {"name":"zfpx"}
app.use(bodyParser.json());
//处理content-type=urlencoded的请求体 extended为true表示使用querystring来将请求体的字符串转成对象 name=zfpx&age=7
app.use(bodyParser.urlencoded({ extended: false }));
// req.cookies res.cookie(key,value)
app.use(cookieParser());

//静态文件服务中间件 指定一个绝对目录 的路径作为静态文件的根目录
// /a/b.js
app.use(express.static(path.join(__dirname, 'public')));
//指定路由
app.use('/', routes);
// app.use('/users', users);
app.use('/articles', articles);
//捕获404错误并转发到错误处理中间件
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 错误处理

//开发时的错误处理
//将打印出错误的堆栈信息
//console.error(app.get('env'));
if (app.get('env') === 'development') {
//错误处理中间件有四个参数，第一个参数是错误对象
//如果有中间件出错了，会把请求转交给错误处理中间件来处理
  app.use(function(err, req, res, next) {
    //设置状态码 默认500
    res.status(err.status || 500);
    //渲染模板
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

//生产环境下的错误处理 product
//不向用户暴露堆栈信息
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}///隐藏错误对象
  });
});


module.exports = app;