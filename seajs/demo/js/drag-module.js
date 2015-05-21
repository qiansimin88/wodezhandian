// JavaScript Document

define(function(require,exports,module){
	
	function drag (obj) {
		//在没有移动之前就先创建两个变量
		var disX=0,
			disY=0;
		obj.onmousedown=function (ev) {
			var e=ev||window.event;
			disX=e.clientX-obj.offsetLeft;
			disY.e.clientY-obj.offsetTop;
			
			document.onmousemove=function (ev) {
				var e=ev||window.event;
				
				var L=e.clientX-disX,
					T=e.clientY-disY;				
			};
			document.onmouseup=function(){
				document.onmousemove=null;
				obj.onmousedown=null;	
			};
		};
	};
	
	//曝光接口信息  用exports参数曝光
	exports.drag=drag;
});