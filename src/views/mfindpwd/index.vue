<template>
  <div class="mfindpwd_container">
    <my-header title="忘记密码"/>
    <div class="main">
      <!-- <form @submit.prevent="applyCoupon" class=""> -->
      <mt-field label="手机号" placeholder="手机号" name="phone" v-focus="{checkPhone:checkPhone}" v-model="user.phone" :disabled="isSend"></mt-field>
      <span v-show="errors.has('phone')" class="error">{{ errors.first('phone') }}</span>
      <mt-field label="图形验证码" placeholder="图形验证码" name="captcha" v-model="captcha" v-focus="{checkCaptcha:checkCaptcha}">
        <div class="code" @click="getVertifyCode">
          <set-code :identifyCode="identifyCode"/>
        </div>
      </mt-field>
      <span v-show="errors.has('captcha')" class="error">{{ errors.first('captcha') }}</span>
      <mt-field label="手机验证码" placeholder="手机验证码" type="text" v-model="user.vertifyCode">
        <div class="sendCode">
          <mt-button size="small" type="primary" :disabled="isphoneCode" @click="sendCode">{{get}}<span v-if="one">({{s}}秒后)</span>
          </mt-button>
        </div>
      </mt-field>
      <span v-show="errors.has('vertifyCode')" class="error">{{ errors.first('vertifyCode') }}</span>
      <mt-field label="密码" placeholder="密码" type="password" v-model="user.password"></mt-field>
      <span v-show="errors.has('password')" class="error">{{ errors.first('password') }}</span>
      <mt-field label="确认密码" placeholder="确认密码" type="password" v-model="passwords"></mt-field>
      <span v-show="errors.has('passwords')" class="error">{{ errors.first('passwords') }}</span>
      <mt-button class="confirm" size="large" type="primary" @click="applyCoupon">找回密码</mt-button>
      <!-- </form> -->
    </div>
  </div>
</template>

<script>
  import Qs from 'qs';
  import { Toast } from 'mint-ui';
  import myHeader from '@/components/header'
  import setCode from '@/components/setCode'
  import {Validator} from 'vee-validate';

  export default {
    name: "mfindpwd",
    components: {myHeader, setCode},
    data() {
      return {
        isSend:false,
        validator: null,
        errors: null,
        user: {
          phone: '',
          password: '',
          vertifyCode: ''
        },
        passwords: '',
        captcha: '',
        identifyCode: "1234",
        // 验证码btn
        get: '发送验证码',
        s: 60,
        one: false,
        isphoneCode: false
      }
    },
    methods: {
      //获取图片验证码
      getVertifyCode() {
        this.$http({
          url: "/user/getVertifyCode",
          method: "get",
          withCredentials: true
        }).then(data => {
          console.log(data)
          this.identifyCode = data.code;
        }).catch(error => {
          console.log(error)
        })
      },
      //验证手机号是否注册
      checkPhone(tel) {
        console.log('here')
        this.validator.validateAll({
          phone: this.user.phone
        }).then(result => {
          if(!result){
            if(!this.Cookie.get('sendCode')){
              this.isphoneCode = false;
            }
          }
        });
      },
      //验证图片验证码
      checkCaptcha(){
        this.validator.validateAll({
          captcha: this.captcha
        }).then(result => {
          if(result){
            if(!this.Cookie.get('sendCode')){
              this.isphoneCode = false;
            }
          }
        })
      },
      applyCoupon() {  // 提交执行函数
        this.validator.validateAll({
          password: this.user.password,
          vertifyCode: this.user.vertifyCode,
          passwords: this.passwords,
          captcha: this.captcha
        }).then(result => {
          if (result) {
            var formData = JSON.stringify(this.user); // 这里才是你的表单数据
            this.$http({
              url: "/user/resetPass",
              method: "POST",
              data: this.user,
              headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              },
              transformRequest: [function (data) {
                let json = JSON.stringify(Qs.parse(data));
                return json;
              }]
            }).then(data => {
              if(data.errCode == 0){
                this.$router.push('/login');
              }else {
                Toast(data.info);
              }
            })
          }
        });
      },
      //发送手机验证码
      sendCode() {
        this.validator.validateAll({
          phone: this.user.phone,
          captcha: this.captcha
        }).then(result => {
          if (result) {
            if(this.Cookie.get('sendCode')){
              this.isphoneCode = true;
            }else {
              var inFifteenMinutes = new Date(new Date().getTime() + 1 * 60 * 1000);
              this.Cookie.set('sendCode', 1, {expires: inFifteenMinutes});
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
              this.$http({
                url: "/user/sendVertifyMSG",
                method: "GET",
                params: {phone: this.user.phone, code: this.identifyCode, type: 'reset'}
              }).then(data => {
                Toast(data.info);
                if (data.errCode == 0) {
                  this.isSend = true;
                }
              })
            }
          }
        });
      }
    },
    created() {
      this.getVertifyCode();
      this.validator = new Validator({});  // 初始化Validator对象

      Validator.extend('mobile', {
        getMessage: field => "请输入正确的手机号码", //错误提示
        validate: value => value.length === 11  // 验证条件
      });
      Validator.extend('checkPhone', {
        getMessage: field => "手机号未注册", //错误提示
        validate: value => {
          return this.$http({
            url: "/user/checkPhone",
            method: "GET",
            params: {phone: value},
            withCredentials:true
          }).then(data => {
            if (data.errCode == 0) {
              return false;
            }else {
              return true;
            }
          }).catch(error => {

          })
        }  // 验证条件
      });
      Validator.extend('verify', {
        getMessage: field => "两次密码不一致!", //错误提示
        validate: value => this.user.password === this.passwords // 验证条件
      });
      Validator.extend('captcha', {
        getMessage: field => "验证码错误!", //错误提示
        validate: value => this.captcha === this.identifyCode // 验证条件
      });

      this.validator.attach({name: 'phone', rules: 'required|mobile|decimal|checkPhone', alias: '手机号'}); //phone添加验证规则
      this.validator.attach({name: 'password', rules: 'required|min:6|max:16|verify', alias: '密码'}); //pwd添加验证规则
      this.validator.attach({name: 'passwords', rules: 'required|min:6|max:16|verify', alias: '确认密码'}); //pwds添加验证规则
      this.validator.attach({name: 'vertifyCode', rules: 'required', alias: '手机验证码'});
      this.validator.attach({name: 'captcha', rules: 'required|captcha', alias: '图形验证码'});

      this.$set(this, 'errors', this.validator.errors);
    },
    directives: {
      focus: {
        inserted: function (el,binding, vnode) {
          let oInput = el.querySelector('input');
          oInput.onfocus = function () {
            //创建focus的事件
          };
          oInput.onblur = function () {
            if (el.name == 'phone') {
              binding.value.checkPhone();
            } else if (el.name == 'captcha') {
              binding.value.checkCaptcha();
            }
          };
        }
      }
    }
  }
</script>

<style lang="less">
  .mfindpwd_container {
    .main {
      padding: 0 15px;
      .mint-cell-wrapper {
        background: none;
        border-bottom: solid 1px #e6e6e6;
      }
      .sendCode {
        .mint-button {
          font-size: 0.6rem;
        }
      }
      .confirm {
        margin-top: 25px;
      }
      .error {
        font-size: 0.6rem;
        color: #ff1c13;
      }
    }
  }
</style>
