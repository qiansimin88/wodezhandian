var fs = require('fs');

fs.readFile('./msg.txt',function (err,data) {
	if(err) {
		console.error(err);
	}else {
		//<Buffer 31 32 33 34 35 36>
		console.log(data);
	} 
})  