var express = require('express');
var modules = require('../models');  //引入mongoose的schoma模型
var util = require('../util');  //引入工具函数
//路由的实例
var router = express.Router();

/* GET users listing. */
//二级路由的匹配

//注册
router.get('/reg', function(req, res, next) {
  res.render('user/reg', {
  		title : "注册"
  });
});

//注册post请求处理
router.post('/reg', function(req, res, next) {
  //保存对象有两种 model.create entity.save
  var user = req.body;  //得到的请求体
  console.log('请求体是:'+user);
  if(user.password != user.repassword){
    res.redirect('back');  //res.redirect是重定向back是express提供的返回上一级
  }else{
  	console.log(1);
    req.body.password = util.md5(req.body.password);  //密码MD5化
    console.log(2);
    models.User.create(req.body,function(err,doc){		//模型的create方法插入数据  数据就是请求体
      console.log('插入的数据是：'+doc);		//插入的数据
      res.redirect('/users/login');// 注册成功跳到 登录页  然后 登录
    });
  }

});

//登陆
router.get('/login', function(req, res, next) {
  res.render('user/login', { title: '登陆' });
});


// //退出
// router.get('/logout', function(req, res, next) {
//   res.render('index', {
//   		title : "退出"
//   });
// });


module.exports = router;
