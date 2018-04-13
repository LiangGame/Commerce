<template>
  <div class="register_container">
    <my-header title="注册"/>

    <div class="main">
      <!--<form @submit.prevent="applyCoupon" class="">-->
        <mt-field label="手机号" placeholder="手机号" name="phone" v-lfcous v-model="user.phone"></mt-field>
        <span v-show="errors.has('phone')" class="error">{{ errors.first('phone') }}</span>
        <span v-if="err_phone" class="error">手机号已注册</span>
        <mt-field label="图形验证码" placeholder="图形验证码" name="captcha" v-model="captcha" v-lfcous>
          <!--<img src="" height="45px" width="100px">-->
          <div class="code" @click="getVertifyCode">
            <set-code :identifyCode="identifyCode"/>
          </div>
        </mt-field>
        <span v-show="errors.has('captcha')" class="error">{{ errors.first('captcha') }}</span>
        <mt-field label="手机验证码" placeholder="手机验证码" type="text" v-model="user.vertifyCode">
          <div class="sendCode">
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
  import Vue from 'vue'
  import setCode from '@/components/setCode'
  import myHeader from '@/components/header'
  import {Validator} from 'vee-validate';
  import Qs from 'qs';

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
        err_phone:false,
        identifyCode: "1234",
        // 验证码btn
        get:'发送验证码',
        s: 60,
        one: false,
        isphoneCode: false
      }
    },
    mounted() {
      let _this = this;
    //   this.identifyCode = "";
    //   this.makeCode(this.identifyCodes, 4);
      //自定义指令
      Vue.directive('lfcous', function(el, pra, a) {
          let oInput = el.querySelector('input');         
          oInput.onfocus = function() {
                //创建focus的事件
          };
          oInput.onblur = function() {
            if(el.name == 'phone'){
                _this.checkPhone();
            }else if(el.name == 'captcha'){
              _this.validator.validateAll({
                captcha: _this.captcha
              }).then(result => {console.log(result)})
            }
          };
      })
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
            console.log(formData);
            this.$http({
                url: "/user/regist",
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
              console.log(data)
            }).catch(error => {

            })
          }
        });
      },
      //获取图片验证码
      getVertifyCode() {
        this.$http({
            url: "/user/getVertifyCode",
            method: "get",
            data: this.user
        }).then(data => {
          this.identifyCode = data.code;
        }).catch(error => {
          console.log(error)
        })
      },
      //验证手机号是否注册
      checkPhone(){
        console.log('here')
        this.validator.validateAll({
          phone: this.user.phone
        }).then(result => {
          if (result) {
            this.$http({
                url: "/user/checkPhone",
                method: "GET",
                params: {phone:this.user.phone}
            }).then(data => {
              if(data.errCode != 0){
                this.err_phone = true;
              }
            }).catch(error => {

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
                params: {phone:this.user.phone,code:this.identifyCode},
                // headers: {
                //   'Content-Type': 'application/json;charset=UTF-8'
                // },
                // transformRequest: [function (data) {
                //     let json = JSON.stringify(Qs.parse(data));
                //     return json;
                // }]
            }).then(data => {
              console.log(data)
            }).catch(error => {

            })
          }
        });
      }
    },
    created() {
      this.getVertifyCode();
      this.validator = new Validator({});  // 初始化Validator对象

      Validator.extend('mobile', {
        getMessage: field => "请输入正确的手机号码", //错误提示
        validate: value => value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)  // 验证条件
      });
      Validator.extend('verify', {
        getMessage: field => "两次密码不一致!", //错误提示
        validate: value => this.user.password === this.passwords // 验证条件
      });
       Validator.extend('captcha', {
        getMessage: field => "验证码错误!", //错误提示
        validate: value => this.captcha === this.identifyCode // 验证条件
      });

      //this.validator.attach({name: 'name', rules: 'required|name|alpha_num', alias: '姓名'}); //name添加验证规则
      this.validator.attach({name: 'phone', rules: 'required|mobile|decimal', alias: '手机号'}); //phone添加验证规则
      this.validator.attach({name: 'password', rules: 'required|min:6|max:16|verify', alias: '密码'}); //pwd添加验证规则
      this.validator.attach({name: 'passwords', rules: 'required|min:6|max:16|verify', alias: '确认密码'}); //pwds添加验证规则
      this.validator.attach({name: 'chief', rules: 'required', alias: '邀请码'});
      this.validator.attach({name: 'vertifyCode', rules: 'required', alias: '手机验证码'});
      this.validator.attach({name: 'captcha', rules: 'required|captcha', alias: '图形验证码'});

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
          font-size: 0.8rem;
        }
      }
      .sendCode{
        .mint-button{
          font-size: 0.6rem;
        }
      }
    }
    .error {
      font-size: 0.6rem;
      color: #ff1c13;
    }
  }
</style>
