// JavaScript Document

define(function(require,exports,module){
	
		var aA = document.getElementsByTagName('a');
		
		var div = document.getElementsByTagName('div');
		
		
		var Btn = true;
		//hash改变并且点击浏览器的任何按钮  让页面刷新
		window.onhashchange=function(){
			
			if(window.Btn) {
				
				window.location.reload();
					
			}
			
		};
				
		require('show').show(aA,div);
		
		require('hide').hide(aA,div);
		
})