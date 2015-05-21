// JavaScript Document
//author:qiansimin v1.0
;(function($){
	$.fn.banner=function(options){
		var defaults={
			bannerWrap:'.banner-container',  //轮播图的容器
			btnWrap:'.counter',              //点击按钮的容器
			active:'current',		         //当前按钮的类名
			eventType:'click',				 //触发事件
			moveSpeed:500,                   //移动速度（越小越快）
			swichTime:3500					 //切换间隔时长 (越小越快)
	
			
		};
		var options=$.extend(defaults,options||{});
		return this.each(function(){
			var _this=$(this);
			var timer=null;
			var op=options;
			var wrapUl=$(op.bannerWrap);       //轮播图ul;
			var wrapUlSon=wrapUl.children();   //轮播图UL下的子级

			var alW=$(op.bannerWrap).children().eq(0).width();   //单个轮播图的宽度
			var now=0;   //按钮计数
			var now2=0;	 //大图计数
			var wrapUlLilength=wrapUl.children().length;    //大图的个数
			
			//计算整个ul的宽度
			wrapUl.css('width',alW*wrapUlLilength);
			//按钮点击
			var oBtn=$(op.btnWrap).children();
			oBtn.on(op.eventType,function(){
				var index=$(this).index();
				now=index;
				now2=index;
				$(this).addClass(op.active).siblings().removeClass();
				wrapUl.animate({left:-alW*now},op.moveSpeed);
			});
			//自动播放的函数
			function auTopPlay(){
				if(now==wrapUlLilength-1)
				{
					wrapUlSon.eq(0).css({
						'position':'relative',
						'left':alW*wrapUlLilength
					});
					now=0;	
				}
				else
				{
					now++;	
				};
				now2++;
				oBtn.eq(now).addClass(op.active).siblings().removeClass();
				wrapUl.animate({left:-now2*alW},op.moveSpeed,function(){
					if(now==0){
						wrapUlSon.eq(0).css({
						  'position':'static',
						  'left':0
						});
						wrapUl.css('left',0);
						now2=0;
					};
				});
			};
			//计时器
			timer=setInterval(auTopPlay,op.swichTime);
			//接触停止计时
			_this.hover(function(){
				clearInterval(timer);
			},function(){
				timer=setInterval(auTopPlay,op.swichTime);
			})
		});
	};	
})(jQuery)