// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入淘宝remjs
import flexible from 'lib-flexible'
Vue.config.productionTip = false
import Vant from 'vant';
Vue.use(Vant);
import 'vant/lib/index.css';
import {Dialog} from 'vant';
Vue.use(Dialog);
//引入axios
import axios from 'axios'
axios.defaults.withCredentials=true;
import qs from 'qs'
Vue.prototype.$ajax = axios
Vue.prototype.qs = qs  
import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe).use(SwipeItem);



//路由守卫
router.beforeEach((to, from, next) => {
	let user_infor = localStorage.getItem('user_infor');
	let path = to.path;
//注册页及找回密码页不需要登录验证
	if(path === '/register' || path === '/reset_pass' ||path === '/order_details'  ||path === '/pay_success' || path === '/index' || path === '/service'){
		next()
		return
	}
	if (path === '/login') {
		next()
		return
	}
	//路由守卫 获取local 判断用户是否登录 如登录则跳转 如无local  则跳转到登录页
	if (user_infor) {
		//跳转路由改变当前路由的title
		if (to.meta.title) {
			document.title = to.meta.title
		}
		next()
		if (path === '/') {
			next({
				path: '/index'
			})
		} else {
			next()
	  }
	} else {
		next({ path: '/login' })
	}
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})
