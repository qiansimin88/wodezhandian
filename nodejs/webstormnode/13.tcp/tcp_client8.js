
//客户端  请求链接服务器

var net = require('net');
var util = require('util');

var socket = new net.Socket();
socket.setEncoding('utf8');

socket.connect(8080,'192.168.1.157',function(){
    console.log(socket.remoteAddress,socket.remotePort,socket.localAddress,socket.localPort);
    socket.write('你好');
    setTimeout(function(){
       socket.end('坏蛋');
   },3000);
});
socket.on('data',function(data){
    console.log('接收到服务器传过来的数据:',data);
});

socket.on('error',function(error){
    console.log('error:',error);
});