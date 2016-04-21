/**
 * TCP要建立连接才能发数据 可靠但是慢
 * UDP不需要建立连接再发数据 不可靠但是快
 */

var dgram = require('dgram');
var server = dgram.createSocket('udp4');
//当客户端发送消息的时候触发
/**
 * buffer,
   offset, buffer的偏移量  从第几个字节开始
  length,
  port,
  address,
  callback
 */
server.on('message',function(msg,remoteInfo){
    console.log(msg.toString());
    console.log(remoteInfo);
    server.send(new Buffer('珠峰培训'),3,6,remoteInfo.port,remoteInfo.address);
});
server.on('listening',function(){
    var address = server.address();
    console.log('服务器开始监听,地址为',address);
});
server.bind(41221,'localhost');