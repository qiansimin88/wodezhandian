var mongoose = require('mongoose');
var config = require('../pathconfig');  //路径配置文件
mongoose.connect(config.dbUrl);  //连接数据库的地址 （这里要自己去开启服务器的mongodb命令是 mongod --dbpath=XXX  XXX代表data目录 可以自定义）
//创建数据库模型 Schema 有三个字段并且有着限制的格式 这里的user在mongodb里面是一个自定义集合
exports.User = mongoose.model('user',new mongoose.Schema({
    username:String,
    password:String,
    email:String
}));