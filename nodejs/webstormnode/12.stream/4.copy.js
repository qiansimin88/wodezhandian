var fs = require('fs');

//
var read = fs.createReadStream('./test2.txt');		//接受一个文件地址
var out = fs.createWriteStream('./test3.txt');


//读写同步执行 容易造成数据丢失
read.on('data',function (data){		//开始读取
				//写入
	var flag = out.write(data);  //写入数据返回状态

	if(!flag) {		//无法直接和硬盘IO的时候 放进缓存区 返回false
		read.pause();  //暂停读取
	}
})

read.on('end',function(data){			//结束
	out.end()						//写入结束
})

out.on('drain',function () {//缓存区的数据全部写入硬盘IO  继续开启文件读取流
	read.resume();
})