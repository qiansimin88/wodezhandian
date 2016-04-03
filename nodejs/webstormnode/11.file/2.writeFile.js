var fs = require('fs')

/*
path, data, options, callback

	flag 是权限值
	a  追加
	w  创建并写
	r+	
 */

fs.writeFile('./write.text','第一行',{flag:'w',encoding:'utf8'},function (err,data){
	if(err) {
		console.error(err);
	}
	console.log('写入成功');
});

/*
	appendFile 追加 文件
 */

fs.appendFile('./write.text',new Buffer('第二行'));

/*
	base64 
	
 */

fs.readFile('1.jpg', "base64", function (err,data) {
	console.log(data);
});