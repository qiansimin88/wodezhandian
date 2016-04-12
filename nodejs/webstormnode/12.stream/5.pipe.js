var fs = require('fs');

//
var read = fs.createReadStream('./test2.txt');		//接受一个文件地址
var out = fs.createWriteStream('./test3.txt');

//管道流
read.pipe(out);