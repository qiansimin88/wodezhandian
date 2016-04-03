/**
 * Created by Administrator on 2015/10/19.
 */
var utils = require('util');

/**
 * 这是一个基于对象间原型继承的函数、主要是工具
 * */

console.l og(utils.inspect({name:'qiansimin'}));  //把对象转化成字符串


console.log(utils.isArray([]));                 //一些列的检测  返回的是布尔值
console.log(utils.isRegExp(/\d+/));
console.log(utils.isDate(new Date()));          //检测是不是日期对象
console.log(utils.isError(new Error));