<template>
	<div>
		<div class="infor_title">
			<img src="../assets/foot_icon/infor_icon.png">
			<span>账户资料</span>
		</div>
		<div class="infor_link">
			<van-cell :title="company" is-link />
			<van-cell title="公司地址" is-link />
			<van-cell title="修改资料" is-link />
			<van-cell title="修改密码" is-link />
		</div>
		<div class="sing_out" @click="out_login">退出登录</div>
	</div>
</template>

<script>
		import { users } from '../../static/public_css/public_axios.js'
	export default {
		data() {
			return {
				company: ''
			};
		},
		created() {
			this.company = JSON.parse(localStorage.getItem('user_infor')).companyName;
		},
		methods: {
			out_login() {
				this.$dialog.confirm({
					title: '退出登录',
					message: '您确定要退出登录吗？'
				}).then(() => {
					localStorage.clear()
					this.$router.push({
						name: 'login'
					})
				}).catch(() => {

				});
			}
		}
	}
</script>

<style scoped lang="less">
	.infor_title {
		width: 100%;
		height: 60px;
		position: relative;
		img {
			width: 30px;
			height: 35px;
			margin: 10px 0 10px 10px;
		}
		span {
			display: inline-block;
			position: absolute;
			top: 10px;
			left: 50px;
			font-size: 27px;
		}
	}
	
	.infor_link {
		.van-cell {
			font-size: 30px !important;
			line-height: 70px;
			border-bottom: 1px solid #C9C9C9;
		}
	}
	
	.sing_out {
		width: 700px;
		height: 100px;
		font-size: 35px;
		text-align: center;
		line-height: 100px;
		margin: 0 auto;
		background-color: #00a4f9;
		border-radius: 10px;
		color: #ffffff;
		margin-top: 45px;
	}
</style>