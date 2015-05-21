// JavaScript Document						//json格式
	function setCss3(obj,attr){
		//json格式首先想到的就是for in 循环了
		for (i in attr)
		{	//而且获取属性用【】的方式代替.的方式
			var newi=i;
			if(newi.search(/-/)>=0)
			{
				var num=newi.search(/-/);
				newi=newi.replace(newi.substr(num,2),newi.substr(num+1,1).toUpperCase())
			}
			obj.style[newi]=attr[i];
			//这里要注意位置不能弄错。因为只有后缀的后面才需要首字母大写。
			newi=newi.charAt(0).toUpperCase()+newi.substring(1);
			obj.style['o'+newi]=attr[i];
			obj.style['webkit'+newi]=attr[i];
			obj.style['moz'+newi]=attr[i]
		}
	}