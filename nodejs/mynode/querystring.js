//创建一个http服务器
//cnpm supervisor 来动态管理服务器的变化  supervisor XXX.js动态监视
var http = require('http');
var url = require('url');
var qs = require('querystring');

	http.createServer(function (req,res) {

		var reqUrl = req.url; //?name = qiansimin & age = 20 
			//console.log(url.parse(reqUrl.query));      //取出不带非法字符的请求参数
		// var reqobj = qs.parse(url.parse(reqUrl).query);				//querystring.parse()  把字符串转换为键值对形式
			
																	//url.parse()  

		var reqobj = url.parse(reqUrl,true).query;		//url.parse()  第二个参数true 默认执行querystring.parse()的方法													
		console.log(reqobj)	

		res.writeHead(200,{'Content-Type':'text/html'});

		res.write('hello world!');

		res.end('123');

	}).listen(4001);

	console.log('success server;');