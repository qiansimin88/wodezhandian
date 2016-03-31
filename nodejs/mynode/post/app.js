//创建一个http服务器
//cnpm supervisor 来动态管理服务器的变化  supervisor XXX.js动态监视
var http = require('http');
var qs = require('querystring');

	http.createServer(function (req,res) {
	
		var path = req.url,
			method = req.method.toLowerCase();  

		res.writeHead(200,{'Content-Type':'text/html'});

		routerHandle(path,method,req,res);

	}).listen(4000);


function routerHandle(path,method,req,res) {

	var postDate = null,
		returnDate = null;

	req.setEncoding('utf8')	//设置编码

	if( path == '/login' && method == 'post' ) {

		req.addListener( 'data',function (data) {			//request有个两个方法  1.data接受数据 2.end接受结束
			postDate += data;   //把请求到的数据赋值给变量	必须+=因为接受的参数有很多内部肯定做了循环机制	
		})

		req.addListener( 'end',function () { //接受完成
			returnDate = JSON.stringify(qs.parse(postDate));  //把用户post请求的键值对字符串化 返回
			// return returnDate;	//因为是异步的所以这里return 是没有效果的必须直接操作
			res.write(returnDate);
			res.end();

		})
	}else {

		res.write('other');
		res.end();

	}

}	


