var fs = require('fs');

var fileData = fs.readFileSync('readFile.js','UTF-8');    //同步读取文件 直接返回文件内容

console.log(fileData);
console.log('end');