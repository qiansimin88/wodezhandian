/**
 * Created by Administrator on 2015/9/25.
 */
//����һ��http������
//cnpm supervisor ����̬����������ı仯  supervisor XXX.js��̬����
var http = require('http');
var fs = require('fs');  //�ļ�ϵͳ
http.createServer(function (req,res) {

    var url = req.url;
    var urls = url.split("?");
    var pathName = urls[0];
    var query = urls[1];
    if(pathName == '/index.html') {
        var content = fs.readFileSync('./index.html');  //��ȡ�ļ�Ȼ�󷵻ظ��ͻ���
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