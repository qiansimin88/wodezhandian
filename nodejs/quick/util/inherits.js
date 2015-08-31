var util = require('util');     //这是一个模块 需要引用

function base () {
	this.name = 'QMS';
	this.show = function () {
		this.name = '1';
	}
}

base.prototype.showName = function () {
	console.log(this.name);
}

function son () {
	this.name = 'caoyarong';
}

util.inherits(son,base);    //parm1:子类  parm2：父类   子类继承父类原型上面的方法 不会继承 父类私有的属性

var baseDemo = new base().showName();  //父类
console.log(new base());    //实例化的对象的私有属性和方法（排除原型的方法）

var sonDemo = new son().showName();   //子类  继承了 父类的prototype的方法