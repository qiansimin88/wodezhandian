'use strict';

//1  readline实例

const readline = require('readline');

//2.创建readline接口实例

const rl = readline.createInterface({
    input: process.stdin,   //传入标准的输入和输出 作为 数据的输入输出流
    output: process.stdout 
});

//line事件  用户输入换行 比如回车会触发
rl.on('line', (line) => {
    var customerStdin = line.trim();
    switch(customerStdin) {
        case 'copy':
            console.log('复制');
            break;
        case 'hello':
            rl.write('write');
            console.log('world！');
            break;
        case 'close':
            rl.close();
            break;
        default:
            console.log('没有找到相关命令！');
            break;
    }
});

rl.on('close', _ => {
    console.log('告辞');
    process.exit(0);
});