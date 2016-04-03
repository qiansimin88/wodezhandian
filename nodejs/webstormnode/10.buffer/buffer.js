/*
	buffer  暂时存放输入输出数据的一段内存
	全局对象
 */

//创建buffer 对象的三种方法

//1.new Buffer(size)

var buf1 = new Buffer(12);  //字节长度
console.log(buf1);

buf1.fill(0);		//fill把每个字段都变成0 
console.log(buf1);

//2数组方式
var buf2 = new Buffer([1,2,3]);
console.log(buf2);  //01 02 03

//3字符串创建
var buf3 = new Buffer('钱思敏');
//utf8  一个汉字等于3个字节
console.log(buf3); //Buffer e9 92 b1 e6 80 9d e6 95 8f>



//字符串和BUFFER转换  
//Buffer.toString(uncodt ype,start,end) 

var bufOb = new Buffer('钱思敏');
console.log(bufOb.toString('utf8',3,9));   //转换成字符串思敏  


//写buffer 

var Buf = new Buffer('142');

/*
	string offset length encoding
	offset 就是起始位置的意思
 */

Buf.write('珠峰',0,6,'utf8');
Buf.write('培训',0,7 ,'utf8');

console.log(Buf.toString());




/*
	乱码处理
 */

var buf6 = new Buffer('珠峰培训');
console.log(buf6);
var buf7 = buf6.slice(0,7);
var buf8 = buf6.slice(7);
console.log(buf7.toString());
console.log(buf8.toString());

/*
	StrinhDecoder 
 */
var StrinhDecoder = require('string_decoder').StringDecoder;
var decoder = new StrinhDecoder();
console.log(decoder.write(buf7));   //珠峰
console.log(decoder.write(buf8));	//培训



//Buffer copy  复制缓存

var srcBuf = new Buffer([4,5,6]);
var targetBuf = new Buffer(6);

targetBuf[0] = 1;
targetBuf[1] = 2;
targetBuf[2] = 3;

/*
	taggetBuf targetStart sourceStart sourceEnd
	拷贝一个BUF
 */
srcBuf.copy(targetBuf,3,0,3);

console.log(targetBuf);


