//工具函数  摘要算法 MD5 
exports.md5 = function(input){
    return require('crypto').createHash('md5').update(input).digest('hex');//以16进制表示输出值
}