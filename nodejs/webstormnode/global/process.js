/**
 * Created by Administrator on 2015/10/19.
 */
/*
* 应用程序是进行类的对象实例
* 在nodejs里面 process 对象代表node应用程序
* 可以获取应用程序的和用户，运行环境等信息
* */


/*
*
* */
//btn.addEventListener('click',fn) 监听
//process.stdin.on('data',function (d){  //监听控制台的输入 然后输出内容
//    process.stdout.write(d)
//});

//控制台的运行  获取所有的参数
//process.argv.forEach(function (item){
//    console.log(item);  //分别打印出控制台的的参数 第一个是node位置 第二个是文件位置 后面依次是参数
//});

//当程序退出的时候进行清理工作
//process.on('exit',function (){
//    console.log('clear');
//})

//监控没有捕获的异常信息
process.on('uncaughtException',function (err){
    console.log(err);  //打印出错信息[ReferenceError: heheda is not defined]
});

heheda();  //不存在的函数

console.log('并没有因为heehda函数没有 造成程序中断异常');




