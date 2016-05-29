<template>
	<div id="header">
		首页			<!--increment是当前组件的方法-->
	
		<button @click='increment'>点击哦+1</button>
		<button @click="add">点击</button>
		{{initState2.run}}
	</div>
</template>
<style>

</style>
<script>
//得来的action中的函数
// import * as actionsobj from '../../vuex/actions'
// import store from '../../vuex/storeModule'
// import store from '../../vuex/newStore.js'
import {run,clear} from '../../vuex/newaction.js'

export default {
	name : 'home',
	vuex : {
		actions : {
			run  //执行actions中的方法
		},
		getters: {
			status: state => state.run
		} 
	},
	data () {
		return {
			// demo: 123,
			// initState2: store.state
		}
	},
	ready () {
		////////////////////////////////////////
		// this.$dispatch('headerway','home') //
		////////////////////////////////////////
		// console.log(this.run);
	},
	methods : {
		add () {		//注意  这个地方的if明天加个 && loginmobile没变才行 变化了还是走下一步
			if(this.status) {  //定时器还在运行 那么直接跳过去不重新赋值定时器
				this.$router.go('/list')
			}else {				//定时器完全运行完毕  重新执行并且赋值 state.count
				this.run()  //开启
				//接下来可以写请求之类的
				this.$router.go('/list')
			}
		}
	}

}
</script>