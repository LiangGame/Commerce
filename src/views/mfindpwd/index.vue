<template>
  <div class="mfindpwd_container">
    <my-header title="忘记密码"/>
    <div class="main">
      <form @submit.prevent="applyCoupon" class="">
        <mt-field label="手机号" placeholder="手机号" v-model="user.phone"></mt-field>
        <span v-show="errors.has('phone')" class="error">{{ errors.first('phone') }}</span>
        <mt-field label="图形验证码" placeholder="图形验证码" v-model="captcha">
          <div class="code" @click="refreshCode">
            <set-code :identifyCode="identifyCode"/>
          </div>
        </mt-field>
        <span v-show="errors.has('captcha')" class="error">{{ errors.first('captcha') }}</span>
        <mt-field label="手机验证码" placeholder="手机验证码" type="text" v-model="user.vertifyCode">
          <div>
            <mt-button size="small" type="danger" disabled>发送验证码</mt-button>
          </div>
        </mt-field>
        <span v-show="errors.has('vertifyCode')" class="error">{{ errors.first('vertifyCode') }}</span>
        <mt-field label="密码" placeholder="密码" type="password" v-model="user.password"></mt-field>
        <span v-show="errors.has('password')" class="error">{{ errors.first('password') }}</span>
        <mt-field label="确认密码" placeholder="确认密码" type="password" v-model="passwords"></mt-field>
        <span v-show="errors.has('passwords')" class="error">{{ errors.first('passwords') }}</span>
        <mt-button class="confirm" size="large" type="danger">找回密码</mt-button>
      </form>
    </div>
  </div>
</template>

<script>
  import myHeader from '@/components/header'
  import setCode from '@/components/setCode'
  import {Validator} from 'vee-validate';

  export default {
    name: "mfindpwd",
    components: {myHeader,setCode},
    data(){
      return{
        validator: null,
        errors: null,
        user:{
          phone: '',
          password: '',
          vertifyCode:''
        },
        passwords:'',
        captcha:'',
        identifyCode: "1234"
      }
    },
    methods: {
      refreshCode() {

      },
      applyCoupon() {  // 提交执行函数
        this.validator.validateAll({
          phone:this.user.phone,
          password:this.user.password,
          vertifyCode:this.user.vertifyCode,
          passwords:this.passwords,
          captcha:this.captcha
        }).then( result => {
         if(result){
           var formData = JSON.stringify(this.user); // 这里才是你的表单数据
           console.log(JSON.parse(formData));
//           localStorage.setItem('user',formData);
//           this.$http.get(url,formData).then( result => console.log(result) ).catch(error => console.log(error)); // http请求
         }
        });
      },
    },
    created(){
      this.validator = new Validator({});  // 初始化Validator对象

      Validator.extend('mobile', {
        getMessage: field => "请输入正确的手机号码", //错误提示
        validate: value => value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)  // 验证条件
      });
      Validator.extend('verify', {
        getMessage: field => "两次密码不一致!", //错误提示
        validate: value => this.user.password === this.passwords // 验证条件
      });

      this.validator.attach({name: 'phone', rules: 'required|mobile|decimal', alias: '手机号'}); //phone添加验证规则
      this.validator.attach({name: 'password', rules: 'required|min:6|max:16|verify', alias: '密码'}); //pwd添加验证规则
      this.validator.attach({name: 'passwords', rules: 'required|min:6|max:16|verify', alias: '确认密码'}); //pwds添加验证规则
      this.validator.attach({name: 'vertifyCode', rules: 'required', alias: '手机验证码'});
      this.validator.attach({name: 'captcha', rules: 'required', alias: '图形验证码'});

      this.$set(this, 'errors', this.validator.errors);
    }
  }
</script>

<style lang="less">
  .mfindpwd_container {
    .main{
      padding: 0 15px;
      .mint-cell-wrapper {
        background:none;
        border-bottom: solid 1px #e6e6e6;
      }
      .confirm {
        margin-top: 25px;
      }
      .error {
        font-size: 14px;
        color: #ff1c13;
      }
    }
  }
</style>
