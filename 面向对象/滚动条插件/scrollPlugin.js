/**
 *author qsm 
 *date 2015-1-14
 *vs 1.0(残缺版)
 *qq  348867341
 *copy@Right   朗阁留学(上海) 系统研发部 
 */

//注意  html 的 a 标签的 href="#(这部分必须要在下面有对应的跳转ID(必须是ID哦)属性)"

;(function () {

	'use strict';

	function scrollPlugin (ele,arg) {

		this.config = $.extend({

			'navItem' : 'a',						//导航可以点击的元素

			'currentClass' :  'current',			//导航按钮的currentclass

			'hashChange' : false,					//是否需要改变hash

			'scrollThreshold' : 0.5,				//临界点  正常的 滚动条往上拉 改变导航的 current是 ：window.height + windiw.scrollTop > this.offsetTop()  这样会显得很突兀没有美感 这里给个临界点  就是 window.height * 临界点 + window.scrolltop > this.offsetTop()即变换

			'filter' : '',

			'endCallback' : false,

			'speed' : 1000,

			'fixedPosition' : {						//给fixed的nav添加 fixed属性哦  @parm  fixeDom : fixeDom的容器

				'fixedDom' : '.full-list',										  //@parm  left :默认距离屏幕中间左边的距离

				'left' : '325px',												  //@parem top : 距离显示器上面的距离

				'top': '389px',

				'MINtop' : 80,                                                //@parm 顶部小于这个值就隐藏

				'disBottom' : 246   										//小于底部这个值就隐藏
			}


		},arg || {});

		var config = this.config;

		//一些全局的属性

		this.$ele = ele;

		this.$navItem = this.$ele.find(config['navItem']);

		this.$win =  $(window);

		this.currentClass = config['currentClass'];

		this.speed = config.speed;

		this.fixedDom = config['fixedPosition'];

		//具有零界点的window的高度
		this.windowThresholdHeight = parseInt(this.$win.innerHeight(),10) * config['scrollThreshold'];

		this.docHeight = $(document).outerHeight();

		this.$winHeight = this.$win.outerHeight();

		//有些情况下会  删选一些 标签 
		if(config['filter'] !== '') {

			this.$navItem = this.$navItem.filter(config['filter']);

		};

		//把所有节点的offset().top存放到一个json文件中 方便读取
		this.offsetCollection = {};
		//把所有对象节点的html存入对象
		this.aHTML = {};

	};

	scrollPlugin.prototype = {

		'constructor' : scrollPlugin,

		'init' : function () {

			var self = this;

			//1.把所有节点的offset().top存放到一个json文件中 方便读取
			this.getOffsetTop();

			this.aHTMLlib();

			this.Domstore();

			this.fixedPosition();
			//console.log(this.offsetCollection)
			//2.给所有的a标签加上点击滑动效果  $.proxy 是 Jquery 提供的改变上下文的方法  这里的this指向的是scrollPlugin这个构造对象
			this.$navItem.on('click',function (e) {

				e.preventDefault();

				self.handleClick(e);

			});
			//3.window的滚动效果
			this.$win.on('scroll',$.proxy(this.drowScroll,this));	

		},
		//点击
		'handleClick' : function (e) {

			var $target = $(e.currentTarget),

				self = this,

				hashOffsetTop = this.getHashOffet($target);	  //从json里面取出来当前点击的dom的对应的offsetTop的值

				var nowindex = self.getAindex($target); // 给回调传入当前的index的值

				if(!($target.parent().hasClass(this.currentClass))) {

					var dis =Math.round(hashOffsetTop - self.windowThresholdHeight);
							//移动window的scrollTop
						$('html,body').animate({

							'scrollTop' :  dis

						},self.speed,function () {

							self.changeHash($target);

							if(self.config['endCallback'] && typeof self.config['endCallback'] == 'function') {

								self.config['endCallback'](nowindex);

							};	

						});

				};
			

		},
		changeHash : function (obj) {

			var hash = obj.attr('href').split('#')[1];

			if(this.config['hashChange']) {

				window.location.hash = hash;

			}

		},
		//获取每个节点的offsetTOp
		'getOffsetTop' : function () {

			//把每个a节点对应的节点的offset().top  循环存入  json 对象当中
			var obj =this.$navItem,

				self = this;


				obj.each(function (i,o) {

					var hashValue = $(o).attr('href').split('#')[1],

						$target = $('#'+hashValue);

					var offsetTop = $target.offset().top;  //为不出现意外情况  最好还是用个manth.round()四舍五入一下

						//如果当前的对应的dom不存在的话 就不需要存进来了。
						if($target.length) {

							self.offsetCollection[hashValue] = Math.round(offsetTop);

						};

				}); 		

		},
		//改变a标签的class
		'changeClass' : function (obj,parent) {

			var currentClass = this.currentClass;

			//若当前的父级没有
			if(!parent.hasClass(currentClass)) {

				parent.addClass(currentClass).siblings().removeClass(currentClass);
			}

		},
		//得到对应hash值的  dom的offsetTop 
		'getHashOffet' : function (obj) {

			var hashOffset = obj.attr('href').split('#')[1];

			return this.offsetCollection[hashOffset];

		},
		//把所有a节点的html按顺序放入JSON
		'aHTMLlib' : function () {
		
			var	len = this.$navItem.length;

				for(var i = 0; i<len;i++) {

					this.aHTML[i] = this.$navItem.eq(i).html();

				};

		},
		//获取当前点击对象的index
		'getAindex' : function (obj) {

			var	objHTML = obj.html();

			for(var i in (this.aHTML)) {

				var objH = this.aHTML[i];

				if(objHTML == objH) {

					return i;

					break;

				};

			};
 
		},
		//滚动条下拉执行的函数
		'drowScroll' : function () {

			var self = this,

				showWho = 0,

				navItemParent = self.$navItem.parent(),

			 	dropScrollHeight = self.$win.scrollTop() + parseInt(self.$win.innerHeight(),10) * self.config['scrollThreshold'],

			 	scrolltop= self.$win.scrollTop(),

			 	disBottomValue =  self.$winHeight + scrolltop > self.docHeight - self.fixedDom['disBottom'];




			 	//小于某个点 就影藏scrolltop
			 	if((scrolltop < self.fixedDom['MINtop']) || disBottomValue) {

			 		$(self.fixedDom['fixedDom']).hide();

			 	}else {

			 		$(self.fixedDom['fixedDom']).show();

			 	};			 

			 	for(var i=0;i<self.domArr.length;i++) {

			 		var domOffset = $(self.domArr[i]).offset().top;

			 		if(dropScrollHeight > domOffset) {

			 			showWho = i;

			 		}

			 	};

			 	navItemParent.eq(showWho).addClass(self.currentClass).siblings(navItemParent).removeClass(self.currentClass);

		},
		//存放a标签对应的 dom的数组
		'Domstore' : function () {

			this.domArr = [];

			for(var i = 0;i<this.$navItem.length;i++) {

				var domTag = this.$navItem.eq(i).attr('href').split('#')[1];

				this.domArr[i] = '#'+domTag;

			};

		},
		//固定fixed的位置
		'fixedPosition' : function () {

			var $fixedDom =$(this.fixedDom['fixedDom']),

				screenScale = this.$win.outerWidth() / 2;

				$fixedDom.css({

					'position' : 'fixed',

					'left' : screenScale + parseInt(this.fixedDom['left'],10),

					'top' : parseInt(this.fixedDom['top'],10),

					'zIndex': 99999,

					'display':'none'

				})	

		}

	};


	$.fn.scrollPlugin = function (arg) {

		this.each(function () {

			var _this = $(this);

			var jqueryscrollPlugin = new scrollPlugin(_this,arg).init();

			_this.data('scrollPlugin',jqueryscrollPlugin);

		});

	};

})(jQuery);