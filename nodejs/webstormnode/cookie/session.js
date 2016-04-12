/**
 * session 会话
 * 进行会话跟踪的，数据存放在服务器端
 *
 */
var http = require('http');
var url = require('url');
var parse = require('./parse.js')
var cookieUtils = require('./cookieUtils.js');
var SESSION_KEY = 'isVIP';
var EXPIRE_TIME = 1000*10;  //过期时间
var Session = {};
http.createServer(function (req,res){
	parse(req);
	var nowTime = Date.now();  //等于 (new Date()).getTime();  当前时间
	if(req.pathname == '/favicon.ico') {
		res.end('404')
	}else {
		console.log(req.cookie);
		var cookieObj = cookieUtils.parse(req.cookie);
		if(cookieObj[SESSION_KEY]) { // {xx:xx;hh:hh}  判断客户端的request请求headers当中是否有这个cookie字段
			var getCookieSessionId = cookieObj[SESSION_KEY];  //得到客户端的传上来的sessionid
			if(Session[getCookieSessionId]) {  //如果客户端的ID在 服务端也能通过的话 说明合法

			}else {
				
			}
		}else {   //没有说明从未添加过session的ID  第一次访问这个网站 就生成session key 和 ID
			var SessionObj  = {money:100,expTime:new Date(nowTime+EXPIRE_TIME)};
			var Session_ID = nowTime+Math.random();  //创建一个KEY形式的ID
			Session[Session_ID] = SessionObj;
			res.writeHead(200,{"Content-type":"text/html;charset=utf8",
				'Set-Cookie':cookieUtils.serialize(SESSION_KEY,Session_ID)
			});

			res.end('欢迎你 新朋友');
		}
	}
}).listen(5656)

