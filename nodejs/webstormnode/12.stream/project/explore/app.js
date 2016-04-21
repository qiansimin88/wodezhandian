//命令行程序

/*
	1.程序启动时显示当前目录下的所有文件和文件夹
	2.选择文件，显示文件内容
	3.选择目录，显示目录下的文件或文件夹
	4.选择之后退出程序
 */

/*
	1.读文件
	2.判断是文件还是目录
	3.读取文件内容
	4.读取用户输入
 */

var fs = require('fs');
var stdin = process.stdin;
var stdout = process.stdout;
var path = require('path');

/*
	获取当前目录
	__dirname
	process.cwd();
	path.resovle;
 */

fs.readdir(process.cwd(),function (err,files) {
	// console.log(process.cwd());
	console.log('');
	if(!files.length) {
		return console.log('没发现当前目录有任何文件');
	}
	// console.log(files); //[ 'app.js', 'dir', 'index.js' ]  是个数组
	var stats = {};
	showFile(0);  	
// 0app.js
// 1dir
// 2index.js

	function showFile(i) {
		var filename = files[i];
		fs.stat(path.join(process.cwd(),filename),function (er,stat){
			stats[i] = stat
			//如果是文件目录
			if(stat.isDirectory()){
				console.log(''+i+''+filename);
			}else {
				console.log(''+i+''+filename);
			}

			i++;

			if(i == files.length) {	//所有都遍历完了
				readChoice();  //读取用户输入的选项
			}else {
				showFile(i)		//递归
			};

			function readChoice(){
				console.log('');
				stdout.write('请输入你的选择');
				stdin.resume(); //可以接受用户输入
				stdin.setEncoding('utf-8');
				stdin.on('data',onData)
			}

			function onData(data){
				var index= Number(data);
				var stat = stats[index];
				if(!stat){
					stdout.write('请输入正确的选择');
				}else {
					if(stat.isDirectory()){
						fs.readdir(path.join(process.cwd(),files[index]), function(subFiles){
							console.log('');
							console.log('('+subFiles.length+')');
							subFiles.forEach(function(subFile){
								console.log(subFile);
								process.exit(0);  //退出
							})
						});
					}else {
						fs.readFile(path.join(process.cwd(),files[index]),'utf8', function (err,data){
							console.log('');
							console.log(data);
							process.exit(0);  //退出
						});
					}
				}
			}
		})
	}
})

