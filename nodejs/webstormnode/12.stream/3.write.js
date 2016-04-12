var fs = require('fs');

//写入流
var out = fs.createWriteStream('test.txt');
var flag = null;
for(var i=0;i<10000;i++) {
	 flag = out.write(i.toString());   //返回是否成功IO写入的布尔值  false意味着没写完  放进缓存区中了
	 console.log(flag);
}


//缓存区全部输出硬盘 执行drain
out.on('drain',function () {
	console.log('缓存区中的数据全部输出');
})

//出错触发
out.on('error',function (err){
	console.log(err);
});

out.write('123');
out.end('123');   