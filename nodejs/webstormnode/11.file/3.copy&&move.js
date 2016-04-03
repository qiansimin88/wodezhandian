var fs = require('fs');
var BUFF_SIZE = 1024*8;   //自定义的缓存 buffer 大小
/**
 * [拷贝一个文件]
 * @param  {[type]} src  [源地址]
 * @param  {[type]} dest [目标地址]
 * @return {[type]}      [description]
 */
function copy(src,dest) {
	var buff = new Buffer(BUFF_SIZE) //8KB 得到缓存区
	var srcFd = fs.openSync(src,'r');  //读 得到源文件描述符
	var destFd = fs.openSync(dest, 'w'); //写 得到目标文件描述符
	var readsoFar = 0;   //源文件当前的读取位置
	do {
		var readedBytes = 		//返回的是实际读取的字节数
			fs.readSync(srcFd, buff,0,BUFF_SIZE, readsoFar);
			//写
			fs.writeSync(destFd, buff, 0, readedBytes, null);

			readsoFar+= readedBytes; //每次读取都要累加 便于下次读取的位置更新

	}while(readedBytes == BUFF_SIZE)

	fs.closeSync(srcFd)		//关闭之前打开的命令  接受一个FD 
	fs.closeSync(destFd);

//	fs.unlinkSync(src);	//剪切  源文件会删除 
};

//执行拷贝程序
copy('../../../ES6新特性/lib/traceur.js','copyFile.js');