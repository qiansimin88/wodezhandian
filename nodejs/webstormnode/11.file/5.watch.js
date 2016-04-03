var fs = require('fs');

/*
	监事文件或目录
	curr  属于fs.stat
	prev  fs.stat
 */

var fun1 = function (curr,prev){
	if(Date.parse(prev.ctime) == 0) {
		console.log('文件刚刚创建');
	}else if (Date.parse(curr.ctime) == 0) {
		console.log('文件刚刚删除');
	}else {
		console.log('文件修改');
	}
};

fs.watchFile('msg.txt',{interval:0},fun1); //interval:0  延迟时间  0就是炒鸡灵敏