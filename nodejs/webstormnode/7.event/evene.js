/**
 * Created by Administrator on 2015/10/20.
 */
function Event(name){
    this.name = name;
    this._event = {};
}

//注册事件
Event.prototype.on =function(eventName,listener){
    if(this._event[eventName]) {
        this._event[eventName].push(listener);  //已经绑定过的就push进数组
    }else {
        this._event[eventName] = [listener];
    }
}
 
//发射事件
Event.prototype.emit = function (eventName){

    var args = Array.prototype.slice.call(arguments,1);//取出形参第二个之后的所有参数 返回一个数组

    for(var i=0;i<this._event[eventName].length;i++) {
        this._event[eventName][i].apply(this,args);  //改变回调函数里面的上下文  因为回调函数有可能出现this 直接改变
    }
}; 

var button = new Event('hehe');

function show1 (demo) {
    console.log(this.name,'show1+',demo);
}

button.on('click',show1)


button.emit('click','haha');