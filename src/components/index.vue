<template>
	<div class="index">
		<div class="index_header">
			<img src="../assets/foot_icon/index_header.jpg">
		</div>
		<div class="do_for">
			<h2>我们能为您做什么？</h2>
			<p style="padding-top: 10px;">IT经理服务为中小企业提供IT设备基础运维保障 </p>
			<p style="padding-top: 5px;">通过信息化管理提高内部运转效率</p>
			<img src="../assets/foot_icon/index_list.png">
			<a class="find_more" @click="find_more">
				<img src="../assets/foot_icon/index_more.jpg">
			</a>
		</div>
		<div class="services">
			<span class="invoice_title">
			<a></a>&nbsp;增值服务
		</span>
			<div class="line_list">
				<span><img src="../assets/foot_icon/adva1.png"><a style="padding-top: 21px;">工程师全自营</a></span>
				<span><img src="../assets/foot_icon/adva2.png"><a>每客户5人<br />专属客服</a></span>
				<span><img src="../assets/foot_icon/adva3.png"><a>15分钟<br />工程师上门</a></span>
				<span style="border-right: none;"><img src="../assets/foot_icon/adva4.png" style="height: .84rem;width: .7rem;"><a>300名技术 <br />二线后台支持</a></span>
			</div>
			<div class="line_list">
				<span><img src="../assets/foot_icon/adva5.png"><a>热线服务电话<br /> 7*12*365</a></span>
				<span><img src="../assets/foot_icon/adva6.png"><a style="padding-top: 21px;">厂商授权服务</a></span>
				<span><img src="../assets/foot_icon/adva7.png"><a>10大城市差旅 <br />IT服务</a></span>
				<span style="border-right: none;"><img src="../assets/foot_icon/adva8.png"><a style="padding-top: 21px;">每月服务报告</a></span>
			</div>
		</div>
		<div class="our_team">
			<span class="invoice_title">
			<a></a>&nbsp;我们的团队
		</span>
		<img src="../assets/foot_icon/our_team.jpg" style="width: 100%;">
		</div>
		<div class="our_cus">
			<span class="invoice_title">
			<a></a>&nbsp;我们的客户
		</span>
		<img src="../assets/foot_icon/our_cus.jpg" style="width: 100%;">
		</div>
			<div class="call_us">
			<span>咨询电话：400-810-8107</span>
		</div>
		<footernaviga></footernaviga>
	</div>
</template>

<script>
	import footernaviga from './footernaviga'
	export default {
		name: 'HelloWorld',
		data() {
			return {

			}
		},
		components: {
			footernaviga
		},
		methods:{
			find_more(){
					this.$router.push({
								name: 'service',
							});
			}
		}
	}
</script>

<style scoped lang="less">
	.index {
		.invoice_title {
			width: 100%;
			display: block;
			font-size: 30px;
			height: 70px;
			line-height: 72px;
			color: #666666;
			background-color: #FFFFFF;
			a {
				display: inline-block;
				width: 7px;
				height: 30px;
				position: relative;
				top: 4px;
				background-color: #00a4f9;
			}
		}
		.index_header {
			width: 100%;
			height: 350px;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.do_for {
			padding-top: 40px;
			background-color: #FFFFFF;
			padding-bottom: 20px;
			h2 {
				font-weight: 600;
				text-align: center;
				color: #333333;
				font-size: 38px;
			}
			p {
				text-align: center;
				font-size: 27px;
			}
			img {
				padding-top: 10px;
				width: 100%;
			}
			.find_more {
				width: 280px;
				display: block;
				margin: 0 auto;
			}
		}
		.services {
			margin-top: 20px;
			background-color: #FFFFFF;
			.line_list {
				width: 100%;
				overflow: hidden;
				span {
					width: 24.7%;
					float: left;
					height: 200px;
					border-top: 1px solid #e9e9e9;
					border-right: 1px solid #e9e9e9;
					img {
						width: 65px;
						height: 64px;
						display: block;
						margin: 0 auto;
						padding-top: 30px;
					}
					a {
						display: block;
						text-align: center;
						width: 100%;
						margin: 0 auto;
						padding-top: 25px;
						color: #666666;
						font-size: 27px;
					}
				}
			}
		}
		.our_team {
			padding-top: 20px;
			padding-bottom: 20px;
		}
		.our_cus{
			padding-top: 1px;
			padding-bottom: 100px;
			img{
				display: block;
			
			}
		}
		.call_us {
			width: 100%;
			padding-bottom: 74px;
			position: relative;
			span {
				position: absolute;
				top: -85px;
				display: block;
				text-align: center;
				width: 100%;
				color: #999999;
				font-size: 30px;
			}
		}
	}
</style>