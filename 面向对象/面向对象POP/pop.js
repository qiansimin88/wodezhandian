
/*
 *		author : qiansimin 2014.12.10 
 */

(function (root,factory){
	//支持cmd 
	if(typeof define === 'function' && (define.amd || define.cmd)) {
		define(function (exports){
			return factory(root,exports);
		})
	}else {
		root.Slide = factory(root,{});
	}
	
})(this,function (root,pop){
		"use strict";
		var pop = function (opts){
			this._opts = opts;
			this.setting();
		};
		
		//初始化
		pop.prototype.setting = function (){
			//内容参数
			var _this = this,
				opts = this._opts || {},
				$ = root.$ || root.jQuery || root.Zepto;
				this.type = opts.type || 'alert';
				this.content = opts.content || '';
				this.callback = opts.callback || '';
				
			//相关class参数	
			 this.class = {
				mask : opts.clsMask || '#pop-mas',
				con : opts.clsCon || '#pop-content',
				closeBt:opts.closeBt || '#pop-close',
				zoomIn :opts.zoomIn || '.zoomIn',
				zoomOut:opts.zoomOut || 'zoomOut'
			};
			
			//事件
			 this.touch = {
				tap : ($ && $.fn && $.fn.tap) ? 'tap' : 'click' 
			};
			
			//事件集合
			this.event = {
				//创建蒙板
				addMask : function () {
					var masklayer = document.createElement('div');
					
					//给蒙板添加class或者ID
					var nowID = _this.class.mask.slice(0,1);
					switch(nowID) {
						case '.' :
							 masklayer.setAttribute('class',_this.class.mask.slice(1));
							 break;
						case '#' : 
							masklayer.setAttribute('id',_this.class.mask.slice(1));
							break;
					};
					
					document.getElementsByName('head')[0].appendChild(masklayer);
					
					//返回这个创建的mask的dom
					return masklayer;
				},
				//创建弹框容器
				addBoxdom : function () {
					var box = document.createElement('div'),
					contentBox =document.createElement('div'),
						nowID = _this.class.mask.slice(0,1);
						
						switch(nowID) {
							case '.' : 
								box.setAttribute('class',_this.class.con.slice(1));
								break;
							case '#' : 
								box.setAttribute('id',_this.class.con.slice(1));
								break;
						};
					contentBox.attribute('class','content');	
					box.appendChild(contentBox);
					document.getElementsByName('head')[0].appendChild(box);
					
					return box;
				},
				//创建关闭按钮
				closeBtn : function () {
					var closeBtn = document.createElement('a'),
						nowId = _this.class.closeBt.slice(0,1);
					
					switch(nowId) {
						case '.' :
							closeBtn.setAttribute('class',_this.class.closeBt.slice(1));
							break;
						case '#':
							closeBtn.setAttribute('id',_this.class.closeBt.slice(1));
							break;
					};
					
					closeBtn.setAttribute('href','javascript:void(0)');
					return closeBtn;
				},
				//创建关闭DOM操作
				eventClose : function (isAnimationClose) {
					var closeBt = document.querySelector(_this.class.closeBt),
						popDom = document.querySelector(_this.class.con),
						maskLayer = document.querySelector(_this.class.mask);
						
						closeBt && closeBt.removeEventListener(_this.event.tap,_this.eventClose,false);
					//如果为true  那么就直接删除dom 而不添加动画效果
					if(isAnimationClose == true) {
						popDom.remove();
						maskLayer.remove();
						return;
					};
					
					popDom.classList.remove(_this.class.zoomIn.slice(1));
					popDom.classList.add(_this.class.zoomOut.slice(1));
					
					//添加一个动画结束回调
					function destroy () {
						popDom.removeEventListener('webkitAnimationEnd',destroy);
						//如果是alert加个回调
						if(_this.type == 'alert' && callback) {
							callback();
						};
						
						popDom.remove();
						maskLayer.remove();
					};
					
					popDom.addEventListener('webkitAnimationEnd',destroy);
				}
			};
		};
		
		//主逻辑
		pop.prototype.pop = function (popval){
			//缓存变量
			var mask = null,
				box = null,
				closeBt = null,
				_this = this;
			//判断类型
			switch (this.type) {
				case 'alert' :
					mask = _this.event.	addMask();
					box = _this.event.addBoxdom();
					closeBt = _this.event.closeBtn();
					box.style['padding'] = 10+'px';
					box.getElementsByTagName('content')[0].innerHTML =  popval || _this.content;
					closeBt.addEventListener(_this.event.tap,_this.eventClose,false);
			}
		}
		return pop;
})
