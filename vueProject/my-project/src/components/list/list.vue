<template>
	<div id="list">
		列表
		哈哈现在是{{ getvalue }}
		<button @click="cust" :class="{initrun:initState.count}">还有<span v-if ="initState.count">{{initState.count}}秒</span></button>
	</div>
</template>
<style>
	.initrun {background:red}
</style>
<script>
// import { getCount } from '../../vuex/getters'
// import store from '../../vuex/storeModule'
import {clear} from '../../vuex/newaction'
export default {
	name : "list",
	vuex : {
		getters : {
			 // 注意在这里你需要 `getCount` 函数本身而不是它的执行结果 'getCount()'
			getvalue : timerstate => timerstate.count
		},
		actions: {
			clear
		}
	},
	data () {
		return {
			// hehe: 123,
			// initState: store.state
		}
	},
	ready () {
		// this.$dispatch('headerway','list')
		console.log(this.clear)
	},
	methods: {
		// cust () {
		// 	if(!this.initState.run) {  //只有false不再运行的时候才可以重新开启定时器
		// 		this.initState.count = 10  //重新赋值
		// 		store.custDown();  //开启
		// 		//下面可以写一下请求
		// 	}
		// }
		cust () {
			this.clear()
		}
	}
}
</script>