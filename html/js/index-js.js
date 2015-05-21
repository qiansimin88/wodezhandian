// JavaScript Document

window.onload=function()
{
	web.app.seach();
	web.app.list();	
	web.app.tab();

}
var web={};

web.tools={};
web.tools.getByClass=function(oParent,sClass)
{
	var aEl=oParent.getElementsByTagName('*');
	var arr=[];
	
	for(var i=0;i<aEl.length;i++)
	{
		if(aEl[i].className==sClass)
		{
			arr.push(aEl[i])	
		}	
	}
	return arr
}

web.ui={};

web.ui.seach=function(obj,str)
{
		obj.onfocus=function()                //onfocus  鼠标点击+tab都可以 比onclick强
		{
			if(obj.value==str)				//用json的命名空间，ui来放封装函数，app写具体的函数，别忘了调用要在上面加上wwindo.onload
			{
				this.value=""	
			}	
		};
		obj.onblur=function()				//当失去焦点的事件。   
		{   
			if(this.value=="")
			{
				this.value=str
			}	
		}
};

web.ui.moveLeft=function(obj,cur,target)
{
   clearInterval(obj.timer);
   obj.timer=setInterval(function(){
		
		var iSpeed=(target-cur)/10;
		iSpeed= iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
		
		if(target==cur)
		{
			clearInterval(obj.timer)	
		}
		else
		{
			cur+=iSpeed
			obj.style.left=cur+'px';	
		}
		  
  },30)		
}

web.app={};

web.app.seach=function()
{
	var oTxt1=document.getElementById('text1');
	var oTxt2=document.getElementById('text2');
	
	web.ui.seach(oTxt1,"Number")
	web.ui.seach(oTxt2,"Number")	
}

web.app.list=function()
{
	var oDiv=document.getElementById('sort');
	var aA=oDiv.getElementsByTagName('a');
	var aUl=oDiv.getElementsByTagName('ul')
	var This=null;
	
	for(var i=0;i<aA.length;i++)
	{ 
		aA[i].index=i;
	
		aA[i].onclick=function(ev)
		{
			var This=this;               //局部变量，使得下面的document.onclick得意使用，刚好this也是for循环下面的
			var oEvent=ev||event;
			for(var i=0;i<aUl.length;i++)
			{
				aUl[i].style.display="none";	
			}
			aUl[this.index].style.display='block';
			oEvent.cancelBubble="true"
			document.onclick=function()
			{
			  aUl[This.index].style.display="none";
			}	
		}	
	}
	
};
web.app.tab=function()
{
	var oDiv=document.getElementById('scroll_right');
	var aUl=oDiv.getElementsByTagName('ul')[0];
	var aLi=aUl.children;
	
	var oPrve=web.tools.getByClass(oDiv,'prve')[0];
	var oNext=web.tools.getByClass(oDiv,'next')[0];
	var iNow=0;
	aUl.innerHTML+=aUl.innerHTML;
	aUl.style.width=aLi.length*aLi[0].offsetWidth+'px';

	
	oPrve.onclick=function()                  //无缝切换。
	{
		if(iNow==0)
		{
			iNow=aLi.length/2	
		}
		web.ui.moveLeft(aUl,-iNow*aLi[0].offsetWidth,-(iNow-1)*aLi[0].offsetWidth)
		iNow--	
	}
	
	oNext.onclick=function()
	{
		if(iNow==aLi.length/2)
		{
			iNow=0	
		}
		
		web.ui.moveLeft(aUl,-iNow*aLi[0].offsetWidth,-(iNow+1)*aLi[0].offsetWidth)
		iNow++;	
	}
	
}