// JavaScript Document
define(function(require,exports,module){
	
	function show (aA,div) {
		
														//如果哈希值是空 就取index
		var firstHash = window.location.hash.slice(1) || 'index';
		
		for (var i=0;i<div.length;i++ ) {
			
			div[i].style.display='none';
			
			if(firstHash == div[i].dataset.hash ) {
				
				div[i].style.display='block';
				
				//进场动画判断
				
				switch (firstHash) {
					
					case 'index' :
						
						require('showPath/indexIn').int(div[i]);
						
						window.Btn=true;
					
					break;	
					
					case 'student' : 
					
						require('showPath/studentIn').int(div[i]);
						window.Btn=true;
						
					break;
					
					case 'message' : 
					
						require('showPath/messageIn').int(div[i]);
						window.Btn=true;
						
					break;
					
					
				}
				
			};
			
		};
		
		
		
		
	};
	
	exports.show=show;
	
})