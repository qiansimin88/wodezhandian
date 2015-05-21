// JavaScript Document
;(function($){
	$.fn.popwindow=function(options){
		var defaults={
			clickOb:'.bt',
		};
		var settings=$.extend(defaults,optiopns||{});
		return this.each(function(){
			var $this=$(this);
			$(defaults.clickOb).on('click',function(){
				
			});
		});
	};
})(jQuery);