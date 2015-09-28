/**
 * Created by Administrator on 2015/9/25.
 */
//创建一个http服务器
//cnpm supervisor 来动态管理服务器的变化  supervisor XXX.js动态监视
var http = require('http');
var fs = require('fs');  //文件系统
http.createServer(function (req,res) {

    var url = req.url;
    var urls = url.split("?");
    var pathName = urls[0];
    var query = urls[1];
    if(pathName == '/index.html') {
        var content = fs.readFileSync('./index.html');  //读取文件然后返回给客户端
        res.end(content);
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