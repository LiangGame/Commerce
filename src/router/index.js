import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

const routes = [
  {path: '/', name: '首页', component: _import('index/index')},
  {path: '/home', name: '商城', component: _import('home/index')},
  {path: '/login', name: '登录', component: _import('login/index')},
  {path: '/register', name: '注册', component: _import('register/index')},
  {path: '/mfindpwd', name: '忘记密码', component: _import('mfindpwd/index')},
  {path: '/person', name: '个人中心', component: _import('person/index')},
  { path: '/updatePwd', name: '修改密码', component: _import('person/updatePwd/index'),},
  { path: '/wallet', name: '钱包', component: _import('person/wallet/index'),},
  { path: '/bill', name: '账单', component: _import('person/bill/index'),},
  { path: '/consignment', name: '我的寄售', component: _import('person/consignment/index'),},
  { path: '/certification', name: '实名认证', component: _import('person/certification/index'),},
  { path: '/share', name: '分享', component: _import('person/share/index'),},
  { path: '/order', name: '确定订单', component: _import('order/index'),},
  { path: '/pay', name: '立即支付', component: _import('pay/index'),},

]

//去除地址栏 #
export default new Router({
  mode: 'history',
  routes: routes
})
