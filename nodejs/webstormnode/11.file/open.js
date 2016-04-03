/*
	如何从指定位置开始读取文件
	0 stdin 标准输入
	1 stdout 标准输出
	2 stderr 错误输出
 */	

var fs = require('fs');


/*
	fs.read()
	读取文件的某一部分
	fd  文件描述符
	buffer 读到哪个buffer
	offser buffer偏移量 (这个指的是buffer而不是其他的偏移量)
	length  写多少个字节
	position 从文件的哪个位置开始读
	callback 
 */
// fs.read(fd, buffer, offset, length, position, callback);
//fd 是打开文件的索引
fs.open('./msg.txt','r',function (err,fd) {
	var buffer = new Buffer(6); //6个字节 两个汉字
	fs.read(fd,buffer,0,6,3,function (err,bytesRead,buf){
		console.log(bytesRead);		//6 实际读到的字节数
		console.log(buf.toString()); 	//峰培 读到的buffer字符串化
	})
})
