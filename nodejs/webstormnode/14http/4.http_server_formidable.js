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
var formidable = require('formidable');
server.on('request',function(req,res){
    //   /post?name=zfpx&age=6
    var urlObj = url.parse(req.url,false);
    var pathname = urlObj.pathname;
    //req.setEncoding('utf8');
    if(pathname == '/'){
        fs.createReadStream('./index.html').pipe(res);
    }else if(pathname == '/get'){
        // /get?username=zfxp&email=zfpx%40126.com
        var obj = querystring.parse(urlObj.query);
        res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
        res.end(JSON.stringify(obj));
    } else if(pathname == '/file'){
        //req.pipe(fs.createWriteStream('./form.txt'));
         var form = new formidable.IncomingForm();
        form.parse(req,function(err,fields,files){  //fields表单之类的  files文件之类的
            console.log(files)
            fs.createReadStream(files.avta.path).pipe(fs.createWriteStream(files.avta.name));  //改写路径
            res.setHeader('Content-Type','text/html')
            res.write('< h1>'+fields.username+'</h1>');
            res.write('<h1>'+fields.email+'</h1>');
            res.write('<img src="'+files['avta'].name+'"/>');
            res.end();
        });

    }else{
        res.end('404');
    }
});


server.listen(7537);