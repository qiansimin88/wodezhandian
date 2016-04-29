//1启用服务的话 安装  nom install -g webpack-dev-server 然后执行 webpack-dev-server --progress --colors 打开localhost:8080即可
//2 entry入口文件如果是对象的多入口文件的模式  那么 output写成[name].js就可以生成相应的文件了
var webpack = require('webpack')
var path = require('path')

module.exports = {
	entry : {
		entry : './entry.js',
		jquery: path.resolve(__dirname,'./lib/jquery.js'),
		boostrap : path.resolve(__dirname,'./lib/boostrap.js')
	},
	output : {				
		path : path.resolve(__dirname,'./dist/'),
		filename:'bundle[name].js'
	},
	module : {			//loader的模块集合
		loaders : [
			{
				test : /\.css$/,loader: 'style!css'
			}
		]
	},
	//可以省略后缀名
	resolve: {
    	extensions: ['', '.js', '.jsx']
  	},
	plugins : [     //数组形式的插件集合	  
		//为输出的文件头部加上自定义的注释
		new webpack.BannerPlugin('这是钱思敏的webpack练手项目通过插件BannerPlugin做到的'),
		//提取公共的文件
		new webpack.optimize.CommonsChunkPlugin({
			name : ['jquery','boostrap'],  //公共模块提取
			minChunks : Infinity  //提取所有entyr共同依赖的模块
		})    
	]
}