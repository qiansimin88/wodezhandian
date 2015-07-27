//QQ:348867341   qsm  2015-7-27
// V1.0  
function publicValidata(o,arg) {

			this.config = $.extend({

				errorPlacePosition: 'inner',    //错误信息是同级还是父级的外面

				errorPlace : '.errplace',

				errorClass : 'errorClass',

				errorPlaceshowClass:'inputError',

				form :'.infoform',

				requireinputMsg : {

					user : '大哥请填完整好吗？',

					hehe : '呵呵'

				},

				rules : {

					'ueser-surname' : [/^2{4}$/,11]

				},

				ajaxfun:null,    //ajax提交

				submitBefore:null		//在验证之前的行为   必须要返回一个布尔值 true运行 false return

			},arg||{});

			this.lock = false;   //无锁

			this.$ele = o;

			config = this.config;

			this.requireinputMsg =config.requireinputMsg; 

		};
		//一些内置的规则
		publicValidata.prototype.defaultRules = {

				email : /^\w+@\w+\.[a-z]{3}(\.(cn|com|com.cn|net))?$/i,

				mobilePhone : /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,

				fixPhone:/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,

				postcode:/^[1-9][0-9]{5}$/,

				english:/^[a-zA-Z]+$/,

				time:/^\d{4}\/\d{2}\/\d{2}$/,

				engandnum:/^\w+$/

		} 

		publicValidata.prototype.init = function () {

			this.trigger();
			this.reset();

		};

		//给错误定位
		publicValidata.prototype.fixposition = function () {

			var errorClass = this.config['errorClass'],

				$errorClass = $('.'+errorClass);

				if($errorClass.size() == 0) {

					this.submitFun();

				}else {

					var disTop = $errorClass.eq(0).offset().top;

					$('body,html').animate({

						scrollTop:disTop-30

					})

				}

				
		}

		//只要点击就清除错误信息
		publicValidata.prototype.reset = function () {

			var requireP = $('.requireIn'),

				objRoot = this;

				requireP.on('click input',function () {

					var _this = $(this);

					_this.removeClass(objRoot.config['errorClass']);


					//如果出现两个input同用一个错误提示的情形下 
					if(_this.nextAll(requireP).hasClass(objRoot.config['errorClass'])) return;

				    objRoot.someInfo()['errplace'](_this,null,1);

				})

		}

		publicValidata.prototype.trigger = function () {

			var _this = this;

			this.$ele.on('click',function (e) {

				e.preventDefault();

				if(_this.config['submitBefore'] && typeof _this.config['submitBefore'] === 'function') {

					if(!_this.config['submitBefore']()) {

						return false;

					}
 
				}

				_this.validataRequire();

				_this.fixposition();

			});

		}
		//提交
		publicValidata.prototype.submitFun = function () {

			var form = this.config['form'];

			var ajaxfun = this.config['ajaxfun'];

				if(ajaxfun && typeof ajaxfun == 'function') {

					ajaxfun();

				}else {

					$(form).submit();

				}
		}

		//判断一些方法
		publicValidata.prototype.someInfo = function () {

			var errorPlace = this.config.errorPlace,

				errorPlaceshowClass =this.config.errorPlaceshowClass,

				_this = this;

			return {

				errplace : function (obj,container,remove,commonIs) {
					//如果错误信息在内部
					if(_this.config.errorPlacePosition == 'inner') {

						if(remove) {  //去除错误

							if(obj.prevAll('.requireIn').hasClass(_this.config['errorClass'])) return;			//如果有两个输入框同用一个错误信息DOM 那么这里判断 如果这种情形下 前面有个框还是错误的 那么之后的错误提示不需要被清除
					 		
							obj.nextAll(errorPlace).removeClass(errorPlaceshowClass).html('');

						}else {		//增加错误

							obj.nextAll(errorPlace).addClass(errorPlaceshowClass).html(container);

							_this.lock = true; //锁

						}

					//如果错误信息在外层级
					 }else {

					 	if(remove) {

					 		if(obj.prevAll('.requireIn').hasClass(_this.config['errorClass'])) return;
					 		
					 		obj.parent().next(errorPlace).removeClass(errorPlaceshowClass).html('');

					 	}else {

					 		obj.parent().next(errorPlace).addClass(errorPlaceshowClass).html(container);

					 		_this.lock = true;

					 	}

					 }

				}

			}

		}

		//验证规则
		publicValidata.prototype.validataRules = function (o){

				//有内容的输入框的内容
			var nowName = o.attr('name'),

				nowValue = $.trim(o.val()),

				ruleObj = this.config.rules,

				hasnowName = ruleObj.hasOwnProperty(nowName),

				ruleRe = ruleObj[nowName][0],

				hasError = o.attr('class').indexOf(this.config.errorClass)>-1 ?  1 : 0,   //当前的输入框是否已经有了错误class

				//有填充的错误信息 就用用户定义的 没有就用require里面填的
				rulesMsg = ruleObj[nowName].length>1 ? ruleObj[nowName][1] : this.config.requireinputMsg[nowName];

				//判断会不会填默认的正则而不是自己填写

				if(typeof ruleRe == 'string') {
		
					var ruleRe = this.defaultRules.hasOwnProperty(ruleRe) ? this.defaultRules[ruleRe] :  ruleObj[nowName][0];

				}
				//验证未通过
				if(!ruleRe.test(nowValue)) {

					if(!hasError) {

						o.addClass(this.config.errorClass)

					}
					this.someInfo()['errplace'](o,rulesMsg);

				}else {		//验证成功

					if(hasError) {

						o.removeClass(this.config.errorClass)

					}

					this.someInfo()['errplace'](o,rulesMsg,1);

				}

		}

		//判断必须要验证的输入框
		publicValidata.prototype.validataRequire = function () {

			var requireP = $('.requireIn'),

				config = this.config,

				requirePLength = requireP.size();

				_this = this;

				if(requirePLength) {

					requireP.each(function (i,o) {

						var container = $.trim($(o).val()),

							allName = $(o).attr('name'),

							hasmsgName =_this.requireinputMsg.hasOwnProperty(allName);

						//如果是空的
						if(!container) {

							$(o).addClass(config.errorClass);
							//如果自定的MSG里面有这个属性的话
							if(hasmsgName) {

								var msgContainer =_this.requireinputMsg[allName];

								_this.someInfo()['errplace']($(o),msgContainer);

							}

							_this.lock = true;   //锁
							
						}else {

							// $(o).removeClass(config.errorClass);

							// _this.someInfo()['errplace']($(o),msgContainer,1);

							//不为空下面的验证
							_this.validataRules($(o));

						}

					});

				}

		}


		if(!$.fn.publicValidata) {

			$.fn.publicValidata = function (arg) {

				return this.each(function (i,o) {

					var _this = $(o),

						newValidate = new publicValidata(_this,arg).init();	 	

				})

			}

		};

//调用demo

// //	按钮的选择器
// 	$('.submitbtn').publicValidata({		

// 		requireinputMsg: {											//必填项的信息

// 			'ueser-surname' : '*请填写英文格式的姓名，可用拼音代替',

// 			'ueser-name' : '*请填写英文格式的姓名，可用拼音代替'

// 		},

// 		errorPlace : '.errplace',		    //错误框的选择器

// 		form:'.infoform',					//表单的选择器

// 		// ajaxfun:function () {			//ajax提交

// 		// 	alert(2)

// 		// },

// 		rules : {

// 			'ueser-surname' : ['engandnum'],

// 			'ueser-name' : ['engandnum','填错了']   //数组个数1  第二个错误信息 为requireinputMsg的信息  两个就是数组的第二项

// 		}

// 	});