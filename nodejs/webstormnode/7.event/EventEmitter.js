// addListener 绑定
// on  绑定
// onece 触发一次
// removedListener()  //移除某个监听
// emit(event,param...)   第一个参数是事件  后面的参数可以传给 on绑定 事件的回调函数的参数


var EventEmitter = require('events').EventEmitter;

var eventList = new EventEmitter();

//注册事件
eventList.on('hungry',function () {
    console.log('21');
});

//触发一次就解绑
eventList.once('love',function (){
    console.log('呵呵');
});

//移除所有监听
// eventList.removeAllListeners();
 
//触发事件
eventList.emit( 'hungry');      
eventList.emit('love');

//查看某个事件有几个监听函数   数组形式  [ [Function] ]
console.log(eventList.listeners("hungry"));
