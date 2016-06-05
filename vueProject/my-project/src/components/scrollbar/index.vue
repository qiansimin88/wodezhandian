<template>
	<div id="page-loadmore-wrapper">
		<pull :bottom-method="loadBottom" bottom-status = 'bottomStatus'>
			<div>aasd<br>
			asd<br></div>
			<div>aasd<br>
			asd<br></div>
			<div>aasd<br>
			asd<br></div>
			<div>aasd<br>
			asd<br></div>
			<div>aasd<br>
			asd<br></div>
			<div>aasd<br>
			asd<br></div>
			<div>aasd<br>
			asd<br></div>
			<div>aasd<br>
			asd<br></div>
			<div>aasd<br>
			asd<br></div>
			<div>aasd<br>
			asd<br></div>
			<div>aasd<br>
			asd<br></div>
			<div>aasd<br>
			asd<br></div>

			<div>aasd<br>
			asd<br></div>
			<div>aasd<br>
			asd<br></div>
		</pull>
	</div>
</template>
<script>
	import pull from '../../zujian/pullup.vue'
	export default {
		name:'scrollbar',
		data () {
			return {
				bottomStatus: ''  
			}
		},
		components : {
			pull
		},
		methods: {
			loadBottom (id) {
			}
		}
	}
</script>
<style>
	#page-loadmore-wrapper {
		height: 40rem; overflow: scroll;
		font-size: 4rem;
	}
</style>