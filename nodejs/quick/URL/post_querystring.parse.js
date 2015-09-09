var http = require('http');
var querystring = require('querystring');
var util = require('util');

	http.createServer(function (req,res) {

		//post信息
		var post = '';

		//注册data事件监听函数，每当接受请求体的数据
		req.on('data',function (chunk) {
			post+= chunk;
		});
		//请求结束
		req.on('end',function () {
			//把字符串转化为json格式   如foo=bar&baz=qux&baz=quux&corge 变成 { foo: 'bar', baz: ['qux', 'quux'], corge: '' }
			post = querystring.parse(post);
			//把json打印成字符串
			res.end(util.inspect(post))
		});
	
	}).listen(2000);

	console.log('success server;');