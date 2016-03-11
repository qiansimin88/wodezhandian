/**
 * [description]
 * @Author   QSM
 * @DateTime 2016-03-08T14:44:00+0800
 * QQ:348867341
 * Demo ：
 * @参数animate的默认动画duration是500毫秒  如果在按钮回调函数内再次new Dialog的话  必须使用setTimeout(,500)来执行才可以
 */

"use strict";

(function (root,factory){
	//amd
	if (typeof define === 'function' && define.amd) {
		define(['$',factory]);
	} else if (typeof exports === 'object') {  //umd
		module.exports = factory($);
	} else {
		window.Dialog = factory(window.Zepto || window.jQuery || $);
	}	
})(window,function ($){

	$.fn.Dialog = function (setting){
		return $(this).each(function (i,o) {
			var defaultOption = $.extend({
					target:$(o)
				},setting || {});
			var dialog = new Dialog(setting).init();   //启动模块 
		});
	};

	function Dialog (options){
		this.settings = $.extend({
			type : 'alert',     //confirm可选
			zIndex :88,      
			mask:true,          //遮盖层可选  true || false
			time : false,       //定时关闭的功能  number || false/0
			containerBoxClassName:null,	//盒子的自定义class  默认无
			animate : true,       //动画过度效果
			title:'这是标题',	  //标题文字
			contentCurrentTMP:'<div id="custom">自定义的内容</div>',		  //自定义的内容
			height:null,      //自定义的高度
			width:null,		  //自定义的宽度
			btn:[],			  //自定义的按钮   key分别是yes no submit 对应是 否 提交
			btnTouchfn:null //自定义按钮点击的回调
		},options || {});
		this.mask = null;
		this.timer = null;
		this.ID = Math.random().toString().replace('.','').substr(0,3);			//唯一标识
		this.showed = false;      //刚开始的显示状态
	};

	Dialog.prototype = {
		contructor : Dialog,
		init : function () {
			this.mask = $('<div class="ui-dialog-mask"></div>');
			this.settings.mask ? $("body").append(this.mask) : null;    //添加遮盖层
			this.mask.css({
				zIndex:this.settings.zIndex-1
			});
			$('body').append('<div class="ui-dialog" id="' + this.ID + '"></div>');
			this.containerBox = $('#'+this.ID);    //获取这个盒子
			this.containerBox.css('zIndex',this.settings.zIndex);

			this.settings.containerBoxClassName ? this.containerBox.addClass(this.settings.containerBoxClassName) : null;   //如果有自定义的class就加上
			//启动
			this.show();
			return this;
		},
		dialogType:function () {
			var type = this.settings.type;
			var contentTMP = null;

			switch (type) {
				case 'alert' : 
						contentTMP = '<div class="ui-dialog-title">\
										<span class="ui-dialog-titleact">'+this.settings.title+'</span>\
										<span class="ui-dialog-close js-dialog-close" id="closeBtn">×</span>\
									 </div>\
									 <div id="dialog-content" style="">'+this.settings.contentCurrentTMP+'</div>';
					break;
			};
			return contentTMP;
		},
		bindEvent:function () {
			var _this = this;
			this.closeBtn.addEventListener('touchstart',function(){
				this.timer && clearInterval(this.timer);
				_this.hide();
			},false);

			$('.ui-btns-list>button').on('touchstart',function(e){
				var	type = $(this).data('type');
					_this.settings.btnTouchfn && _this.settings.btnTouchfn.call(_this,type);    //给回调函数传递当前对象		
			});
			this.containerBox.on('touchmove',function(e){
				e.stopPropagation();
			})	

		},
		hide:function (special) {
			var _this = this,
				time = this.settings.time;
			if(time && special) {
				this.timer = setTimeout(function () {
					hidemove(_this);
				},time)
			}else if (!special){
				hidemove(_this);
			};

			function hidemove (root) {
				if(root.settings.animate) {
					root.containerBox.removeClass('zoonIn').addClass('zoomOut');
					setTimeout(function(){
						root.containerBox.remove();
					},500);
					root.mask.remove();	
					root.showed=false;
				}else {
					root.containerBox.remove();
					root.mask.remove();	
					root.showed=false;
				};
			};
		},
		show:function () {
			var _this = this;
			this.showed = true;
			this.mask.show();
			this.containerBox.show().append(this.dialogType.call(this)).css({
				width:this.settings.width || document.documentElement.clientWidth
			});
			this.containerBox.find('#dialog-content').css('height',this.settings.height || '180px')
			this.closeBtn = $('#closeBtn').get(0);
			this.settings.animate ? this.containerBox.addClass('zoomIn').removeClass('zoomOut').addClass('animated') : null;

			this.setPosition();
			this.hide(1);
			(this.settings.btn.length > 0) && this.setProp();
			this.bindEvent(); 
		},
		setProp:function () {
			var btns = this.settings.btn,
				btnTMP = '<div class="ui-btns-list">';
				$.each(btns,function(i,o){
					if(o['yes']) {
						btnTMP+= '<button class="ui-confirm-yes ui-btns" data-type="yes">' + o.yes + '</button>'
					}else if (o['no']) {
						btnTMP+='<button class="ui-confirm-no ui-btns" data-type="no">' + o.no + '</button>'
					}else if(o['submit']){
						btnTMP+='<button class="ui-confirm-submit ui-btns" data-type="submit">' + o.submit + '</button>'
					}
				});
				btnTMP+= '</div>'
				this.containerBox.append(btnTMP);
		},
		setPosition:function () {
			if(this.showed) {   //如果是显示的状态
				this.clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
				this.clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

				var height = (this.containerBox.outerHeight() || this.containerBox.height());
				var width = this.settings.width || (this.containerBox.outerWidth() && this.containerBox.width());

				var setLeft = Math.max(0,(this.clientWidth - width)/2),			//防止用户输入过大的宽和高
					setTop = Math.max(0,(this.clientHeight - height)/2);
			
				this.containerBox.css({
					left:setLeft,
					top:setTop
				});
			};
		}
	};

	return Dialog;
});