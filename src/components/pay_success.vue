<template>
	<div class="success">
		<img src="../assets/foot_icon/pay_success.png" v-show="but">
		<p id="pay_flag">处理中。。。</p>
		<div class="online_consu_but" @click="go_home" v-show="but">回到我的账户</div>
	</div>
</template>

<script>
	import { flag_ali, isWeiXin, GetUrlParam, flag_weixin } from '../../static/public_css/public_axios.js'
	export default {
		data() {
			return {
				but: false
			}
		},
		methods: {
			go_home() {
				this.$router.push({
					name: 'mine'
				});
			}
		},
		created() {
			//支付宝支付检查逻辑
			if(!isWeiXin()) {
				let idss = GetUrlParam("id");
				let orderNum = GetUrlParam("orderNum");
				let orderCo = {
					id: idss,
					orderNum:orderNum
				};
				setTimeout(
					flag_ali(orderCo)
					.then((val) => {
						console.log(val)
						if(val.data.message == "成功") {
							document.getElementById('pay_flag').innerHTML = '支付成功';
							this.but = true;
						}
					}), 3000)
			} else {
				//微信支付检查逻辑
				let trade_state = GetUrlParam("trade_state");
				flag_weixin(trade_state)
					.then((val) => {
						if(val.data.status == 200) {
							document.getElementById('pay_flag').innerHTML = '支付成功';
							this.but = true;
						}

					})
			}

		}
	}
</script>

<style scoped lang="less">
	img {
		width: 150px;
		display: block;
		margin: 0 auto;
		padding-top: 120px;
	}
	
	p {
		font-size: 42px;
		text-align: center;
		padding-top: 30px;
		color: #333333;
	}
	
	.online_consu_but {
		width: 500px;
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