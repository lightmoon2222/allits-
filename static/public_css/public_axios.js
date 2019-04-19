import axios from 'axios';

//1.公用的变量和方法

//手机号验证
export let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
//电子邮箱验证
export let email_reg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
//获取用户的ip地址
export let ip_code = localStorage.getItem('Ip').split('.').join('')
//获取token
let token = localStorage.getItem("token")

//2.封装的ajax
//登录
export function login(postData) {
	return axios({
		method: 'post',
		headers: {
			'token': token
		},
		url: '/apis/allits/wechat_user/sign_in',
		data: postData
	})
}
//获取短信验证码
export function get_phonecode(phoneNum, ip) {
	return axios({
		method: 'get',
		headers: {
			'token': token
		},
		url: '/apis/allits/wechat_user/sms?phoneNum=' + phoneNum + '&ip=' + ip
	})
}

//注册页提交接口
export function sub_register(postData) {
	return axios({
		method: 'post',
		headers: {
			'token': token
		},
		url: '/apis/allits/wechat_user/sign_up',
		data: postData
	})
}

//申请发票
export function get_invoice(companiesId) {
	return axios({
		method: 'get',
		headers: {
			'token': token
		},
		url: '/apis/allits/wechat_acc_flow/qryAccFlowByCusId?companiesId=' + companiesId
	})
}

//根据发票抬头获取发票税号
export function taxNumb(companiesTaxCo) {
	return axios({
		method: 'post',
		headers: {
			'token': token
		},
		url: '/apis/allits/wechat_bill/taxNumber',
		data: companiesTaxCo
	})
}


//我的发票
export function mine_invoice(companiesId) {
	return axios({
		method: 'get',
		headers: {
			'token': token
		},
		url: '/apis/allits/wechat_bill/list?companiesId=' + companiesId
	})
}
//开具发票
export function get_invocing(accFlowCo) {
	return axios({
		method: 'post',
		headers: {
			'token': token
		},
		url: '/apis/allits/wechat_acc_flow/toApplyInvoice',
		data: accFlowCo
	})
}

//查询用户所有地址
export function find_address(companiesId) {
	return axios({
		method: 'get',
		headers: {
			'token': token
		},
		url: '/apis/allits/wechat_customer/queryCusAddressListByCusId?companiesId=' + companiesId
	})
}

//提交发票详细信息
export function push_invoice(billRecord) {
	return axios({
		method: 'post',
		headers: {
			'token': token
		},
		url: '/apis/allits/wechat_bill/insert',
		data: billRecord
	})
}

//找回密码
export function retrieve_pass(phone, code) {
	return axios({
		method: 'get',
		headers: {
			'token': token
		},
		url: '/apis/allits/wechat_user/back?phone=' + phone + '&code=' + code
	})
}

//确认修改密码
export function reset_pass(phone, password) {
	return axios({
		method: 'get',
		headers: {
			'token': token
		},
		url: '/apis/allits/wechat_user/reset?phone=' + phone + '&password=' + password
	})
}

//个人中心接口
//订单状态
export function order_status(companiesId) {
	return axios({
		method: 'get',
		headers: {
			'token': token
		},
		url: '/apis/allits/wechat_custCenter/cases_count_nostatus?companiesId=' + companiesId
	})
}
//专属工程师
export function engineer_info(companiesId) {
	return axios({
		method: 'get',
		headers: {
			'token': token
		},
		url: '/apis/allits/wechat_custCenter/engineer_info?companiesId=' + companiesId
	})
}

//待支付设备信息

export function nopaid_info(companiesId) {
	return axios({
		method: 'get',
		headers: {
			'token': token
		},
		url: '/apis/allits/wechat_custCenter/nopaid_info?companiesId=' + companiesId
	})
}
//包月设备数量
export function device_num(companiesId) {
	return axios({
		method: 'get',
		headers: {
			'token': token
		},
		url: '/apis/allits/wechat_custCenter/device_num?companiesId=' + companiesId
	})
}

//我的服务接口
export function case_record(companiesId, status) {
	return axios({
		method: 'get',
		headers: {
			'token': token
		},
		url: '/apis/allits/wechat_case/case_record?companiesId=' + companiesId + '&status=' + status
	})
}

//获取所有设备信息
export function get_products() {
	return axios({
		method: 'get',
		headers: {
			'token': token
		},
		url: '/apis/allits/wechat_order/products'
	})
}
//包月服务下单
export function crt_order(data) {
	return axios({
		method: 'post',
		headers: {
			'token': token
		},
		url: '/apis/allits/wechat_order/crt_order',
		data: data
	})
}

//订单详情 
export function order_info(orderId) {
	return axios({
		method: 'get',
		headers: {
			'token': token
		},
		url: '/apis/allits/wechat_order/order_info?orderId=' + orderId
	})
}
//在线报修 上传文件
export function multifileUpload(data) {
	return axios({
		method: 'post',
		headers: {
			'token': token,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		url: '/apis/file/multifileUpload',
		data: data
	})
}
//提交在线报修
export function insertCase(peCase) {
	return axios({
		method: 'post',
		headers: {
			'token': token
		},
		url: '/apis/allits/wechat_case/insertCase',
		data: peCase
	})
}
export function io_an() {
	var u = navigator.userAgent,
		app = navigator.appVersion;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
	var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if(isAndroid) {
		return 'Android'
	}
	if(isIOS) {　　　　 
		return 'ios'
	}
}
//查看账户总支出 
export function month_amount(companiesId) {
	return axios({
		method: 'get',
		headers: {
			'token': token
		},
		url: '/apis/allits/wechat_custCenter/month_amount?companiesId=' + companiesId
	})
}
//查看客户流水 
export function accflow(companiesId) {
	return axios({
		method: 'get',
		headers: {
			'token': token
		},
		url: '/apis/allits/wechat_custCenter/accflow?companiesId=' + companiesId
	})
}

//获取url传递的参数

//判断是否是微信打开
export function isWeiXin() {
	var ua = window.navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true;
	} else {
		return false;
	}
}
//获取url传递的参数
export function GetUrlParam(paraName) {　　　　
	var url = document.location.toString();　　　　
	var arrObj = url.split("?");　　　　
	if(arrObj.length > 1) {　　　　　　
		var arrPara = arrObj[1].split("&");　　　　　　
		var arr;　　　
		for(var i = 0; i < arrPara.length; i++) {　　　　　　　　
			arr = arrPara[i].split("=");　　　　　　　
			if(arr != null && arr[0] == paraName) {　　　　　　　　　　
				return arr[1];　　　　　　　　
			}　　　　　　
		}　　　　　　
		return "";　　　　
	}　　　　
	else {　　　　　　
		return "";　　　　
	}　　
}
//工单详情 
export function case_detail(id) {
	return axios({
		method: 'get',
		headers: {
			'token': token
		},
		url: '/apis/allits/wechat_case/detail?id=' + id,
	})
}

//发送openid
export function post_openid(totalAmount, description, code, OrderNum) {
	return axios({
		method: 'get',
		headers: {
			'token': token
		},
		url: '/apis/allits/api/weixin/weixinPay/' + totalAmount + '/' + description + '/' + code + '/' + OrderNum
	})
}
//支付宝支付
export function ali_pay(orders) {
	return axios({
		method: 'post',
		headers: {
			'token': token
		},
		url: '/apis/allits/alipay/order_str',
		data: orders
	})
}
//检查支付宝是否支付成功
export function flag_ali(orderCo) {
	return axios({
		method: 'post',
		headers: {
			'token': token
		},
		url: '/apis/allits/alipay/check_order',
		data: orderCo
	})
}
//检查微信支付是否成功
export function flag_weixin(trade_no) {
	return axios({
		method: 'get',
		headers: {
			'token': token
		},
		url: '/apis/allits/api/query_pay?trade_no=' + trade_no
	})
}
//工单评价
export function order_del(Comment) {
	return axios({
		method: 'post',
		headers: {
			'token': token
		},
		url: '/apis/allits/wechat_comment/insert',
		data: Comment
	})
}