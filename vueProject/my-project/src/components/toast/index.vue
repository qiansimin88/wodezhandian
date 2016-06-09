<template>
	<div id="page-loadmore-wrapper">
		<button @click = 'create'>adsad</button>
		<!-- <toast message="打开" add-class="hehe" position='middle'></toast> -->
	</div>
</template>
<script>
	import toast from '../../zujian/toast'
	export default {
		data () {
			return {
				
			}
		},
		components : {
			
		},
		methods: {
			create() {
				toast({
					position: 'top',
					message: '弹出',
					addClass: 'show',
					duration: 2000
					
				})
			}
		},
		ready () {
			
		}
	}
</script>
<style lang="less">

</style>