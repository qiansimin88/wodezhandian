//图片预加载的实现  可以通过onProgress(currentIndex,total)来实现一些功能 比如网页进度条      currentIndex:加载到第几个了  total：总共有多少个图片  
//有疑问请联系我 qq:348867341
;(function (root,factory) {
	//amd require
	if(typeof define === 'function' && define.amd ) {

		define(factory)
	//cmd node || sea
	}else if (typeof exports === 'object')  {

		 module.exports = factory();  //暴露这个回调

	}else {
		//如果是浏览器 就暴露一个window全局作用域的方法吧 - -! 
		root.progress = factory(root);

	}

}(this,function () {

	function isFun (f) {return typeof f ==='function'};

	function progress (config) {

		this.opt = {

			resourceType : 'image' ,    //资源类型

			baseUrl : './' ,           //默认同目录

			resourceArr : [] ,         //咱把所有的图片放到这个数组好不好 - -！

			onStart : null,            //开始的回调

			onProgress : null,         //加载的回调  https努力请求中

			onCompete : null           //加载完毕的回调函数

		};


		if(config) {

			for(i in config) {

				this.opt[i] = config[i]

			};

		}else {

			alert('好歹填个参数喂！- -!');

			return;

		};

		//定义一些构造函数的属性

		this.total = this.opt['resourceArr'].length;

		this.currentIndex = 0;

		this.status = 0 ;    //方法的状态   0   还没开始执行  1开始执行 2网页请求结束

	};


	//启动
	progress.prototype.start = function () {

		//改变状态

		this.status = 1;

		var _this = this;

			if(!_this.total) {

				alert('一个图片都没得！');

				return

			};

		for(var i=0;i<_this.total;i++) {

			var tempUrl = _this.opt.resourceArr[i],

				lastUrl = '';

				//如果是绝对路径
				if(tempUrl.indexOf('http://') ==0 || tempUrl.indexOf('https://') ==0 ) {

					lastUrl = tempUrl	

				}else {

					//相对路径
					lastUrl = _this.opt.baseUrl+tempUrl;

				};

			var image = new Image();

				image.onload = _this.load.call(_this);			//每次执行 全局的currentIndex都会增加

				image.onerror = _this.error.call(_this);

				image.src= lastUrl;

		};

		//开启开始回调
		if(isFun(_this.opt.onStart)) {

			_this.opt.onStart(this.total);

		}

	}; 

	progress.prototype.load = function () {

		var _this = this;

		if(isFun(_this.opt.onProgress)) {

			_this.opt.onProgress(++_this.currentIndex,_this.total);

		}

		if(_this.currentIndex == _this.total) {

			this.status = 2;  //加载完了

			if(isFun(_this.opt.onCompete)) {

				_this.opt.onCompete(_this.total);

			}

		}

	};

	progress.prototype.error = function () {

		console.log('请求失败了？')

	}


	return progress //暴露出去

}));