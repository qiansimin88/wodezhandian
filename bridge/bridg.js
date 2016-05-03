
;(function (window) {

	function Bridge (params) {
		this.tools = {
			ua :  navigator.userAgent,
			isIOS : function () {	
				return !!/ipad|iphone|osx/i.exec(this.ua);
			},
			isANDROID : function () {
				return !!/android|linux/i.exec(this.ua);
			}
		};
		this.url = 'sn3dker://wireless/api/';	   //3dker的初始协议
		this.Init(params);  //初始化运行
	}

	Bridge.prototype.Init = function (p) {
		console.log(this.handleURL(p))
	}

	//通过参数来获得最终的URL  返回 
	Bridge.prototype.handleURL = function (params) {
		var url = this.url,
			MN = params.methodName;   //方法字段
			url += MN + '?t='+ Number(new Date()); //时间戳

		if(params.callback) {
			url += '&callback=' + params.callback;
		}

		if(params.param) {
			var param = typeof params.param === 'Object' ? JSON.stringify(params.param) : params.param;
			url += '&param=' + encodeURIComponent(param)
		}
		return url;	
	}

	//设置window对象上的回调 方便native返回数据的处理和计算
	Bridge.prototype.setCallback = function () {

	}

	//最终的前端跳转
	Bridge.prototype.URLchange = function (params) {
		var url = this.handleURL(params)
		if(this.tools.isIOS) {
			this.androidUrlLoad(url)
		}else if(this.tools.isANDROID) {
			this.androidUrlLoad(url)
		}
	}	
	//安卓的请求函数
	Bridge.prototype.androidUrlLoad = function (url) {
		var iframe = document.createElement("iframe"),
            cont = document.body || document.documentElement;

        iframe.style.display = "none";
        iframe.setAttribute('src', url);
        cont.appendChild(iframe);
        setTimeout(function(){
            iframe.parentNode.removeChild(iframe);
            iframe = null;
        }, 200);
	}

	var bridge = function (pa) {
		return new Bridge(pa);
	};
	console.log(new Bridge({methodName:'qweqwe',callback:'haha',param : {
		user :'qians',
		age : "20"
	}}));
	//全局注册
	window.bridge = bridge;

})(window)



