var express = require('express');
var app = express();
var session = require('express-session');

app.use(session({
	resave:true,	
	saveUninitialized:true,	//保存未修改过的session
	secret:'qsm'  //加密的密钥
}));

app.get('',function () {
	var isLogin = req.session.isLogin;
	if(isLogin) {
		res.send('老朋友')

	}else {
		req.session.isLogin = 'true';
		res.send('新朋友')
	}
})；

app.listen(8080)