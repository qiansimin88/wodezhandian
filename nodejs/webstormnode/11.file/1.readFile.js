/*
	fs 
 */

var fs = require('fs')

//同步   返回值
var content = fs.readFileSync('./msg.txt','utf-8');
console.log(content);   //123

//异步  回调
//尽量使用异步方法 只有在读取文件作为必要条件的时候 才使用同步
fs.readFile('./msg.txt','utf-8',function(err,data){
	console.log(data);
});
