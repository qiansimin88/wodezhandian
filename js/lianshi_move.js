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
	function move(obj,attr,target,fnEnd)  //运动框架
	{
		clearInterval(obj.timer);
		
		obj.timer=setInterval(function(){
		
		if(attr=='opacity')                                  //为了透明属性而加
		{
			var cur=Math.round(parseFloat(getStyle(obj,attr))*100);	    //parseFloat是因为获取的opacity是小数 Math.round四舍五入防BUG
		}
		else
		{
			var cur=parseInt(getStyle(obj,attr));	
		}
		var speed=(target-cur)/10;
		speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(cur==target)                       //if一定要加==双等于才行。
			{
				clearInterval(obj.timer);
				if(fnEnd)
				fnEnd();	
			}
			else
			{
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
			
			}
			
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