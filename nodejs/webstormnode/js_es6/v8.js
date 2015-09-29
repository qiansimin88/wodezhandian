/**
 * Created by Administrator on 2015/9/29.
 */

//object
var obj = {name:'qiansimin',age:16};

console.log(Object.keys(obj));    //[ 'name', 'age' ] Object.keys()接受一个对象  返回一个含有所有该对象key的数组；



//Array

    console.log(Array.isArray([]));  //TRUE
    console.log(Array.isArray(new Array));  //TRUE
    console.log(Array.isArray(arguments));  //false

    [4,5,6].forEach(function (o,i,array) {  //o:数据  i：索引 array:本身
        console.log(o,i,array);       // 4 0 [ 4, 5, 6 ]
                                     //5 1 [ 4, 5, 6 ]
                                     //6 2 [ 4, 5, 6 ]
    });

   var newA = [1,2,2,5].filter(function (n) {
         console.log(n);  //1,2,2,5   循环打印
       return n>=2;       //返回匹配的N放入新数组
    });
    console.log(newA);    //[2,2,5]

    var newA2 = [50,1.7].map(function (n) {
        return n*2;     //返回一个新的数组 [ 100, 3.4 ]
    });
    console.log(newA2);

//string
    var obj2 = {name:'qioan',age:28};
    console.log(JSON.stringify(obj2));    //把JSON转化成字符串
    console.log(JSON.parse('{"name":"qiansimin","age":16}'));        //把字符串的json转化成对象
