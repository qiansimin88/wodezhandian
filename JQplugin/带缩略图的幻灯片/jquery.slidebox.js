//构造函数		
//qq:348867341 qsm 2015-8-1 如果使用 move里面要修改
			function slidebox (o,arg) {

				this.config = $.extend({

					ctrlDomUl: '.small_li',     //上下滚动的小图

					activeClass:'active', 	  //小图选中的class

					showlength:4,			  //展示小图的个数(仅仅用来计算而不是用来计算DOM)

					prevBtn:'.prev_btn',	  //上一张的按钮

					nextBtn:'.after_btn',	  //下一张的按钮

					bigIMGbaseURl:'/data/skin/mall_dist/img/fang/',    //设定大图的基础的URL路径

					loop:false,                 //是否开启循环

					moveSpeed : 400

				},arg||{});

				config = this.config;

				this.nowIndex = 0;

				this.moveStatus = false;      //移动的状态
				//小图Ul
				this.$smallImgList = $(config['ctrlDomUl']);

				this.$smallImgLi = this.$smallImgList.find('li');

				this.sizeNum = this.$smallImgLi.size();

				this.$bigimg = o.find('img');

				this.$prevBtn = $(this.config['prevBtn']);  //上一个

				this.$nextBtn = $(this.config['nextBtn']);	 //下一个

			};

			slidebox.prototype.init = function () {

				this.smallimgclick();

				this.clickFun();
				
			};

			//滚动的函数
			slidebox.prototype.move = function () {

				var SingleMoveNum = this.$smallImgLi.eq(0).outerHeight(),		//单个单位的高度

					active = this.config['activeClass'],

					nowIndex = this.nowIndex,

					nowMoveNum = this.sizeNum-1-this.config.showlength/2,

					moveUl = this.$smallImgList,

					moveSpeed = this.config.moveSpeed,

					moveMargin = this.$smallImgLi.css('marginBottom') ? parseInt(this.$smallImgLi.css('marginBottom')) : 0;   //为了布局的时候有margin计算进去

					this.bigimgshow();  //大图的切换

					this.$smallImgLi.eq(nowIndex).addClass(active).siblings('li').removeClass(active);

					if(nowIndex < this.config.showlength / 2-1) {

						moveUl.css('top',0)

					}else if (nowIndex > nowMoveNum)  {
						
						var lastTop =-this.$smallImgLi.eq(this.sizeNum-2-this.config.showlength/2).position().top;

						moveUl.css('top',lastTop)

					}else {

						var moveDis = -((nowIndex-1)*SingleMoveNum+moveMargin*(nowIndex-1));

						moveUl.stop(true).animate({

							top : moveDis

						},moveSpeed);

					}

			};
			//按钮的点击
			slidebox.prototype.clickFun = function () {

				var _this = this;
				//上一个按钮
				this.$prevBtn.on('click',function () {

					_this.nowIndex--;

					//如果循环
					if(_this.config.loop) {

						if(_this.nowIndex == -1) {

							_this.nowIndex = _this.sizeNum - 1;

						}

					}else {

						if(_this.nowIndex == -1) {

							_this.nowIndex = 0;

							return;

						}

					}

					_this.move();

				});

				this.$nextBtn.on('click',function () {

					_this.nowIndex++;
					//循环
					if(_this.config.loop) {

						if(_this.nowIndex == _this.sizeNum ) {

							_this.nowIndex = 0

						}
					}else {

						if(_this.nowIndex == _this.sizeNum ) {

							_this.nowIndex = _this.sizeNum - 1;

							return;

						}

					}

					_this.move();
					
				});

			};
			//大图的变化
			slidebox.prototype.bigimgshow = function () {

				var nowImgkey = this.$smallImgLi.eq(this.nowIndex).find('img'),

					nowImgkeySrc = nowImgkey.attr('src'),

					imgNameArr = nowImgkeySrc.match(/\/(\w+)/g),

					imgName = RegExp.$1,  //使用分组来快速

					bigImgSrc = this.config['bigIMGbaseURl']+imgName+'_big.jpg';

					this.$bigimg.attr('src',bigImgSrc).hide().fadeIn(200);
			};
			//小图的点击
			slidebox.prototype.smallimgclick = function () {

				var _this = this;

				this.$smallImgLi.on('click',function () {

					var index= $(this).index();

						if(index == _this.nowIndex) return;

						_this.nowIndex = index;

						_this.move();

				});

			}	


			//注册插件
			if(!!!$.fn.slidebox) {

				$.fn.slidebox = function (arg) {

					return this.each(function (i,o) {

						var _this = $(o),

							slideboxInit = new slidebox(_this,arg).init();

					})

				}

			};