
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'qiansimin' });
};

exports.time = function(req, res){
  res.send('now time is :'+new Date().toString());   //res.send 直接输出
};