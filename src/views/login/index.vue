<template>
  <div class="login_container">
    <my-header title="登陆"/>
    <div class="main">
    <form @submit.prevent="applyCoupon" class="">
      <mt-field label="手机号" placeholder="手机号" v-model="user.phone"></mt-field>
      <span v-show="errors.has('phone')" class="error">{{ errors.first('phone') }}</span>
      <mt-field label="密码" placeholder="密码" type="password" v-model="user.password"></mt-field>
      <span v-show="errors.has('password')" class="error">{{ errors.first('password') }}</span>
      <mt-button size="large" type="danger">登录</mt-button>
    </form>
      <router-link to="/person">个人中心</router-link>
      <div class="bottom">
        <span class="toUpdatePwd">
          <router-link to="/mfindpwd">忘记密码</router-link>
        </span>
        <span class="toRegister">
          <router-link to="/register">还没有账号,前往注册</router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import myHeader from '@/components/header'
  import {Validator} from 'vee-validate';

  export default {
    name: "index",
    components: {myHeader},
    data() {
      return {
        validator: null,
        errors: null,
        user:{
          phone: '',
          password: ''
        }
        
      }
    },
    methods: {
      applyCoupon() {  // 提交执行函数
        this.validator.validateAll({phone:this.user.phone,password:this.user.password}).then( result => {
         if(result){
           var formData = JSON.stringify(this.user); // 这里才是你的表单数据
           console.log(JSON.parse(formData));
           localStorage.setItem('user',formData);
//           this.$http.get(url,formData).then( result => console.log(result) ).catch(error => console.log(error)); // http请求
         }
        });
      },

      login(){
       var user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
      }
    },
    created() {
      this.validator = new Validator({});  // 初始化Validator对象

      Validator.extend('mobile', {
        getMessage: field => "请输入正确的手机号码", //错误提示
        validate: value => value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)  // 验证条件
      });
      Validator.extend('name', {
        getMessage: field => "请输入正确姓名", //错误提示
        validate: value => value === 'tom'  // 验证条件
      });
      Validator.extend('verify', {
        getMessage: field => "两次密码不一致!", //错误提示
        validate: value => this.user.pwd === this.pwds // 验证条件
      });

      //this.validator.attach({name: 'name', rules: 'required|name|alpha_num', alias: '姓名'}); //name添加验证规则
      this.validator.attach({name: 'phone', rules: 'required|mobile|decimal', alias: '手机号'}); //phone添加验证规则
      this.validator.attach({name: 'password', rules: 'required|min:6|max:16|verify', alias: '密码'}); //pwd添加验证规则
      //this.validator.attach({name: 'pwds', rules: 'required|min:6|max:16|verify', alias: '确认密码'}); //pwds添加验证规则

      this.$set(this, 'errors', this.validator.errors);
    },
    mounted(){
      //this.loadData();
    }
  }
</script>

<style lang="less">
  .login_container {
    .main {
      padding: 0 15px;
      .mint-cell-wrapper {
        background:none;
        border-bottom: solid 1px #e6e6e6;
      }
      .mint-button {
        margin-top: 25px;
      }
      .bottom {
        padding-top: 10px;
        .toUpdatePwd {
          float: left;
        }
        .toRegister {
          float: right;
        }
        a{
          color:#666;
          text-decoration: none;
          font-size: 14px;
        }
      }
      .error {
        font-size: 14px;
        color: #ff1c13;
      }
    }
  }
</style>
