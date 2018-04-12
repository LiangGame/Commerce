<template>
  <div class="certification_container">
    <my-header title="实名认证"/>
    <div class="main">
      <form @submit.prevent="applyCoupon" class="">
        <mt-field placeholder="银行卡开户行" v-model="bankAddress"></mt-field>
        <span v-show="errors.has('bankAddress')" class="error">{{ errors.first('bankAddress') }}</span>
        <mt-field placeholder="姓名" v-model="data.realname"></mt-field>
        <span v-show="errors.has('realname')" class="error">{{ errors.first('realname') }}</span>
        <mt-field placeholder="身份证号" v-model="data.idcard"></mt-field>
        <span v-show="errors.has('idcard')" class="error">{{ errors.first('idcard') }}</span>
        <mt-field placeholder="银行卡号" v-model="data.bankcard"></mt-field>
        <span v-show="errors.has('bankcard')" class="error">{{ errors.first('bankcard') }}</span>
        <mt-field placeholder="银行预留手机号" v-model="data.mobile"></mt-field>
        <span v-show="errors.has('mobile')" class="error">{{ errors.first('mobile') }}</span>
        <div style="padding: 20px 10px">
          <mt-button size="large" type="danger">实名认证</mt-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import myHeader from '@/components/header'
  import {Validator} from 'vee-validate';

  export default {
    name: "certification",
    components: {myHeader},
    data() {
      return {
        validator: null,
        errors: null,
        data: {
          bankcard: '',
          realname: '',
          idcard: '',
          mobile: ''
        },
        bankAddress: '',
      }
    },
    methods: {
      applyCoupon() {  // 提交执行函数
        this.validator.validateAll({
          mobile: this.data.mobile,
          idcard: this.data.idcard,
          realname: this.data.realname,
          bankcard: this.data.bankcard,
          bankAddress: this.bankAddress
        }).then(result => {
          if (result) {
            var formData = JSON.stringify(this.user); // 这里才是你的表单数据
            console.log(JSON.parse(formData));
//           localStorage.setItem('user',formData);
//           this.$http.get(url,formData).then( result => console.log(result) ).catch(error => console.log(error)); // http请求
          }
        });
      },
    },
    created() {
      this.validator = new Validator({});  // 初始化Validator对象

      Validator.extend('mobile', {
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
      this.validator.attach({name: 'mobile', rules: 'required|mobile|decimal', alias: '银行预留手机号'}); //phone添加验证规则
      this.validator.attach({name: 'bankcard', rules: 'required|bankcard', alias: '银行卡号'}); //pwd添加验证规则
      this.validator.attach({name: 'realname', rules: 'required', alias: '姓名'}); //pwds添加验证规则
      this.validator.attach({name: 'idcard', rules: 'required|idcard', alias: '身份证号'});
      this.validator.attach({name: 'bankAddress', rules: 'required', alias: '银行卡开户行'});

      this.$set(this, 'errors', this.validator.errors);
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
    }
    .error {
      font-size: 14px;
      color: #ff1c13;
      padding: 0 2em;
    }
  }
</style>
