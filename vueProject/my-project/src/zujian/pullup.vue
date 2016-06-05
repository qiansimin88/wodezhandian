<template>
	<div class="pull-box">
		<slot></slot>	
	</div>
</template>
<script>
	export default {
		name: 'pull',
		props: {
			bottomMethod: {
				type: Function    //上拉的回调函数
			},
			bottomStatus: {		  //上拉的状态 pull还以拉的状态
				type: String,
				default: '' 
			},
			bottomAllLoaded: {	  //前端允许是否执行下拉的命令 比如数据加载完了 就不需要还可以下拉刷新了
				type: Boolean,	  //true 表示不需要下拉；  
				default: false   
			}
		},
		data () {
			return {
				uuid: Math.random().toString(36).substring(3, 8),   //一个惟一的值
				scrollEventTarget: null,       //得到滚动的对象
				containerFilled: null,   // boolean  true代表 内容超过了容器的高度
				startY: 0,     //触摸开始距离当前浏览器顶部的坐标
				startScrollTop: 0, //触摸开始的时候 滚动条已经滚动的高度
				currentY: 0,      //触摸滑动时候 手指坐标 距离客户端Y轴的坐标
				direction: '',   //当前手指滑动的方向 判断开始和滑动的Y坐标差 > 0 向下 < 0 向上
				bottomReached: false,  //判断滚动的DOM 是否滚动最顶端了 true 就是滚动头了
				translate:0     //到头时给 滚动DOM的CSS向上属性
			}
		},
		methods: {
			init () {
				this.scrollEventTarget = this.getScrollEventTarget(this.$el)
				this.bottomStatus = 'pull'   //初始化上拉的状态就是 pull
				//如果用户 设置了一个 水位阀值的 函数的话 
				if(typeof this.bottomMethod == "function") {
					this.fillContainer()
					this.bindTouchEvents()
				}	
			},
			//给当前元素绑定三个触摸事件
			 bindTouchEvents() {
		        this.$el.addEventListener('touchstart', this.handleTouchStart);
		        this.$el.addEventListener('touchmove', this.handleTouchMove);
		        this.$el.addEventListener('touchend', this.handleTouchEnd);
		      },
		     //开始触摸
		     handleTouchStart (event) {
		     		//event.touches  代表几个触摸的手指 一般是一个
		     	//开始的Y坐标
		     	this.startY = event.touches[0].clientY 
		     	//开始的时候 滚动条的滚动的高度
		     	this.startScrollTop = this.getScrollTop(this.scrollEventTarget)
		     	//触摸开始 设定未到达顶部
		     	this.bottomReached = false;

		     },
		     //触摸滑动
		     handleTouchMove (event) {
		     	//拒绝开始触摸时候超出 滚动事件高度 范围的事件
		     	if(this.startY < this.$el.getBoundingClientRect().top && this.startY > this.$el.getBoundingClientRect().bottom) return 
		     	//当前的手指滚动坐标Y轴
		     	this.currentY = event.touches[0].clientY 
		     	//当前手指滚动的Y坐标和一开始的差值
		     	let distanceY = this.currentY - this.startY 
		     	//判断手指滑动的方向    大于0 自然是向下咯
		     	this.direction = distanceY > 0 ? 'down' : 'up' 

		     	//如果向上拉 就要时时判断是否拉到头了
		     	if(this.direction == 'up') {
		     		//如果到头了 就不需要在计算了 直接选true即可
		     		this.bottomReached = this.bottomReached || this.checkBottomReached()
		     	}
		     	//如果 有滑动到底的函数+向上滑动+到底+状态可拉+前端允许都成立
		     	if(typeof this.bottomMethod === 'function' && this.direction == 'up' && this.bottomReached && this.bottomStatus !== 'loading' && !this.bottomAllLoaded ) {
		     		//到头就禁止滑动了
		     		event.preventDefault()
		     		event.stopPropagation()
		     	//滚动DOM的拉升距离 
		     	//这其实有个算法
		     	//因为不能完全使用distanceY  滚动条到底的滚动条 - 开始的滚动条距离 + 滚动的差值 就相当于 实际到底之后的滚动距离  可以这样理解 在没有到底之前滚动条的差值 其实是等于 滚动的差值的 只有到底之后 才不想等 而这个之后的距离 才是真正的滚动距离
		     		this.translate = this.getScrollTop(this.scrollEventTarget) -this.startScrollTop + distanceY
		     	}
		     },
		     //判断滚动DOM是否完全达到 滚动容器的底部了
		     checkBottomReached () {
		     	//如果滚动容器是window
		     	//那么document.body.scrollTop + document.documentElement.clientHeight === document.body.scrollHeight   就是滚到底了  滚动条的距离+当前视口的高度就是 当前总共滚动的距离
		     	//document.body.scrollHeight  就是当前最高的高度
		     	if(this.scrollEventTarget == window) {
		     		return document.body.scrollTop + document.documentElement.clientHeight === document.body.scrollHeight 
		     	}else {
		     		return this.$el.getBoundingClientRect().bottom === this.scrollEventTarget.getBoundingClientRect().bottom
		     	}
		     },
		     //得到滚动条滚动的高度
		     getScrollTop (ele) {
		     	//window的话 获取滚动条额高度 一般是
		     	// window.pageYOffset || document.body.scrollTop || documet.documentElement.scrollTop
		     	if (ele == window) {
		     		return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop)
		     	}else {
		     		//普通元素 直接获取 ele.scrollTop
		     		return ele.scrollTop
		     	}
		     },
			///////////////////////////////////////////
			//得到  设置了 内容为滚动的 DOM 采用while循环来巧妙的得到循环对象 
			//HTML 和 body默认排除  这样不合理
			//小知识：标签节点有tagName === nodeName,   nodeType = 1
			// 		  文本借点比如 <div>adsas</div>  adsa就是文本节点 nodeType = 3
			///////////////////////////////////////////
			getScrollEventTarget (element) {
				let currentNode = element
				while(currentNode && currentNode.tagName !== "HTML" && currentNode.tagName !== 'BODY' && currentNode.nodeType == 1) {
					// 获取当前的滚动DOM
					// document.defaultView得到当前 document文档对象相关联的 window 一般用window即可 若想装逼可以用defaultView 其实差不多 defaulrView可以侦测ifream
					// getComputedStyle 获得 非行间样式
					//获得当前组件顶级DOM的 oveflowY属性
					let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY
						if(overflowY == 'scroll' || overflowY == 'auto') return currentNode			
						currentNode = currentNode.parentNode 		
				}
				return window  //都没有就返回window
			},
			/**
			 * [判断容器的内容 是否填满了 最外层具有overflow:scroll或者overflow:auto的容器]
			 * @return {[type]} [description]
			 * getBoundingClientRect()返回left top right bottom width height  距离客户端的距离的对象 
			 * bottom和right分别代码  底和 右边 距离 可视客户端顶和最左边的距离
			 */
			fillContainer() {
				  if (this.scrollEventTarget === window) {
		            this.containerFilled = this.$el.getBoundingClientRect().bottom >= document.documentElement.getBoundingClientRect().bottom;
		          } else {
		            this.containerFilled = this.$el.getBoundingClientRect().bottom >= this.scrollEventTarget.getBoundingClientRect().bottom;
		          }
		          //如果没超过    意味着已经拖拽上来了 就是内容的最底部已经高于 带有滚动属性scroll的底边了 
		          if(!this.containerFilled) {
		          	 this.bottomStatus = 'loading';
         			 this.bottomMethod(this.uuid);
		          }
			}
		},
		ready () {	
			this.init()  //执行
		}
	}
</script>
<style>
	.pull-box {background: red}
</style>