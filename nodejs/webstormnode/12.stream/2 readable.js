var fs = require('fs');

var rs = fs.createReadStream('msg.txt');


//监听readable事件
rs.on('readable',function () {
	console.log('---------readable---------');
	var data;
})

rs.on('end',function () {
	console.log('end');
})