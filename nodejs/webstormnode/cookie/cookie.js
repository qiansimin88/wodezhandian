/**
 * cookie是服务器向客户端发送的一段文本
 * 1.服务器发给客户端 Set-Cookie 的header
 * 2.客户端以key-value的形式进行保存(内存或硬盘)
 * 3.以后每次请求的时候，客户端会有选择的把保存的cookie发给服务器
 *  Cookie:name=zfpx; age=6; gender=man
 *  它的目的是让服务器能够 在多个HTTP请求之间跟踪客户端
 *  cookie本质上就是一个header值
 **/

/**
 * 设置cookie的标准格式 name=zpfx; path=/; domain=localhost
 * Domain localhost
 *   指定cookie被发送到哪些服务器上。默认情况下，只发送到写cookie的服务器上
 * Path /
 *  控制哪些路径 能够发送 cookie .如果没有指定，默认是 /,对此 域名所有的路径都可以访问
 * Expires/max-Age  Session(表示存放在浏览器内存里，关闭浏览器会销毁)
 * HTTP 只能在http里看到，不能通过document.cookie访问
 * Secure 只能用在 https里
 */

/**
 * cookie的问题
 * 1.安全问题 在客户端能够被篡改，私密数据不能得到保护
 * 2.浪费带宽，每次请求都要追加
 *
 * 使用建议
 * 1.不要完全信任客户端提交过来的cookie要做验证。
 * 2 不要存储私密数据
 * 3.最好设置httpOnly
 * 4.设置正确的使用范围 domain=a.zfpx.cn
 * 5.尽可能节约体积，不要存储过多的数据
 * 6.apache 默认请求头大小不能超过8190字节
 *
 *
 *
 *
 */
var http = require('http');
var parse = require('./parse');
var SET_COOKIE = 'Set-Cookie';
 var cookieUtils = require('./cookieUtils');
http.createServer(function(req,res){
    parse(req);
    if(req.pathname == '/favicon.ico'){
        res.end('404');
    }else if(req.pathname == '/write'){
        //res.setHeader(SET_COOKIE,'name=zfpx');
        //res.setHeader(SET_COOKIE,['name=zfpx; domain=a.zfpx.cn; path=/write; HTTP']);

        res.setHeader(SET_COOKIE,[cookieUtils.serialize('name','周杰伦',{
        })]);
        res.end('hello');
    }else if(req.pathname == '/read'){
        res.setHeader('Content-Type','text/html;charset=utf8');
        var isVip =  cookieUtils.parse(req.headers.cookie).isVip-0;
        res.end(isVip?'你是尊贵的VIP会员':'你根本不是司机');
    }else{
        res.end('404');
    }
}).listen(1555);