/**
 * Created by Administrator on 2015/10/20.
 */
/*
* call apply
*
* */


var proson = {
    name : "qiansimin",
    say : function (content) {
        console.log(this.name+content);
    }
};

var p = {
    name:'zhoujielun'
}


//proson.say.apply(p,['你好']);

//bind  永久绑定

var pSay = proson.say.bind(p,'hehe');

pSay('lol');