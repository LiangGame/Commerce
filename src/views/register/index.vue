<template>
  <div class="register_container">
    <my-header title="注册"/>

    <div class="main">
      <!--<form @submit.prevent="applyCoupon" class="">-->
      <mt-field label="手机号" placeholder="手机号" name="phone" v-focus="{checkPhone:checkPhone}" v-model="user.phone"></mt-field>
      <span v-show="errors.has('phone')" class="error">{{ errors.first('phone') }}</span>
      <!--<span v-if="err_phone" class="error">手机号已注册</span>-->
      <mt-field label="图形验证码" placeholder="图形验证码" name="captcha" v-model="captcha" v-focus="{checkCaptcha:checkCaptcha}">
        <!--<img src="" height="45px" width="100px">-->
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
      <mt-field label="邀请码" placeholder="邀请码" type="text" v-model="user.chief" :disabled="isShare"></mt-field>
      <span v-show="errors.has('chief')" class="error">{{ errors.first('chief') }}</span>
      <div style="margin-top:10px">
        <input type="checkbox" name="xy" v-model="xy">
        <span style="font-size: 0.6rem">同意并接受<a href="javascript:void(0)" @click="showYhxy">《用户协议与免责条款》</a>及<a
          href="javascript:void(0)" @click="showFwxy">《服务合作协议书》</a></span>
        <p>
          <span v-show="errors.has('xy')" class="error">{{ errors.first('xy') }}</span>
        </p>
        <mt-popup v-model="yhxy" position="bottom" class="mint-popup-4" :closeOnClickModal="false">
          <div class="popup_container">

            <h3 style="text-align: center;">用户协议与免责条款</h3>
            <pre>
        尊敬的用户您好，感谢您访问***科技！本《用户协议与免责条款》是您（下称"用户"）与**科技有限公司（网站简称“**科技”）之间发生业务之前，注册用户（又名“帐号”，下统称“帐号”）和发生业务关系时签署的协议。此用户协议与免责条款由**科技有限公司提供。您若注册并使用了本公司的服务，即表示您认同并接受了此协议。请注意，您的使用受制于该条款、服务、要求。请您在点击接受前仔细阅读此条款！   
        一、重要须知
        1 您应认真阅读(未成年人应当在监护人陪同下阅读)、充分理解本《用户协议与免责条款》中各条款。
        2 除非您接受本协议，否则用户无权也无必要继续接受**科技的服务，可以退出本次注册。用户点击接受并继续使用**科技的服务，视为用户已完全的接受并同意本协议。
        3 本协议在您开始使用**科技的服务并注册成为**科技的用户时即产生法律效力，请您慎重考虑是否接受本协议，如不接受本协议的任一条款，请自动退出并不再接受**科技的任何服务。
        4 在您签署本协议之后，此文本或服务内容的履行可能因国家政策、环境的发生变化而进行修改，我们会将修改后的内容发布在页面上，若您对修改后的内容有异议的，请立即联系**科技，若您继续登录并持续与**科技发生业务关系，视为认可修改后的内容。
        二、**科技声明
        1 用户须知，在使用**科技服务可能存在有来自任何他人的包括威胁性的、诽谤性的、令人反感的或非法的内容或对他人权利的侵犯(包括知识产权)的匿名或冒名的信息风险，用户须承担以上风险，**科技对服务不作担保，不论是明确的或隐含的，包括所有有关信息真实性、适当性、适于某一特定用途，对因此导致任何因用户不正当或非法使用服务产生的直接、间接、偶然、特殊及后续的损害，**科技不承担任何责任。
        2 使用**科技服务必须遵守国家有关法律和政策等，维护国家利益，保护国家安全，并遵守本协议，对于用户违法行为或违反本协议的使用(包括但不限于言论发表、传送等)而引起的一切责任，由用户承担全部责任。
        3 **科技所提供的产品和服务也属于互联网范畴，也易受到各种安全问题的困扰，包括但不限于: 1(个人资料被不法分子利用，造成现实生活中的骚扰;) 2(哄骗、破译密码;) 3(下载安装的其它软件中含有“特洛伊木马”等病毒程序，威胁到个人计算机上信息和数据的安全，继而威胁对本服务的使用。)  4(以及其他类网络安全困扰问题  对于发生上述情况的，用户应当自行承担责任)。
        4 用户须明白，**科技为了整体运营的需要，有权在公告通知后，在不事先通知用户的情况下修改、中断、中止或终止服务，而无须向用户或第三方负责，**科技不承担任何赔偿责任。
        5 用户应理解，互联网技术存在不稳定性，可能导致政府管制、政策限制、病毒入侵、黑客攻击、服务器系统崩溃或者其他现今技术无法解决的风险发生。由以上原因可能导致**科技服务中断或帐号信息损失，对此非人为因素引起的用户损失由用户自行承担责任。
        六、隐私保护
          **科技非常重视用户的隐私权，用户在享受**科技提供的服务时可能涉及用户的隐私，因此请用户仔细阅读本隐私保护条款。
        1 用户的帐号、密码属于保密信息，**科技会努力采取积极的措施保护用户帐号、密码的安全。
        2 互联网的开放性以及技术更新速度快，因非**科技可控制的因素导致用户信息泄漏的，**科技不承担任何责任。
        3 用户在使用**科技服务时不应将自认为隐私的信息发表、上传至**科技，也不应将该等信息通过**科技的服务传播给其他人，由于用户的行为引起的隐私泄漏，由用户自行承担责任。
               </pre>
             

            <div class="bottom">
              <mt-button size="large" type="default" @click="showYhxy">关闭</mt-button>
            </div>
          </div>
        </mt-popup>
        <mt-popup v-model="fwxy" position="bottom" class="mint-popup-4" :closeOnClickModal="false">
          服务合作协议书
          <div class="bottom">
            <mt-button size="large" type="default" @click="showFwxy">关闭</mt-button>
          </div>
        </mt-popup>
      </div>
      <mt-button class="confirm" size="large" @click="applyCoupon" type="primary">注册</mt-button>
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
  import { Toast } from 'mint-ui';
  import setCode from '@/components/setCode'
  import myHeader from '@/components/header'
  import {Validator} from 'vee-validate';
  import Qs from 'qs';

  export default {
    name: "index",
    components: {setCode, myHeader},
    data() {
      return {
        isShare:false,
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
        // err_phone: false,
        identifyCode: "1234",
        // 验证码btn
        get: '发送验证码',
        s: 60,
        one: false,
        isphoneCode: false,
        xy: '',
        yhxy: false,
        fwxy: false      }
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
          xy: this.xy,
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
              let _this = this;
              if(data.errCode == 0){
                Toast('操作成功,请重新登录');
                setTimeout(function () {
                  _this.$router.push('/login');
                },3000)
              }else if(data.errCode != 0){
                Toast(data.info);
              }
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
          withCredentials:true
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
              this.Cookie.set('sendCode',1,{ expires: inFifteenMinutes });
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
                params: {phone: this.user.phone, code: this.identifyCode,type:'regist'}
              }).then(data => {
                Toast(data.info)
              })
            }
          }
        });
      },
      showYhxy() {
        this.yhxy = !this.yhxy;
      },
      showFwxy() {
        this.fwxy = !this.fwxy;
      }
    },
    created() {
      if(this.$route.query.id){
        console.log(this.$route.query.id);
        this.isShare = true;
        this.user.chief = this.$route.query.id;
      }
      if(this.Cookie.get('sendCode')){
        this.isphoneCode = true;
      }else {
        this.isphoneCode = false;
      }
      this.getVertifyCode();
      this.validator = new Validator({});  // 初始化Validator对象

      Validator.extend('mobile', {
        getMessage: field => "请输入正确的手机号码", //错误提示
        validate: value => value.length === 11  // 验证条件
      });
      Validator.extend('checkPhone', {
        getMessage: field => "手机号已注册", //错误提示
        validate: value => {
          return this.$http({
            url: "/user/checkPhone",
            method: "GET",
            params: {phone: value},
            withCredentials:true
          }).then(data => {
            if (data.errCode == 0) {
              return true;
            }else {
              return false;
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
      Validator.extend('checked', {
        getMessage: field => "请勾选用户协议!", //错误提示
        validate: value => !!value
      });
      //this.validator.attach({name: 'name', rules: 'required|name|alpha_num', alias: '姓名'}); //name添加验证规则
      this.validator.attach({name: 'phone', rules: 'required|mobile|decimal|checkPhone', alias: '手机号'}); //phone添加验证规则
      this.validator.attach({name: 'password', rules: 'required|min:6|max:16|verify', alias: '密码'}); //pwd添加验证规则
      this.validator.attach({name: 'passwords', rules: 'required|min:6|max:16|verify', alias: '确认密码'}); //pwds添加验证规则
      this.validator.attach({name: 'chief', rules: 'required', alias: '邀请码'});
      this.validator.attach({name: 'vertifyCode', rules: 'required', alias: '手机验证码'});
      this.validator.attach({name: 'captcha', rules: 'required|captcha', alias: '图形验证码'});
      this.validator.attach({name: 'xy', rules: 'checked|required', alias: '用户协议'}); //pwds添加验证规则

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
      .sendCode {
        .mint-button {
          font-size: 0.6rem;
        }
      }
    }
    .mint-popup-4 {
      width: 100%;
      height: 100%;
      background: #f5f5f5;
      overflow-y: auto;
    }
    .error {
      font-size: 0.6rem;
      color: #ff1c13;
    }
  }
</style>
