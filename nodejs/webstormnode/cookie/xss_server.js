var http = require('http');
var url = require('url');
var parse = require('./parse.js');
var cookieUtils = require('./cookieUtils.js');
var fs = require('fs');
http
	.createServer(function (req,res) {
		parse(req);
		if( req.pathname == '/' ){
			res.writeHead( 200 , {'Content-Type':'text/html',
			'Set-Cookie':cookieUtils.serialize('name','qiansimin')
			})
			fs.createReadStream('./index.html').pipe(res);
		}else if (req.pathname == '/a'){
			 console.log(req.url);
		}else {
			res.end('404')
		}
	})
	.listen(9999);