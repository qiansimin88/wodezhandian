var path = require('path');  //路径
var fs = require('fs');		 //文件系统
/*
	__dirname 返回当前文件所在目录的路径 
 */
console.log('__dirname:'+__dirname);

/*
	__filename返回当前文件的绝对路径
 */
console.log('__filename:'+__filename);

/*
	normalize 将非标准化的路径转化成标准化的路径
	1、解析.和..
	2.多个斜杠会转成一个斜杠
	3。window下的斜杠\会转换成/
	4.结尾斜杠会保留
	5.返回最终的路径 
 */

console.log(path.normalize('./a////b\\..../\\'));  // a\b\....\

/*
	多个参数字符串合并呈一个路径字符串
	可以理解为
	cd a 
	cd ../
	cd c 
	最后的路径 就是 c 
	__dirname是当前文件的绝对路径
 */

console.log(path.join(__dirname,'a','../','c'));

/*
	path.resolve()  返回绝对路径
	1.以应用程序为根起点
	2 解析 ... .
	3.普通字符串代表子目录
	4./代表盘符下面的根目录
	5.如果遇到后面有/  则忽略前面的所有路径  以/为起点
 */

console.log(path.resolve('/a','b')); //E:\a\b   /代表当前盘符的根目录
console.log(path.resolve('a','..','c'));	//E:\wodezhandian\nodejs\webstormnode\9.path\c 以当前文件为起始目录


/*
	path.relative(p1,p2) 获取p2相对于p1的路径关系 
 */
console.log(path.relative(__dirname,'/tmp'));  //..\..\..\..\tmp  意思就是第一个参数如何进入到第二个参数


/*
	paht.dirname(p)  
	返回指定路径的工作目录 
 */

console.log(path.dirname(__dirname));
console.log(path.dirname('../global/console.js'));



/*
	获取指定路径的文件名 
 */
console.log(path.basename(__filename));		//path.js 