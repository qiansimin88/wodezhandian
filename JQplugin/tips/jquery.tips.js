/**
 * [tips的弹框小插件]
 * @Author   QSM
 * @DateTime 2015-08-13T16:44:07+0800
 * QQ:348867341
 * important:只支持class的调用
 * @return   {[object]}                 [description]
 */
;(function ($) {

	if(!$.fn.tips) {

		$.fn.tips = function (arg){

			return this.each(function (i,o){

				var _this = $(o);

				var tipsList = new tips(_this,arg).init();

			})

		}

	};

	function tips (o,arg){

		this.optionsS = $.extend({

			tmp: '<div class="ui-tip"><div class="ui-tip-content"></div><div class="ui-tip-arrow"><i></i><em></em></div></div>',//用户自定义的弹框模板

			eventTrigger : 'click',

			status : 0, 		//弹框的disblock的状态  0隐藏  1显示

			tmpContenttext : '出现咯',	//弹框的内容

			contentClass : '.ui-tip-content',

			zIndex : 8888,

			showTime:1000,

			contentCSS : {

				width : 'auto',

				height : 'auto'
			},

			direction:'right',

			customoffset : {

				x:0,

				y:0 
			},	

			randomdirection :false,  //支持随机出现位置

			ajax : null    //弹框出现后ajax请求

		},arg || {});

		var op = this.optionsS;

		this.self = o;

		this.$tips = $(op['tmp']);	//弹框

		this.$content = this.$tips.find(this.optionsS['contentClass']);	//content的class

		this.$contentText = op['tmpContenttext'];	//文字内容

		this.targetObj =o.attr('class').toString().split(/\s+/) ?'.'+o.attr('class').toString().split(/\s+/)[0] :'.'+o.attr('class').toString();  //只支持class

	};

	tips.prototype.init = function (){

		this.disposeEvent();

	}

	tips.prototype.disposeEvent = function (){

		var _target = this.targetObj,

			triggerEvent = this.optionsS.eventTrigger,

			status = this.optionsS.status,

			timer = null,

			_this = this;

		switch (triggerEvent) {

			case 'click' :

				this.self.on('click',function () {

					_this.optionsS.status ? _this.hide() : _this.show();

				}) 

			break;

			case 'hover' : 

				this.self.hover(function () {

					clearTimeout(timer);

					_this.show();

					_this.$tips.hover(function () {

						clearTimeout(timer);

					},function () {

						timer = setTimeout(function () {

							_this.hide();

						},_this.optionsS.showTime);

					})

				},function () {

					timer = setTimeout(function () {

						_this.hide();

					},_this.optionsS.showTime);

				});

			break;

		};

	}

	tips.prototype.show = function () {				

		var _this = this;

		$('body').append(this.$tips); //展示的时候把tips的dom添加进去

		this.$tips.show().css('zIndex',this.optionsS['zIndex']);

		this.$content.css({				//为内容DOM设置宽高

			width : this.optionsS.contentCSS.width,

			height:this.optionsS.contentCSS.height

		});

		this.$content.html(this.$contentText);

		this.optionsS.status = 1;

		if(this.optionsS.ajax && typeof this.optionsS.ajax == 'function' ) {

			this.optionsS.ajax().done(function (content) {

				_this.setContent(content);

			}).fail(function () {

				alert('网络出错');

				window.location.reload();
.
			})

		};

		//定位
 		this.setPosition();
	}

	tips.prototype.setPosition = function () {

		var self = this.self,

			_this = this,

			selfoffset = self.offset(),

			customoffset = this.optionsS.customoffset,

			winWh = {

				w : $(window).width(),
				h:$(window).height()

			},

			targetWh = {

				w : self.outerWidth(),
				h:self.outerHeight()

			},

			tipsWh = {

				w : _this.$tips.outerWidth(),
				h:_this.$tips.outerHeight()

			};

		this.randomdirection();	

		switch(this.optionsS.direction) {

			case 'left':

				var x = selfoffset.left - tipsWh.w - customoffset.x,

					y = selfoffset.top  + customoffset.y;

					this.$tips.css({

						left :x,

						top : y

					})

				break;

			case 'right' : 
					
				var x = selfoffset.left +targetWh.w+customoffset.x,

					y = selfoffset.top  + customoffset.y;

					this.$tips.css({

						left :x,

						top : y

					})	

				break;	

			case 'top' : 

				var x = selfoffset.left + (targetWh.w - tipsWh.w)/2 + customoffset.x,

					y = selfoffset.top  - tipsWh.h - customoffset.y;

					this.$tips.css({

						left :x,

						top : y

					})

				break;

			case 'bottom' : 

				var x = selfoffset.left + (targetWh.w - tipsWh.w)/2 + customoffset.x,

					y = selfoffset.top  + targetWh.h + customoffset.y;

					this.$tips.css({

						left :x,

						top : y

					})

				break;

			default : 

				throw new Error('只支持上下左右哦亲！');

			break;

		}	

	}

	tips.prototype.randomdirection = function () {

		var List = ['top','right','bottom','left'],

			radomNum = Math.floor(Math.random()*List.length);

		this.optionsS.direction = this.optionsS.randomdirection ? List[radomNum] : this.optionsS.direction;

	}

	tips.prototype.hide = function (){

		this.optionsS.status = 0;

		this.$tips.remove();

	}
	//设置内容
	tips.prototype.setContent = function (c) {

		this.$content.html(c);

	}


})(jQuery)