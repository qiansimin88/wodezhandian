  // JavaScript Document
function getStyle(obj,name)			//这个函数是为了获取行间样式的。
	{	
		if(obj.currentStyle)
		{
			
			return obj.currentStyle[name];
			 	
		}
		else
		{
			return getComputedStyle(obj,false)[name];	
		}	
}
function move(obj,json,fnEnd)  //运动框架
{
		clearInterval(obj.timer);
	
		
	obj.timer=setInterval(function(){
			var bStop=true      //假设所有的值都到了
	for(var attr in json)
	{
		
		if(attr=='opacity')                                  //为了透明属性而加
		{
			var cur=Math.round(parseFloat(getStyle(obj,attr))*100);	    //parseFloat是因为获取的opacity是小数 Math.round四舍五入防BUG
		}
		else
		{
			var cur=parseInt(getStyle(obj,attr));	 //之所以用parseIntet是因为getStyle取到的值是带单位的如PX，所依用parseInt去掉非数字部分
		}
		var speed=(json[attr]-cur)/10;
		speed=speed>0?Math.ceil(speed):Math.floor(speed);
			
			if(cur!=json[attr])     //如果有的值没有达到目标值
		     bStop=false         
			
				if(attr=='opacity')
				{
					cur+=speed
					obj.style.filter='alpha(opacity:'+cur+')';
					obj.style.opacity=cur/100;
				
				}
				else
				{
					obj.style[attr]=cur+speed+'px'	
				}
			if(bStop)     //如果所有的值都到了。
			{
				clearInterval(obj.timer);
				if(fnEnd)
				fnEnd();	
			}

	 };
			
  },30)	
};
	function getByClass(oParent,sClass)
	{
		var aEle=oParent.getElementsByTagName('*');
		var aResult=[];
		for(var i=0;i<aEle.length;i++)
		{
			if(aEle[i].className==sClass)
			{
				aResult.push(aEle[i])	
			}
		}
		return aResult		
	};