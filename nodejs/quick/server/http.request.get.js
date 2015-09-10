var http = require('http'),
	url = require('url'),
	util = require('util');

	http.createServer(function (req,res) {
		//request请求对象
		//请求头
		res.writeHead(200,{'Content-Type':'text/plain'});
		res.end(util.inspect(url.parse(req.url,true)),false,null,true);  //打印get请求信息  req.url：请求地址 url.parse格式化请求信息
	}).listen(5000);