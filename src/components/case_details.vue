<template>
	<div class="case_details">
		<div class="case_header">
			我的账户》我的服务》服务详情
		</div>
		<div class="line">

		</div>
		<div class="case_evaluate">
			<div class="case_number">
				服务单号：{{case_num}}

			</div>
			<div class="pingjia" v-if="idpaid == 'YES' && satisfy == null">
				<span class="invoice_title">
			<a></a>&nbsp;服务评价
			</span>
				<div class="case_list">
					<span v-for="(item,index) in case_list" :class="{checks:index == current}" @click="change_state(index,item)">
					{{item.name}}
				</span>

				</div>
				<div class="click_pingjia" @click="evaluate">
					立即评价
				</div>
			</div>
			<div class="line">

			</div>
			<div class="case_progress">
				<span class="invoice_title">
			<a></a>&nbsp;服务进度
			</span>
				<div class="case_li">
					<div class="case_item">
						<div class="case_time">
							<p>{{datas.createTimeDay}}</p>
							<a>{{datas.createTime}}</a>
						</div>
						<span class="case_icon">
							<a></a>
						</span>
						<div class="case_con">
							<p>远程技术诊断</p>
							<a>{{datas.remoteHelpResult}}</a>
						</div>
						<div class="case_line">

						</div>
					</div>
					<div class="case_item" v-if="datas.remoteHelpResult !== null && datas.remoteHelpResult == '远程处理失败' && datas.salveFlag == null">
						<div class="case_time">
							<p>{{datas.vtCreateTimeDay}}</p>
							<a>{{datas.vtCreateTime}}</a>
						</div>
						<span class="case_icon">
							<a></a>
						</span>
						<div class="case_con">
							<p>正在安排工程师</p>
							<a>{{datas.engineerName}}&nbsp;{{datas.engineerPhone}}</a>
						</div>
						<div class="case_line">

						</div>
					</div>
					<div class="case_item" v-if="datas.salveFlag == '寄修'">
						<div class="case_time">
							<p>{{datas.vtCreateTimeDay}}</p>
							<a>{{datas.vtCreateTime}}</a>
						</div>
						<span class="case_icon">
							<a></a>
						</span>
						<div class="case_con">
							<p>安排寄修</p>
							<a>{{datas.engineerName}}&nbsp;{{datas.engineerPhone}}</a>
						</div>
						<div class="case_line">

						</div>
					</div>
					<div class="case_item" v-show="datas.engerStartOff">
						<div class="case_time">
							<div v-if="dats_array && dats_array.length >= 1">
								<p>{{dats_array[0].signTimeDay}}</p>
								<a>{{dats_array[0].signTime}}</a>
							</div>
						</div>
						<span class="case_icon">
							<a></a>
						</span>
						<div class="case_con">
							<p>工程师已出发</p>
							
						</div>
						<div class="case_line">

						</div>
					</div>
					<div class="case_item" v-show="datas.engerPresent">
						<div class="case_time">
							<div v-if="dats_array && dats_array.length >= 2">
								<p>{{dats_array[1].signTimeDay}}</p>
								<a>{{dats_array[1].signTime}}</a>
							</div>
						</div>
						<span class="case_icon">
							<a></a>
						</span>
						<div class="case_con">
							<p>工程师已到场</p>
							

						</div>
						<div class="case_line">

						</div>
					</div>
					<div class="case_item" v-show="datas.engerService">
						<div class="case_time">
							<div v-if="dats_array && dats_array.length >= 3">
								<p>{{dats_array[2].signTimeDay}}</p>
								<a>{{dats_array[2].signTime}}</a>
							</div>
						</div>
						<span class="case_icon">
							<a></a>
						</span>
						<div class="case_con">
							<p>工程师服务中</p>
							

						</div>
						<div class="case_line">

						</div>
					</div>
					<div class="case_item" v-show="datas.engerDepart">
						<div class="case_time">
							<div v-if="dats_array && dats_array.length >= 4">
								<p>{{dats_array[3].signTimeDay}}</p>
								<a>{{dats_array[3].signTime}}</a>
							</div>
						</div>
						<span class="case_icon">
							<a></a>
						</span>
						<div class="case_con">
							<p>工程师已离场</p>
							

						</div>
						<div class="case_line">
						</div>
					</div>

				</div>
			</div>
			<div class="line">

			</div>
			<div class="case_content">
				<span class="invoice_title">
			<a></a>&nbsp;报修信息
			</span>
				<div class="error_content">
					{{error_content}}
				</div>
				<div class="error_time">
					{{error_time}}
				</div>
			</div>
			<div class="line">

			</div>
			<div class="price_num" v-if="price !== null">
				<span class="invoice_title">
			<a></a>&nbsp;结费信息
			</span>

				<div class="cost">
					费用
					<span>¥ {{price}}</span>
				</div>
			</div>
		</div>
		<div class="online_consu_but" v-show="idpaid !== null && idpaid !=='YES'" @click="pay_now(datas.orderId)">立即支付</div>
	</div>
</template>

<script>
	import { case_detail, order_del } from '../../static/public_css/public_axios.js'
	export default {
		data() {
			return {
				case_num: '23124214124',
				case_list: [{
						name: '非常满意',
						label: 'GREAT_SATISFACTION'
					},
					{
						name: '满意',
						label: 'SATISFACTION'
					},
					{
						name: '不满意',
						label: 'NOT_SATISFIED'
					},
					{
						name: '很不满意',
						label: 'IS_NOT_SATISFIED'
					},
				],
				current: 0,
				error_content: '设备系统卡顿,无法正常办公',
				error_time: '2018/2/11 17:22:00',
				idpaid: null, //是否支付
				satisfy: null, //是否评价
				satis_val:'GREAT_SATISFACTION',//评价结果
				datas: {}, //总数据
				dats_array: [],
				caseId:'',//工单id
				price:0,//订单金额
				engerId:'',//工程师id
			}
		},
		methods: {
			change_state(index,item) {
				this.current = index;
			
				this.satis_val = this.case_list[index].label;
					console.log(this.satis_val);
			},
			pay_now(e) {
				localStorage.setItem("order_type", '工单报修')
				localStorage.setItem("order_id", e)
				localStorage.setItem("order_num", this.datas.orderNum)
				
				this.$router.push({
					name: 'order_details'

				});
			},
			//立即评价
			evaluate(){
				let Comment = this.qs.stringify({
					caseId:this.caseId,
					caseNum:this.case_num,
					engerId:this.engerId,
					satisfy:this.satis_val
				})
				order_del(Comment)
				.then(val=>{
					console.log(val)
					if(val.data.status == '0'){
						this.get_data()
					}
				})
				
			},
			get_data(){
				case_detail(this.$route.params.id)
				.then((val) => {
					console.log(val.data.data)
					this.error_content = val.data.data.bugDescribe;
					this.error_time = val.data.data.createTime;
					this.case_num = val.data.data.caseNum;
					this.idpaid = val.data.data.isPaid;
					this.satisfy = val.data.data.satisfy;
					this.caseId = val.data.data.id;
					this.datas = val.data.data;
					this.dats_array = val.data.data.signRecordPubVoList;
					this.price = val.data.data.totalPrice;
					this.engerId = val.data.data.vtEngineerId;
				})
			}
		},
		created() {
			this.get_data()

		}
	}
</script>

<style scoped lang="less">
	.checks {
		border-color: #16acfa !important;
		color: #16acfa !important;
	}
	
	.case_details {
		.case_header {
			background-color: #FFFFFF;
			color: #999999;
			height: 55px;
			line-height: 60px;
			padding-left: 10px;
			font-size: 26px;
		}
		.line {
			width: 100%;
			height: 20px;
			background-color: #f2f2f2;
		}
		.case_evaluate {
			background-color: #ffffff;
			.case_number {
				color: #666666;
				font-size: 29px;
				padding: 15px 0 15px 10px;
			}
			.pingjia {
				padding-bottom: 40px;
			}
			.case_progress {
				padding-bottom: 30px;
			}
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
			.case_list {
				width: 90%;
				display: flex;
				justify-content: space-around;
				margin: 0 auto;
				padding: 14px 0;
				font-size: 27px;
				color: #c9c9c9;
				span {
					border: 1px solid #c9c9c9;
					padding: 5px 13px;
					border-radius: 5px;
				}
			}
			.click_pingjia {
				margin: 0 auto;
				color: #ffffff;
				width: 150px;
				height: 55px;
				background-color: #16acfa;
				text-align: center;
				line-height: 60px;
				margin-top: 30px;
				font-size: 28px;
				border-radius: 8px;
			}
			.case_content {
				overflow: hidden;
				.error_content {
					color: #666666;
					font-size: 29px;
					padding-left: 25px;
					padding-top: 10px;
				}
				.error_time {
					color: #666666;
					font-size: 27px;
					float: right;
					color: #999999;
					padding: 50px 10px 15px 0;
				}
			}
			.case_li {
				width: 90%;
				margin: 0 auto;
				overflow: hidden;
				.case_item {
					width: 100%;
					padding: 15px 0;
					clear: both;
					position: relative;
					.case_time {
						overflow: hidden;
						width: 160px;
						font-size: 29px;
						padding-left: 60px;
						float: left;
						a {
							font-size: 26px;
							float: right;
							color: #666666;
							padding-top: 8px;
						}
					}
					.case_icon {
						display: block;
						float: left;
						width: 35px;
						height: 36px;
						border: 1px solid #07a6f9;
						border-radius: 20px;
						margin: 20px;
						position: relative;
						z-index: 1000;
						background-color: #ffffff;
						display: flex;
						justify-content: center;
						align-items: center;
						a {
							width: 20px;
							height: 20px;
							border-radius: 25px;
							background-color: #07a6f9;
							display: block;
						}
					}
					.case_con {
						float: left;
						font-size: 29px;
						a {
							font-size: 26px;
							text-align: center;
							color: #666666;
						}
					}
					.case_line {
						width: 0;
						height: 75px;
						border: 1px dashed #07a6f9;
						position: absolute;
						left: 257px;
						top: 60px;
					}
				}
				.case_item:last-child {
					.case_line {
						display: none;
					}
				}
			}
			.price_num {
				padding-bottom: 20px;
				.cost {
					width: 90%;
					margin: 0 auto;
					color: #333333;
					font-size: 29px;
					span {
						float: right;
						color: #d40000;
					}
				}
			}
		}
		.online_consu_but {
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
	}
</style>