/*
	TCP
 */

var net = require('net');
var util = require('util');
var fs = require('fs');
var out = fs.createWriteStream('./tcp.txt');  //创建输出流
 
//创建服务器  通过xshell链接  流都是有data end error等事件的
var server = net.createServer(function (socket){
	console.log('connected');
	socket.setEncoding('utf8');
	socket.pipe(out)    //把服务获得的数据写进去
	socket.on('data',function (chunk) {
		console.log(chunk.toString());
		socket.write('server:'+chunk)
	})
	socket.on('end',function () {
		console.log('end');
	})
	socket.on('error',function (error) {
		console.log('error')
		socket.destroy();  //销毁
	})
})

server.listen(7580) 