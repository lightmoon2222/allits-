<template>
	<div class="invoice_infor">
		<span class="invoice_title">
			<a></a>&nbsp;发票类型
		</span>
		<div class="invoice_type">
			<div class="index_list">
				<span v-for="(item,index) in invoice_type" :class="{no_check:index == current}" @click="change_state(index)">
					<p>{{item.type}}</p>
					<a>{{item.time}}</a>
				</span>
			</div>
			<div class="invoice_tips">电子发票与纸质发票具有同等法律效力，可支持报销入账</div>
		</div>
		<span class="invoice_title">
			<a></a>&nbsp;发票详情
		</span>
		<div class="invoice_details">
			<span class="invoice_one">
				<a>发票类型：</a>
				<van-radio-group v-model="invoice_size">
					<van-radio name="GENERAL_INVOICE" checked-color="#00a4f9">增值税普通发票</van-radio>
					<van-radio name="SPECIAL_INVOICE" checked-color="#00a4f9" :disabled="current == 0">增值税专用发票</van-radio>
				</van-radio-group>
			</span>
			<span class="invoice_two">
				<a>抬头类型：</a>
				<van-radio-group v-model="rise_size">
					<van-radio name="UNIT" checked-color="#00a4f9">企业单位</van-radio>
					<van-radio name="PENSONAL" checked-color="#00a4f9" :disabled="invoice_size == 'SPECIAL_INVOICE'">个人/非企业单位</van-radio>
				</van-radio-group>
			</span>

			<van-field label="发票抬头 :" v-model="invoice_title" readonly/>
			<van-field label="税号 :" class="invoice_num" v-show="rise_size != 'PENSONAL'" v-model="invoice_num" />
			<van-field label="开户行 :" v-show="invoice_size == 'SPECIAL_INVOICE'" class="openone" v-model="bank.bank_name" />
			<van-field label="开户行电话 :" type="number" v-show="invoice_size == 'SPECIAL_INVOICE'" class="opentwo" v-model="bank.bank_num" />
			<span class="invoice_three">
				<a>发票内容：</a>
				<select v-model="select_num">
					<option value="1">*研发和技术服务费*技术服务费</option>

				</select>
			</span>
			<van-field label="发票金额 :" v-model="all_price" disabled/>
		</div>
		<div v-show="current == 0">
			<span class="invoice_title">
			<a></a>&nbsp;接收方式
		</span>
			<div class="invoice_four">
				<van-field label="电子邮件 :" v-model="email" />
			</div>
		</div>
		<div v-show="current == 1">
			<span class="invoice_title">
			<a></a>&nbsp;收件方式
		</span>
			<div class="invoice_method">
				<img src="../assets/foot_icon/address.png" class="address_img" @click="img_show">
				<van-field label="地址 :" @click="show_model = true" v-model="adder_list.address_list" readonly="readonly" />
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
		<div class="online_consu_but" @click="push_infor">提交</div>
	</div>

</template>

<script>
	import { email_reg, push_invoice, reg, find_address, taxNumb } from '../../static/public_css/public_axios.js'
	import areaList from '../../static/public_css/area.js'
	export default {
		data() {
			return {
				invoice_type: [{
						type: '电子发票',
						time: '最快5分钟开具'
					},
					{
						type: '纸质发票',
						time: '预计5天送达'
					}
				],
				invoice_style: 'ELECTRONIC',
				current: 0,
				invoice_size: 'GENERAL_INVOICE', //发票类型
				rise_size: 'UNIT', //抬头类型
				select_num: 1,
				areaList,
				invoice_title: '',
				all_price: 0,
				searchResult: [],
				show_model: false, //选择地址模态框
				show_add: false, //默认地址模态框
				adder_list: {
					address_list: '', //地址
					address_detail: '', //详细地址
					addresser: '', //收件人
					addresser_phone: '', //收件人电话
				},
				invoice_num: '',
				customerAddress: [], //收件人默认地址
				default_address: 0,
				email: '', //电子邮件
				adder_array: [],
				arrers_list: [],
				new_addr: true, //新增地址标识符  false为新建  true为默认地址
				invoi_infor: 'INVOICE_CONTENT_1000',
				invo_id: '',
				bank: {
					bank_name: '', //开户行
					bank_num: '', //开户行电话
				},
				com_id: '', //公司id
			};
		},
		methods: {
			check_address(e) {
				let t = true;
				for(let b in e) {
					if(e[b] == '') {
						return false;
					}
				}
				return t;
			},
			err_infor() {
				this.$dialog.alert({
					message: '必填项输入信息有误'
				})
			},
			succ_infor() {
				this.$dialog.alert({
					message: '申请成功,请等待审核完成'
				})
				this.$router.go(-1)
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
			push_infor() {
				//电子发票 企业单位 逻辑
				//ajax需要传递的参数集合 
				let billRecord = {
					accFlowId: this.invo_id, //流水id
					customerId: JSON.parse(localStorage.getItem('user_infor')).id, //客户id
					invoiceAmt: parseInt(this.all_price), //总金额
					companyName: this.invoice_title, //公司名称
					companiesId: this.com_id,
					invoiceType: this.invoice_style, //发票类型  电子或纸质
					billType: this.invoice_size, //发票类型  普票和专票
					headType: this.rise_size, //抬头类型
					taxNumber: this.invoice_num, //税号
					billContent: this.invoi_infor, //发票内容
					applyState: 'WAIT', //发票审核状态
					email: this.email, //电子邮件
					newCusAddressFlag: 'Y', //是否新建地址
					recipient: this.addresser, //联系人
					recipientPhone: this.addresser_phone, //联系电话

				};
				if(this.invoice_style == 'ELECTRONIC') {
					if(this.rise_size == 'UNIT') {
						//电子发票  企业单位
						if(this.invoice_title == '' || this.invoice_num == '' || !email_reg.test(this.email)) {
							this.err_infor()
						} else {
							delete billRecord.newCusAddressFlag;
							delete billRecord.recipient;
							delete billRecord.recipientPhone;
							delete billRecord.customerAddress;
							console.log(billRecord)

							push_invoice(billRecord)
								.then((val) => {
									console.log(val)
									if(val.data.status == '1012') {
										this.$dialog.alert({
											message: '该用户发票已申请,不可以重复申请'
										})
									} else if(val.data.status == '0') {
										this.succ_infor()
									}
								})
						}
					} else {
						//电子发票 个人单位
						if(this.invoice_title == '' || !email_reg.test(this.email)) {
							this.err_infor()

						} else {
							delete billRecord.newCusAddressFlag;
							delete billRecord.taxNumber;
							delete billRecord.recipient;
							delete billRecord.recipientPhone;
							delete billRecord.customerAddress;
							push_invoice(billRecord)
								.then((val) => {
									console.log(val)
									if(val.data.status == '0') {
										this.succ_infor()
									}
								})
						}
					}
				} else {
					if(this.invoice_size == 'GENERAL_INVOICE') {
						if(this.rise_size == 'UNIT') {
							//纸质发票 普通发票 企业单位
							if(this.check_address(this.adder_list) && this.invoice_title != '' && this.invoice_num != '') {
								//新建地址
								if(!reg.test(this.adder_list.addresser_phone)) {
									this.$dialog.alert({
										message: '手机号码输入格式错误'
									})
									return
								}
								if(!this.new_addr) {
									billRecord.customerAddress = {
										province: this.adder_array[0].name,
										city: this.adder_array[1].name,
										area: this.adder_array[2].name,
										detailAddress: this.adder_list.address_detail,
										proviceCode: this.adder_array[0].code,
										cityCode: this.adder_array[1].code,
										areaCode: this.adder_array[2].code,
										recipient: this.adder_list.addresser,
										recipientPhone: this.adder_list.addresser_phone,
										companiesId: JSON.parse(localStorage.getItem('user_infor')).companyId
									}
									delete billRecord.email;
									billRecord.customerAddressDetail = this.adder_list.address_detail;
									billRecord.recipient = this.adder_list.addresser;
									billRecord.recipientPhone = this.adder_list.addresser_phone;
									console.log('新增')

									push_invoice(billRecord)
										.then((val) => {
											console.log(val)
											if(val.data.status == '1012') {
												this.$dialog.alert({
													message: '该用户发票已申请,不可以重复申请'
												})
											} else if(val.data.status == '1001') {
												this.$dialog.alert({
													message: "客户地址已存在，不可以重复新增！"
												})
											} else if(val.data.status == '0') {
												this.succ_infor()
											}
										})

								} else {
									//选择默认地址
									console.log('旧的')
									console.log(billRecord)
									billRecord.customerAddressDetail = this.adder_list.address_detail;
									delete billRecord.email;
									delete billRecord.newCusAddressFlag;
									push_invoice(billRecord)
										.then((val) => {
											console.log(val)
											if(val.data.status == '1012') {
												this.$dialog.alert({
													message: '该用户发票已申请,不可以重复申请'
												})
											} else if(val.data.status == '0') {
												this.succ_infor()
											}
										})

								}
							} else {
								this.err_infor()
							}

						} else {
							console.log('纸质发票 普通发票 个人')

							//纸质发票 普通发票 个人
							if(this.check_address(this.adder_list) && this.invoice_title != '') {
								if(!reg.test(this.adder_list.addresser_phone)) {
									this.$dialog.alert({
										message: '手机号码输入格式错误'
									})
									return
								}
								if(!this.new_addr) {
									billRecord.customerAddress = {
										province: this.adder_array[0].name,
										city: this.adder_array[1].name,
										area: this.adder_array[2].name,
										detailAddress: this.adder_list.address_detail,
										proviceCode: this.adder_array[0].code,
										cityCode: this.adder_array[1].code,
										areaCode: this.adder_array[2].code,
										recipient: this.adder_list.addresser,
										recipientPhone: this.adder_list.addresser_phone,
										companiesId: JSON.parse(localStorage.getItem('user_infor')).companyId
									}
									delete billRecord.email;
									delete billRecord.taxNumber;
									billRecord.customerAddressDetail = this.adder_list.address_detail;
									billRecord.recipient = this.adder_list.addresser;
									billRecord.recipientPhone = this.adder_list.addresser_phone;
									console.log('新增')

									push_invoice(billRecord)
										.then((val) => {
											console.log(val)
											if(val.data.status == '1012') {
												this.$dialog.alert({
													message: '该用户发票已申请,不可以重复申请'
												})
											} else if(val.data.status == '1001') {
												this.$dialog.alert({
													message: "客户地址已存在，不可以重复新增！"
												})
											} else if(val.data.status == '0') {
												this.succ_infor()
											}
										})

								} else {
									//选择默认地址
									console.log(billRecord)
									billRecord.customerAddressDetail = this.adder_list.address_detail;
									delete billRecord.email;
									delete billRecord.newCusAddressFlag;
									delete billRecord.taxNumber;
									push_invoice(billRecord)
										.then((val) => {
											console.log(val)
											if(val.data.status == '1012') {
												this.$dialog.alert({
													message: '该用户发票已申请,不可以重复申请'
												})
											} else if(val.data.status == '1001') {
												this.$dialog.alert({
													message: "客户地址已存在，不可以重复新增！"
												})
											} else if(val.data.status == '0') {
												this.succ_infor()
											}
										})
								}
							} else {
								this.err_infor()
							}
						}
					} else {
						//纸质发票 专用发票 企业单位 逻辑
						console.log('纸质发票 专用发票 企业单位')
						if(this.check_address(this.adder_list) && this.check_address(this.bank) && this.invoice_title != '' && this.invoice_num != '') {
							//新增地址逻辑
							if(!reg.test(this.adder_list.addresser_phone)) {
								this.$dialog.alert({
									message: '手机号码输入格式错误'
								})
								return
							}
							if(!this.new_addr) {
								billRecord.customerAddress = {
									province: this.adder_array[0].name,
									city: this.adder_array[1].name,
									area: this.adder_array[2].name,
									detailAddress: this.adder_list.address_detail,
									proviceCode: this.adder_array[0].code,
									cityCode: this.adder_array[1].code,
									areaCode: this.adder_array[2].code,
									recipient: this.adder_list.addresser,
									recipientPhone: this.adder_list.addresser_phone,
									companiesId: JSON.parse(localStorage.getItem('user_infor')).companyId
								}
								delete billRecord.email; //电子邮件
								billRecord.customerAddressDetail = this.adder_list.address_detail; //默认地址
								billRecord.bankOpen = this.bank.bank_name; //开户行
								billRecord.bankOpenPhone = this.bank.bank_num; //开户行电话
								billRecord.recipient = this.adder_list.addresser; //联系人
								billRecord.recipientPhone = this.adder_list.addresser_phone; //联系电话
								console.log('新增')
								push_invoice(billRecord)
									.then((val) => {
										console.log(val)
										if(val.data.status == '1012') {
											this.$dialog.alert({
												message: '该用户发票已申请,不可以重复申请'
											})
										} else if(val.data.status == '1001') {
											this.$dialog.alert({
												message: "客户地址已存在，不可以重复新增！"
											})
										} else if(val.data.status == '0') {
											this.succ_infor()
										}
									})
							} else {
								//选择默认地址
								billRecord.customerAddressDetail = this.adder_list.address_detail; //详细地址
								billRecord.bankOpen = this.bank.bank_name; //开户行
								billRecord.bankOpenPhone = this.bank.bank_num; //开户行电话
								delete billRecord.email;
								delete billRecord.newCusAddressFlag;
								push_invoice(billRecord)
									.then((val) => {
										console.log(val)
										if(val.data.status == '1012') {
											this.$dialog.alert({
												message: '该用户发票已申请,不可以重复申请'
											})
										} else if(val.data.status == '0') {
											this.succ_infor()
										}
									})
							}
						} else {
							this.err_infor()
						}
					}
				}
			},
			change_state(index) {
				this.current = index;
				if(index == 0) {
					this.invoice_style = 'ELECTRONIC'
					this.invoice_size = 'GENERAL_INVOICE'
				} else {
					this.invoice_style = 'PAPER'
				}
			},
			//新建地址
			new_address() {
				this.show_add = false;
				this.adder_list.address_list = '';
				this.adder_list.address_detail = '';
				this.adder_list.addresser = '';
				this.adder_list.addresser_phone = '';
				this.new_addr = false;
				this.show_model = true;
			},
			//点击选择地址模态框 将选择的地址添加到地址栏
			add_address(e) {
				this.show_model = false;
				this.new_addr = false;
				this.adder_array = e;
				console.log(e)
				console.log(this.adder_array[0].name)
				let all_address = ''
				e.forEach((value, index) => {
					all_address += (value.name + ' ')
				})
				this.adder_list.address_list = all_address;
				this.adder_list.address_detail = '';
				this.adder_list.addresser = '';
				this.adder_list.addresser_phone = '';
			},
			//选择完地址以后将选择的地址的信息填充到地址信息栏
			fill_address() {
				this.show_add = false;
				this.new_addr = true;
				console.log(this.arrers_list[this.default_address]);
				let ids = this.arrers_list[this.default_address];
				this.adder_list.address_list = '';
				this.adder_list.address_detail = '';
				this.adder_list.address_list = ids.province + ' ' + ids.city + ' ' + ids.area;
				this.adder_list.address_detail = ids.detailAddress;
				this.adder_list.addresser = ids.recipient;
				this.adder_list.addresser_phone = ids.recipientPhone;
			}
		},
		watch: {
			current: {
				handler(newValue, oldValue) {
					console.log(this.current)
					if(this.current == 0) {
						this.voice_type = 'ELECTRONIC'
					}
				}
			},
			invoice_size: {
				handler(newValue, oldValue) {
					if(this.invoice_size == 'SPECIAL_INVOICE') {
						this.rise_size = 'UNIT'
					}
				}
			},
			invoice_num: {
				handler(newValue, oldValue) {
					this.invoice_num = newValue.replace(/[^\d]/g, '');
				}
			}
		},
		created() {
			let all_price = Number(this.$route.query.allprice);
			this.all_price = all_price.toFixed(2) + '元'
			console.log(this.all_price)
			let customerAddress = {}
			let cus = []
			//取出默认地址 拼接到一块
			let custo = JSON.parse(localStorage.getItem('customerAddress'))
			Object.assign(customerAddress, custo, this.$route.query.adder);
			//进入页面 将默认地址渲染页面上
			if(custo !== null) {
				let province = custo.province;
				let city = custo.city;
				let area = custo.area;
				//省市区地址
				this.adder_list.address_list = province + ' ' + city + ' ' + area;
				//详细地址
				this.adder_list.address_detail = custo.detailAddress;
				//联系人
				this.adder_list.addresser = custo.recipient;
				this.adder_list.addresser_phone = custo.recipientPhone;
			} else {

			}

			//联系电话

			this.customerAddress = cus;
			this.invoice_title = JSON.parse(localStorage.getItem('user_infor')).companyName;
			let companiesTaxCo = this.qs.stringify({
				id: JSON.parse(localStorage.getItem('user_infor')).companyId,
				cname: JSON.parse(localStorage.getItem('user_infor')).companyName
			});
			taxNumb(companiesTaxCo)
				.then(val => {
					console.log(val)
					if(val.data.data !== null){
						this.invoice_num = val.data.data
					}else{
						this.invoice_num = ''
					}
				})
			this.com_id = JSON.parse(localStorage.getItem('user_infor')).companyId;
			let invo_id = '';

			//			if(localStorage.accFlowId == undefined) {
			//				this.$dialog.alert({
			//					message: '当前发票已经提交过了，请不要重复提交。如需继续申请发票，请返回上一页'
			//				})
			//				
			//			}
			this.invo_id = JSON.parse(localStorage.getItem("accFlowId")).join(',');

		}
	}
</script>

<style scoped lang="less">
	.invoice_infor {
		.invoice_title {
			width: 100%;
			display: block;
			font-size: 28px;
			height: 65px;
			line-height: 68px;
			color: #666666;
			a {
				display: inline-block;
				width: 7px;
				height: 30px;
				position: relative;
				top: 4px;
				background-color: #ff9f08;
				margin-left: 20px;
			}
		}
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
		.no_check {
			color: #00a4f9 !important;
			border-color: #00a4f9 !important;
		}
		.invoice_type {
			width: 100%;
			height: 270px;
			background-color: #FFFFFF;
			.invoice_tips {
				text-align: center;
				color: #999999;
				font-size: 25px;
				position: relative;
				top: -20px;
			}
			.index_list {
				height: 200px;
				display: flex;
				justify-content: space-around;
				align-items: center;
				span {
					display: inline-block;
					width: 240px;
					height: 110px;
					border: 1px solid #666666;
					color: #666666;
					text-align: center;
					p {
						font-size: 29px;
						padding-top: 20px;
					}
					a {
						font-size: 23px;
					}
				}
			}
		}
		.invoice_details {
			width: 100%;
			background-color: #FFFFFF;
			span {
				display: block;
				height: 75px;
				border-bottom: 1px solid #c9c9c9;
				font-size: 28px;
				padding-left: 20px;
				a {
					color: #666666;
					display: inline-block;
					position: relative;
					top: 15px;
				}
				.van-radio-group {
					display: inline-block;
					height: 40px;
					position: relative;
					top: 22px;
					font-size: 27px;
					.van-radio {
						float: left;
						padding-left: 15px;
						padding-top: 7px;
						.van-radio__input {
							font-size: 20px !important;
						}
					}
				}
			}
			.van-cell {
				height: 75px;
				font-size: 28px;
				color: #666666;
				border-bottom: 1px solid #c9c9c9;
				line-height: 60px;
			}
			.invoice_three select {
				border: 0 !important;
				font-size: 28px;
				position: relative;
				top: 15px;
				background-color: #ffffff;
			}
		}
		.invoice_four {
			.van-cell {
				height: 80px;
				font-size: 28px;
				color: #666666;
				border-bottom: 1px solid #c9c9c9;
				line-height: 60px;
			}
		}
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
			margin-top: 70px;
			margin-bottom: 40px;
		}
	}
</style>