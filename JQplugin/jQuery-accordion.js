// JavaScript Document
;(function($){
	$.fn.accordion=function(options){
		var defaults={
			sectObj:'h3',
			eventType:'click',
			current:'current',
			intIndex:'0',
			effect:'default'
		};
		var options=$.extend(defaults,options||{});
		return this.each(function(){
			var _this=$(this);
			var o=options;
			var sectObj=_this.children(o.sectObj);      //触发对象集合
			var anmObj=_this.children().not(sectObj);   //变形对象集合
			
			sectObj.eq(o.intIndex).addClass(o.current);  //初始化某个触发对象
			sectObj.each(function(i){
				$(this).on(o.eventType,function(){
					if($(this).hasClass(o.current)) { return false};
					var curIdx=sectObj.index(sectObj.filter('.'+o.current)[0]);    //带有current的触发对象    (这里说明 filter是返回匹配元素集合而hasClass则是返回布尔值)
					var nowIdx=sectObj.index(this);								   //当前点击的触发对象

					packaging(curIdx,nowIdx);									   //调用封装的函数，方便使用
				});
			});
			
			function packaging(curIdx,nowIdx){
				sectObj.eq(curIdx).removeClass(o.current).end().eq(nowIdx).addClass(o.current);
				if(o.effect == 'default')
				{
					anmObj.eq(curIdx).hide().end().eq(nowIdx).show();	
				}
				else if(o.effect == 'fade')
				{
					anmObj.eq(curIdx).fadeOut('fast').end().eq(nowIdx).fadeIn('fast');	
				}
				else if(o.effect == 'width')
				{
					anmObj.eq(curIdx).animate({
						width:'hide'
					}).end().eq(nowIdx).animate({
						width:'show'	
					});
				};
			};
		});
	};	
})(jQuery)