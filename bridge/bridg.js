
// Bridge({
// 	methodName : 'gethehe'
// })


function Bridge (params) {
	this.tools = {
		ua :  navigator.userAgent,
		isIOS : function () {	
			return /iphone|ipad|/i.test(this.ua); 
		},
		isANDROID : function () {
			return /android/i.test(this.ua);
		}
	};
	// 3dker://wireless/api/getData?callback=foo
	this.url = '3dker://wireless/api/';	
	this.Init(params);  //初始化运行
}

Bridge.prototype.Init = function (p) {
	console.log(this.handleURL(p));
}

//通过参数来获得最终的URL
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
		window.location.href = url
	}else if(this.tools.isANDROID) {
		//明天补iframe的代码
	}
}



