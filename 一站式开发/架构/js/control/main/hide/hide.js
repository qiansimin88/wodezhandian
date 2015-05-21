// JavaScript Document
define(function(require,exports,module){
	
	function hide (aA,div) {
		
		for (i=0;i<aA.length;i++ ) {
			
			aA[i].onclick = function () { 
		
				var nowHash = this.dataset.hash ;
				
				window.Btn=false;
	
				//设置hash 
				
				//window.location.hash = nowHash;
				
					switch ( window.location.hash.slice(1) || 'index' ) {
					
					case 'index' :
					
						require('hidePath/indexOut').int(aA,div,nowHash);
					
					break;	
					
					case 'student' : 
					
						require('hidePath/studentOut').int(aA,div,nowHash);
						
					break;
					
					case 'message' : 
					
						require('hidePath/messageOut').int(aA,div,nowHash);
						
					break;
					
					
				}
			
			}
		
		};
	
		
		
	};
	
	exports.hide=hide;
	
})