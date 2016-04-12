/**
 * TCP
 **/
var net = require('net');
var util = require('util');
var fs = require('fs');

var rs = fs.createReadstream('./tcp.txt');


var server = net.createServer();

//客户端链接属性
server.on('connection', function(socket){
   console.log('a new connection');
    socket.setEncoding('utf8');
    rs.on('data',function(chunk){
        var flag = socket.write('chunk');  //返回布尔值
        console.log("flag:",flag);
        console.log('当前缓存队列中缓存了%d字符',socket.bufferSize);
    });

    socket.on('drain',function (chunk){
        console.log('tcp缓存数据发送完毕');
    })

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