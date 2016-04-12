var http = require('http');
var url = require('url');
var util = require('util');

//启动服务
http.createServer(function (req,res) {
	console.log('请求来了，解析参数');
	var params = url.parse(req.url,true);		

	// { protocol: null,
	//   slashes: null,
	//   auth: null,
	//   host: null,
	//   port: null,
	//   hostname: null,
	//   hash: null,
	//   search: '?name=qiansimin&age=21',
	//   query: { name: 'qiansimin', age: '21' },
	//   pathname: '/date',
	//   path: '/date?name=qiansimin&age=21',
	//   href: '/date?name=qiansimin&age=21' 
	// }
	res.write("1"); 
	console.log('解析完成,数据是',util.inspect(params));
	//返回数据
	res.end(params.query.name);
}).listen(3032);

//客户端请求
http.get({

	host : 'localhost',
	path:'/date?name=qiansimin&age=21',    //请求数据
	port:3030	

},function (res) {

	res.setEncoding('utf-8');
	res.on('data',function (data) {

		console.log('服务器返回数据'+data)

	})

});
