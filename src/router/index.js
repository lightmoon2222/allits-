import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	linkActiveClass: 'router-link-exact-active',
	routes: [{
			path: '/',
			name: 'index',
			 redirect: '/index',
			component: reslove => require(['@/components/index'], reslove)
		},
		{
			path: '/index',
			name: 'indexs',
			component: reslove => require(['@/components/index'], reslove),
			meta: {
				title: '全倾服务'
			}
		},
		{
			path: '/service',
			name: 'service',
			component: reslove => require(['@/components/service'], reslove),
			meta: {
				title: '服务'
			}
		},
		{
			path: '/repair',
			name: 'repair',
			component: reslove => require(['@/components/repair'], reslove),
			meta: {
				title: '报修'
			}
		},
		{
			path: '/mine',
			name: 'mine',
			component: reslove => require(['@/components/mine'], reslove),
			meta: {
				title: '账户'
			}

		},
		{
			path: '/repair_sub_que',
			name: 'repair_sub_que',
			component: reslove => require(['@/components/repair_sub_que'], reslove),
			meta: {
				title: '在线留言'
			}
		},
		{
			path: '/my_invoice/:id',
			name: 'my_invoice',
			component: reslove => require(['@/components/my_invoice'], reslove),
			meta: {
				title: '我的发票'
			}
		},
		{
			path: '/account_details',
			name: 'account_details',
			component: reslove => require(['@/components/account_details'], reslove),
			meta: {
				title: '账户明细'
			}
		},
		{
			path: '/acc_infor',
			name: 'acc_infor',
			component: reslove => require(['@/components/account_infor'], reslove),
			meta: {
				title: '我的资料'
			}
		},
		{
			path: '/my_service/:id',
			name: 'my_service',
			component: reslove => require(['@/components/my_service'], reslove),
			meta: {
				title: '我的服务'
			}
		},
		{
			path: '/login',
			name: 'login',
			component: reslove => require(['@/components/login'], reslove),
			meta: {
				title: '全倾服务'
			}
		},
		{
			path: '/reset_pass',
			name: 'reset_pass',
			component: reslove => require(['@/components/reset_pass'], reslove),
			meta: {
				title: '找回密码'
			}
		},
		{
			path: '/register',
			name: 'register',
			component: reslove => require(['@/components/register'], reslove),
			meta: {
				title: '注册'
			}
		},
		{
			path: '/invoice_infor/:id',
			name: 'invoice_infor',
			component: reslove => require(['@/components/invoice_infor'], reslove),
			meta: {
				title: '发票详情'
			}
		},
		{
			path: '/order_details',
			name: 'order_details',
			component: reslove => require(['@/components/order_details'], reslove),
			meta: {
				title: '发票详情'
			}
		},
		{
			path: '/month_service',
			name: 'month_service',
			component: reslove => require(['@/components/month_service'], reslove),
			meta: {
				title: '包月服务'
			}
		},
		{
			path: '/case_details/:id',
			name: 'case_details',
			component: reslove => require(['@/components/case_details'], reslove),
			meta: {
				title: '案件详情'
			}
		},
		{
			path: '/pay_success',
			name: 'pay_success',
			component: reslove => require(['@/components/pay_success'], reslove),
			meta: {
				title: '支付成功'
			}
		}
	]
})
