var http = require('http');
var querystring = require('querystring');

//启动服务器
http.createServer(function (req,res) {
	console.log('接受前端请求了');
	//解析post
	var post = '';
	req.on('data',function (chunk) {
		post+=chunk;
	});

	req.on('end',function () {
		//解析成jsoN格式
		post = querystring.parse(post);
		console.log('参数解析完成，返回name参数');
		//向前端返回数据
		res.end(post.age);
	});
}).listen(3000);


//前端的ajax请求
var contents = querystring.stringify({
	name:'qiansimin',
	age:21
});

console.log(contents);

//http.request的options
var options = {	
	host:'localhost',
	path:'/',
	port:3000,				//默认的端口
	method:'POST',
	header: {				//返回的头信息
		'Content-Type':'application/x-www-form-urlencoded',   //表单信息
		'Content-Length':contents.length    //options的长度
	}
};

var req = http.request(options,function (res) {		//request返回一个clientRequest对象 
	res.setEncoding('utf-8');  //设置数据的编码
	res.on('data',function (data) {
		console.log('后台的数据成功返回');
		console.log(data);
	});
});

req.write(contents);			//输出  参数就是  发送的数据  data必须是buffer 或者 字符串
req.end();   					//结束