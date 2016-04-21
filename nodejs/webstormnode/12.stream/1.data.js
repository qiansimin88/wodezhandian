// 有时候我们不知道大小也不关心大小，只关心何时读到数据以及如何 何时结束

// 我们使用stream.Readable 接口的对象来将对象转成流数据

//常用的可读流
	
	// fs.ReadStream  读取文件流
	// http.IncomingMessage(socket) 客户端请求对象	
	// net.Socket TcP客户端
	// gzip default 数据压缩流

var fs = require('fs');
/*
	path 文件路径
	option 选项
		fd 文件索引
		flags 打开方式
		mode 
		start 文件的 起始位置
		end 结束位置
		autoClose 是否自动关闭
 */

/*
	读取流分为两种读取模式
	流动模式		迫使操作系统尽快读出数据
	非流动模式 / 暂停模式	//需要通过代码去读取
 */

var rs = fs.createReadStream('msg.txt', {});


//监听事件
//打开触发
rs.on('open',function (){
	console.log('opend：');
})

// rs.pause();  //暂停流的执行  
// rs.resume()  //打开流的执行 
// 
//读到数据触发
rs.on('data',function (data){
	console.log('data：');
})

//读到文件最后的时候触发
rs.on('end',function(data){
	console.log('end:');
})
//文件关闭触发
rs.on('close',function (data) {
	console.log('close:');
})

