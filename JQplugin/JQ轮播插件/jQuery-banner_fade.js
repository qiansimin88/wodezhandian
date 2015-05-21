// JavaScript Document
;(function($){
	$.fn.banner_fade=function(options){
		var defaults={
			bannerWrap:'.banner-container',  //轮播图的容器
			btnWrap:'.counter',              //点击按钮的容器
			active:'current',		         //当前按钮的类名
			eventType:'click',				 //触发事件
			moveSpeed:1500,                   //移动速度（越小越快）
			swichTime:3500,					 //切换间隔时长 (越小越快)
			hoverTime:500					 //事件为hover的间隔
		};
		var options=$.extend(defaults,options||{});
		return this.each(function(i){
			var _this=$(this);
			var op=options;
			var timer=null;   
			var hoverTimer=null;                            
			var numObj=$(op.btnWrap).children();		//数字按钮
			var imgSon=$(op.bannerWrap).children();    //图片子级
			var objLength=numObj.length;               //图片个数
			var now=0;                                 //计数器
			imgSon.eq(0).show().siblings().hide();	   //初始化
			numObj.each(function(i){
				//hover事件
				if(op.eventType == 'hover')
				{
					$(this).hover(function(){
						hoverTimer=setTimeout(function(){
							if(now==i) return
							now=i;
							tabBanner();
						},op.hoverTime);
					},function(){
						clearInterval(hoverTimer);
					});	
				}
				//click事件
				else if(op.eventType=='click')
				{
					$(this).click(function(){
						if(now==i) return
						now=i;
						tabBanner();			
					});		
				};
			});
			
			//事件函数
			function tabBanner(){
				numObj.eq(now).addClass(op.active).siblings().removeClass(op.active);
				imgSon.eq(now).fadeIn(op.moveSpeed).siblings().fadeOut(op.moveSpeed);
			};
			
			//自动move函数
			function autoM(){
				now++;	
				if(now==objLength)
				{
					now=0;	
				}
				tabBanner();
			};
			//定时器
			timer=setInterval(autoM,op.swichTime);
			
			//触发暂停
			_this.hover(function(){
				clearInterval(timer);
			},function(){
				timer=setInterval(autoM,op.swichTime);
			});
		});	
	};
})(jQuery);