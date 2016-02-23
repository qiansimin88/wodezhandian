/**
 * Created by Administrator on 2015/10/19.
 */
/*
*   和setTimeout()差不多 都是异步执行的意思
* */

setImmediate(function (){    //setImmediate的异步权限最低 比nextTick还要低
    console.log('hello2')
});

function say (){
    console.log('hello');
};

process.nextTick(say);   //异步执行 say的方法

console.log('next');   //这个会首先执行


