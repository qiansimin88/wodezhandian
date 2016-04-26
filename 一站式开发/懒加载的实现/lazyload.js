;(function (root,factory) {
	if( typeof define === 'function' && define.amd) {
		define(function () {
			return factory(root);
		})
	}else if ( typeof exports == 'object' ) {
		module.exports = factory;
	}else {
		root.lazy = factory(root);    //script引用 直接运行工厂函数 
	}
})(this,function (root) {
	
})