// MVC如何实现的
// 控制器C
// 1.自然约定 无路由
// 2.手工指定

var http  = require('http');
var url = require('url');
// localhost:8080/user/add
// localhost:8080/user/deleted
http.createServer(function (req,res){

	var handle = {
		user : {
			add : function (req,res,username,age){
				res.end('add')
			},
			delete : function (req,res,id) {
				res.end('delete '+id)
			}
		}
	}

	var pathname = url.parse(req.url).pathname;  
	console.log(pathname);
	var paths = pathname.split('/');
	var controller = paths[1];  //得到控制器实体
	var handleer = paths[2];	//得到操作方法
	var args = paths.slice(3);  
	if(handle[controller] && handle[controller][handleer]){
		handle[controller][handleer](req,res)
	}else {
		res.end('404')
	}
}).listen(8082)