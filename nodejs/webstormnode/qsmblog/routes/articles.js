var express = require('express');
//路由的实例
var router = express.Router();

/* GET users listing. */
//二级路由的匹配  文章发表
router.get('/post', function(req, res, next) {
  res.render('index',{
  		title : "发表文章"
  });
});
// //注册
// router.get('/reg', function(req, res, next) {
//   res.render('');
// });

module.exports = router;