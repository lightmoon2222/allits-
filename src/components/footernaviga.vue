<template>

	<!-- 底部导航 -->
	<div class="footer">
		<router-link :to="{path:'/index'}">
			<img :src="$route.path === '/index' || $route.path === '/' ? tabBarImgArr[0].selected : tabBarImgArr[0].normal">
			<span :class="$route.path === '/index' || $route.path === '/' ? 'active':'no_active'">首页</span>
		</router-link>
		
		<router-link :to="{path:'/service'}">
			<img :src="$route.path === '/service'? tabBarImgArr[1].selected : tabBarImgArr[1].normal">
			<span :class="$route.path === '/service' ? 'active':'no_active'">服务</span>
		</router-link>
		
		<router-link :to="{path:'/repair'}">
			<img :src="$route.path === '/repair' ? tabBarImgArr[2].selected : tabBarImgArr[2].normal">
			<span :class="$route.path === '/repair' ? 'active':'no_active'">报修</span>
		</router-link>
		
		<router-link :to="{path:'/mine'}">
			<img :src="$route.path === '/mine' ? tabBarImgArr[3].selected : tabBarImgArr[3].normal">
			<span :class="$route.path === '/mine' ? 'active':'no_active'">账户</span>
		</router-link>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				active: 0,
				tabBarImgArr: [ //图片切换
					{
						normal: require('../assets/foot_icon/index_icon.png'),
						selected: require('../assets/foot_icon/index_select_icon.png')
					},
					{
						normal: require('../assets/foot_icon/service_icon.png'),
						selected: require('../assets/foot_icon/service_select_icon.png')
					},
					{
						normal: require('../assets/foot_icon/repair_icon.png'),
						selected: require('../assets/foot_icon/repair_select_icon.png')
					},
					{
						normal: require('../assets/foot_icon/mine_icon.png'),
						selected: require('../assets/foot_icon/mine_select_icon.png')
					}
				]
			};
		},
		methods: {
			sss(active) {
				console.log(active)
			}
		}
	}
</script>

<style scoped lang="less">
	html {
		background-color: #f2f2f2;
	}
	
	.active {
		color: #00a4f9 !important;
	}
	
	.no_active {
		color: #a0a0a0 !important;
	}
	
	.footer {
		width: 100%;
		height: 100px;
		background-color: #ffffff;
		position: fixed;
		left: 0px;
		z-index: 100 !important;
		display: flex;
		justify-content: space-around;
		bottom: 0px;
		img {
			width: 46px;
			height: 44px;
			margin-top: 8px;
		}
		span {
			width: 100%;
			font-size: 25px;
			text-align: center;
			display: block;
			color: #a0a0a0;

		}
	}
</style>