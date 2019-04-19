<template>
	<div class="my_invoice">
		<van-tabs v-model="active" :line-width="80" color="#00a4f9" @click="invoice_check" sticky>
			<!-- 申请发票页 -->
			<van-tab title="申请发票">
				<van-checkbox-group v-model="result" @change="add_allprice">
					<van-checkbox v-for="(item,index) in list" :name="item" :key="index">
						<div class="invoice_infor">
							<p class="invoice_time">{{item.createTime}}</p>
							<span class="invoice_name">{{item.orderType == "MONTHLY_SERVICE" ? '包月服务费' : '单次服务费'}}</span>
							<div class="invoice_price" ref="checks">
								{{(item.amount).toFixed(2)}}元
							</div>
						</div>
					</van-checkbox>
				</van-checkbox-group>
				<div class="next">
					<div class="all_check">
						<van-checkbox v-model="checkedAll" @change="ckeckAlls">全选</van-checkbox>
					</div>
					<div class="all_price">
						总计：¥<span style="color: #d40000;">{{all_price}}</span>
					</div>
					<div class="next_but" @click="invocing">
						下一步
					</div>
				</div>
			</van-tab>
			<!-- 我的发票页 -->
			<van-tab title="我的发票">
				<div class="invoice_list" v-for="item in invoice_item">
					<div class="invoice_item">
						<div class="price_infor">{{(item.invoiceAmt).toFixed(2)}}元
							<van-tag plain v-show="item.invoiceType == 'ELECTRONIC'" color="#00a4f9" style="margin-left: 5px;font-size: 12px;margin-top: -3px;">电子发票</van-tag>
						</div>
						<div class="company_infor">{{item.companyName}}
							<span class="opening" style="color: #ff9f08;" v-show="item.applyState == 'WAIT'">
								正在开具
							</span>
							<span class="complete" v-show="item.applyState == 'SEND'">
								<a class="see_complete">查看</a>
								<a class="down_complete">下载</a>
							</span>

							<span class="mail" v-show="item.applyState == 'CALLBACK'" style="color: #00A4F9;">
								已驳回
							</span>
						</div>
						<div class="time_infor">{{item.createTime}}
							<span class="mail_num" v-show="item.mail_num">
								{{item.mail_num}}
							</span>
						</div>
					</div>

				</div>
			</van-tab>
		</van-tabs>

	</div>
</template>

<script>
	import { get_invoice, get_invocing, mine_invoice } from '../../static/public_css/public_axios.js'
	export default {
		data() {
			return {
				active: 0,
				result: [], //被选中的元素
				checkedAll: false,
				invoice_item: [],
				all_price: 0.00, //总计金额
				list: [],
				user_id: 0, //用户id
				voice_type: 'NO_OPEN_INVOICE', //发票类型 NO_OPEN_INVOICE为未开具的发票  MY_INVOICE 为开具的发票
				vioce_array: []
			};
		},
		watch: {
			result: {
				handler(newValue, oldValue) {
					if(this.result.length == this.list.length) {
						this.checkedAll = true
					} else if(this.result.length == 0) {
						this.checkedAll = false
					}
					this.vioce_array = [];
					this.result.forEach((val, index) => {
						this.vioce_array.push(val.id)
					})
					console.log(this.vioce_array)
				},
				deep: true
			}
		},
		methods: {
			//选择发票
			invoice_check(index) {
				let user_id = JSON.parse(localStorage.getItem('user_infor')).companyId;
				if(index == 0) {
					get_invoice(user_id).then((val) => {
						console.log(val)
						this.list = val.data.data
					})
				} else {
					mine_invoice(user_id).then((val) => {
						console.log(val)
						this.invoice_item = val.data.data
					})
				}

			},
			//全选按钮事件
			ckeckAlls(e) {
				if(!e) {
					this.result = [];
				} else {
					this.result = [];
					this.list.forEach((value, index) => {
						this.result.push(value)
					})
				}
			},
			//总价计算事件
			add_allprice() {
				let prices = 0
				this.result.forEach((value, index) => {
					prices += value.amount
				})
				this.all_price = prices.toFixed(2)
			},
			invocing() {
				if(this.result.length == 0) {
					this.$dialog.alert({
						message: '请最少选择一个需要开具的发票'
					});
				} else {
					let user_id = JSON.parse(localStorage.getItem('user_infor')).id
					let accFlowCo = this.qs.stringify({
						customerId: user_id,
						companiesId:JSON.parse(localStorage.getItem('user_infor')).companyId,
						ids: this.vioce_array,
						amount: this.all_price
					});
					//选择发票后点击下一步
					get_invocing(accFlowCo).then((val) => {
						console.log(val)
						const adder = {
							person: val.data.data.recipientName,
							phone: val.data.data.recipientPhone
						}
						if(val.status == 200) {
							console.log(this.vioce_array)
							console.log(val)
							localStorage.setItem("accFlowId", JSON.stringify(this.vioce_array));
							localStorage.setItem("customerAddress", JSON.stringify(val.data.data.customerAddress))
							this.$router.push({
								name: 'invoice_infor',
								query: {
									//需要传递到下一个页面的数据
									allprice: this.all_price, //总价
									customerAddress: val.data.data.customerAddress, //默认地址
									adder: adder, //联系方式
								}
							});
						} else {}
					}).catch((err) => {
						console.log(err);
					})
				}
			}
		},
		created() {
			this.user_id = this.$route.params.id;
			this.invoice_check(0)
		},
		beforeRouteLeave(to,from,next){
			if(to.path == 'invoice_infor'){
				next(false)
			}else{
				next()
			}
		
		}
	}
</script>
<style scoped lang="less">
	#app {
		.my_invoice {
			.next {
				width: 100%;
				height: 100px;
				background-color: #FFFFFF;
				position: fixed;
				bottom: 0;
				left: 0;
				overflow: hidden;
				.all_check {
					width: 30%;
					height: 110px;
					line-height: 60px;
					font-size: 27px;
					color: #666666;
					padding-top: 14px;
					float: left;
				}
				.all_price {
					width: 40%;
					height: 110px;
					float: left;
					line-height: 110px;
					text-align: center;
					font-size: 28px;
					color: #999999;
				}
				.next_but {
					width: 30%;
					text-align: center;
					line-height: 110px;
					color: #FFFFFF;
					font-size: 30px;
					background-color: #00a4f9;
					float: left;
				}
			}
			.invoice_infor {
				p {
					font-size: 28px;
					padding: 29px 0 0 30px;
					color: #999999;
				}
				span {
					display: block;
					font-size: 28px;
					padding: 20px 0 0 30px;
				}
				.invoice_price {
					position: absolute;
					right: 30px;
					margin-top: -40px;
					color: #d40000;
					font-size: 31px;
				}
			}
			.invoice_list {
				.invoice_item {
					width: 93%;
					margin: 0 auto;
					background-color: #ffffff;
					height: 210px;
					border-radius: 10px;
					margin-bottom: 20px;
					overflow: hidden;
					.price_infor {
						color: #d40000;
						font-size: 33px;
						margin: 30px 0 10px 30px;
						position: relative;
						span {
							position: absolute;
							top: 10px;
						}
					}
					.company_infor {
						color: #333333;
						font-size: 31px;
						margin: 20px 0 0 30px;
						span {
							font-size: 29px;
						}
					}
					.time_infor {
						margin: 30px 0 10px 30px;
						color: #999999;
						font-size: 25px;
					}
					.opening {
						float: right;
						margin-right: 30px;
					}
					.complete {
						float: right;
						margin-right: 30px;
						.down_complete {
							color: #00a4f9;
							padding-left: 10px;
						}
					}
					.mail {
						float: right;
						margin-right: 30px;
					}
					.mail_num {
						float: right;
						margin-right: 30px;
						font-size: 27px;
					}
				}
			}
		}
	}
</style>