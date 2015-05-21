// JavaScript Document
//限制范围接口
define(function(require,exports,module){
	//val 当前值   minN最小值  maxN最大值
	function range (val,minN,maxN) {
		if(val>=maxN){
			return maxN;	
		}else if(val<=minN) {
			return minN;	
		}else {
			return val;	
		}	
	};
	exports.range=range;
});
// JavaScript Document

define(function(require,exports,module){
	
	var oDrag=document.getElementById('red');
	//用require来接收接口文件
	require('./dragModule.js').drag(oDrag);
});
// JavaScript Document
//拖拽接口  为drag
define(function(require,exports,module){
	
	function drag (obj) {
		//在没有移动之前就先创建两个变量
		var disX=0,
			disY=0;
		obj.onmousedown=function (ev) {
			var e=ev||window.event;
			disX=e.clientX-obj.offsetLeft;
			disY=e.clientY-obj.offsetTop;
			
			document.onmousemove=function (ev) {
				var e=ev||window.event;
				
				//引入 range 最大值最小值接口
				
				var L=require('./range.js').range(e.clientX-disX,0,document.documentElement.clientWidth-obj.offsetWidth);;
					T=require('./range.js').range(e.clientY-disY,0,document.documentElement.clientHeight-obj.offsetHeight);
				obj.style['left']=L+'px';
				obj.style['top']=T+'px';				
			};
			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;	
			};
			return false;
		};
	};
	
	//曝光接口信息  用exports参数曝光
	exports.drag=drag;
});