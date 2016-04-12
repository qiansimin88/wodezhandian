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
var querystring = require('querystring');
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
        var buffers = [];
        req.on('data',function(chunk){
            buffers.push(chunk);
        });
        req.on('end',function(){
          var final = Buffer.concat(buffers);
            console.log(final);
          var status = 'SEP';
          var sep = [];//分隔符
          var field = [];//当前字段
          var value = [];//存放当前value值
          var body = {};
          for(var i=0;i<final.length;i++){
              if(final[i]==0x0d&&final[i+1]==0x0a){
                  if(status == 'SEP'){
                      i++;
                      status = 'FIELD';
                  }else if(status == 'FIELD'){
                      i+=3;
                      status = "VALUE";
                  }else if(status == "VALUE"){
                      var fieldname = /name="(\w+)"/.exec(new Buffer(field).toString())[1];
                      body[fieldname]= new Buffer(value).toString();
                      i++;
                      status = 'SEP';
                      sep.length = 0;
                      field.length =0;
                      value.length = 0;
                  }
              }else{
                  if(status == 'SEP'){
                      sep.push(final[i]);
                  }else if(status == 'FIELD'){
                      field.push(final[i]);
                  }else if(status == "VALUE"){
                      value.push(final[i]);
                  }
              }
          }
            res.end(JSON.stringify(body));
        });
    }else{
        res.end('404');
    }
});


server.listen(7586 );