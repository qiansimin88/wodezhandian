// JavaScript Document
;(function($){
	$.fn.animatePadding=function(options){
		var defaults={
			animatePadding:60,
			defaultPadding:40,
			evenColor:'#ccc',
			oddColor:'#eee'
			
		};
		var options=$.extend(defaults,options||{});
		return  this.each(function(i){
			var $this=$(this);
			var li=$this.find('li');
			var evenLi=$(this).find('li:even');
			var oddLi=$(this).find('li:odd');
			evenLi.css({background:options.evenColor});
			li.hover(function(){
				$(this).animate({paddingLeft:options.animatePadding},400).dequeue()
			},function(){
				$(this).animate({paddingLeft:options.defaultPadding},400)
			});
		});
	};
})(jQuery)