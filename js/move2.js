

	function getByStyle(obj,name)
	{
		if(obj.currentStyle)
		{
			return obj.currentStyle[name];	
		}
		else 
		{
			return getComputedStyle(obj,false)[name];	
		};	
	}
	function move(obj,attr,target)
	{
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			var cur=0;
			if(attr=='opacity')
			{
				cur=Math.round(parseFloat(getByStyle(obj,attr)))*100	
			}
			else
			{
				cur=parseInt(getByStyle(obj,attr))
			}
		var	speed=(target-cur)/10;
		speed=speed>0?Math.ceil(speed):Math.floor(speed);
		if(target==cur)
		{
			clearInterval(timer);	
		}
		else
		{
			if(attr=='opacity')
			{
				cur+=speed;
				obj.style.filter='alpha(opacity:'+cur+')';
				obj.opacity=cur/100;
					
			}
			obj.style[attr]=cur+speed+'px'	
		}	
		},30)	
	};
	function getByClass(oparent,Sclass)
	{
		var oResult=[];
		var oEle=document.getElementsByTagName('*')    //ByTagName可想而知下面就要用for循环了
		for(var i=0;i<oEle[i].length;i++)
		{
			if(oEle[i].className==Sclass)
			{
				oResult.push(oEle[i])	
			}
			return oResult	
		}
	}