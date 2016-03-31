
var EventEmitter = require('events').EventEmitter,			//获取Event下面的Emitter的类
	emitter = new EventEmitter();  //实例化这个类
	

	emitter.on('hehe',function () {		//监听事件
		console.log('123');
	})

	process.nextTick( function () {

		emitter.emit('hehe');    //触发事件

	});

	console.log('haha');

