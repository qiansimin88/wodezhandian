<template>
	<div>
		<a v-link="{ path:'/' }">首页</a>
	
		<a v-link="{ path:'/list' }">列表</a>
	</div>
</template>
<script>
	export default {
		name :"dock"
	}
</script>