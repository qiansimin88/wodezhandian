
/*
	TCP要简历链接才发数据 UDP不需要
 */

var dgram = require('dgram');  //不是流
var client = dgram.createSocket('udp4');

//当客户端发送消息的时候触发
//send(buffer,offset,length,port,address,cb)   length 是代表你要发几个字节  而不是 字节的位置 比如  峰陪  到陪是代表 两个字 相当于 6个字节  而不是位置的9

client.send(new Buffer('珠峰培新'),0,6,41221,"127.0.0.1")

client.on('message',function(msg,remoteInfo){
    console.log(msg.toString());
    client.send(new Buffer('珠峰培训'),3,6,remoteInfo.port,remoteInfo.address);
});