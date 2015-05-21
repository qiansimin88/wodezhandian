// JavaScript Document
	;(function($){
		$.fn.tip=function(options){
			var defaults={
				x:5,
				y:5,
				tipDiv:'.tip'	
			};
			var options=$.extend(defaults,options||{});
			return this.each(function(i){
				$this=$(this);
				$this.hover(function(e){
					$(options.tipDiv).eq(i).show().css({
						top:e.pageY+options.y,
						left:e.pageX+options.x	
					})
				},function(){
					$(options.tipDiv).eq(i).hide();
				});
				$this.mousemove(function(e){
					$(options.tipDiv).eq(i).css({
						top:e.pageY+options.y,
						left:e.pageX+options.x
					});
				});
			});		
		}
	})(jQuery)