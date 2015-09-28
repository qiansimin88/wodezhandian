
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: '首页' });
};

exports.user = function(req, res){
 
};

exports.post = function(req, res){
 
};

exports.reg = function(req, res){
 	res.render('reg',{title:'注册页面'});
};

exports.doReg = function(req, res){
 
};

exports.login = function(req, res){
 	res.render('login',{title:"登录页面"});
};

exports.doLogin = function(req, res){
 
};

exports.logout = function(req, res){
 
};