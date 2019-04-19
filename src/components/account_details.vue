<template>
	<div>
		<div class="header">
			<span class="details_num">
				{{(details_num).toFixed(2)}}
			</span>
			<p>本月支出费用</p>
		</div>
		<div class="details_all">
			<span>收支明细</span>
			<div class="details_list" v-for="item in details_list ">

				<span class="list_num" :class="item.opreType == 'Z' ? 'pay_style' : 'charge_style'">
					<a v-show="item.opreType == 'Z'">-</a><a v-show="item.opreType == 'C'">+</a>{{(item.amount).toFixed(2)}}
				</span>
				<span v-show="item.payWay == 'WECHAT' && item.opreType == 'C'" class="charge_mode">
					微信支付
				</span>
				<span v-show="item.payWay == 'ALIPAY' && item.opreType == 'C'" class="charge_mode">
					支付宝支付
				</span>
				<span class="pay_ready" v-show="item.payType == 'ORDER_ALIPAY' && item.opreType == 'Z'">
					订单支付
					<a :data-id="item.orderId" @click="find_order(item.orderId)">查看订单</a>
				</span>
			</div>

		</div>
	</div>
</template>

<script>
	import { accflow, month_amount } from '../../static/public_css/public_axios.js'
	export default {
		data() {
			return {
				details_num: 0.00, //本月支出费用
				details_list: []
			};
		},
		created() {
			let companyid = JSON.parse(localStorage.getItem('user_infor')).companyId;
			month_amount(companyid)
				.then((val) => {
					console.log(val)
					this.details_num = val.data.data.sumamount;
				})
			accflow(companyid)
				.then((val) => {
					console.log(val)
					this.details_list = val.data.data;
				})
		},
		methods: {
			find_order(e) {
				localStorage.setItem("order_id", e)
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
		height: 400px;
		background-color: #5783f2;
		.details_num {
			font-size: 100px;
			color: #FFFFFF;
			text-align: center;
			padding-top: 110px;
			display: block;
		}
		p {
			color: #FFFFFF;
			text-align: center;
			font-size: 30px;
			padding-top: 40px;
		}
	}
	
	.charge_style {
		color: #ff9f08 !important;
	}
	
	.pay_style {
		color: #333333 !important;
	}
	
	.details_all {
		span {
			display: block;
			color: #666666;
			font-size: 28px;
			padding: 15px 20px;
		}
		.details_list {
			width: 100%;
			height: 100px;
			border-bottom: 1px solid #c9c9c9;
			background-color: #FFFFFF;
			position: relative;
			.list_num {
				font-size: 31px;
				display: inline-block;
				line-height: 80px;
			}
			.charge_mode {
				display: inline-block;
				position: absolute;
				right: 1px;
				line-height: 70px;
				font-size: 30px;
			}
			.pay_ready {
				display: inline-block;
				position: absolute;
				right: 3px;
				font-size: 30px;
				a {
					display: block;
					font-size: 26px;
					text-align: center;
					padding-top: 5px;
					color: #00a4f9;
				}
			}
		}
	}
</style>