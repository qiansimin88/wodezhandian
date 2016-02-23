/**
 * Created by Administrator on 2015/10/20.
 */
function Event(name){
    this.name = name;
    this._event = {};
}

//注册事件
Event.prototype.on =function(eventName,listener){
    if(this._event) {
        this._event[eventName].push(listener);  //已经绑定过的就push进数组
    }else {
        this._event[eventName] = [listener];
    }
}

//发射事件
Event.prototype.emit = function (eventName){
    for(var i=0;i<this._event[eventName].length;i++) {
        this._event[eventName][i].call(this);  //改变回调函数里面的上下文  因为回调函数有可能出现this 直接改变
    }
};


