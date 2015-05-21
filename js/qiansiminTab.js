// JavaScript Document
(function($){                     
	$.fn.miaovTab=function()
	{
		var This=this;
		$(this).find('input').click(function(){   //这里有个函数，所依函数下面就不能用小写的this了。作用域的问题。
		$(This).find('input').attr('class','');
		$(this).attr('class','active');
		$(This).find('div').css('display','none');
		$(This).find('div').eq($(this).index()).css('display','block');	
	});	  	
	};
		
})(jQuery);


/*
	1.采取闭包的写法；
	2.使用this.内部的this声明一个变量传进去。
*/