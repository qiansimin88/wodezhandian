//创建一个http服务器
//cnpm supervisor 来动态管理服务器的变化  supervisor XXX.js动态监视
var http = require('http');

	http.createServer(function (req,res) {

		res.writeHead(200,{'Content-Type':'text/html'});

		res.write('创建服务器!');

		res.end('123');

	}).listen(5000);

	console.log('success server;');