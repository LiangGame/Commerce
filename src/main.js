// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//cookie
import Cookie from 'js-cookie'
Vue.prototype.Cookie = Cookie;

//axios
import axios from '@/common/axios.js'
Vue.prototype.$http = axios;

//vueClipboard2
import vueClipboard2 from 'vue-clipboard2'
Vue.use(vueClipboard2);
//mint-ui
import 'mint-ui/lib/style.css'
import Mint from 'mint-ui';
Vue.use(Mint);

//VeeValidate
import VeeValidate, {Validator} from 'vee-validate';
import cn from 'vee-validate/dist/locale/zh_CN';

Validator.localize('cn', cn);

const dict = {
  cn: {messages: {required: (name) => `${name}不能为空!`}}
}
Validator.localize(dict);


Vue.config.productionTip = false

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })
export const vue = new Vue({
  el: '#app',
  router,
  render: h => h(App),
  data:{
      Bus: new Vue()
  }
})
// cookie失效重新登陆
router.beforeResolve((to, from, next) => {
  if( to.path.indexOf('/')==-1 && vue.Cookie.get('user')==undefined){
      next({ path: '/'})
  }else{
      next();
  }
})
