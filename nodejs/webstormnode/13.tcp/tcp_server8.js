/**
 * TCP
 **/
var net = require('net');
var util = require('util');
var fs = require('fs');



var server = net.createServer({allowHalfOpen:true});//不允许对方自己说离开

server.on('connection', function(socket){
    console.log(socket.remoteAddress,socket.remotePort,socket.localAddress,socket.localPort);

    socket.on('data',function(data){
        socket.write('服务说:'+data);
    });
    setTimeout(function(){
        socket.close();     //服务端主动关闭
    },10000);

    //客户端发起end请求
    socket.on('end',function(){
        console.log('end');
    });
    //不管何种原因，只要关闭了都会触发
    socket.on('close',function(){
        console.log('close');
    });
    socket.on('error',function(){
        console.log('error');
        socket.destroy();
    });
});
server.listen(8080);