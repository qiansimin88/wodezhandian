var http = require('http');
var url = require('url');
/**
 * 请求函数
 * @param {[type]} req [description]
 * @param {[type]} res [description]
 */
function Onrequest ( req,res ) {

	var requestPath = req.url;
	console.log( '请求的路径是=>' + requestPath );

	res.writeHead( 200,{
		'Content-type':'text/html'
	});
	res.write('hello js');
	res.end('ok');
};

var server = http.createServer(Onrequest);
	server.listen(3001);