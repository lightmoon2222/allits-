<template>
	<div class="my_service">
		<van-tabs sticky v-model="active" :line-width="50" color="#00a4f9" @click="service_sta">
			<van-tab v-for="(item,index) in service_list" :title="item.name" :key="index">
				<div>
					<div class="service_list" v-for="item in array_list" :data-id="item.id" @click="case_details(item.id)">
						<span class="order_id">
						{{item.caseNum}}
					</span>
						<span class="order_infor">
						{{item.bugDescribe}}
					</span>
						<div class="order_tips">
							<van-tag color="#ff9f08" plain v-show="item.status == '工程师已出发，等待到场'">工程师已出发</van-tag>
							<van-tag color="#6495ED" plain v-show="item.status == '已完成'">已完成</van-tag>
							<van-tag color="#00a4f9" plain v-show="item.status == '正在派单'">正在派单</van-tag>
							<van-tag color="#96CDCD" plain v-show="item.status == '问题已解决，关单'">问题已解决</van-tag>
							<van-tag color="#5CACEE" plain v-show="item.status == '待支付'">待支付</van-tag>
							<van-tag color="#6E6E6E" plain v-show="item.status == '待评价'">待评价</van-tag>
							<van-tag color="#8B6969" plain v-show="item.status == '工程师已离场'">工程师已离场</van-tag>
						</div>
						<div class="order_time">
							{{item.subTime}}
						</div>
					</div>
				</div>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
	import { case_record } from '../../static/public_css/public_axios.js'
	export default {
		data() {
			return {
				active: 2,
				service_list: [{
						name: '待接单',
						status: 1
					},
					{
						name: '处理中',
						status: 2
					},
					{
						name: '待支付',
						status: 3
					},
					{
						name: '待评价',
						status: 5
					},
					{
						name: '已完成',
						status: 6
					},
				],
				companiesId: 0,
				array_list: [] //拿到的数据

			}
		},
		methods: {
			service_sta(index) {
				let stau = this.service_list[index].status
				case_record(this.companiesId, stau)
					.then((val) => {
						console.log(val)
						this.array_list = val.data.data;
					})
			},
			case_details(e) {
				console.log(e)
				this.$router.push({
					name: 'case_details',
					params:{
						id:e
					}
				});
			}
		},
		created() {
			this.active = this.$route.params.id;
			this.companiesId = JSON.parse(localStorage.getItem('user_infor')).companyId;
			this.service_sta(this.active)
		}
	}
</script>

<style scoped lang="less">
	.service_list {
		width: 95%;
		margin: 0 auto;
		height: 230px;
		background-color: #FFFFFF;
		border-radius: 15px;
		margin-top: 15px;
		position: relative;
		.order_id {
			display: block;
			height: 70px;
			line-height: 70px;
			font-size: 27px;
			border-bottom: 1px solid #d5d5d5;
			width: 90%;
			margin: 0 auto;
			color: #666666;
		}
		.order_infor {
			position: absolute;
			left: 40px;
			top: 105px;
			font-size: 28.5px;
			letter-spacing: 1px;
			color: #333333;
			width: 400px;
			float: left;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
		}
		.order_tips {
			display: inline-block;
			float: right;
			span {
				text-align: center;
				width: 150px;
				padding: 10px 10px;
				font-size: 25px;
				margin-top: 32px;
				float: right;
				margin-right: 30px;
			}
		}
		.order_time {
			position: absolute;
			right: 20px;
			bottom: 17px;
			font-size: 27px;
			color: #999999;
		}
	}
</style>