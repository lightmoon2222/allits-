<template>
	<div>
		<footernaviga></footernaviga>
		<div class="header">
			<div class="index_header">
				<span class="my_infor">我的账户</span>
				<div class="index_header_title">
					<span class="com_name">{{comName}}</span>
					<van-tabbar v-model="active" class="com_business">
						<van-tabbar-item :info="info.waitCaseCount" :to="{name:'my_service',params:{id:0}}">
							<img src="../assets/foot_icon/wait_order.png">
							<span>待接单</span>
						</van-tabbar-item>
						<van-tabbar-item :info="info.handlerCaseCount" :to="{name:'my_service',params:{id:1}}">
							<img src="../assets/foot_icon/processing.png">
							<span>处理中</span>
						</van-tabbar-item>
						<van-tabbar-item :info="info.payCaseCount" :to="{name:'my_service',params:{id:2}}">
							<img src="../assets/foot_icon/wait_pay.png">
							<span>待支付</span>
						</van-tabbar-item>
						<van-tabbar-item :info="info.commentCaseCount" :to="{name:'my_service',params:{id:3}}">
							<img src="../assets/foot_icon/evaluated.png">
							<span>待评价</span>
						</van-tabbar-item>
						<van-tabbar-item  :to="{name:'my_service',params:{id:4}}">
							<img src="../assets/foot_icon/comple.png">
							<span>已完成</span>
						</van-tabbar-item>
					</van-tabbar>
				</div>
			</div>
		</div>

		<div class="equi_infor" v-show="equi_infor">
			<div class="engineer">
				<div class="exclusive_title">
					<img src="../assets/foot_icon/exclusive_icon.png">
					<p>专属工程师</p>
				</div>
				<div class="exclusive_infor">
					<img :src="exclusive_icon !== null ? exclusive_icon : default_img">
					<a class="exclusive_name">{{exclusive_name}}</a>
					<p>已经为我服务<span>{{exclusive_sec}}</span>次</p>
				</div>
			</div>
		</div>
		<!-- 待支付设备 -->
		<div class="device_infor">
			<div class="nopad_device">
				<van-collapse v-model="activeNames">
					<img class="change_img" src="../assets/foot_icon/nopad_icon.png">
					<van-collapse-item title="待支付设备" name="1">
						<div v-for="item in nopad_list" style="padding: 10px 0;" @click="case_conten(item.id,item.orderNum)">
							<div class="nopad_device_infor">
								<span class="infor_one">
								订单号：{{item.orderNum}}
							</span>
								<a>数量</a>
								<a>月数</a>
							</div>
							<div class="nopad_device_num" v-for="list in item.orderProductVos">
								<span class="infor_one">
								{{list.pname}}
							</span>
								<a>{{list.number}}</a>
								<a>{{item.month}}</a>
							</div>
							<div class="order_price">
								<span>订单金额：<a>¥{{item.totalPrice}}</a></span>
								<span>待支付</span>
							</div>
						</div>
					</van-collapse-item>

				</van-collapse>
			</div>
			<!-- 服务的设备 -->
			<div class="service_device">
				<van-collapse v-model="activeNames">

					<img class="change_img" src="../assets/foot_icon/service_device_icon.png">
					<van-collapse-item title="服务的设备" name="3">
						<div v-show="device_num">
						<div class="service_device_list">
							<img src="../assets/foot_icon/service_icon1.png">
							<span><a>{{service_device1}}</a>台</span>
						</div>
						<div class="service_device_list">
							<img src="../assets/foot_icon/service_icon2.png">
							<span><a>{{service_device2}}</a>台</span>
						</div>
						<div class="service_device_list">
							<img src="../assets/foot_icon/service_icon3.png">
							<span><a>{{service_device3}}</a>台</span>
						</div>
						</div>
					</van-collapse-item>

				</van-collapse>
			</div>
			<!-- 账户信息 -->
			<div class="account_infor">
				<van-collapse v-model="activeNames">
					<img class="change_img" src="../assets/foot_icon/account_infor_icon.png">
					<van-collapse-item title="账户信息" name="4">
						<van-cell title="收支明细" is-link to="/account_details" />
						<van-cell title="我的发票" is-link :to="{name:'my_invoice',params:{id:user_id}}" />
						<van-cell title="账号资料" is-link to="/acc_infor" />
					</van-collapse-item>
				</van-collapse>
			</div>
		</div>
	</div>
</template>
<script>
	import { order_status, engineer_info, nopaid_info, device_num } from '../../static/public_css/public_axios.js'
	import footernaviga from './footernaviga'
	export default {
		data() {
			return {
				comName: '',
				active: 0,
				info: {},
				default_img: require('../assets/foot_icon/default_icon.png'), //引入默认图片
				exclusive_icon: '', //专属工程师头像
				exclusive_name: '', //专属工程师名字
				exclusive_sec: 0, //专属工程师服务次数
				activeNames: ['1','3','4'],
				nopad_order_number: 12345464567890746, //未支付订单 订单号
				order_price: 460.00, //未支付订单 订单金额
				service_device1: 0, //服务的设备1 
				service_device2: 0, //服务的设备2
				service_device3: 0, //服务的设备3
				user_id: 0,
				nopad_list: [],
				equi_infor: false,  //专属工程师flag
				device_num:false,  //设备flag

			};
		},
		components: {
			footernaviga
		},
		created() {
			this.companiesId = JSON.parse(localStorage.getItem('user_infor')).companyId;
			this.comName = JSON.parse(localStorage.getItem('user_infor')).companyName;
			//订单状态
			order_status(this.companiesId).then((val) => {
				console.log(val)
				this.info = val.data.data
			});
			//专属工程师
			engineer_info(this.companiesId).then((val) => {
				console.log(val)
				if(val.data.status == "SELECT_502") {

				} else {
					this.exclusive_icon = val.data.data.icon;
					this.exclusive_name = val.data.data.realname;
					this.exclusive_sec = val.data.data.serviceNum;
					this.equi_infor = true;
				}

			})
			//未支付设备
			nopaid_info(this.companiesId).then((val) => {
				console.log(val)
				if(val.data.status == "SELECT_502"){
					this.nopad_list = []
				}else{
					this.nopad_list = val.data.data;
				}
				
			});
			//服务的设备
			device_num(this.companiesId).then((val) => {
				console.log(val)
				if(val.data.status == "SELECT_502"){
				
				}else{
						val.data.data.forEach((item,index)=>{
							if(item.productId == 2){
								this.service_device1 = item.number
							}else if(item.productId == 11){
								this.service_device2 = item.number
							}else{
								this.service_device3 = item.number
							}
						})
					this.device_num = true
				}
				

			});
		},
		methods: {
			case_conten(e, c) {
				localStorage.setItem("order_id", e)
				localStorage.setItem("order_type", '包月')
				localStorage.setItem("order_num", c)
				this.$router.push({
					name: 'order_details'

				});
			}
		}

	}
</script>

<style scoped lang="less">
	.header {
		width: 100%;
		height: 450px;
	}
	
	.index_header {
		width: 100%;
		height: 250px;
		background-color: #439ff5;
		margin: 0 auto;
		position: relative;
		.my_infor {
			color: #ffffff;
			font-size: 37px;
			position: absolute;
			top: 50px;
			left: 20px;
			display: block;
		}
		.index_header_title {
			width: 95%;
			height: 270px;
			margin: 0 auto;
			background-color: #ffffff;
			border-radius: 18px;
			z-index: 1000;
			position: relative;
			top: 150px;
			box-shadow: 0px 0px 25px #D9D9D9;
			overflow: hidden;
			.com_name {
				width: 50%;
				display: block;
				font-size: 32px;
				color: #333333;
				padding-top: 40px;
				text-align: center;
				letter-spacing: 1px;
				border-bottom: .1px solid #D9D9D9;
				margin: 0 auto;
				padding-bottom: 20px;
			}
			.van-tabbar {
				position: static !important;
				margin-top: 70px;
				.van-tabbar-item {
					color: #666666;
					font-size: 25px;
					img {
						width: 48px;
						display: block;
						margin: 0 auto;
						height: 50px;
					}
					span {
						font-size: 27px;
						margin-top: 20px;
						display: block;
					}
					.van-tabbar-item__icon {
						margin-left: 30px;
					}
				}
			}
		}
	}
	
	.equi_infor {
		width: 100%;
		background-color: #F2F2F2;
		padding-bottom: 50px;
		.engineer {
			width: 95%;
			height: 220px;
			margin: 0 auto;
			background-color: #ffffff;
			border-radius: 18px;
			box-shadow: 0px 0px 25px #D9D9D9;
			.exclusive_infor {
				width: 90%;
				margin: 0 auto;
				padding-top: 20px;
				position: relative;
				img {
					border-radius: 60px;
					width: 100px;
					height: 100px;
				}
				a {
					display: block;
					position: absolute;
					left: 130px;
					top: 30px;
					font-size: 28px;
				}
				p {
					display: block;
					position: absolute;
					left: 130px;
					top: 80px;
					font-size: 28px;
					span {
						color: #00a4f9;
						letter-spacing: 1px;
					}
				}
			}
			.exclusive_title {
				width: 90%;
				margin: 0 auto;
				height: 50px;
				padding: 20px 0 0 0;
				font-size: 30px;
				img {
					width: 45px;
					height: 45px;
				}
				p {
					display: inline-block;
					position: relative;
					top: -5px;
				}
			}
		}
	}
	
	.device_infor {
		width: 95%;
		margin: 0 auto;
		padding-bottom: 100px;
		position: relative;
		top: -33px;
		.nopad_device,
		.service_device,
		.account_infor {
			position: relative;
			margin-top: 20px;
			.nopad_device_infor,
			.nopad_device_num {
				padding: 10px 0 10px 12px;
				.infor_one {
					width: 67%;
					font-size: 29px;
					display: inline-block;
					color: #333333;
				}
				a {
					width: 15%;
					font-size: 29px;
					color: #333333;
					display: inline-block;
					text-align: right;
				}
			}
			.nopad_device_num {
				.infor_one {
					width: 63%;
					font-size: 28px;
					display: inline-block;
					color: #666666;
				}
			}
			.order_price {
				height: 70px;
				font-size: 29px;
				padding-left: 10px;
				line-height: 70px;
				color: #333333;
				border-top: 1px solid #b5b5b5;
				a {
					font-size: 35px;
					color: #d40000;
				}
				span:last-child {
					float: right;
					padding-right: 20px;
					color: #ff9601;
				}
			}
			.change_img {
				position: absolute;
				z-index: 90;
				width: 45px;
				height: 45px;
				top: 20px;
				left: 25px;
			}
			.service_device_list {
				width: 120px;
				float: left;
				padding: 15px 0;
				img {
					width: 70px;
					height: 70px;
					display: block;
					margin: 0 auto;
				}
				span {
					display: block;
					text-align: center;
					font-size: 27px;
					color: #999999;
					padding-top: 5px;
					a {
						color: #00a4f9;
					}
				}
			}
		}
		.account_infor {
			.van-cell {
				height: 90px;
				box-shadow: none !important;
				border-radius: 0 !important;
				padding: 0 !important;
				background-color: #F2F2F2 !important;
				border-bottom: 1px solid #b5b5b5;
			}
		}
	}
</style>