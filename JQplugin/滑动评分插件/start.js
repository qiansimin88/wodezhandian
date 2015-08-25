/**
 * [星星]
 * @Author   QSM
 * @DateTime 2015-08-25T16:07:04+0800
 * QQ:348867341
 * @return   {[type]}                 [description]
 */

// 调用方法
// <ul class="demo">
// 	<li class="active"></li>
// 	<li></li>
// 	<li></li>
// 	<li></li>
// </ul>
// <script>
// 	1.  $('.demo').star();
// 	2. var demo = new star({...}).init();   //返回一个star对象
// </script>

define(function(require, exports, module) {
    return function($) {
        $.fn.star = function(arg) {			//jquery.fn插件形式暴露
            $(this).each(function(i, o) {
                var op = $.extend({
                    target: $(this) //jquery插件形式的调用  就改变target
                }, arg);
                var starInit = new star(op);
                starInit.init();
            });
        };
        var star = function(op) {		  //直接js   new star形式调用
            var setting = $.extend({
                target: null,
                classname: 'active',	//选中的央视
                startTagname: 'li',		//控制的dom元素
                min: 1,					//默认选中的个数
                cb: null				//click函数后的回调函数
            }, op || {});
            var config = this.config = setting;
            this.$ele = config.target;
            this.min = config.min;
           	this.initNum = 1;
           	this.ulli =this.$ele.find(config.startTagname);
        }
        star.prototype.init = function() {
           if(this.min && typeof this.min == 'number') {
				this.initNum == this.min;
			}
			this.clickfun();	//点击函数
			this.mouseout();	//移除函数
			return this;
        }
		star.prototype.clickfun = function () {
			var _this = this;
			this.ulli.on('click mouseover', function(e) {
			    var nowIndex = $(this).index() + 1;
			    for (var i = 0; i < _this.ulli.size(); i++) {
			        _this.ulli.eq(i).removeClass(_this.config.classname)
			    };
			    for (var j = 0; j < nowIndex; j++) {
			        _this.ulli.eq(j).addClass(_this.config.classname)
			    };
			    if (e.type == 'click') {
			        _this.initNum = nowIndex;
			        if (_this.config.cb && typeof _this.config.cb == 'function') {
			            _this.config.cb(nowIndex);
			        }
			    }
			    console.log(_this.initNum)
			});
		}
		star.prototype.mouseout = function () {
			var _this = this;
			this.$ele.on('mouseout', function() {
			    if (!_this.initNum) {
			        _this.ulli.removeClass(_this.config.classname);
			    } else {
			        for (var i = 0; i < _this.ulli.size(); i++) {
			            _this.ulli.eq(i).removeClass(_this.config.classname)
			        };
			        for (var i = 0; i < _this.initNum; i++) {
			            _this.ulli.eq(i).addClass(_this.config.classname)
			        }
			    };
			});
		}
		star.prototype.clear = function () {
			this.initNum = this.min;
			for(var i =0 ;i<this.ulli.size();i++) {
				this.ulli.eq(i).removeClass(this.config.classname);
			}
			for (var j = 0; j < this.initNum; j++) {
			   	 this.ulli.eq(j).addClass(this.config.classname)
			}
		}
        return star; //暴露这个构造函数
    }
})

