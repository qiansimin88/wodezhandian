var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/hehe')

db.connection.on('error',function (){
	console.log('失败');
})

db.connection.on('open',function (){
	console.log('成功链接');
})


