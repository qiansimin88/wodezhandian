/**
 * Created by Administrator on 2015/9/29.
 */

//object
var obj = {name:'qiansimin',age:16};

console.log(Object.keys(obj));    //[ 'name', 'age' ] Object.keys()����һ������  ����һ���������иö���key�����飻



//Array

    console.log(Array.isArray([]));  //TRUE
    console.log(Array.isArray(new Array));  //TRUE
    console.log(Array.isArray(arguments));  //false

    [4,5,6].forEach(function (o,i,array) {  //o:����  i������ array:����
        console.log(o,i,array);       // 4 0 [ 4, 5, 6 ]
                                     //5 1 [ 4, 5, 6 ]
                                     //6 2 [ 4, 5, 6 ]
    });

   var newA = [1,2,2,5].filter(function (n) {
         console.log(n);  //1,2,2,5   ѭ����ӡ
       return n>=2;       //����ƥ���N����������
    });
    console.log(newA);    //[2,2,5]

    var newA2 = [50,1.7].map(function (n) {
        return n*2;     //����һ���µ����� [ 100, 3.4 ]
    });
    console.log(newA2);

//string
    var obj2 = {name:'qioan',age:28};
    console.log(JSON.stringify(obj2));    //��JSONת�����ַ���
    console.log(JSON.parse('{"name":"qiansimin","age":16}'));        //���ַ�����jsonת���ɶ���
