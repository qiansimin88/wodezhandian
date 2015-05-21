// JavaScript Document
 window.onload=function(){
	var oDiv=document.getElementById('zhankai');
	var  oBtn=document.getElementById('btn');
	
	oBtn.onclick=function(){
	  if(oDiv.style.opacity==0)
	  {
		 oDiv.style.height="auto";
		 var iHeight=oDiv.offsetHeight;
		 oDiv.style.height='0';
		 move(oDiv,{opacity:100,height:iHeight})
	  }
	  else
	  {
		move(oDiv,{opacity:0,height:0})	
	  }
  } 	 
}