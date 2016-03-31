var http = require('http'),
	sys = require('sys'),		//内置模块
	formidable = require("../../../node_modules/formidable");		//上传模块

http.createServer(function (req,res) {

	res.writeHead(200,{'Content-type':'text/plain'});
	if( req.url == '/upload' && req.method.toLowerCase() == 'post') {

		handleUpload(req,res);

	}else {

		res.write('index');
		res.end('');

	}

}).listen(3000);

/**
 * 处理图片上传
 * @return {[type]} [description]
 */
function handleUpload (req,res) {
	var url = req.url;
	var form = new formidable.IncomingForm();
	form.parse( req,function ( err , fileds , file) {
		var imgsrc= sys.inspect({
			files : file
		});
		res.write(imgsrc);
		res.end( )
	})	
}