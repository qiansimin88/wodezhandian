// JavaScript Document// JavaScript Document
define(function(require,exports,module){
	
	function int (aA,aDiv,hash) {
		
		for(var i=0;i<aDiv.length;i++) {
			
			if(aDiv[i].dataset.hash =='message') {
				
				startMove(aDiv[i],{width:0,height:0},function(){
					//出厂结束
					window.location.hash=hash;
					
					//进厂
					
					require('show').show(aA,aDiv)
					
				})
					
			}
			
		}
		
	};
	
	exports.int=int;
	
})