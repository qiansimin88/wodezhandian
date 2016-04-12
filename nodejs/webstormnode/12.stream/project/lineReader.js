//换行读文本
var fs = require('fs');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var RETURN = 0x0d;//回车 \n
var NEWLINE = 0x0a; //换行 \r
util.inherits(LineReader,EventEmitter);  //继承EventEmitter的方法

function LineReader (path) {
	this._fs = fs.createReadStream(path);
}

//LineReader的on方法 和监听的 newListener 都是继承eventEmitter的源码
LineReader.prototype.on('newListener',function(ev,fn){
	if(ev == 'newLine') {
		var line = [];
		var _this = this;
		//监听readable
		this._fs.on('readable',function (){
			var buff ;
			//这里的this 质的是读取的流   read返回null就是读不到任何东西了
			while((buff = this.read(1)) != null ) {
				if(buff[0] == RETURN) {		//Buff是一个数组 因为每次只读取一个字节 所以[0]就代表现在 所以[0]==回车 那么 就继续读下一个字节并且触发事件
					this.read(1);
					_this.emit('newLine',Buffer.concat(line).toString())
					line = []; //清空
				}else {					//如果不是回车 肯定是文本内容 那么存入数组 等待回车回调
					line.push(buff)
				}
			}

		});
		this._fs.on('end',function (){
			_this.emit('newLine',Buffer.concat(line).toString())
			_this.emit('end')
		})
	}
})

var reader = new LineReader('./pwd.txt'); 


//监听两个事件
reader.on('newLine',function (data) {
	console.log(data);
});

reader.on('end',function () {
	console.log('end');
})