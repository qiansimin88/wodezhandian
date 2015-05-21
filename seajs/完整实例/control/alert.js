// JavaScript Document

define(function(require,exports,module){
	
	//引用变量a  require(相对地址)   输出的就是引用的模块
	
	var a = require('../ss/var.js').a;
	var b = require('../ss/var.js').b
	
	function ale (){
		
		alert(a)
		alert(b)
			
	};
	
	exports.aler=ale;	
	
})