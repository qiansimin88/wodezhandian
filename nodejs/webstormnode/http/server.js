/**
 * Created by Administrator on 2015/9/25.
 */
//创建一个http服务器
//cnpm supervisor 来动态管理服务器的变化  supervisor XXX.js动态监视
var http = require('http');
var fs = require('fs');  //文件系统
var mime = require('mime');  //mime第三方模块  快速自动替换文件头类型
http.createServer(function (req,res) {

    var url = req.url;
    var urls = url.split("?");
    var pathName = urls[0];
    var query = urls[1];
    if(pathName == '/index.html') {
        var content = fs.readFileSync('./index.html');  //读取文件然后返回给客户端
        res.end(content.toString().replace("<%= type %>",query.split('=')[1]));
    }else if (pathName == '/style.css') {
        //res.setHeader('Content-Type','text/css'); //设置mIME的类型
        res.setHeader('Content-Type',mime.lookup(pathName));
        var content2 = fs.readFileSync('./style.css');
        res.end(content2)
    }else if (pathName == '/hehe.jpg') {
        res.setHeader('Content-Type','image/jpg'); //设置mIME的类型
        var content2 = fs.readFileSync('./hehe.jpg');
        res.end(content2)
    }else {
        res.end('404');
    }
    //res.writeHead(200,{'Content-Type':'text/html'});
    //
    //res.write('hello world!');
    //
    //res.end('123');

}).listen(5000);

console.log('success server;');