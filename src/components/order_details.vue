<template>
	<div>
		<div class="order_details">
			<div class="order_num">
				订单号：{{order_num}}
			</div>
			<div class="order_title">
				<div>
					<span>数量</span>
					<span>单价</span>
					<span>月数</span>
				</div>
			</div>
			<div class="order_list">
				<div v-for="item in order_list">
					<span class="order_name">{{item.pname}}</span>
					<div class="order_type">
						<span>{{item.number}}</span>
						<span>{{(item.sellPrice).toFixed(2)}}</span>
						<span>{{month}}</span>
					</div>
				</div>
			</div>
			<div class="order_price">
				<span>订单金额：<a>¥{{(order_price).toFixed(2)}}</a></span>
				<span v-if="pay_flag == 'NO'">待支付</span>
				<span v-else>已支付</span>
			</div>
			<div class="order_time">
				<span>服务有效期：{{start_time}}~{{over_time}}</span>
			</div>

		</div>
		<button class="online_consu_but" v-show="pay_flag == 'NO'" @click="pay_now" :disabled="but_disabled">立即支付</button>
	</div>
</template>

<script>
	import { order_info, weixinPay, open_id, isWeiXin, post_openid, ali_pay, GetUrlParam } from '../../static/public_css/public_axios.js'
	export default {
		data() {
			return {
				order_num: 0, //订单
				order_list: [],
				order_price: 0.00, //订单总价格
				start_time: '2018/11/23', //开始时间
				over_time: '2018/12/20', //结束时间
				month: 1, //月份
				pay_flag: '', //总数据
				order_number: 0,
				companiesId: 0, //公司id
				ali_id: 0, //订单id
				trade_state: '', //流水号
				but_disabled:false

			}
		},
		created() {
			order_info(JSON.parse(localStorage.getItem('order_id')))
				.then((val) => {
					console.log(val)
					this.order_num = val.data.data.orderNum;
					this.pay_flag = val.data.data.isPaid;
					this.start_time = val.data.data.startDate;
					this.over_time = val.data.data.expireDate;
					this.order_price = val.data.data.totalPrice;
					this.order_list = val.data.data.orderProductVos;
					this.month = val.data.data.month;
					this.order_number = val.data.data.orderNum;
					this.ali_id = val.data.data.id;
					this.companiesId = val.data.data.companiesId;
				})
			//获取code
			let code = GetUrlParam("code")
			if(code == '') {
				
			} else { 
				this.but_disabled = true;
				post_openid(0.01, localStorage.getItem('order_type'), code, localStorage.getItem('order_num'))
					.then((vals) => {
						let trade_state = vals.data.data.trade_state
						//微信调用方法
						function callpay() {
							if(typeof WeixinJSBridge == "undefined") {
								if(document.addEventListener) {
									document.addEventListener('WeixinJSBridgeReady', onBridgeReady,
										false);
								} else if(document.attachEvent) {
									document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
									document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
								}
							} else {
								onBridgeReady();
							}
						}
						var that = this;
						function onBridgeReady() {
							//添加参数 
							WeixinJSBridge.invoke('getBrandWCPayRequest', {
								"appId": vals.data.data.appId,
								"timeStamp": (vals.data.data.timeStamp).toString(),
								"nonceStr": vals.data.data.nonceStr,
								"package": vals.data.data.package,
								"signType": vals.data.data.signType,
								"paySign": vals.data.data.paySign,
							}, function(res) { // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回 ok，但并不保证它绝对可靠。
								//alert(res.err_msg);
								if(res.err_msg == "get_brand_wcpay_request:ok") {
									window.location.href = "http://smb.allits.com.cn/#/pay_success?trade_state="+trade_state
								}
								if(res.err_msg == "get_brand_wcpay_request:cancel") {
									that.but_disabled = false;
									alert("交易取消");
								}
								if(res.err_msg == "get_brand_wcpay_request:fail") {
									that.but_disabled = false;
									alert("支付失败");
								}
							});
						}
						callpay()
					})
			}

		},
		methods: {
			pay_now() {
				this.but_disabled = true;
				if(isWeiXin()) {
					let ss = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7e311fb531ed55b4&redirect_uri=http://smb.allits.com.cn/%23/order_details&response_type=code&scope=snsapi_base"
					window.location.href = ss
				} else {
					let orders = {
						id: this.ali_id,
						orderNum: this.order_number,
						productName: localStorage.getItem('order_type'),
						totalPrice: this.order_price,
						companiesId: this.companiesId
					}

					ali_pay(orders)
						.then((val) => {
							window.location.href = val.data.data;
						})
				}
			}

		}
	}
</script>

<style scoped lang="less">
	.order_details {
		color: #666666;
		background-color: #ffffff;
		.order_num {
			height: 70px;
			line-height: 70px;
			font-size: 28px;
			padding-left: 20px;
			color: #666666;
		}
		.order_title {
			width: 100%;
			height: 80px;
			background-color: #ecf9ff;
			line-height: 80px;
			color: #666666;
			font-size: 29px;
			float: right;
			overflow: hidden;
			div {
				width: 50%;
				float: right;
				display: flex;
				justify-content: space-around;
			}
		}
		.order_list {
			width: 95%;
			overflow: hidden;
			margin: 0 auto;
			border-bottom: 1px solid #C9C9C9;
			div {
				font-size: 29px;
				line-height: 60px;
				overflow: hidden;
				span {
					width: 48%;
					display: inline-block;
					float: left;
				}
				.order_type {
					width: 50%;
					float: left;
					display: inline-block;
					display: flex;
					justify-content: space-around;
					text-align: center;
					span {
						padding-left: 43px;
					}
				}
			}
		}
		.order_price {
			height: 70px;
			width: 95%;
			margin: 0 auto;
			line-height: 70px;
			font-size: 29px;
			span {
				float: left;
				width: 40%;
				display: inline-block;
				color: #333333;
				a {
					color: #D40000;
					font-size: 30px;
				}
				&:last-child {
					width: 55%;
					text-align: right;
					color: #FF9601;
				}
			}
		}
		.order_time {
			height: 60px;
			width: 100%;
			display: flex;
			justify-content: space-around;
			line-height: 60px;
			background-color: #f9f9f9;
			font-size: 29px;
		}
	}
	
	.online_consu_but {
		display: block;
		border: 0 !important;
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
</style>