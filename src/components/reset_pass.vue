<template>
	<div style="position: relative;" class="reset_pass">
		<div class="header">
			<img src="../assets/foot_icon/login_logo.jpg">
		</div>
		<div class="login_model">
			<div class="login_header">
				<span>找回密码</span>
			</div>
			<div class="phone_code" v-show="!phone_code_state">
				<van-cell-group>
					<van-field v-model="phone_code" label="手机号 : " placeholder="请输入手机号" />
					<van-field v-model="sms" label="短信验证码 :" placeholder="请输入验证码">
						<van-button slot="button" size="small" type="primary" @click='get_code' v-show="sendAuthCode">获取验证码</van-button>
						<van-button slot="button" size="small" type="primary" v-show="!sendAuthCode" disabled style="color: gray !important;">{{auth_time}}</van-button>
					</van-field>
				</van-cell-group>
				<van-dialog v-model="show_two" show-confirm-button show-cancel-button title="请填写验证码" class="model_two" @confirm="veri_code">
					<div>
						<input id="sms_code">
						<img src="http://smb.allits.com.cn/apis/wechat_user/code" id="imgs">
						<a @click="reset_img">看不清？换一张</a>
					</div>
				</van-dialog>
			</div>
			<div class="reset_code" v-show="phone_code_state">
				<van-cell-group>
					<van-field v-model="pass_code" label="密码 : " placeholder="请输入密码" />
				</van-cell-group>
			</div>
		</div>
		<div class="online_consu_but" v-show="!phone_code_state" @click="next_pass">下一步</div>
		<div class="online_consu_but" v-show="phone_code_state" @click="re_pass">确定</div>
		<div class="footer">
			<a href="tel:400-810-8107">咨询电话：400-810-8107</a>
		</div>
	</div>
</template>

<script>
	import { get_phonecode, ip_code, reg, retrieve_pass, reset_pass } from '../../static/public_css/public_axios.js'
	export default {
		data() {
			return {
				phone_code: '', //手机号
				sms: '', //短信验证码
				phone_code_state: false,
				pass_code: '', //重置密码
				sendAuthCode: true,
				auth_time: 0,
				show_two: false
			};
		},
		methods: {
			//短信验证码发送成功
			phonecode_success() {
				this.sendAuthCode = false;
				this.auth_time = 60;
				let auth_timetimer = setInterval(() => {
					this.auth_time--;
					if(this.auth_time <= 0) {
						this.sendAuthCode = true;
						clearInterval(auth_timetimer);
					}
				}, 1000);
			},
			get_code() {
				if(!reg.test(this.phone_code)) {
					this.$dialog.alert({
						message: '手机号码输入有误'
					});
				} else {
					get_phonecode(this.phone_code, ip_code)
						.then((val) => {
							console.log(val)
							if(val.data.status == "SMS_201") {
								this.sendAuthCode = false;
								this.auth_time = 60;
								let auth_timetimer = setInterval(() => {
									this.auth_time--;
									if(this.auth_time <= 0) {
										this.sendAuthCode = true;
										clearInterval(auth_timetimer);
									}
								}, 1000);
							} else if(val.data.status == "SMS_203") {
								this.show_two = true;
							}
						}).catch((err) => {
							console.log(err)
						})
				}
			},
			reset_img() {
				document.getElementById('imgs').src = "http://smb.allits.com.cn/apis/wechat_user/code?timestamp=" + (new Date()).valueOf();

			},
			next_pass() {
				if(reg.test(this.phone_code) && this.sms != '') {
					retrieve_pass(this.phone_code, this.sms)
						.then((val) => {
							console.log(val)
							if(val.data.status == '200') {
								this.phone_code_state = true;
							}
						}).catch((err) => {

						})
				} else {
					this.$dialog.alert({
						message: '请输入正确的手机号和短信验证码'
					});
				}
			},
			re_pass() {
				if(this.pass_code != '') {
					reset_pass(this.phone_code, this.pass_code)
						.then((val) => {
							console.log(val)
							if(val.data.status == '200') {
								this.$dialog.alert({
									message: '修改密码成功,请重新登录'
								});
								this.$router.push({
									path: '/login'
								})
							}
						}).catch((err) => {

						})
				} else {
					this.$dialog.alert({
						message: '请输入正确的密码'
					});
				}
			},
			veri_code() {
				let sms_code = document.getElementById('sms_code').value;
				document.getElementById('sms_code').value = '';
				console.log(sms_code)
				//判断图片验证码对错
				this.$ajax.get('http://smb.allits.com.cn/apis/wechat_user/checkCode', {
					params: {
						code: sms_code
					}
				}, {
					'xhrFields': {
						withCredentials: true
					},
					crossDomain: true
				}).then((val) => {
					console.log(val)
					//图片验证码正确 重新调用发送短信验证码ajax
					if(val.data.status == "IMGCODE_201") {

						this.$ajax.get('http://smb.allits.com.cn/apis/wechat_user/sms', {
							params: {
								phoneNum: this.phone_code,
								ip: ip_code
							}
						}, {
							'xhrFields': {
								withCredentials: true
							},
							crossDomain: true
						}).then((val) => {
							if(val.data.status == "SMS_201") {
								this.phonecode_success()
							}
						})
					} else if(val.data.status == "IMGCODE_202") {
						this.$dialog.alert({
							message: '短信验证码输入错误'
						});
					}

				}).catch((err) => {

				})
			}
		}
	}
</script>

<style scoped lang="less">
	.no_check {
		background-color: #F2F2F2 !important;
		color: #afafaf !important;
	}
	
	.footer {
		margin-top:350px;
		display: block;
		text-align: center;
		width: 100%;
		a {
			color: #999999 !important;
			text-align: center;
			display: block;
			width: 100%;
			font-size: 26px;
			padding-bottom: 20px;
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
		margin-top: 400px;
	}
	
	.reset_pass {
		height: 1000px;
		position: relative;
		.register {
			position: absolute;
			top: 670px;
			width: 85%;
			left: 7%;
			span:first-child {
				color: #00a4f9;
				font-size: 28px;
			}
			span:last-child {
				color: #999999;
				font-size: 28px;
				float: right;
			}
		}
	}
	
	.header {
		width: 100%;
		height: 400px;
		background: url(../assets/foot_icon/login_back.jpg) no-repeat;
		background-size: 100%;
		img {
			display: block;
			margin: 0 auto;
			padding-top: 50px;
		}
	}
	
	.login_model {
		width: 85%;
		background-color: #FFFFFF;
		height: 380px;
		position: absolute;
		top: 270px;
		left: 7.5%;
		border-radius: 15px;
		.van-hairline--top-bottom::after {
			border: 0 !important;
		}
		.van-cell-group {
			padding-top: 35px;
			.van-cell {
				width: 90%;
				margin-left: 4%;
				height: 90px;
				line-height: 90px;
				font-size: 28px;
				border-bottom: 1px solid #c9c9c9;
			}
		}
		.login_header {
			width: 100%;
			overflow: hidden;
			span {
				display: inline-block;
				width: 100%;
				float: left;
				text-align: center;
				height: 100px;
				line-height: 150px;
				font-size: 29px;
				color: #333333;
				letter-spacing: 1px;
			}
			span:last-child {
				border-top-right-radius: 15px;
			}
			span:first-child {
				border-top-left-radius: 15px;
			}
		}
	}
</style>