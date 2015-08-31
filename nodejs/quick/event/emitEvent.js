var eventEmitter = require('events').EventEmitter;

var eventEmitter = new eventEmitter;  //实例化

eventEmitter.on('eventTrigger',function (a1,a2) {

	console.log('event1',a1,a2);

})

eventEmitter.on('eventTrigger',function (a1,a2) {

	console.log('event2',a1,a2);

})

eventEmitter.emit('eventTrigger','qsm','cao');  //事件名  回调的参数    //可以执行多个相同的事件函数