<template>
	<div id="list">
		列表
		哈哈现在是{{ getvalue }}
	</div>
</template>
<script>
import { getCount } from '../../vuex/getters'
export default {
	name : "list",
	vuex : {
		getters : {
			 // 注意在这里你需要 `getCount` 函数本身而不是它的执行结果 'getCount()'
			getvalue : getCount
		}
	},
	data () {
		return {
			hehe: 123
		}
	},
	ready () {
		this.$dispatch('headerway','list')
	}
}
</script>