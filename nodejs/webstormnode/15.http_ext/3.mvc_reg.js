// 如何实现自动配置
// 实现一个路由，然后程序根据路由来进行跳转
var url = require('url');
var http = require('http');
//路由映射
var routers = [];
function add (req,res) {
	res.end('add');
}

function use(path,action){
	routers.push([path,action]);	
}
// /user/qiansimin/6 
use('/user/:username/:age',add)
http.createServer(function (req,res){
	var pathname = url.parse(req.url).pathname;
	for(var i=0;i<routers.length;i++) {
		var router = routers[i];
		if(pathname == router[0]){  
			var action = router[1];
			action(req,res);
			return;
		}
	}
	res.end('404')
}).listen(8080)