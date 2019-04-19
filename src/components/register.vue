<template>
	<div class="register">
		<div class="header">
			<img src="../assets/foot_icon/login_logo.jpg">
		</div>
		<div class="login_model">
			<div class="login_header">
				<span>注册</span>
			</div>
			<div class="phone_code">
				<van-cell-group>
					<van-field label="公司名称 : " placeholder="请输入公司名称" v-model="company_name"  />
					<van-field label="联系人 : " placeholder="请输入联系人" v-model="company_contacts" />
					<van-field label="手机号 : " placeholder="请输入手机号" v-model="phone" />
					<van-field label="短信验证码 :" placeholder="请输入验证码" v-model="sms_code" class="sms_code">
						<van-button slot="button" size="small" type="primary" @click="get_code" v-show="sendAuthCode">获取验证码</van-button>
						<van-button slot="button" size="small" type="primary" v-show="!sendAuthCode" disabled style="color: gray !important;">{{auth_time}}</van-button>
					</van-field>
					<van-field label="密码 : " placeholder="请输入密码" v-model="password" />
				</van-cell-group>
				<van-dialog v-model="show_two" show-confirm-button show-cancel-button title="请填写验证码" class="model_two" @confirm="veri_code">
					<div>
						<input id="sms_code">
						<img src="http://smb.allits.com.cn/apis/wechat_user/code" id="imgs">
						<a @click="reset_img">看不清？换一张</a>
					</div>
				</van-dialog>
			</div>

		</div>

		<div class="online_consu_but" @click="push_form">确定</div>
		<div class="footer">
			<a href="tel:400-810-8107">咨询电话：400-810-8107</a>
		</div>
	</div>
</template>

<script>
	import { sub_register, reg, get_phonecode, ip_code } from '../../static/public_css/public_axios.js'
	export default {
		data() {
			return {
				company_name: '', //公司名称
				company_contacts: '', //公司联系人
				phone: '', //手机号
				sms_code: '', //短信验证码
				password: '', //密码
				sendAuthCode: true,
				/*布尔值，通过v-show控制显示‘发送短信’还是‘倒计时’ */
				auth_time: 0,
				/*倒计时 计数器*/
				img_sms: '',
				datas: {},
				show_two: false
			};
		},
		methods: {
			sss() {
				console.log('22')
			},
			reset_img() {
				document.getElementById('imgs').src = "http://smb.allits.com.cn/apis/wechat_user/code?timestamp=" + (new Date()).valueOf();

			},
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
			push_form() {

				if(this.company_name == '' || this.company_contacts == '' || this.phone == '' || this.sms_code == '' || this.password ==
					'') {
					this.$dialog.alert({
						message: '您有必填项未填写'
					});
				} else {
					if(this.password.length < 9) {
						this.$dialog.alert({
							message: '密码最少为9位哦'
						});
						return
					}
					let postData = this.qs.stringify({
						userName: this.company_contacts,
						companyName: this.company_name,
						password: this.password,
						phone: this.phone,
						phoneCode: this.sms_code
					});
					sub_register(postData).then((val) => {
						console.log(val)
						if(val.data.status == "RGT_201") {
							this.$dialog.alert({
								message: '注册成功请您登录'
							});
							this.$router.push({
								path: '/login'
							})
						} else if(val.data.status == "RGT_206") {
							this.$dialog.alert({
								message: "该手机号已经注册过"
							});
						} else if(val.data.status == "RGT_207") {
							this.$dialog.alert({
								message: "该手机号未发送验证码"
							});
						}else if(val.data.status == "RGT_203"){
							this.$dialog.alert({
								message: "验证码错误"
							});
						}
					}).catch((err) => {
						console.log(err);
					})
				}
			},
			get_code() {
				if(this.phone == '') {
					this.$dialog.alert({
						message: '请输入您的手机号码'
					});
				} else if(!reg.test(this.phone)) {
					this.$dialog.alert({
						message: '手机号码格式不正确'
					});
				} else {
					//获取验证码
					get_phonecode(this.phone, ip_code).then((val) => {
						console.log(val)
						if(val.data.status == "SMS_201") {
							this.phonecode_success()
						} else if(val.data.status == "SMS_203") {
							this.show_two = true;
						}
					}).catch((err) => {
						console.log(err);
					})

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
								phoneNum: this.phone,
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
		},
		created() {

		}
	}
</script>

<style scoped lang="less">
	.footer {
		margin-top:220px;
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
		margin-top: 550px;
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
				font-size: 30px;
			}
			span:last-child {
				color: #999999;
				font-size: 30px;
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
		padding-bottom: 50px;
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
				height: 85px;
				line-height: 90px;
				font-size: 29px;
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