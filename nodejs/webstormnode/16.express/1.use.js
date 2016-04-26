// 处理图片防盗链
// HTTP Referer 是header一部分
// 当浏览器向服务器发请求的时候，会带上refrer
// 告诉服务器我从哪个页面来

var express = require('express'),
	url = require('url'),
	fs = require('fs'),
	//静态资源中间件
	serverStatic = require('serve-static'),
	app = express();
	
app.use(function(req,res,next){
    console.log('referer',req.url,req.headers.referer);
    next();
});
app.use(checkRefer(['hehe.hehe.com'])) //白名单	

function checkRefer(safeUrl){
	return function (req,res,next){
		var refer = req.headers.referer;
		if(!refer) return next(); 
		var host = url.parse(refer,true).host;  //获取主机名+端口 localhots:8080
		host = host.split(':')[0];  //获取主机名 localhost

		if(safeUrl.indexOf(host) != -1) {
			next();
		}else {
			res.sendFile('./static/2.jpg')
		}
	}
}
// /  访问/img 就会从__dirname+static下去找相应的资源
app.use('/img',serverStatic(__dirname+'/static'));
app.get('/',function (req,res) {  //get请求/
	fs.createReadStream('./template.html').pipe(res);  //请求/就把html页面的流赋值给res
})
app.listen(8080,'localhost');