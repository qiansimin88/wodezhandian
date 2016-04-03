  var fs = require('fs');

// 创建文件夹
  // fs.mkdir('./hehe',function (err) {
  // 		if(err) {
  // 			console.log(err);
  // 		}else {
  // 			console.log('创建成功');
  // 		}
  // });

 //读取文件夹
 fs.readdir('hehe', function(err,file){
 	if(err) {
 		console.error(err);
 	}else {
 		console.log(file);
 	}
 });


 /*
 	查看文件或目录的信息
 	size 
 	atime 最后访问时间
 	mtime  最后修改时间
 	ctime  创建时间
  	birthtime 出生时间
  */
 fs.stat('hehe', function (err,stat){
 	console.log(stat);
 });

//*判断一个文件或目录是否存在
 fs.exists('hehe',function(exists){
 	console.log(exists);   //true
 }); 

 //从相对路径得到绝对路径
 fs.realpath('hehe',function (err,path){
 	console.log(path);
 });

/*
	修改目录的访问时间和最后修改时间
 */
fs.utimesSync('./hehe', new Date(),new Date());


/*
	修改目录权限
	0600 自己读写
 */
fs.chmodSync('./hehe', 0600,function(){

});

/*
	修改文件名称
 */
fs.renameSync("./hehe","./hehe");

/*
	删除目录
 */
fs.rmdir('./jaja/a')