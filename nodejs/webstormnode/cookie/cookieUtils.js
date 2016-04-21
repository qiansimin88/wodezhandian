//把一个对象转成cookie字符串
// Max-Age Domain Path Expires HttpOnly Secure
exports.serialize = function(name,value,options){
    options = options||{};
    var pairs = [name+'='+value];
    if(options.maxAge){
        var maxAge = options.maxAge - 0;
        pairs.push('Max-Age='+maxAge);
    }
    if(options.domain) pairs.push('Domain='+options.domain);
    if(options.path) pairs.push('Path='+options.path);
    if(options.expires) pairs.push('Expires='+options.expires.toGMTString());
    if(options.httpOnly) pairs.push('HttpOnly');
    if(options.secure) pairs.push('Secure');
    return pairs.join('; ');
}
// console.log(exports.serialize('name','zfpx',{
//     maxAge:60,
//     domain:'localhost',
//     path:'/',
//     expires:new Date(),
//     httpOnly:true,
//     secure:true
// }));
//把客户端提交上来的 cookie 转成对象 name=zfpx; age=6
exports.parse = function(str){
 var obj = new Object();
    if(str){
        var pairs = str.split(/; /);
        pairs.forEach(function(pair){
            var values = pair.split('=');
            obj[values[0]] = values[1];
        });
    }

 return obj;
}

// console.log(exports.parse('name= zfpx; age=6;'));