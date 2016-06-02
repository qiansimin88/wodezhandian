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
				type: Function    //下拉的回调函数
			}
		},
		data () {
			return {
				uuid: Math.random().toString(36).substring(3, 8),   //一个惟一的值
				scrollEventTarget: null,       //得到滚动的对象
				containerFilled: null   // boolean  true代表 内容超过了容器的高度
			}
		},
		methods: {
			init () {
				this.scrollEventTarget = this.getScrollEventTarget(this.$el)

				//如果用户 设置了一个 水位阀值的 函数的话 
				if(typeof this.bottomMethod == "function") {
					this.fillContainer()
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