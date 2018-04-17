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
  import {Toast,Indicator} from 'mint-ui';

  export default {
    name: "withdrawals",
    components: {myHeader},
    data() {
      return {
        n: 0,
        user: JSON.parse(this.Cookie.get('user')),
        money: '',
        // payMent: '1',
        // options: [
        //   {
        //     label: '支付宝支付',
        //     value: '1'
        //   },
        //   {
        //     label: '微信支付',
        //     value: '2'
        //   },
        //   {
        //     label: '银行卡支付',
        //     value: '3',
        //   }
        // ],
        // 弹窗
        weChat: false,
        alipay: false,
        bankCard: false,
      }
    },
    methods: {
      //提现
      pay() {
        Indicator.open('请稍后...');
        if (this.money && /^[0-9]+$/.test(this.money) && this.money % 100 == 0) {
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
            }).catch(()=>{
              Indicator.close();
            })
          } else {
            Toast('请勿重复提交')
          }
        } else {
          Indicator.close();
          Toast('请输入正确的金额!');
        }
          Indicator.close();        
      }
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
