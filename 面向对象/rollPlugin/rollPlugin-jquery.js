/**
 * @authors qsm (you@example.org)
 * @date    2015-01-04 13:55:24
 * @version $v1.0$
 * 依赖jquery1.72(lt)  
 */

;(function($){

	"use strict";

	function rollPlugin (elm,arg) {

		//默认配置
		this.config = $.extend({

			'eventType' : 'click',	//默认是click触发

			'effect' : 'x',			//默认是横向滚动
			
			'box' : '.container',  	 	//默认是移动层父级元素	

			'prevBtn' : '.prev',    //上一个按钮

			'nextBtn' : '.next',	//下一个按钮

			'prevNo' : '.arrowNo',	//禁用按钮样式

			'nextNo' : '.arrowNo',

			'onceNum' : 2,          //一次移动几个

			'auto'  :  true,		//是否自动  可选项true||false

			'loop'  :  true,		//是否循环播放  可选项true||false

			'speed' : 500,          //动画滑动速度   毫秒为单位

			'spacing' : 3000        //动画间隔的时间
 
		},arg || {});

		var config = this.config;

		this.el = elm;

		this.ulList = this.el.find(config.box);

		this.li = this.ulList.find('li');
		//移动元素单位可视宽度
		this.oneceDistance = this.li.outerWidth();

		//移动BOX的总宽度
		this.moveWidth = this.oneceDistance * this.li.length;

		//单次移动的个数
		this.moveNumOne = config.onceNum;

		//移动一次的距离
		this.moveWidthOne = this.oneceDistance * config.onceNum;

		this.viewWidth = this.ulList.parent().outerWidth(); 

		//前后按钮
		this.prev = this.el.find(config.prevBtn);
		this.next = this.el.find(config.nextBtn);

		this.prevNo = config.prevNo.slice(1);
		this.nextNo = config.nextNo.slice(1);

		//设置一个开关  不让用户连续点击按钮 产生无限运动的BUG    true：允许运动  false:运动状态不给运动
		this.moveBtn = true;

		this.init();

	};

	//扩展原型方法
	rollPlugin.prototype = {

		'constructor' : 'rollPlugin',

		//初始化
		'init' : function () {
			//初始化一些CSS行为
			//alert(this.oneceDistance)
			this.ulList[0].innerHTML+=this.ulList[0].innerHTML;
			//复制两份  特别计算宽度
		
			this.ulList.css({width:(this.el.find('li').length*this.oneceDistance),left:0});		
			//当前的滑块部分是否大于当前的可是大小 (判断是否需要添加点击事件)		
			if(this.moveWidth > this.viewWidth) {



			}else {

				this.prev.addClass(this.prevNo);
				this.next.addClass(this.nextNo);
			};

			this.event();

			//是否自动播放
			if(this.config.auto) {

				this.autoScroll(this.el,this.config.spacing);

			};

		},  //init END

		event : function () {

			this.prevEvent();
			this.nextEvent();
		},

		prevEvent : function () {

			var _this = this;

			this.prev.on('click',function(){

				var $this = $(this);

				if (_this.moveBtn) {

					//点击按钮 立刻让按钮不可以再次点击
					_this.moveBtn = false;

					if ($this.hasClass(_this.prevNo)) {

						return;

					};

					_this.ulList.find('li:gt(' + (_this.li.length - _this.moveNumOne - 1) + ')').prependTo(_this.ulList);

					_this.ulList.css('left', -_this.moveWidthOne);


					//没想好	
					_this.animate(_this.ulList, 0, _this.config.speed,function(){

						_this.moveBtn = true;

					});

				};

				

			});	
		},

		nextEvent:function(){

			var _this = this;

			this.next.on('click',function(){

				var $this = $(this);

				if (_this.moveBtn) {

					_this.moveBtn = false;

					if ($this.hasClass(_this.nextNo)) {

						return;

					};
					//循环回调函数
					var callback = function() {

						_this.ulList.find('li:lt(' + _this.moveNumOne + ')').appendTo(_this.ulList);

						_this.ulList.css('left', 0);

						_this.moveBtn =true;

					};

					//没想好	
					_this.animate(_this.ulList, -_this.moveWidthOne, _this.config.speed, callback);

				}
			
			});

		},

		animate: function (obj, w, speed, callback) {

		    obj.animate({

		        left: w

		    }, speed, callback && callback);

		},

		autoScroll : function (el,spaceTime) {

				var _this = this;

				function autoScroll () {
				
					_this.next.trigger('click');	

				};

				var move = setInterval(autoScroll,spaceTime);

				el.hover(function(){

					clearInterval(move);

				},function () {

					 move = setInterval(autoScroll,spaceTime);	

				})

		}
	};

	//给jquery添加插件方法
	$.fn.rollPlugin = function (arg) {

		return this.each(function () {

			var _this = $(this),

				initPlugin = new rollPlugin(_this,arg);

				_this.data('jsPlugin',initPlugin)

		});

	};

})(jQuery)