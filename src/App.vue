<template>
	<div id="app">

		<router-view>
		</router-view>
			
	</div>
</template>

<script>
	import footernaviga from './components/footernaviga'
	export default {
		name: 'App',
		data() {
			return {
			
			}
		},
		components: {
			footernaviga
		}
	}
</script>

<style scoped lang="less">

</style>
