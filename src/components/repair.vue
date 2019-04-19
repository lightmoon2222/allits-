<template>
	<div>
		<footernaviga></footernaviga>

		<div class="repair_list">
			<img src="../assets/foot_icon/online_consu_icon.png">
			<span>在线即时咨询，众多技术专家在线解答</span>

			<van-field v-model="enterprise_num" label="企业会员号:" @input="handleInput" />
			<p class="repair_tips">请输入贵公司的的企业会员号,如果没有,或者不知道,可以不用填写</p>
			
			<div class="online_consu_but">开始在线咨询</div>
			<div class="repair_foot">
					<a class="line"></a>
					<span>or</span>
					<a href="tel:400-810-8107" class="call_phone">咨询电话：400-810-8107</a></a>
					<div class="add_que" @click="to_sub_que">在线提交问题</div>
			</div>
		</div>
	</div>
</template>

<script>
import footernaviga from './footernaviga'
	export default {
		data() {
			return {
				enterprise_num: '' //企业会员号
			};
		},
		components: {
			footernaviga
		},
		methods: {
			//企业会员号输入框无法输入非数字
			handleInput(e) {
				this.enterprise_num = e.replace(/[^\d]/g, '');
			},
			//跳转在线留言页
			to_sub_que(){
				this.$router.push({path:'/repair_sub_que'})
			}
		}
	}
</script>

<style scoped lang="less">
	.repair_list {
		margin-top: 70px;

		img {
			width: 255px;
			height: 200px;
			display: block;
			margin: 0 auto;
		}

		span {
			color: #666666;
			text-align: center;
			display: block;
			font-size: 30px;
			letter-spacing: 1px;
			padding-top: 60px;
		}

		.van-field {
			height: 90px !important;
			font-size: 29px !important;
			line-height: 70px !important;
			margin-top: 40px;
			letter-spacing: 1px;
			color: #666666 !important;
		}
		.repair_tips{
			text-align: left;
			color: #cccccc;
			padding-left: 33px;
			font-size: 23px;
			padding-top: 20px;
		}
		.online_consu_but{
			width: 700px;
			height: 100px;
			font-size: 33px;
			text-align: center;
			line-height: 100px;
			margin: 0 auto;
			background-color: #00a4f9;
			border-radius: 10px;
			color: #ffffff;
			margin-top: 45px;
			}
			.repair_foot{
				width: 450px;
				height: 400px;
				margin: 0 auto;
				position: relative;
				overflow: hidden;
				a{
					display: block;
					width: 100%;
					height: 1px;

					margin-top: 90px;
				}
				span{
					color: #999999;
					padding: 0 !important;
					width: 100px !important;
					position: absolute;
					top: 80px;
					background-color: #F2F2F2;
					z-index: 110;
					left: 177px;
				}
				.call_phone{
					color: #999999;
					margin-top: 60px;
					font-size: 29px;
					text-align: center;
				}
				.add_que{
					color: #00a4f9;
					font-size: 28px;
					text-align: center;
					position: relative;
					top:70px;
				}
				
			}
	}
</style>
