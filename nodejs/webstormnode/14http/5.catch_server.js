/*
缓存 把常用的东西存起来 加快速度
expire 是一个GMT格式的字符串 浏览器接收到此值后 只要本地有 加快加载速度
max-age 多长时间过后过期
 */

var fs = require('fs');
var http  =require('http');

//IE下面的方法
function expireHandler(filename,req,res){
	fs.readFile(filename, function(err,content){
		var expire = new Date(Date.now() + 1000*30 ); //过期时间  30S
		res.setHeader('Expires',expire.toUTCString())	//http1.0
		 res.setHeader('Cache-Control','max-age = 60') //http1.1
		  res.writeHead(200,'OK');
		   res.end(content)
	})
}

////////////////
//chrome下面的方法
//1.第一次响应的时候，服务器返回客户端一个last-Modifies heade,最后修改时间
//2.当客户端再次需要请求该文件的时候 会把这个时间发给服务器 if-modified-since
//3.服务器判断，如何修改过返回最新数据，如果没修改过返回304
////////////////

 function matchHandler(filename,req,res) {
 	// console.log(req.headers);
 	var lastModified = new Date(req.headers['if-modified-since']);  //if-modified-since req请求里面的上次服务端返回来的修改时间
 	fs.stat(filename,function (err,stat) {
 		if(Math.floor(stat.mtime.getTime()/1000) == Math.floor(lastModified.getTime()/1000)){
 			res.statusCode =  304;  //状态吗   缓存了  
 			res.end('')
 		}else {
 			res.setHeader('Last-Modified',stat.mtime.toGMTString());  //服务端返回给客户端的最后返回时间
 			res.writeHead(200,'OK');
 			fs.createReadStream(filename).pipe(res);
 		}
 	})
 }

	//////////
	///ETAG 改变文件内容才会有新的请求 所以必须要read文件
	// 1.第一次的时候，服务器会把此文件生成etag,发给客户端ETAG
	//2.再次请求的时候， 客户端把tag传回来 if-none-match
	//3.服务器判断，如果相同返回304，不相同返回最新文件
	//////////
	 	// 需要引入crypto
 	var crypto = require('crypto');
 	function getHash(content) {
 		return crypto.createHash('sha1').update(content).disgest('hex');  //得到一个HASH值
 	};

 	function etagHandler(filename,req,res){
 		fs.readFile(filename, function(err,content){
 			var hash = getHash(content);  //自己去实现一个方法
 			var match = req.headers['if-none-match'];  //客户端给服务器传的上次设定的etag的值  下次请求就会在req中声明

 			if( hash == match ) { // 如果相同 没有更改
 				res.statusCode = 304;
 				res.end('');
 			}else {
 				res.setHeader('ETag',hash);
 				res.writeHead(200,'OK');
 				fs.createReadStream(filename).pipe(res);
 			}
 		})
 	};



http.createServer(function (req,res) {
		//    /1.txt
	var filename = req.url.slice(1)  //去文件名
	if(req.url == '/favicon.ico'){
		return res.end('404')
	}
	//////////////////////////////////////////////
	//  只能IE模式下  expireHandler(filename,req,res); //
	//////////////////////////////////////////////

	//////////
	//match 
	//缺点
	//1.只能精确到秒 不够精确
	//2.修改时间改了，内容不一定改啊
	//matchHandler(filename,req,res)
	

	//3.etag
	etagHandler(filename,req,res);

}).listen(5555)