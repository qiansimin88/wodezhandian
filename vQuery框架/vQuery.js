// JavaScript Document
//事件绑定函数
	function addEvent(obj,event,fn){
		if(obj.attachEvent)					//IE
		{
			obj.attachEvent('on'+event,function(){
				if(fn.call(obj)==false)
				{
					return false;  //IE下的取消默认事件
					event.cancelBubble=true;	//阻止冒泡 
				}
			});			//在IE下面的绑定有this的BUG,this指向window，js中四个地                                                                             方要巧用this   事件绑定，嵌套， 定时器,行间,为了解这                                                                             个BUG，使用call  让这个 fn 的this对象指向当前的obj
		}
		else
		{								   //高级浏览器
			obj.addEventListener(event,function(ev){
				event.cancelBubble=true;    //阻止冒泡 
				ev.preventDefault();    //chrome下取消默认事件。	
			},false);    	
		}	
	};
//获取class元素
	function getClass(oParent,sClass){
		var arr=[];
		var aEle=oParent.getElementsByTagName('*');
		for(var i=0;i<aEle.length;i++)
		{
			if(aEle[i].className==sClass)
			{
				arr.push(aEle[i]);	
			}	
		}
		return arr;
	};
//获取内联样式的函数
	function getStyle(obj,attr){
		if(obj.currentStyle)
		{
			return obj.currentStyle[attr];	
		}
		else
		{
			return getComputedStyle(obj,false)[attr];	
		}
	};
	
	//构造函数  属性集合
	function vQuery(o){
		//构造函数里面的属性，用来储存选择器
		this.Ele=[];
		switch(typeof o){
			case 'function':
				addEvent(window,'load',o);      //为了可以绑定多个事件处理函数
				break;
			
			case 'string':
				switch(o.charAt(0)){
					case '#':   //ID
						var obj=document.getElementById(o.substring(1));
						this.Ele.push(obj);
						break;
						
					case '.':   //Class
						this.Ele=getClass(document,o.substring(1));     //直接让这个储存数组等于选中的所有Class
						break;
					default:    //Tagname
						this.Ele=document.getElementsByTagName(o);
				};
				break;
			case 'object':
				this.Ele.push(o);
				break;			
		};
	};
//通过$来简化  new vQuery的创建  
	
	function $(o)
	{
		return new vQuery(o);    //相当于创建了一个 new 函数	
	};
	
	
	//原型方法   click
	vQuery.prototype.click=function(fn){      //传个函数参数给下面事件绑定用
		
		for(var i=0;i<this.Ele.length;i++)     //作用是：因为构造函数下面的this.Ele是数组存有多个选取器，使用循环让每个选择器都绑定事件					                                                 函数，传入回调函数
		{
			addEvent(this.Ele[i],'click',fn);	
		}
	};
	//原型方法  显示
	vQuery.prototype.show=function(){
		for(var i=0;i<this.Ele.length;i++)
		{
			this.Ele[i].style.display='block';	
		}	
	};
	//原型方法  隐藏
	vQuery.prototype.hide=function(){
		for(var i=0;i<this.Ele.length;i++)
		{
			this.Ele[i].style.display='none';	
		}	
	};
	//原型方法 css
	vQuery.prototype.css=function(attr,value){
		if(arguments.length==2)
		{
			var lastvalue=value
			if(typeof value=='number')
			{
				lastvalue+='px';
			}
			for(var i=0;i<this.Ele.length;i++)
			{
				this.Ele[i].style[attr]=lastvalue; 
			};	
		}
		else
		{
			if ( typeof attr == 'string')
			{
				return getStyle(this.Ele[0],attr);		
			}
			else
			{
				//先循环this.Ele,然后再循环json对象
				for (var i=0;i<this.Ele.length;i++){
					for (var k in attr)				
					{
						this.Ele[i].style[k]=attr[k];
					};	
				};
			};			
		};
		
		// important 这里为了方便链式操作  要反回这个对象，众所周知，返回即是this
		return this;
	};
	//原型方法  hover 
	vQuery.prototype.hover=function(fnOver,fnOut){   //因为hover是有两个事件的，所依要传两个参数哦
		for(var i =0;i<this.Ele.length;i++)
		{
			addEvent(this.Ele[i],'mouseover',fnOver);    //移入
			addEvent(this.Ele[i],'mouseout',fnOut);		//移出
		};
		
	};
	//原型方法  toggle
	vQuery.prototype.toggle=function(){
			var _arguments=arguments;   //注意 这里为什么这样缓存呢？因为下面用arguments，可是arguments指的是当前函数的参数个数，而这里的本意是用t                                          oggle原型函数上面的 参数，所依缓存起来 替换下面的argument
			for(var i=0;i<this.Ele.length;i++)
			{
				(function(obj){
					var count=0;
					addEvent(obj,'click',function(){
						_arguments[count++%_arguments.length].call(obj);   //count++ % arguments.length是个算发，循环执行	                                                                             argument.length上面函数
					});	
				})(this.Ele[i])                          //这里用到了闭包的思想 ，让每个btn都拥有一个函数作用域，所依每个count都是独立的互相干扰	
			}											 //和分别计数那个思想是一样的
		// important 这里为了方便链式操作  要反回这个对象，众所周知，返回即是this
		return this;
	};
	//原型方法 attr
	vQuery.prototype.attr=function(attr,value){
			if(arguments.length==2)
			{
				for(var i=0;i<this.Ele.length;i++)
				{
					this.Ele[i][attr]=value;		
				}	
			}
			else
			{
				return this.Ele[0][attr];    //如果只有一个参数，那么返回第一个对象的属性值	
			}
		// important 这里为了方便链式操作  要反回这个对象，众所周知，返回即是this
		return this;
	};
	//原型方法 eq 
	vQuery.prototype.eq=function(n){
		//return this.Ele[n];  //这样返回的只是一个原生的dom对象
		return $(this.Ele[n]);	//用$符号把dom元素包围起来，这样dom元素就变成vQuery对象了
	};
	//原型方法 find   !important
	vQuery.prototype.find=function(o){
		var aRuslet=[];   //来存放所有的find找到的对象数组
		for(var i=0;i<this.Ele.length;i++)
		{
			switch(o.charAt(0))
			{
				case '.':
					aRuslet=aRuslet.concat(getClass(this.Ele[i],o.substring(1)));
					break;
				default:
				//concat()是数组的方法,而且两边都必须是数组才行，DOM集合不是数组，所依不行
					//aRuslet=aRuslet.concat(this.Ele[i].getElementsByTagName(o));            Dom集合并不具有备array数组的属性方法,见changeArray()函数的意思
					changeArr(aRuslet,this.Ele[i].getElementsByTagName(o));
			}	
		};
		/*
			分析：
			1.上面所有的  都只是求出了 find找到的所有符合的元素，并且赋给了aRuslet数组
			2.这个数组是一个JS数组，并不具备vQuery框架支持的prototype的所有函数
			3.强制模拟出一个vQuery实例对象
			4.改变其Ele属性，因为原来的this.Ele是空的 ，在这里自动返回  this.Ele就是之后所有原型方法
		*/
		
		var newvQuery=$();		//没创建一个$()对象旗下就有一个this.Ele属性，所依在这里创建并且强制改变其thsi.Ele属性
		newvQuery.Ele=aRuslet;   //改变其this.Ele  属性，因为一个普通$('div')返回的其实只是一个this.Ele的数组
		return newvQuery;	//返回这个新对象	
	};
	
	//原型方法 index   !important
	vQuery.prototype.index=function(){
		return getIndex(this.Ele[0]);
	};
	
	//原型方法  bind 
	vQuery.prototype.bind=function(ev,fn){
		for (var i=0;i<this.Ele.length;i++){
			addEvent(this.Ele[i],ev,fn);
		};
	};
	
	//引入插件机制
	vQuery.prototype.extend=function(name,fn){
		vQuery.prototype[name]=fn;	
	};
	//选出当前的下表函数
	function getIndex(obj){
		var objBrother=obj.parentNode.children;
		for(var i=0;i<objBrother.length;i++)
		{
			if(objBrother[i]==obj)
			{
				return i;	
			}	 
		};
	};
	//把DOM集合利用函数转化成一个新数组，便于引用
	function changeArr(arr,domArray)
	{
		for(var i=0;i<domArray.length;i++)	
		{
			arr.push(domArray[i]);	
		}
		return arr;
	};