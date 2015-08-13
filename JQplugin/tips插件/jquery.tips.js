/**
 * [tips的弹框小插件]
 * @Author   QSM
 * @DateTime 2015-08-13T16:44:07+0800
 * QQ:348867341
 * @return   {[object]}                 [description]
 */
;(function ($) {

	if(!$.fn.tips) {

		$.fn.tips = function (arg){

			return this.each(function (i,o){

				var _this = $(o),

					 tipsInit = new tips(_this,arg).init();

			})

		}

	};

	function tips (o,arg){

		this.optionsS = $.extend({

			delegate : 'body',			//事件对象（事件委托）

			tmp: '<div class="ui-tip"><div class="ui-tip-content"></div><div class="ui-tip-arrow"><i></i><em></em></div></div>',//用户自定义的弹框模板

			targetObj : '.btn',

			eventTrigger : 'click',

			status : 0, 		//弹框的disblock的状态  0隐藏  1显示

			tmpContenttext : '出现咯',	//弹框的内容

			contentClass : '.ui-tip-content',

			zIndex : 8888,

			contentCSS : {

				width : 'auto',

				height : 'auto'

			},

			ajax : null    //弹框出现后ajax请求

		},arg || {});

		var op = this.optionsS;

		this.$tips = $(op['tmp']);	//弹框

		this.$content = this.$tips.find(this.optionsS['contentClass']);	//content的class

		this.$contentText = op['tmpContenttext'];	//文字内容

	};

	tips.prototype.init = function (){

		this.disposeEvent();

	}

	tips.prototype.disposeEvent = function (){

		var _target = $(this.optionsS['targetObj']),

			triggerEvent = this.optionsS.eventTrigger,

			status = this.optionsS.status,

			delegate = $(this.optionsS.delegate),

			_this = this;

			console.log(_target,triggerEvent,delegate)

		switch (triggerEvent) {

			case 'click' :

				delegate.on(triggerEvent,_target,function (){

					status ? _this.hide() : _this.show();

				});

			break;	

		};

	}

	tips.prototype.show = function () {				

		$('body').append(this.$tips); //展示的时候把tips的dom添加进去

		this.$tips.show().css('zIndex',this.optionsS['zIndex']);

		this.$content.css({				//为内容DOM设置宽高

			width : this.optionsS.contentCSS.width,

			height:this.optionsS.contentCSS.height

		});

		this.$content.html(this.$contentText);

		this.optionsS.status = 1;

		if(this.optionsS.ajax && typeof this.optionsS.ajax == 'function' ) {

			

		}
 
	}

	tips.prototype.hide = function (){



	}


})(jQuery)