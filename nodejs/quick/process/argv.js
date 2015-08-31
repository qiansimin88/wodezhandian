// 一个包含命令行(在命令行执行该文件 后面跟的 参数 如 node argv.js  'demo1' 'demo2' 'demo3' 'demo4';)参数的数组。第一个元素会是 'node'， 第二个元素将是 .Js 文件的名称。接下来的元素依次是命令行传入的参数。
process.argv.forEach(function (val,index,array) {
	console.log(index+':'+val);
});
console.log(process.argv.constructor == Array);  //是个数组

// 0:c:\Program Files\nodejs\node.exe				node
// 1:e:\wodezhandian\nodejs\quick\process\argv.js   文件路径
// 2:demo1											依次参数
// 3:demo2
// 4:demo3
// 5:demo4
