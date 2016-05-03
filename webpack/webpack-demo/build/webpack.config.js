var path = require('path');

module.export = {
	//入口文件
	entry : path.resolve(__dirname,'../src/main.js'), //绝对路径 
	output : {
		path: path.resolve(__dirname,'../dist/static'), //输出目录
		filename : '[name].bundle.js'
	}
	
}