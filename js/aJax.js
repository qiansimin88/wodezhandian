// JavaScript Document
function ajax(url,fnSucc,fnFaild)
{
		//1.创建Ajax对象
	   //非IE6的浏览器
	   if(window.XMLHttpRequest) //!防止IE6直接报错，这里加上属性window
	   {
		 var oAjax=new XMLHttpRequest();
	   }
	   else
		{		//IE6
		  var oAjax=new ActiveXObject("Microsoft.XMLHTTP");
		}
		
		//2.链接服务器
		//open(方法,文件名,是否异步传输)
		oAjax.open('GET',url,true); //在文件名后面加上get方式?t=new Date().getTime()清除缓存；
		
		 //3.发送请求
		 oAjax.send();
		 
		 //4.接收返回值
		 oAjax.onreadystatechange=function()
		 {
			 //oAjax.readyState   //浏览器和服务器，进行到哪一步了。
			 if(oAjax.readyState==4)  //读取完成；
			 {
				if(oAjax.status==200)   //读取成功  status 状态码。
				{
					fnSucc(oAjax.responseText)
					//alert('成功'+oAjax.responseText)	
				}
				else                  //oAjax.stauts不等于200都是失败
				{
					if(fnFaild)
					{
						fnFaild(oAjax.status);
					}
				}	 
			 };   
		 };	
}