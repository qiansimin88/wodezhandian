// JavaScript Document
;(function($){
	$.fn.moveNav=function(options){
		var defaults={
			easing:'easeInQuad',
			speedTime:500,
			disTop:'200px',
			current:'.select'
		};
		var options=$.extend(defaults,options||{});
		
		return this.each(function(){
			var _this=$(this);
			var op=options;
			var laseLi=_this.children().last();
			var someLi=_this.children('li');
			var sectWidth=someLi.find('a').filter(op.current).width();
			_this.css('position','relative');
			var sectLeft=someLi.has(op.current).position().left;
			var sectWidth=someLi.has(op.current).width();
			laseLi.css({position:'absolute',top:op.disTop,left:sectLeft,width:sectWidth});
			someLi.hover(function(){
				var widthLi=$(this).width();
				laseLi.stop().animate({
					left:$(this).position().left,
					width:widthLi+'px'
				},op.speedTime,'easeOutBounce');
			},function(){
				laseLi.stop().animate({
					left:sectLeft,
					width:sectWidth
				},op.speedTime,'easeOutBounce');
			});
		});
	};
})(jQuery)