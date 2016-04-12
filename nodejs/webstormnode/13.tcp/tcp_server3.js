/**
 * TCP
 **/
var net = require('net');
var util = require('util');
var fs = require('fs');


var out = fs.createWriteStream('./tcp.txt');

var server = net.createServer();

//客户端链接属性
server.on('connection', function(socket){
  
    socket.on('data',function(chunk){
    console.log('已经接收到的字节数',socket.bytesRead);
    socket.write(chunk)
    });
    //客户端发起END请求触发
    socket.on('end',function(){
        console.log('end');
    });
    //关闭触发
    socket.on('close',function(){
        console.log('close'); 
    });
});
server.listen(7071);