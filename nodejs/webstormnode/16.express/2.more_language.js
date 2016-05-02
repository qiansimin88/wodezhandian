var express = require('express');


var serverStatic = require('serve-static'),
	url = require('url'),
	fs = require('fs');
var app = express();

// 客户端需要哪些语言
// 服务器有哪些语言
function checkLanguage(lans){
	var defaultLan = lans[0].toLowerCase();
	//闭包的写法 可以得到参数进行相应的配置 如果直接回调函数的写法就必须要传参才行了
	return function (req) {
		var acceptLans = req.headers['accept-language'];
	}
}

//检测浏览器语言 使用语言中间件 并提供可以提供的语言版本 
app.use(checkLanguage(''));


// 如何在node中实现多语言
// 通过检测浏览器的语言
// Accept-Language:zh-CN,zh;q=0.8,en;q=0.6
