<template>
	<div style="position: relative;" class="my_login">
		<div class="header">
			<img src="../assets/foot_icon/login_logo.jpg">
		</div>
		<div class="login_model">
			<div class="login_header">
				<span @click="change_state(item.loginType)" :class="{no_check:item.loginType != current}" v-for="(item,index) in mode">{{item.name}}</span>

			</div>

			<div v-show="current == 'PWD_LOGIN'" class="pass_code">
				<van-cell-group>
					<van-field v-model="phone_code" label="手机号 :" placeholder="请输入手机号" />

					<van-field v-model="password" type="password" label="密码 :" placeholder="请输入密码" />
				</van-cell-group>
				<van-dialog v-model="show_three" show-confirm-button show-cancel-button title="请填写验证码" class="model_two" @confirm="veri_code2">
					<div>
						<input id="sms_code2">
						<img src="http://smb.allits.com.cn/apis/wechat_user/code" id="imgs1">
						<a @click="reset_img2">看不清？换一张</a>
					</div>
				</van-dialog>
			</div>

			<div v-show="current == 'IDT_LOGIN'" class="phone_code">
				<van-cell-group>
					<van-field v-model="phone_code" label="手机号 :" placeholder="请输入手机号" />

					<van-field v-model="sms" label="短信验证码 :" placeholder="请输入验证码">
						<van-button slot="button" size="small" type="primary" @click="get_code" v-show="sendAuthCode">获取验证码</van-button>
						<van-button slot="button" size="small" type="primary" v-show="!sendAuthCode" disabled style="color: gray !important;">{{auth_time}}</van-button>

					</van-field>

				</van-cell-group>
				<van-dialog v-model="show_two" show-confirm-button show-cancel-button title="请填写验证码" class="model_two" @confirm="veri_code">
					<div>
						<input id="sms_code">
						<img src="http://smb.allits.com.cn/apis/wechat_user/code" id="imgs2">
						<a @click="reset_img">看不清？换一张</a>
					</div>
				</van-dialog>
			</div>
		</div>
		<div class="register">
			<span @click="linkto_register('/register')">立即注册</span>
			<span @click="linkto_register('/reset_pass')">找回密码</span>
		</div>
		<div class="online_consu_but" @click="login_mine">登录</div>
		<div class="footer">
			<a href="tel:400-810-8107">咨询电话：400-810-8107</a>
		</div>
	</div>
</template>

<script>
	import { login, reg, get_phonecode, ip_code } from '../../static/public_css/public_axios.js'
	export default {
		data() {
			return {
				mode: [{
						name: '密码登录',
						loginType: 'PWD_LOGIN'
					},
					{
						name: '短信验证码登录',
						loginType: 'IDT_LOGIN'
					}
				],
				current: 'PWD_LOGIN', //登录模式
				phone_code: '', //手机号
				password: '', //密码
				sms: '', //短信验证码
				sendAuthCode: true, //判断发送按钮跟倒计时
				auth_time: 0, //发送成功以后倒计时
				show_two: false,
				show_three: false,
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
			change_state(e) {
				this.current = e;
				console.log(this.current)
			},
			reset_img() {
				document.getElementById('imgs2').src = "http://smb.allits.com.cn/apis/wechat_user/code?timestamp=" + (new Date()).valueOf();
			},
			reset_img2() {
				document.getElementById('imgs1').src = "http://smb.allits.com.cn/apis/wechat_user/code?timestamp=" + (new Date()).valueOf();
			},
			veri_code() {
				let sms_code = document.getElementById('sms_code').value;
				document.getElementById('sms_code').value = '';
				console.log(sms_code)//判断图片验证码对错
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
			},
			veri_code2() {
				let sms_code = document.getElementById('sms_code2').value;
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
					if(val.data.status == "IMGCODE_202") {
						this.$dialog.alert({
							message: '验证失败'
						});
					}

				}).catch((err) => {

				})
			},
			login_mine() {
				//账号密码登录
				if(this.current == 'PWD_LOGIN') {
					if(this.phone_code == '' || this.password == '' || this.password.length < 9) {
						this.$dialog.alert({
							message: '请输入正确的手机号码和最少9位密码'
						});
					} else if(!reg.test(this.phone_code)) {
						this.$dialog.alert({
							message: '手机号码输入有误'
						})
					} else {
						let postData = this.qs.stringify({
							phone: this.phone_code,
							loginType: this.current,
							password: this.password
						});
						//账号密码登录 调取ajax
						login(postData).then((val) => {
							console.log(val)
							if(val.data.status == "LGN_201") {
								localStorage.setItem("user_infor", JSON.stringify(val.data.data));
								localStorage.setItem("token",val.data.token);
								console.log(localStorage.getItem("token"))
								this.$router.push({
									path: '/mine'
								})
							} else if(val.data.status == "LGN_202") {
								this.$dialog.alert({
									message: "手机号码或者密码错误，请重试"
								})
							} else if(val.data.status == "LGN_208") {
							
								this.show_three = true;
							}else if(val.data.status == "LGN_203"){
								this.$dialog.alert({
									message: "该用户未注册"
								})
							}
						})
					}
				} else {
					//短信验证码登录		
					if(reg.test(this.phone_code) && this.sms != '') {
						let postData = this.qs.stringify({
							phone: this.phone_code,
							loginType: this.current,
							phoneCode: this.sms
						});
						//短信验证码登录 调取的ajax
						login(postData).then((val) => {
							console.log(val)
							if(val.data.status == "LGN_202") {
								this.$dialog.alert({
									message: "未查找到该用户"
								})
							} else if(val.data.status == "LGN_201") {
								localStorage.setItem("user_infor", JSON.stringify(val.data.data));
								this.$router.push({
									path: '/mine'
								})
							} else if(val.data.status == "LGN_204") {
								this.$dialog.alert({
									message: "验证码错误"
								})
							}
						})
					} else {
						this.$dialog.alert({
							message: '请输入手机号和短信验证码'
						})
					}
				}

			},
			linkto_register(e) {
				this.$router.push({
					path: e
				});
			},
			get_code() {
				console.log(this)
				//获取验证码
				if(reg.test(this.phone_code)) {
					get_phonecode(this.phone_code, ip_code).then((val) => {
						console.log(val)
						if(val.data.status == "SMS_201") {
							this.phonecode_success()
						} else if(val.data.status == "SMS_203") {
							this.show_two = true;

						}
					}).catch((err) => {
						console.log(err);
					})
				} else {
					this.$dialog.alert({
						message: '请检查您的手机号格式'
					})
				}

			}

		},
		created() {

    this.$notify('请先登录再进行下一步操作哦');

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
		font-size: 31px;
		text-align: center;
		line-height: 100px;
		margin: 0 auto;
		background-color: #00a4f9;
		border-radius: 10px;
		color: #ffffff;
		margin-top: 400px;
	}
	
	.my_login {
		height: 1000px;
		position: relative;
		.register {
			position: absolute;
			top: 645px;
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
		height: 360px;
		position: absolute;
		top: 270px;
		left: 7.5%;
		border-radius: 15px;
		.van-cell-group {
			padding-top: 20px;
		}
		.login_header {
			width: 100%;
			overflow: hidden;
			span {
				display: inline-block;
				width: 50%;
				float: left;
				text-align: center;
				height: 100px;
				line-height: 100px;
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