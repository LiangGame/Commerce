<template>
  <div class="certification_container">
    <my-header title="实名认证"/>
    <div class="main">
      <form @submit.prevent="applyCoupon" class="">
        <!--<mt-field placeholder="银行卡开户行" v-model="bankAddress"></mt-field>-->
        <!--<span v-show="errors.has('bankAddress')" class="error">{{ errors.first('bankAddress') }}</span>-->
        <mt-field placeholder="姓名" v-model="data.realname"></mt-field>
        <span v-show="errors.has('realname')" class="error">{{ errors.first('realname') }}</span>
        <mt-field placeholder="身份证号" v-model="data.idcard"></mt-field>
        <span v-show="errors.has('idcard')" class="error">{{ errors.first('idcard') }}</span>
        <mt-field placeholder="银行卡号" v-model="data.bankcard"></mt-field>
        <span v-show="errors.has('bankcard')" class="error">{{ errors.first('bankcard') }}</span>
        <mt-field placeholder="银行预留手机号" disabled v-model="data.phone"></mt-field>
        <span v-show="errors.has('phone')" class="error">{{ errors.first('phone') }}</span>
        <mt-field placeholder="图形验证码" name="captcha" v-model="data.code" v-focus="{checkCaptcha:checkCaptcha}">
          <div class="code" @click="getVertifyCode">
            <set-code :identifyCode="identifyCode"/>
          </div>
        </mt-field>
        <span v-show="errors.has('captcha')" class="error">{{ errors.first('captcha') }}</span>
        <!-- <mt-field placeholder="手机验证码" type="text" v-model="data.code">
           <div class="sendCode">
             <mt-button size="small" type="danger" :disabled="isphoneCode" @click="sendCode">{{get}}<span v-if="one">({{s}}秒后)</span>
             </mt-button>
           </div>
         </mt-field>
         <span v-show="errors.has('vertifyCode')" class="error">{{ errors.first('vertifyCode') }}</span>-->
        <div style="padding: 20px 10px">
          <mt-button size="large" type="danger">实名认证</mt-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import Qs from 'qs';
  import {Toast} from 'mint-ui';
  import myHeader from '@/components/header'
  import {Validator} from 'vee-validate';
  import setCode from '@/components/setCode'

  export default {
    name: "certification",
    components: {myHeader, setCode},
    data() {
      return {
        validator: null,
        errors: null,
        data: {
          bankcard: '',
          realname: '',
          idcard: '',
          phone: '',
          code: ''
        },
        captcha: '',
        identifyCode: "1234",
        // 验证码btn
        // get: '发送验证码',
        // s: 60,
        // one: false,
        // isphoneCode: false
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
      //验证图片验证码
      checkCaptcha() {
        this.validator.validateAll({
          captcha: this.data.code
        }).then(result => result)
      },
      applyCoupon() {  // 提交执行函数
        this.validator.validateAll({
          phone: this.data.phone,
          idcard: this.data.idcard,
          realname: this.data.realname,
          bankcard: this.data.bankcard,
          captcha: this.data.code
          // bankAddress: this.bankAddress
        }).then(result => {
          if (result) {
            var formData = JSON.stringify(this.data); // 这里才是你的表单数据
            console.log(formData);
            this.$http({
              url: "/user/verifybankcard",
              method: "POST",
              data: this.data,
              headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              },
              transformRequest: [function (data) {
                let json = JSON.stringify(Qs.parse(data));
                return json;
              }]
            }).then(data => {
              if (data.errCode == 0) {
                this.$router.push('/login');
              } else {
                Toast(data.info);
              }
            })
          }
        });
      },
      //发送手机验证码
      /*sendCode() {
        this.validator.validateAll({
          phone: this.data.phone,
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
              params: {phone: this.data.phone, code: this.identifyCode}
            }).then(data => {
              console.log(data)
            })
          }
        });
      }*/
    },
    created() {
      if(this.Cookie.get('user')){
        this.data.phone = JSON.parse(this.Cookie.get('user')).phone;
      }
      this.$nextTick(() => {
        console.log(154,this.$refs)
        // 打印结果：<li>2</li> 本以为会获得一个数组
      })
      this.getVertifyCode();
      this.validator = new Validator({});  // 初始化Validator对象

      Validator.extend('phone', {
        getMessage: field => "请输入正确的手机号码", //错误提示
        validate: value => value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)  // 验证条件
      });
      Validator.extend('bankcard', {
        getMessage: field => "请输入正确的银行卡号", //错误提示
        validate: value => /([\d]{4})([\d]{4})([\d]{4})([\d]{4})([\d]{0,})?/.test(value)  // 验证条件
      });
      Validator.extend('idcard', {
        getMessage: field => "请输入正确的身份证号", //错误提示
        validate: value => /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/.test(value)  // 验证条件
      });
      Validator.extend('captcha', {
        getMessage: field => "验证码错误!", //错误提示
        validate: value => value == this.identifyCode // 验证条件
      });

      this.validator.attach({name: 'vertifyCode', rules: 'required', alias: '手机验证码'});
      this.validator.attach({name: 'phone', rules: 'required|phone|decimal', alias: '银行预留手机号'}); //phone添加验证规则
      this.validator.attach({name: 'bankcard', rules: 'required|bankcard', alias: '银行卡号'}); //pwd添加验证规则
      this.validator.attach({name: 'realname', rules: 'required', alias: '姓名'}); //pwds添加验证规则
      this.validator.attach({name: 'idcard', rules: 'required|idcard', alias: '身份证号'});
      // this.validator.attach({name: 'bankAddress', rules: 'required', alias: '银行卡开户行'});
      this.validator.attach({name: 'captcha', rules: 'required|captcha', alias: '图形验证码'});

      this.$set(this, 'errors', this.validator.errors);
    },
    directives: {
      focus: {
        inserted: function (el, binding, vnode) {
          let oInput = el.querySelector('input');
          oInput.onfocus = function () {
            //创建focus的事件
          };
          oInput.onblur = function () {
            if (el.name == 'captcha') {
              binding.value.checkCaptcha();
            }
          };
        }
      }
    }
  }
</script>

<style lang="less">
  .certification_container {
    .main {
      .mint-cell-wrapper {
        background: none;
        border-bottom: solid 1px #e6e6e6;
        input {
          text-indent: 1em;
        }
      }
      .sendCode {
        .mint-button {
          font-size: 0.6rem;
        }
      }
    }
    .error {
      font-size: 0.6rem;
      color: #ff1c13;
      padding: 0 2em;
    }
  }
</style>
