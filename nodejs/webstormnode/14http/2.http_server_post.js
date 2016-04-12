/**
 * HTTP 超文本传输协议
 * 资源是通过 URL来标识
 * 请求和响应由报文组成
 **/

var http = require('http');
var server = http.createServer();
var url = require('url');
var util = require('util');
var fs = require('fs');
var querystring = require('querystring');  //获取search部分
server.on('request',function(req,res){
    //   /post?name=zfpx&age=6
    var urlObj = url.parse(req.url,false);
    var pathname = urlObj.pathname;
    console.log(pathname);
    req.setEncoding('utf8');  //设置编码
    if(pathname == '/'){
        fs.createReadStream('./index.html').pipe(res);
    }else if(pathname == '/get'){
    	// res.end('get')
        // /get?username=zfxp&email=zfpx%40126.com
        var obj = querystring.parse(urlObj.query);
      
        res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
        res.end(JSON.stringify(obj));
    } else if(pathname == '/post'){
        var result = '';
        req.on('data',function (chunk) {
            result+= chunk;   //把请求流转化成字符串
        })
        req.on('end',function (){
            var obj = querystring.parse(result);
            res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
            res.end(JSON.stringify(obj));
        })
    }else{
        res.end('404');
    }
});


server.listen(3456);