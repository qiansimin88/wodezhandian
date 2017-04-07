'use strict';

//1  readline实例

const readline = require('readline');

//2.创建readline接口实例

const rl = readline.createInterface({
    input: process.stdin,   //传入标准的输入和输出 作为 数据的输入输出流
    output: process.stdout 
});

//question方法
rl.question('whether there is a new version to upgrade y/n ?', (answer) => {
    if(answer === 'y') {
        console.log('loading');
    }else {
        process.stdout.write('you are right');
    }
    //得到答案 结束程序 
    rl.close();
});

//close事件监听
rl.on('close', () => {
    //结束进程
    process.exit(0);
});

