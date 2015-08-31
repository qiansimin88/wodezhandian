/**
 * [------------------关键字匹配插件(前提是本地已经有了数据)----------------------]
 * @Author   QSM
 * @DateTime 2015-08-31T17:24:44+0800
 * QQ:348867341
 * Demo ：http://www.liuband.com/mall.php/fang/apartment/apart
 * @param    {[type]}                 require [description]
 * @param    {[type]}                 exports [description]
 * @param    {[type]}                 module) {	return     function      ($)           {		$.fn.keywordsearch [description]
 * @param    {keywordsearch}          arg     ||            {});				var initProgramme [description]
 * @param    {[type]}                 arg     ||            {});			var  config        [description]
 * @return   {[type]}                         [description]
 */
define(function (require,exports,module) {
	return function ($) {
		$.fn.keywordsearch = function (arg){
			return $(this).each(function (i,o) {
				var _this = $(o),
					option = $.extend({
						target : _this
					},arg || {});

				var initProgramme = new keywordsearch(option).init();
			});
		};	

		//构造函数
		function keywordsearch (arg){
			this.op = $.extend({
				target : $('.keyWord'),				//输入框
				controllerDom:$('.cityUl'),			//控制的列表的选择器
				textDom:'a'                         //拥有文字信息的子元素的标签名
			},arg || {});

			var config = this.op;
			this.target = config.target;
			this.controllerDom=config.controllerDom;
			this.controllerDomList = this.controllerDom.children();
			this.textDom = config.textDom;
			this.matchHtml = '';
			this.listArray = [];
		};

		keywordsearch.prototype.init = function () {
			this.originalHtml = this.controllerDom.html();
			this.allInfo();
			this.eventFun();
		};

		keywordsearch.prototype.eventFun = function (){
			var _this = this;
			this.target.on('keyup',function () {
				var nowValue = $(this).val();
				_this.matchHtml='';
				_this.choose(nowValue);
			});
		};

		keywordsearch.prototype.choose = function (v) {
			var v = $.trim(v),
				reg = new RegExp(v,'i'),
				_this = this;
			this.status = 0;
			if(v == '' || v == 'undefined') {
				this.controllerDom.html(this.originalHtml);
			}
			$.each(this.listArray,function (i,o) {
				if(reg.test(o)) {
					_this.matchHtml+='<li>'+_this.controllerDomList.eq(i).html()+'</li>';
					_this.status=1;
				}
			});
		
			if(!this.status) {
				_this.matchHtml=('<li><a href="javascript:void(0);">没有查询到相应城市</a></li>')
			}
			this.controllerDom.html(this.matchHtml);
		};

		keywordsearch.prototype.allInfo = function () {
			var _this = this;
			this.controllerDomList.each(function (i,o) {
				var hasInfoDom = $(o).find(_this.textDom);
					_this.listArray.push(hasInfoDom.text());
			});
		};
	};
});