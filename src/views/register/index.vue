<template>
  <div class="register_container">
    <my-header title="注册"/>

    <div class="main">
      <!--<form @submit.prevent="applyCoupon" class="">-->
        <mt-field label="手机号" placeholder="手机号" v-model="user.phone"></mt-field>
        <span v-show="errors.has('phone')" class="error">{{ errors.first('phone') }}</span>
        <mt-field label="图形验证码" placeholder="图形验证码" v-model="captcha">
          <!--<img src="" height="45px" width="100px">-->
          <div class="code" @click="refreshCode">
            <set-code :identifyCode="identifyCode"/>
          </div>
        </mt-field>
        <span v-show="errors.has('captcha')" class="error">{{ errors.first('captcha') }}</span>
        <mt-field label="手机验证码" placeholder="手机验证码" type="text" v-model="user.vertifyCode">
          <div>
            <mt-button size="small" type="danger" :disabled="isphoneCode" @click="sendCode">{{get}}<span v-if="one">({{s}}秒后)</span></mt-button>
          </div>
        </mt-field>
        <span v-show="errors.has('vertifyCode')" class="error">{{ errors.first('vertifyCode') }}</span>
        <mt-field label="密码" placeholder="密码" type="password" v-model="user.password"></mt-field>
        <span v-show="errors.has('password')" class="error">{{ errors.first('password') }}</span>
        <mt-field label="确认密码" placeholder="确认密码" type="password" v-model="passwords"></mt-field>
        <span v-show="errors.has('passwords')" class="error">{{ errors.first('passwords') }}</span>
        <mt-field label="邀请码" placeholder="邀请码" type="text" v-model="user.chief"></mt-field>
        <span v-show="errors.has('chief')" class="error">{{ errors.first('chief') }}</span>
        <mt-button class="confirm" size="large" @click="applyCoupon" type="danger">注册</mt-button>
      <!--</form>-->
      <div class="bottom">
        <span class="toRegister">
          <router-link to="/login">已有账号,前往登陆</router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import setCode from '@/components/setCode'
  import myHeader from '@/components/header'
  import {Validator} from 'vee-validate';

  export default {
    name: "index",
    components: {setCode, myHeader},
    data() {
      return {
        validator: null,
        errors: null,
        user: {
          phone: '',
          password: '',
          chief: '',
          vertifyCode: ''
        },
        passwords: '',
        captcha: '',
        identifyCodes: "1234567890",
        identifyCode: "1234",
        // 验证码btn
        get:'发送验证码',
        s: 60,
        one: false,
        isphoneCode: false
      }
    },
    mounted() {
    //   this.identifyCode = "";
    //   this.makeCode(this.identifyCodes, 4);
    },
    methods: {
      applyCoupon() {  // 提交执行函数
        this.validator.validateAll({
          phone: this.user.phone,
          password: this.user.password,
          chief: this.user.chief,
          vertifyCode: this.user.vertifyCode,
          passwords: this.passwords,
          captcha: this.captcha
        }).then(result => {
          if (result) {
            var formData = JSON.stringify(this.user); // 这里才是你的表单数据
            console.log(JSON.parse(formData));
//           localStorage.setItem('user',formData);
//           this.$http.get(url,formData).then( result => console.log(result) ).catch(error => console.log(error)); // http请求
          }
        });
      },
      refreshCode() {

      },
      sendCode() {
        this.validator.validateAll({
          phone: this.user.phone,
          captcha: this.captcha
        }).then(result => {
          if (result) {
            let _this = this;
            this.get = '重新发送';
            this.one = true
            this.isphoneCode = true;
            var Interval = setInterval(function () {
              _this.s -= 1;
              if (_this.s == 0) {
                _this.one = false;
                _this.s = 60;
                _this.isphoneCode = false;
                clearInterval(Interval);
                return;
              }
            }, 1000);
          }
        });
      }
    },
    created() {
      this.validator = new Validator({});  // 初始化Validator对象

      Validator.extend('mobile', {
        getMessage: field => "请输入正确的手机号码", //错误提示
        validate: value => value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)  // 验证条件
      });
      Validator.extend('verify', {
        getMessage: field => "两次密码不一致!", //错误提示
        validate: value => this.user.password === this.passwords // 验证条件
      });

      //this.validator.attach({name: 'name', rules: 'required|name|alpha_num', alias: '姓名'}); //name添加验证规则
      this.validator.attach({name: 'phone', rules: 'required|mobile|decimal', alias: '手机号'}); //phone添加验证规则
      this.validator.attach({name: 'password', rules: 'required|min:6|max:16|verify', alias: '密码'}); //pwd添加验证规则
      this.validator.attach({name: 'passwords', rules: 'required|min:6|max:16|verify', alias: '确认密码'}); //pwds添加验证规则
      this.validator.attach({name: 'chief', rules: 'required', alias: '邀请码'});
      this.validator.attach({name: 'vertifyCode', rules: 'required', alias: '手机验证码'});
      this.validator.attach({name: 'captcha', rules: 'required', alias: '图形验证码'});

      this.$set(this, 'errors', this.validator.errors);
    },
    watch : {

    }
  }
</script>

<style lang="less">
  .register_container {
    .main {
      .code {
        width: 112px;
        height: 38px;
        border: 1px solid red;
      }
      padding: 0 15px;
      .mint-cell-wrapper {
        background: none;
        border-bottom: solid 1px #e6e6e6;
      }
      .confirm {
        margin-top: 25px;
      }
      .bottom {
        padding-top: 10px;
        .toRegister {
          float: right;
        }
        a {
          color: #666;
          text-decoration: none;
          font-size: 1rem;
        }
      }
    }
    .error {
      font-size: 1rem;
      color: #ff1c13;
    }
  }
</style>
