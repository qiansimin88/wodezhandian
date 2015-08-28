var EventEmitter = require('events').EventEmitter;			//返回EventEmitter的类

var event = new EventEmitter;  //实例化这个对象

event.on('customEvent',function () {

	console.log('这是一个自定义事件');

});

setTimeout(function () {

	event.emit('customEvent');    //触发定义的事件

},3000);
