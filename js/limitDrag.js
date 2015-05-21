// JavaScript Document
function limitDrag(id)
{
	Drag.call(this,id)	
}
for(var  i in Drag.prototype)
{ 
	limitDrag.prototype[i]=Drag.prototype[i]	

}
limitDrag.prototype.fnMov=function(ev)
			{
			  	var oEvent=ev||event
				var L=oEvent.clientX-this.disX;
				var T=oEvent.clientY-this.disY
				if(L<0)
				{
					L=0
				}
				else if (L>document.documentElement.clientWidth-this.oDiv.offsetWidth)
				{
					L=document.documentElement.clientWidth-this.oDiv.offsetWidth	
				}
				this.oDiv.style.left=L+'px'
				if(T<0)
				{
					T=0;
				}
				else if(T>document.documentElement.clientY-this.offsetHeight)
				{
				docuemnt.documentElement.clientY-this.offsetHeight	
				}
				this.oDiv.style.top=T+'px'
				
			}