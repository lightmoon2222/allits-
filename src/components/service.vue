<template>
	<div class="service">
		<span class="back">
		<p class="title">包月服务</p>
		<a class="price">低至￥30.00元/台/月</a>
		<a class="buy" @click="to_buy">立即购买</a>
		</span>
		<footernaviga></footernaviga>
		<div class="contant_swiper" >
			<span class="titles">您是否为以下问题烦恼过？</span>
			<van-swipe indicator-color="#00a4f9" :autoplay='3000'>
				<van-swipe-item>
					<div class="item_list">
						<span class="item_title" style="background-color: #ffbf31;">
						作为老板，不知道如何管理公司IT问题？
					</span>
						<a style="border-top: 7px solid #ffbf31;"></a>
						<p>作为老板，公司的电脑、门禁、打印机、网络设备、会议系统，还有重要的财务软件，Office办公软件，总是收到员工的反馈说有各种各样的问题，网管经常面露难色说搞不了，还是需要去外面找人。一个月到底花了多少钱，解决了什么问题也搞不清楚，怎么样解决这样的困境，让办公能更有效？</p>
					</div>
				</van-swipe-item>
				<van-swipe-item>
					<div class="item_list">
						<span class="item_title" style="background-color: #61a7fd;">
						明明带宽很高，但是网速却很慢？
					</span>
					<a style="border-top: 7px solid #61a7fd;"></a>
						<p>公司申请了200M企业宽带，但是员工还是反馈网速很慢，影响办公，是设备不行需要更换么？还是是有人偷偷下载么？应该怎么办？</p>
					</div>
				</van-swipe-item>
				<van-swipe-item>
					<div class="item_list">
						<span class="item_title" style="background-color: #ff8286;">
						出差的时候碰到IT问题应该找谁？
					</span>
					<a style="border-top: 7px solid #ff8286;"></a>
						<p>出差见客户谈项目，电脑却出了问题无法开机，或者突然电源竟然忘了带，又或者临时需要一个大的移动硬盘。在这个人生地不熟的地方，公司的网管也远水救不了近火，该找谁来帮忙解决问题呢。</p>
					</div>
				</van-swipe-item>
				<van-swipe-item>
					<div class="item_list">
						<span class="item_title" style="background-color: #D2B48C;">
						重要会议就要开始，但是投影仪却连接不上？
					</span>
					<a style="border-top: 7px solid #D2B48C;"></a>
						<p>下午要给重要客户演示项目，结果投影不知道为什么连接不上；和外地同事、客户开视频会议，却怎么都听不到声音，看不到视频。</p>
					</div>
				</van-swipe-item>
				<van-swipe-item>
					<div class="item_list">
						<span class="item_title" style="background-color: #96CDCD;">
						你知道你找的修电脑的小店可靠么？
					</span>
					<a style="border-top: 7px solid #96CDCD;"></a>
						<p>办公电脑出了问题，找的路边的小店，也不知道水平怎么样，会不会把数据搞丢。跟我说要换个配件，不知道价格是否合理，东西质量怎么样。</p>
					</div>
				</van-swipe-item>
			</van-swipe>

		</div>
		<div class="line"></div>
		<div class="what_do">
			<span class="titles">我们能帮您做什么？</span>
			<div class="span_list">
				<div>
					<span><img src="../assets/foot_icon/icon1.png"></span>
					<p>企业IT设备运维服务</p>
					<a>电脑、打印机、服务器、会议设备、POS机、打卡机等IT设备咨询、安装、调试、维修和临时借用。让企业IT设备有专业人员管理，企业省心省钱</a>
				</div>
				<div>
					<span><img src="../assets/foot_icon/icon2.png"></span>
					<p>软件服务</p>
					<a>PC和移动端的Office办公套餐、邮件客户端、财务软件、企业通讯、呼叫中心系统等专属软件高级支持，帮助企业更高效地使用软件，提高内部运转效率</a>
				</div>
				<div>
					<span><img src="../assets/foot_icon/icon3.png"></span>
					<p>网络管理服务</p>
					<a>办公区上网限制和行为管理、网络安全策略、网络救援、VPN配置、数字化宽带管理，办公网络更安全，更经济。</a>
				</div>
				<div>
					<span><img src="../assets/foot_icon/icon4.png"></span>
					<p>IT标准化服务</p>
					<a>通过工具软件让中小企业的IT管理标注化，让企业资产和员工效率数字化实时显示，为企业经营者提供IT数据报告。</a>
				</div>
			</div>
		</div>
		<div class="line"></div>
		<div class="evaluate">
			<span class="title">我们的客户这么评价我们</span>
			<div class="div_list">
				<div>
					<a><img src="../assets/foot_icon/logo4.png"></a>
					<span>领先的办公电脑租赁于管理平台</span>
				</div>
				<div>
					<a><img src="../assets/foot_icon/logo3.png" style="width:60px;padding-left: 10px;"></a>
					<span>好租网专业商办互联网服务平台</span>
				</div>
				<div>
					<a><img src="../assets/foot_icon/logo2.png" style="width:33px;height: 33px;padding-left: 20px;"></a>
					<span>每日优鲜是专注于优质生鲜的电商平台</span>
				</div>
				<div>
					<a><img src="../assets/foot_icon/logo1.png"></a>
					<span>专注于信息产业投资</span>
				</div>
			</div>
		</div>
		<div class="line"></div>
		<div class="advantage">
			<span class="title">我们的核心优势</span>
			<div class="line_list" style="padding-top: 20px;">
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
		<div class="call_us">
			<span>咨询电话：400-810-8107</span>
		</div>
	</div>
</template>

<script>
	import footernaviga from './footernaviga'

	export default {
		data() {
			return {

			};
		},
		components: {
			footernaviga
		},
		methods: {
			to_buy() {
				this.$router.push({
					path: '/month_service'
				})
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.line {
		width: 100%;
		height: 28px;
		background-color: #F2F2F2;
	}
	
	.service {
		.contant_swiper {
			background-color: #FFFFFF;
			padding: 30px 0;
			margin-top: 40px;
			overflow: hidden;
			.titles {
				display: block;
				text-align: center;
				font-size: 32px;
				color: #333333;
			}
			.van-swipe {
				height: 420px;
				padding-top: 25px;
				.item_list {
					width: 85%;
					height: 370px;
					margin: 0 auto;
					box-shadow: 0px 0px 50px #E8E8E8;
					border-radius: 15px;
					position:relative;
					.item_title {
						text-align: center;
						height: 80px;
						display: block;
						line-height: 80px;
						color: #FFFFFF;
						font-size: 29px;
						border-top-left-radius: 15px;
						border-top-right-radius: 15px;
					}
					a {
						position: absolute;
						top: 77px;
						left: 50%;
						margin-left: -15px;
						border-left: 11px solid transparent;
						border-right: 12px solid transparent;
						border-top: 12px solid #FFFFFF;
						font-size: 0;
						line-height: 0;
					}
					p {
						color: #666666;
						padding: 20px;
						display: block;
						font-size: 28px;
						line-height: 37px;
					}
				}
			}
		}
		.back {
			margin-top: 30px;
			width: 100%;
			margin: 0 auto;
			height: 350px;
			display: block;
			background: url(../assets/foot_icon/back2.png);
			background-size: 100%;
			position: relative;
			.title {
				font-size: 58px;
				color: #FFFFFF;
				position: absolute;
				top: 60px;
				left: 40px;
				letter-spacing: 1px;
			}
			.price {
				position: absolute;
				color: #FFFFFF;
				font-size: 32px;
				top: 240px;
				left: 40px;
				letter-spacing: 1px;
			}
			.buy {
				position: absolute;
				right: 50px;
				top: 250px;
				color: #FFFFFF;
				font-size: 28px;
				border: 2px solid #FFFFFF;
				border-radius: 20px;
				padding: 6px 25px;
			}
		}
		.what_do {
			width: 100%;
			padding: 30px 0;
			background-color: #FFFFFF;
			.titles {
				display: block;
				text-align: center;
				font-size: 32px;
				color: #333333;
			}
			.span_list {
				div {
					width: 90%;
					margin: 0 auto;
					box-shadow: 0px 0px 50px #E8E8E8;
					border-radius: 20px;
					margin-top: 30px;
					padding: 30px 20px;
					overflow: hidden;
					p {
						font-size: 32px;
						display: inline-block;
						color: #333333;
						float: right;
						width: 81%;
					}
					a {
						display: inline-block;
						width: 81%;
						color: #666666;
						float: right;
						font-size: 28px;
						padding-top: 10px;
					}
					span {
						display: inline-block;
						width: 100px;
						height: 100px;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 50px;
						box-shadow: 0px 0px 40px #E8E8E8;
						float: left;
						img {
							width: 60px;
							height: 60px;
							padding-left: 3px;
						}
					}
				}
			}
		}
		.evaluate {
			background-color: #FFFFFF;
			padding-top: 30px;
			.title {
				display: block;
				text-align: center;
				font-size: 32px;
				color: #333333;
			}
			.div_list {
				padding-top: 30px;
				div {
					display: block;
					height: 90px;
					border-bottom: 1px solid #e9e9e9;
					line-height: 90px;
					font-size: 29px;
					position: relative;
					a {
						width: 200px;
						display: inline-block;
						height: 100%;
						padding-left: 30px;
						line-height: 90px;
						img {
							width: 160px;
							height: 50px;
							padding-top: 15px;
						}
					}
					span {
						position: absolute;
						font-size: 29px;
						color: #666666;
					}
				}
			}
		}
		.advantage {
			margin-bottom: 100px;
			background-color: #FFFFFF;
			padding-top: 30px;
			.title {
				display: block;
				text-align: center;
				font-size: 32px;
				color: #333333;
			}
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