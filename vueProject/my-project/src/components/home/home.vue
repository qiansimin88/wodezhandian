<template>
	<div id="header">
		首页			<!--increment是当前组件的方法-->
		<button @click='increment'>点击哦+1</button>
	</div>
</template>
<style>

</style>
<script>
//得来的action中的函数
import * as actionsobj from '../../vuex/actions'

export default {
	name : 'home',
	vuex : {
		actions : {
			increment : actionsobj.incrementCounter  //执行actions中的方法
		} 
	},
	data () {
		return {
			demo: 123
		}
	},
	ready () {
		this.$dispatch('headerway','home')
	}
}
</script>