<template>
	<div class="month_service">
		<div class="header">
			<span class="invoice_title">
			<a></a>&nbsp;包月服务
		</span>
		</div>
		<div class="service_list">
			<div v-for="(item,index) in products_list">{{item.pname}}：￥{{(item.sellPrice).toFixed(2)}}/台/月
				<van-stepper v-model="pad_num['num'+item.id]" :min="0" class="stepper"/>
			</div>
			<span class="all_num">
				总计台数: &nbsp<a style="color: #00a4f9;">{{all_nums}}&nbsp;</a>台
			</span>
			<span class="all_price">
				总计服务费: &nbsp<a style="color: #d40000;">¥&nbsp;{{all_prices}}</a>
			</span>
		</div>
		<div class="line"></div>
		<div class="pay_size">
			<div class="content">
				<span class="invoice_title">
			<a></a>&nbsp;结算方式
		</span>
			</div>
			<div class="size_list">
				<span v-for="(item,index) in size_list" :class="{no_check:index+1 == current}" @click="change_state(index)">{{item}}</span>
			</div>
		</div>
		<div class="line"></div>
		<div class="service_demand">
			<div class="header">
				<span class="invoice_title" style="border: none;">
			<a></a>&nbsp;服务需求描述
		</span>
			</div>
			<van-field v-model="message" type="textarea" placeholder="如果有其他服务需求,可以在这里描述(选填)" rows="1" autosize />
		</div>
		<div class="line"></div>
		<div class="address_list">
			<div class="header">
				<span class="invoice_title" style="border: none;">
			<a></a>&nbsp;公司地址
		</span>
			</div>
			<div class="invoice_method">
				<img src="../assets/foot_icon/address.png" class="address_img" @click="img_show">
				<van-field label="地址 :" @click="show_model = true" v-model="adder_list.address_list" readonly="readonly"/>
				<!--添加默认地址底部框-->
				<van-popup v-model="show_model" position="bottom" :overlay="true">
					<van-area :area-list="areaList" @confirm="add_address" @cancel='show_model = false' />
				</van-popup>
				<!--选中默认地址-->
				<van-popup v-model="show_add" position="bottom" :overlay="true">
					<div class="model_popup">
						<div class="model_header">
							公司地址
						</div>
						<div class="address_list" v-show="address_flag">
							您暂时还没有默认收货地址,点击新增地址创建一个吧
						</div>
						<div class="address_list">
							<div class="address_item" v-for="(item,index) in arrers_list">
								<van-radio :name="index" v-model="default_address" />
								<span>{{item.recipient}} &nbsp; {{item.recipientPhone}}</span>
								<span>{{item.province}}&nbsp;{{item.city}}&nbsp;{{item.area}}&nbsp;{{item.detailAddress}}</span>
							</div>
						</div>
						<div class="address_but">
							<span @click="fill_address">确定</span>
							<span @click="new_address">新增地址</span>
						</div>
					</div>
				</van-popup>
				<van-field label="详细地址 :" v-model.trim="adder_list.address_detail" class="address_detail" />
				<van-field label="收件人 :" v-model.trim="adder_list.addresser" class="addresser" />
				<van-field label="收件电话 :" v-model="adder_list.addresser_phone" class="addresser_phone" />
			</div>

		</div>
		<div style="background-color: #F2F2F2">
			<div class="online_consu_but" @click="push_infor">提交</div>
		</div>
	</div>
</template>
<script>
	import { find_address, get_products, crt_order,reg} from '../../static/public_css/public_axios.js'
	import areaList from '../../static/public_css/area.js'
	export default {
		data() {
			return {
				pad_num: {}, //设备选择数量的对象
				all_num: 0,
				all_price: 0.00, //总计每月服务费
				size_list: ['按月支付', '按季度支付', '按年支付'],
				current: 1,
				message: '',
				areaList,
				arrers_list: [],
				show_add: false,
				default_address: 0,
				new_addr: 0, //默认为旧地址
				products_list: [], //设备列表
				customerAddress: [], //收件人默认地址
				adder_list: {
					address_list: '', //地址
					address_detail: '', //详细地址
					addresser: '', //收件人
					addresser_phone: '', //收件人电话
				},
				show_model: false, //选择地址模态框
				adder_id: 0, //默认地址的地址id
				address_flag:true
			}
		},
		computed: {
			all_nums() {
				let all = 0;
				for(let i in this.pad_num) {
					all += this.pad_num[i]
				}
				return this.all_num = all
			},
			all_prices() {
				let all_price = 0;
				let arr = {};
				this.products_list.forEach((val) => {
					arr['num' + val.id] = val.sellPrice
				})
				for(let i in this.pad_num) {
					all_price += this.pad_num[i] * arr[i]
				}
				if(this.current == 1) {
					return this.all_price = (all_price).toFixed(2)
				} else if(this.current == 2) {
					return this.all_price = ((all_price).toFixed(2) * 3).toFixed(2)
				} else {
					return this.all_price = ((all_price).toFixed(2) * 12).toFixed(2)
				}

			}
		},
		methods: {
			change_state(index) {
				this.current = index + 1
				console.log(this.current)
			},
			img_show() {
				this.show_add = true;
				find_address(JSON.parse(localStorage.getItem('user_infor')).companyId)
					.then((val) => {
						console.log(val)
						if(val.data.status == 0) {
							this.arrers_list = val.data.data
						}
					})
			},
			new_address() {
				this.show_add = false;
				this.adder_list.address_list = '';
				this.adder_list.address_detail = '';
				this.adder_list.addresser = '';
				this.adder_list.addresser_phone = '';
				this.new_addr = 1;
				this.show_model = true;
			},
			//点击选择地址模态框 将选择的地址添加到地址栏
			add_address(e) {
				this.show_model = false;
				this.adder_array = e;
				console.log(e)
				this.new_addr = 1;
				let all_address = ''
				e.forEach((value, index) => {
					all_address += (value.name + ' ')
				})
				this.adder_list.address_list = all_address;
				this.adder_list.address_detail = '';
				this.adder_list.addresser = '';
				this.adder_list.addresser_phone = '';
			},
			fill_address() {
				if(this.address_flag == true){
					this.new_address()
					return
				}
				this.show_add = false;
				this.new_addr = 0;
				console.log(this.arrers_list[this.default_address]);
				let ids = this.arrers_list[this.default_address];
				this.adder_list.address_list = '';
				this.adder_list.address_detail = '';
				this.adder_list.address_list = ids.province + ' ' + ids.city + ' ' + ids.area;
				this.adder_list.address_detail = ids.detailAddress;
				this.adder_list.addresser = ids.recipient;
				this.adder_list.addresser_phone = ids.recipientPhone;
				this.adder_id = ids.id;
			},
			for_num(e) {
				let t = true;
				for(let b in e) {
					if(e[b] == 0) {
						return false;
					}
				}
				return t;
			},
			check_address(e) {
				let t = true;
				for(let b in e) {
					if(e[b] == '' || e[b] == null) {
						return false;
					}
				}
				return t;
			},
			push_infor() {
				let user = JSON.parse(localStorage.getItem("user_infor"))
				let that = this;
				//最少选择一台设备
				function for_num() {
					let flag = false;
					for(let i in that.pad_num) {
						if(that.pad_num[i] !== 0) {
							return true
						}

					}
					return false
				}
				//验证手机号
				if(!reg.test(this.adder_list.addresser_phone)){
					this.$dialog.alert({
						message: '手机号码输入格式错误'
					})
					return
				}
				
				//最少选择一台设备且地址列表填写正确
				if(for_num() && this.check_address(this.adder_list)) {
					let shuz = [];
					for(let x in this.pad_num) {
						shuz.push(this.pad_num[x])
					}
					for(let i in this.products_list) {
						this.products_list[i].number = shuz[i]
						delete this.products_list[i].marketPrice;

					}
					let arrs = [...this.products_list];
					for(let i = 0; i < arrs.length; i++) {
						if(arrs[i].number == 0) {
							arrs.splice(i, 1)
							i--
						}
					}
					//传给后台的数据
					let data = {
						orderType: '1',
						customerId: user.id,
						companiesId: user.companyId,
						totalPrice: this.all_price,
						contactName: this.adder_list.addresser,
						contactPhone: this.adder_list.addresser_phone,
						payType: this.current,
						isNewAddress: this.new_addr,
						ordersArr: arrs,
						cusAddressId: this.adder_id,
						customerNote: this.message
					}

					//新增地址逻辑
					if(this.new_addr == 1) {
						delete data.cusAddressId;
						let customerAddress = {
							customersId: user.id,
							companiesId: user.companyId,
							province: this.adder_array[0].name,
							city: this.adder_array[1].name,
							area: this.adder_array[2].name,
							detailAddress: this.adder_list.address_detail,
							proviceCode: this.adder_array[0].code,
							cityCode: this.adder_array[1].code,
							areaCode: this.adder_array[2].code
						}
						data.customerAddress = customerAddress
						crt_order(data)
							.then((val) => {
								console.log(val)
								if(val.data.status = "ORDER_201") {
									console.log(val)
									localStorage.setItem("order_type", '包月')
									localStorage.setItem("order_id", val.data.data.OrderID)
									localStorage.setItem("order_num", val.data.data.OrderNum)
									this.$router.push({
										name: 'order_details',
										
									});
								}
							})
						console.log(data)
					} else {
						//默认地址逻辑
						data.customerAddress = {};
						crt_order(data)
							.then((val) => {
								console.log(val)
								if(val.data.status = "ORDER_201") {
									console.log(val)
									this.$dialog.alert({
										message: '订单创建成功'
									})
									localStorage.setItem("order_type", '包月')
									localStorage.setItem("order_id", val.data.data.OrderID);
									localStorage.setItem("order_num", val.data.data.OrderNum)
									this.$router.push({
										name: 'order_details'
									});
								}
							})
						console.log(data)
					}
				} else {
					this.$dialog.alert({
						message: '至少选择一个服务项目,地址信息请填写正确'
					})
				}

			}
		},
		created() {
			//进入页面将默认地址显示在地址栏
			find_address(JSON.parse(localStorage.getItem('user_infor')).companyId)
				.then((val) => {
					console.log(val)
					if(val.data.status == '0007'){
						this.address_flag = true
					}else{
						this.address_flag = false
						val.data.data.forEach((val) => {
						if(val.defaultFlag == 'YES') {
							console.log(val)
							this.adder_list.address_list = val.province + ' ' + val.city + ' ' + val.area;
							this.adder_list.address_detail = val.detailAddress;
							this.adder_list.addresser = val.recipient;
							this.adder_list.addresser_phone = val.recipientPhone;
							this.adder_id = val.id;
						}
					})
					}
					

				})
			//获取设备信息
			get_products()
				.then((val) => {
					console.log(val)
					this.products_list = val.data.data;
					let obj = {};
					this.products_list.map((val, index) => {
						obj['num' + val.id] = 0
					})
					this.pad_num = obj
				})

		}
	}
</script>
<style scoped lang="less">
	.month_service {
		background-color: #FFFFFF;
		.online_consu_but {
			width: 700px;
			height: 100px;
			font-size: 35px;
			text-align: center;
			line-height: 100px;
			margin: 0 auto;
			background-color: #00a4f9;
			border-radius: 10px;
			color: #ffffff;
			margin-bottom: 40px;
			position: relative;
			top: 50px;
		}
		.line {
			background-color: #f2f2f2;
			height: 25px;
		}
		.no_check {
			border: 1px solid #00a4f9 !important;
		}
		.header {
			width: 100%;
			.invoice_title {
				width: 96%;
				display: block;
				font-size: 30px;
				height: 70px;
				line-height: 72px;
				color: #666666;
				background-color: #FFFFFF;
				border-bottom: 1px solid #c9c9c9;
				margin-left: 4%;
				a {
					display: inline-block;
					width: 7px;
					height: 30px;
					position: relative;
					top: 4px;
					background-color: #ff9f08;
				}
			}
		}
		.service_list {
			background-color: #FFFFFF;
			margin-left: 25px;
			span {
				text-align: right;
				display: block;
				color: #999999;
				height: 50px;
				line-height: 50px;
				font-size: 29px;
				padding: 12px 20px 5px 0;
			}
			div {
				font-size: 28px;
				line-height: 80px;
				height: 80px;
				position: relative;
				padding-right: 10px;
				border-bottom: 1px solid #c9c9c9;
				color: #666666;
				.van-stepper {
					position: relative;
					display: inline-block;
					float: right;
					.van-stepper__minuss {
						width: 30px !important;
						height: 30px !important;
					}
				}
			}
		}
		.pay_size {
			.content {
				width: 100%;
				padding-bottom: 20px;
				.invoice_title {
					width: 96%;
					display: block;
					font-size: 30px;
					height: 70px;
					line-height: 72px;
					color: #666666;
					background-color: #FFFFFF;
					margin-left: 4%;
					a {
						display: inline-block;
						width: 7px;
						height: 30px;
						position: relative;
						top: 4px;
						background-color: #ff9f08;
					}
				}
			}
			padding-bottom: 30px;
			.size_list {
				span {
					color: #666666;
					display: inline-block;
					padding: 10px 20px;
					border: 1px solid #C9C9C9;
					font-size: 28px;
					margin-left: 35px;
				}
			}
		}
		.service_demand {
			padding-bottom: 30px;
		}
		.address_list {
			.invoice_method {
				position: relative;
				.address_img {
					position: absolute;
					z-index: 1000;
					right: 10px;
					width: 40px;
					height: 45px;
					margin-top: 16px;
				}
				.model_popup {
					min-height: 200px;
					.model_header {
						height: 50px;
						line-height: 50px;
						background-color: #f4f4f4;
						font-size: 27px;
						padding-left: 20px;
					}
					.address_list {
						text-align: center;
						font-size: 27px;
						padding-top: 10px;
						.address_item {
							width: 95%;
							float: right;
							text-align: left;
							padding: 20px 0;
							border-bottom: 1px solid #c9c9c9;
							position: relative;
							overflow: hidden;
							.van-radio {
								display: inline-block;
								position: absolute;
								top: 42px;
								.van-radio__input {
									font-size: 100px !important;
								}
							}
							span {
								width: 100%;
								display: inline-block;
								color: #333333;
								padding-left: 40px;
							}
							span:last-child {
								padding-top: 10px;
								color: #666666;
								padding-left: 40px;
							}
						}
					}
					.address_but {
						width: 50%;
						display: flex;
						justify-content: space-around;
						align-items: center;
						margin: 0 auto;
						height: 100px;
						span:first-child {
							font-size: 27px;
							color: #FFFFFF;
							width: 150px;
							height: 50px;
							line-height: 53px;
							background-color: #00a4f9;
							text-align: center;
							border-radius: 5px;
						}
						span:last-child {
							font-size: 27px;
							color: #00a4f9;
							width: 150px;
							height: 50px;
							line-height: 53px;
							background-color: #FFFFFF;
							border: 1px solid #00a4f9;
							text-align: center;
							border-radius: 5px;
						}
					}
				}
			}
		}
	}
</style>