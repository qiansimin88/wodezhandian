

'use strict';

//类似命令行


//1  readline实例

const readline = require('readline');

//2.创建readline接口实例

const rl = readline.createInterface({
    input: process.stdin,   //传入标准的输入和输出 作为 数据的输入输出流
    output: process.stdout 
});

//写入提示字符串
rl.setPrompt('是否升级y/n?');
//调用prompt方法
rl.prompt();

rl.on('line', function(line) {
    switch(line.trim()) {
        case 'copy':
            console.log("复制");
            break;
        case 'hello':
            console.log('world!');
            break;
        case 'close':
            rl.close();
            break;
        default:
            console.log('没有找到命令！');
            break;
    }
    rl.prompt();
});

rl.on('close', _ => {
    console.log('告辞');
    process.exit(0);
});