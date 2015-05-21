// JavaScript Document

define(function(require,exports,module){
	
	//引用变量a  require(相对地址)   输出的就是引用的模块
	var a =require('appl/app').a;
	
	function ale (){
		
		alert(a)	
	};
	
	exports.aler=ale;	
	
})