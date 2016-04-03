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
	fd  文件描述符索引 
	buffer 写到哪个buffer
	offser buffer偏移量 (这个指的是buffer而不是其他的偏移量)
	length  写多少个字节
	position 从文件的哪个位置开始写		null就代表当前位置
	callback 
 */
// fs.read(fd, buffer, offset, length, position, callback);
//fd 是打开文件的索引
fs.open('./msg.txt','w',function (err,fd) {
	var buffer = new Buffer(6); //6个字节 两个汉字
		fs.write(fd,new Buffer('钱思敏'),3,6,null,function (err,bytesWrite,buf){
			console.log(bytesWrite);	//6 实际读到的字节	/
			fs.write(fd,new Buffer('钱思敏'),0,3,0,function (err,bytesWrite,buf){
			console.log(bytesWrite);	//6 实际读到的字节	/
		})
	})
})
