<template>
	<div id="list">
	</div>
		<!-- {{ getvalue }}
		<button @click="cust" :class="{initrun:initState.count}">还有<span v-if ="initState.count">{{initState.count}}秒</span></button> -->
<div id="test">
	<loadmore id="hehe" :bottom-method="loadTop2" :bottom-pulltext="呵呵" :bottom-status.sync="topStatus">
	  <ul>
	    <li v-for="item in list">{{ item }}</li>
	  </ul>
	  <div slot="bottom" class="kebab-loadmore-bottom">
	    <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">↓</span>
	    <span v-show="bottomStatus === 'loading'">Loading...</span>
	  </div>
	</loadmore>
</div>
</template>
<style>
	#test {height: 600px;overflow: auto;background: red}
	.initrun {background:red}
	#hehe {font-size: 5rem}
#hehe	ul li {
		height: 5rem;border-bottom: 1px solid #ccc;font-size:5rem;
	}
</style>
<script>
// import { getCount } from '../../vuex/getters'
// import store from '../../vuex/storeModule'
import {clear} from '../../vuex/newaction'
import Loadmore from 'vue-loadmore'
export default {
	name : "list",
	components: {
		Loadmore
	},
	vuex : {
		// getters : {
		// 	 // 注意在这里你需要 `getCount` 函数本身而不是它的执行结果 'getCount()'
		// 	getvalue : timerstate => timerstate.count
		// },
		// actions: {
		// 	clear
		// }
	},
	data () {
		return {
			// hehe: 123,
			// initState: store.state
			list:[],
			start:'s',
			hehe:1
		}
	},
	ready () {
		// this.$dispatch('headerway','list')
		for(var i=0; i<30; i++) {
			this.list.push(i)
		}
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
		},
		loadTop2(id) {
		  this.$broadcast('onBottomLoaded', id);
		  this.hehe += 1
			this.list.push(this.start+this.hehe)	 	
		}
	}
}
</script>