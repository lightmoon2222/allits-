<template>
	<div>
		<div class="repair_sub_que">
			<van-field v-model="enterprise_num" label="企业会员号 :" disabled class="user_id"/>
			<van-field v-model="contacts" label="联系人 :" class="adders"/>
			<van-field v-model="phone" label="联系电话 :"  class="phones"/>
			<div class="details_textarea">
				<van-field v-model="details" label="详情描述 :" type="textarea" placeholder="问题描述" rows="1" autosize />
			</div>
			<div class="uoload_image">
				<span>详情描述：</span>
				<input type="file" @change="UpladFile()" id="file"  accept="image/*,video/*"/>
				<div class="input_fo">
					+
				</div>
				<div id="img_list">
				</div>
				<span class="upload_tips">
				建议上传最多3张照片或者截图，视频，方便工程师判断问题，支持图片格式和视频格式
			</span>
			</div>
			<div class="img_load" v-show="img_load">
				<van-loading type="spinner" color="#ffffff" class="loading" size="60px"/>
				<p style="padding-top: 10px;">上传您提交的数据中<br /> 请您稍等。。。</p>
			</div>
		</div>
		<button class="sub_que" @click="push_infor" :disabled="push_disabled">
			提交
		</button>
	</div>
</template>

<script>
	import { multifileUpload, insertCase, io_an, reg } from '../../static/public_css/public_axios.js'
	export default {
		data() {
			return {
				enterprise_num: '', //企业会员号
				contacts: '', //联系人
				phone: '', //联系电话
				details: '', //详情描述
				params: {}, //选择的图片信息
				lengthss: 0,
				bog: [],
				img_falg: true,
				video_falg: true,
				video_img: require('../assets/foot_icon/video_ic.png'), //引入默认图片
				img_load:false,
				push_disabled:false
			};
		},
		methods: {
			UpladFile() {
				var fileObj = document.getElementById("file");
				this.bog.push(fileObj.files);
				console.log(fileObj.files[0])
				this.params = new FormData(); //创建form对象
				let img_length = document.getElementById("file").files;
				console.log(img_length)
				console.log(this.bog)
				this.bog.forEach((item, index) => {
					if(index > 2) {
						return
					} else {
						this.params.append('file' + index, item[0]);
						if(item[0].size > 1024 * 1024 * 2 && item[0].type == "image/jpeg") {
//							this.$dialog.alert({
//								message: '请上传小于2m的图片哦'
//							})
//							this.bog.pop();
//							this.img_falg = false;
						} else if(item[0].size < 1024 * 1024 * 2 && item[0].type == "image/jpeg") {
							this.img_falg = true;
						}

						if(item[0].type == "video/mp4" || item[0].type == "video/quicktime" && item[0].size > 1024 * 1024 * 10  ) {
							this.$dialog.alert({
								message: '请不要上传大于10m的视频哦'
							})
							this.video_falg = false;
							this.bog.pop();
							return
						}
					}

				})

				if(this.bog.length > 3) {
					this.$dialog.alert({
						message: '您最多选择三张图片'
					})
					return
				} else if(this.img_falg) {
					for(let i = 0; i < img_length.length; i++) {
					
						if(img_length[0].type == "video/mp4" || img_length[0].type == "video/quicktime" && img_length[0].size >= 1024 * 1024 * 10) {
							return
						} else if(img_length[0].type == "video/mp4" || img_length[0].type == "video/quicktime" && img_length[0].size < 1024 * 1024 * 10){
							let filePath = img_length[i].name
							let fileFormat = filePath.split('.')[1].toLowerCase()
							let src = window.URL.createObjectURL(img_length[i])
							let preview = document.getElementById("img_list")
							let img = document.createElement('img')
							img.className = 'imgs'
							img.width = 50
							img.height = 50
							img.src = this.video_img
							preview.appendChild(img)
							
						}else {
							let filePath = img_length[i].name
							let fileFormat = filePath.split('.')[1].toLowerCase()
							let src = window.URL.createObjectURL(img_length[i])
							let preview = document.getElementById("img_list")
							let img = document.createElement('img')
							img.className = 'imgs'
							img.width = 50
							img.height = 50
							img.src = src
							preview.appendChild(img)
						}

					}
				}

			},
			succ_to() {
				this.$dialog.alert({
					message: '提交问题成功'
				})
				this.$router.push({
					name: 'my_service',
					params: {
						id: 0
					}
				});
			},
			push_infor() {
				let datas = {
					peCase: {
						contactName: this.contacts,
						contactPhone: this.phone,
						bugDescribe: this.details,
						companiesId: JSON.parse(localStorage.getItem('user_infor')).companyId,
					},
				}
				if(!reg.test(this.phone)) {
					this.$dialog.alert({
						message: '请填写正确格式的手机号码哦'
					})
					return
				}
				//传图片
				if(this.contacts != '' && this.phone != '' && this.details != '') {
					if(document.getElementById("file").files.length != 0) {
						this.img_load = true;
						this.push_disabled = true;
						multifileUpload(this.params)
							.then((val) => {
								console.log(val)
								if(val.data.status == '0') {
									this.img_load = false;
									datas.caseAttachmentList = val.data.data
									insertCase(datas)
										.then((val) => {
											console.log(val)
											if(val.data.status == 0) {
												this.succ_to()
											}
										})
								}
							})
					} else {
						//没传图片
						datas.caseAttachmentList = []
						insertCase(datas)
							.then((val) => {
								if(val.data.status == 0) {
									this.succ_to()
								}
							})
					}
				} else {
					this.$dialog.alert({
						message: '联系人、联系电话、详情描述是必填的哦'
					})
				}

			}

		},
		created() {
			this.enterprise_num = JSON.parse(localStorage.getItem('user_infor')).memberNum;
			this.contacts = JSON.parse(localStorage.getItem('user_infor')).userName;
			this.phone = JSON.parse(localStorage.getItem('user_infor')).phone;

		},
		watch: {
			bog: {
				handler(newvalue, oldvalue) {
					if(newvalue.length > 3) {
						this.bog.pop();
					}
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.repair_sub_que {
		.van-cell {
			height: 90px;
			font-size: 30px;
			line-height: 70px;
			border-bottom: 1px solid #c9c9c9;
			text-align: center;
		}
		.uoload_image {
			width: 100%;
			height: 300px;
			background-color: #FFFFFF;
			position: relative;
			#img_list {
				position: absolute;
				left: 340px;
				width: 400px;
				height: 150px;
				margin-top: 60px;
				img {
					width: 120px !important;
					height: 120px !important;
					display: none;
					margin-top: 30px;
				}
			}
			input {
				opacity: 0;
				width: 150px;
				height: 150px;
				position: absolute;
				left: 175px;
				z-index: 1000;
				top: 40px;
			}
			.input_fo {
				width: 150px;
				height: 150px;
				position: absolute;
				left: 175px;
				top: 40px;
				font-size: 100px;
				text-align: center;
				color: #c9c9c9;
				border: 1px solid #c9c9c9;
				line-height: 150px;
			}
			span {
				font-size: 30px;
				position: absolute;
				top: 30px;
				left: 20px;
			}
			.van-uploader {
				.van-icon {
					font-size: 100px !important;
					left: 175px;
					top: 70px;
					border: 1px solid #c9c9c9;
					padding: 15px;
				}
			}
			.upload_tips {
				position: absolute;
				top: 200px;
				left: 170px;
				font-size: 25px;
				width: 570px;
				color: #cccccc;
				padding-top: 10px;
			}
		}
		.img_load{
			width: 40%;
			height: 300px;
			background-color: #333333;
			opacity: .7;
			border-radius: 15px;
			position: absolute;
			left: 30%;
			top: 400px;
			text-align: center;
			margin: 0 auto;
				font-size: 30px;
				color: #FFFFFF;
			.loading{
				margin: 0 auto;
				padding-top: 30px;
			}
		}
	}
	
	.sub_que {
		display: block;
		width: 700px;
		height: 100px;
		font-size: 35px;
		text-align: center;
		line-height: 100px;
		margin: 0 auto;
		background-color: #00a4f9;
		border-radius: 10px;
		color: #ffffff;
		margin-top: 100px;
		border: 0 !important;
	}
</style>