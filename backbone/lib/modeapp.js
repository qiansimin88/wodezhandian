// JavaScript Document

	/*
		
		model 定义模型  常用方法  set unset has clear() attributes toJSON() 
		
	*/

	var Note = Backbone.Model.extend({	
			//默认值			
				defaults : {
					title : '电风扇',
					create_d:new Date()-0	
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
		
		
	/*
		视图
	*/
	
	var NoteView = Backbone.View.extend({
		//el
		//标签名
		tagName : 'li',
		//id或者className
		id: 'item',
		//属性值  
		attributes: {'data-role':'nav'},
		//模版
		template:_.template(jQuery('#list-template').html())
		,
		//渲染
		render : function () {
			//jquery的$对象选中当前的实图的el元素
			this.$el.html(this.template(this.model.attributes));
			return this;
		}
		
	});
	
	
	/*
		实例化
	*/
	var note = new Note({
		'title' : '我就是这么屌'	
	});
	
	var noteview = new NoteView({
		//指定模型
		model : note 
	});
	
	
	/*
		集合
	*/
	var NoteCollection = Backbone.Collection.extend({
		//集合的模型
		model : Note ,
		
		//添加初始化
		initialize : function () {
			this.on({			//模型，集合，选项
				'add' : function (model,collection,options) {
							console.log('ID'+model.id+'被添加');
				},
				'remove' : function (model,collection,options) {
							console.log('ID:'+model.id+'被移除'+collection);
				},
				//监听模型的任何属性变化
				'change': function (model,options) {
						console.log(model.id+'的发生了变化'+options);
				}
			});
		}
	});
	
	/*
		集合视图
	*/
	var noteCollectionView = Backbone.View.extend({
		tagName : 'ul',
		id :'listUl',
		//初始化
		initialize : function () {
			this.collection.on('add',this.addOne,this);
			this.render();
		},
		 //渲染
		 render :function () {
			this.collection.each(this.addOne,this);
			return this;
		},
		//addone自定义函数
		addOne: function(Note){
			var note = new NoteView({model:Note});
			this.$el.append(note.render().el)	
		}
	}); 
	
	//实例化多个模型
	var note1 = new Note({id:1,title:'我是1'});
	var note2 = new Note({id:2,title:'我是2'});
	var note3 = new Note({id:3,title:'我是3'});
	
	var noteCollection = new NoteCollection([note1,note2,note3]);
	var noteCollectionview = new noteCollectionView({collection:noteCollection});
	
	//实例化  集合     parm : 数组形式的模型	
	//var noteCollect = new NoteCollection([note1,note2,note3]);
	
	
	/*
	 *  路由
	*/
	
	var NoteRouter = Backbone.Router.extend({
			//设置路由
			routes: {
				//hash为index ()为可选的参数 就执行  index方法
				'index(/page/:pageNum)' : 'index' ,
				'index/:idTag' : 'onShow'	
			},
			index : function (pageNum) {
					var page = pageNum||1;
					$('.lo').html(noteCollectionview.el);
					
					console.log('这是第'+pageNum+'页');
			},
			onShow :function(id){
				//得到这个ID的模型			集合.get() 返回某个模型
				var getMode = noteCollection.get(id);
				
					$('.lo').html(new NoteView({model:getMode}).render().el)
			}
	});

	var noteRouter = new NoteRouter ;
	
	Backbone.history.start(); 
		

	
	
	
		
	