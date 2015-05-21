// JavaScript Document
//jQuerypopDiv v1.0;
//author:qiansimin 2014.1.11;
//qq:348867341;
;(function($){
	$.fn.popDiv=function(options){
		var defaults={
			popDom:'.popDiv',		  //弹框的class或者ID
			closeBtn:'.closeBtn',	  //关闭弹框及遮罩层的按钮
			eventType:'click',        //事件类型
			
			popBg:true,               //是否需要背景遮罩层
			popBgOpacity:0.6,         //遮罩层的透明度
			popBgzIndex:5,			  //遮罩层的ZIndex的值
			drag:true                 //是否拖拽
		};
		var options=$.extend(defaults,options||{});
		return this.each(function(){
			var _this=$(this);
			var popObj=$(options.popDom);    //弹出的Div缓存
			var popBg=$(options.popBf);      //弹框背景遮罩
			var popTop=($(window).height()-popObj.height())/2;
			var popLeft=($(window).width()-popObj.width())/2;
			_this.on(options.eventType,function(){                     //点击弹出
				$(options.popDom).show('noraml').css({
					top:popTop,
					left:popLeft
				});	
				if(options.popBg)										//遮罩层的设置
				{	
					$('body').prepend('<div class="popBgColor"></div>');
					$('.popBgColor').css({
						position:'absolute',
						width:'100%',
						height:$(document).height(),
						background:'#000',
						opacity:options.popBgOpacity,
						zIndex:options.popBgzIndex	
					});
				};
			});
			$(options.closeBtn).on('click',function(){              //点击关闭弹框和遮罩层
					if($('.popBgColor').is(':visible'))
					{
						$('.popBgColor').remove();	
					}
					var closeHeight=popObj.height();
					popObj.animate({
						top:-closeHeight	
					},200,function(){
						$(this).hide();	
					});
			});
			$(window).resize(function() {                             //浏览器窗口改变DIV改变
					 popTop=($(window).height()-popObj.height())/2;
					 popLeft=($(window).width()-popObj.width())/2;
					$(options.popDom).css({
						top:popTop,
						left:popLeft
					});	
            });
			$(window).scroll(function(){                             //滚动条改变即改变
				var scrollT=$(window).scrollTop();
				if(popObj.is(':visible'))
				{
					 popTop=($(window).height()-popObj.height())/2;
					 popObj.animate({
						top: popTop+scrollT
					},{duration:400,queue:false}); 	
				};	
			});
			if(options.drag)
			{
				popObj.mousedown(function(e){
					var disX=e.pageX-$(this).offset().left;
					var disY=e.pageY-$(this).offset().top;
					$(document).mousemove(function(e){
						var x=e.pageX-disX;
						var y=e.pageY-disY;
						if(x<0)
						{
							x=0;
						}
						else if(x>($(document).width()-popObj.outerWidth(true)))
						{
							x=$(document).width()-popObj.outerWidth(true);
						};
						popObj.css({
						left:x+'px',
						top:y+'px'	
						});
					});
					$(document).mouseup(function(){
						$(document).off('mousemove');	
					});
					e.preventDefault();
				});
			};
		});	
	};
})(jQuery);