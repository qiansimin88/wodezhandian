// JavaScript Document
;(function($){
	$.fn.tab=function(options){
		var defaults={
			Event:'click',
			tabDiv:'.div1'
		};
		
		var settings=$.extend(defaults,options||{});
		return this.each(function(i){
			var $this=$(this);
			$this.on(defaults.Event,function(){
				$(defaults.tabDiv).eq(i).show().siblings(defaults.tabDiv).hide();
			});
		});
	
	};
	
 })(jQuery)