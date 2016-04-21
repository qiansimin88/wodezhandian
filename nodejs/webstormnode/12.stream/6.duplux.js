  var Duplex = require('stream').Duplex;
  var util = require('util');

//拷贝原型方法
  util.inherits(changeDuplex,Duplex);

/*
	要把一个原始文件变成一个加密文件
 */
function changeDuplex () {
	Duplex.call(this);  //构造函数里面的方法继承	
}

changeDuplex.prototype._read = funtion () {

}

changeDuplex.prototype._write = funtion () {
	
}

var chanfe = new changeDuplex();

