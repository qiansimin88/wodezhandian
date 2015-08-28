var fs = require('fs');

	fs.readFile('hehse.txt','UTF-8',function (err,data) {

		if(err) throw err;

		console.log(data);		//返回文件内容

	});

	console.log('end');    //先执行 end 后执行 redfile的代码  因为 readFile是异步读取