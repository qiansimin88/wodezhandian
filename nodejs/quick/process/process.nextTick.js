process.nextTick(function () {			//接受一个匿名函数
	console.log(1);			//异步执行
});
console.log(0,process.pid,process.versions);
