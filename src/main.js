// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

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
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
