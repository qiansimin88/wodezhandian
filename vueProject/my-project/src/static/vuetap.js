//2016.4.25 vue时间插件
;(function () {
	var vueTap = {};

	//vue插件的注册
	vueTap.install = function () {
		isFn : true,  //标识
        bind : function() {			//绑定一次
             
        },
        update : function(fn) {		//每次更新都调用
            
        },
        unbind : function() {},
        isTap : function() {
            //判断是否为tap
        },
        touchstart : function(e,self) {
            
        },
        touchend : function(e,self) {
            
        }
	};

	//暴露出去 amd cmd 等
	 if (typeof exports == "object") {
        module.exports = vueTap;
    } else if (typeof define == "function" && define.amd) {
        define([], function(){ return vueTap })
    } else if (window.Vue) {
        window.vueTap = vueTap;
        Vue.use(vueTap);
    }
})();