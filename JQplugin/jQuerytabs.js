// JavaScript Document
//jQuerytabs v1.0;
//author:qianismin 2013.12.24;
//qq:348867341;
;(function($){
	$.fn.tabs=function(options){
		var defaults={
				shijian:'click',
				contentObj:'.content',
				time:300,           //hover 下的间隙时间
				current:false
			};
		var options=$.extend(defaults,options||{});
		return this.each(function(i){
			var $this=$(this);
			var tabs=$this.children();  //tabs的子级 
			var timer=null;
			var index=$(this).index();	//索引
			var content=$(options.contentObj);  //选项卡父级
			var contentSon=content.children();  //选项卡子级
			
				if(options.current)
				{
					tabs.eq(0).addClass(options.current);	
				};
				contentSon.eq(0).show().siblings().hide();
				if(options.shijian=='hover')
				{
					tabs.hover(function(){
						var index=$(this).index();
						var $_this=$(this);   //this指向问题
						timer=setTimeout(function(){
							if(options.current)
							{
								$_this.addClass(options.current).siblings().removeClass();	
							};
							contentSon.eq(index).show().siblings().hide();
						},options.time);
					},function(){
						clearInterval(timer);
					});
				}
				else
				{
					tabs.on(options.shijian,function(){
					var index=$(this).index();
					if(options.current)
					{
						$(this).addClass(options.current).siblings().removeClass();	
					};
					contentSon.eq(index).show().siblings().hide();
					});	
				};
		});		
	};	
})(jQuery);