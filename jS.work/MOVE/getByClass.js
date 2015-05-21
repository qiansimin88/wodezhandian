// JavaScript Document

function getByClass(oParent,sClass)
{
	var aEl=oParent.getElementsByTagName('*');
	var arr=[];
	
	for (var i=0;i<aEl.length;i++)
	{
		if(aEl[i].className==sClass)
		{
			arr.push(aEl[i])	
		}	
	}
	return arr	
}