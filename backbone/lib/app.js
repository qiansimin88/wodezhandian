// JavaScript Document

	/*
		
		model 定义模型  常用方法  set unset has clear() attributes toJSON() 
		
	*/

	var Note = Backbone.Model.extend({	
			//默认值			
				defaults : {
					title : '电风扇',
					create_d:new Date()	
				},
			//初始化
			initialize:function(){				//this指的是实例化出来的对象
				console.log('新创建了一条笔记：'+this.get('title'));	
				
				//监听 属性值是否发生变化	(model是当前的对象，options是改变的属性的值)
				this.on('change',function(model,options){
					console.log('属性值发生了变化');
				});
				//为特定的属性加监听
				this.on('change:title',function(model,options){
					console.log('title属性发生了变化'+model+'---'+options)
				});
				//监听验证失败					(对象，错误信息)
				this.on('invalid',function(model,error){
					console.log(error);
				})
			},
			//验证				(当前对象的属性对象，选项)
			validate:function(attr,options){
				
				if(attr['title'].length < 3) {
					return '字符串位数太少';
				};
				
				//newDta.set('title','sd',{validate:true});创建实例的调用方法
			}
		});
	/*	//实例化对象
		var note = new Note({'呵呵':'炒鸡蛋','create_t':new Date()-0});*/
		
		
		
		
	