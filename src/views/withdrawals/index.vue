<template>
  <div class="withdrawals_container">
    <my-header title="提现"/>
    <div class="main">
      <div class="money_container">
        <mt-field label="金额" placeholder="请输入提现金额" v-model="money"></mt-field>
      </div>
      <p class="warning">
        温馨提示:<br>
        ·余额提现后低于3500的，请必须预留一单寄售，否则将自动取消代言资格，请谨慎操作!<br>
        ·提现最少金额为100元，且必须是100的整数倍!<br>
        ·到账时间周一至周五，早上8:00-下午18:00(节假日除外)
      </p>
      <mt-checklist
        v-model="value"
        :options="['我已知悉温馨提示内容']">
      </mt-checklist>
      <span v-show="errors.has('value')" class="error">{{ errors.first('value') }}</span>
      <!--<mt-radio-->
      <!--title="选择支付方式"-->
      <!--v-model="payMent"-->
      <!--:options="options">-->
      <!--</mt-radio>-->
    </div>
    <div class="pay_btn">
      <mt-button class="confirm" size="large" @click="pay" type="primary">确认提现</mt-button>
    </div>
  </div>
</template>

<script>
  import Qs from 'qs';
  import myHeader from '@/components/header'
  import {Toast, Indicator} from 'mint-ui';
  import {Validator} from 'vee-validate';


  export default {
    name: "withdrawals",
    components: {myHeader},
    data() {
      return {
        validator: null,
        errors: null,
        value: [],
        n: 0,
        user: JSON.parse(this.Cookie.get('user')),
        money: '',
        // 弹窗
        weChat: false,
        alipay: false,
        bankCard: false,
      }
    },
    methods: {
      //提现
      pay() {
        this.validator.validateAll({
          value: this.value,
        }).then(result => {
          console.log(result);
          if (result) {
            Indicator.open('请稍后...');
            if (this.money && /^[0-9]+$/.test(this.money) && this.money % 100 == 0) {
              Indicator.close();
              if (this.n < 1) {
                let formData = {userID: this.user.id, money: this.money};
                this.$http({
                  url: "/order/withdrawals",
                  method: "POST",
                  data: formData,
                  headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                  },
                  transformRequest: [function (data) {
                    let json = JSON.stringify(Qs.parse(data));
                    return json;
                  }]
                }).then(data => {
                  Indicator.close();
                  Toast(data.info);
                  if (data.errCode == 0) {
                    this.n++;
                    let _this = this;
                    setTimeout(function () {
                      _this.$router.push('/wallet');
                    }, 3000)
                  }
                }).catch(() => {
                  Indicator.close();
                })
              } else {
                Toast('请勿重复提交')
              }
            } else {
              setTimeout(() => Indicator.close(), 500);
              Toast('请输入正确的金额!');
            }
            Indicator.close();
          }
        })
      }
      , beforeDestroy() {
        Indicator.close();
      }
    },
    created() {
      this.validator = new Validator({});  // 初始化Validator对象
      Validator.extend('checked', {
        getMessage: field => "请勾选用户协议!", //错误提示
        validate: value => !!value
      });
      this.validator.attach({name: 'value', rules: 'checked|required', alias: '用户协议'}); //pwds添加验证规则
      this.$set(this, 'errors', this.validator.errors);

    }
  }
</script>

<style lang="less">
  .withdrawals_container {
    .main {
      .money_container {
        .mint-cell-wrapper {
          background: none;
          border-bottom: solid 1px #e6e6e6;
        }
      }
      .warning {
        font-size: 1rem;
        padding: 20px 10px;
        color: #e93b3b;
      }
      .mint-radio-input:checked + .mint-radio-core {
        background-color: #26a2ff;
        border-color: #26a2ff;
      }
      .error{
        color: #e93b3b;
        padding: 0 20px;
      }
    }
    .pay_btn {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      .mint-button {
        border-radius: 0;
        background: #26a2ff;
      }
    }
    .dk_btn {
      border-radius: 0;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      .mint-button {
        background: #26a2ff;
      }
    }
  }
</style>
