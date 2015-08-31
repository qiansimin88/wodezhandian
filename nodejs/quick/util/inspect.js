//多功能打印对象成字符串
var util = require('util');

var jsonFile = {
	"name":"QSM",
	"date": new Date() - 0,
	'isTrue':function () {
		return this.name ? true : false;	
	},
	'Arrshow':[
		{'1':'show'},
		{'2':'now'}
	] 
};

console.log(util.inspect(jsonFile,true,null,true));  //返回一个对象的字符串表现形式, 在代码调试的时候非常有用.

// 参数可选项
// showHidden - 如果设为 true，那么该对象的不可枚举的属性将会被显示出来。默认为false.
// depth - 告诉 inspect 格式化对象的时候递归多少次。这个选项在格式化复杂对象的时候比较有用。 默认为 2。如果想无穷递归下去，则赋值为null即可。
// colors - 如果设为true，将会以ANSI颜色代码风格进行输出. 默认是false。颜色是可定制的，请看下面：