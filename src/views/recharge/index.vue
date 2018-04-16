<template>
  <div class="recharge_container">
    <my-header title="充值"/>
    <div class="main">
      <div class="money_container">
        <mt-field label="金额" placeholder="请输入充值金额" v-model="money"></mt-field>
      </div>
      <p class="warning">注意 : 充值最小金额为100,充值金额必须是100的整数倍</p>
      <mt-radio
        title="选择支付方式"
        v-model="payMent"
        :options="options">
      </mt-radio>
    </div>
    <div class="pay_btn">
      <mt-button class="confirm" size="large" @click="toPay" type="danger">前往支付</mt-button>
    </div>
    <!--微信弹窗-->
    <mt-popup v-model="weChat" position="right" class="mint-popup-3" :modal="false" align="center">
      <mt-header fixed title="">
        <router-link to="" slot="left">
          <mt-button icon="back" @click="back"></mt-button>
        </router-link>
      </mt-header>
      <img src="../../assets/pic/money.png" alt="">
      <mt-button @click="pay" size="large" type="danger" class="dk_btn" :disdbled="isPay">{{payText}}</mt-button>
    </mt-popup>
    <!--支付宝弹窗-->
    <mt-popup v-model="alipay" position="right" class="mint-popup-3" :modal="false">
      <mt-header fixed title="">
        <router-link to="" slot="left">
          <mt-button icon="back" @click="back"></mt-button>
        </router-link>
      </mt-header>
      <img src="../../assets/pic/money.png" alt="">
      <mt-button @click="pay" size="large" type="danger" class="dk_btn" :disdbled="isPay">{{payText}}</mt-button>
    </mt-popup>
    <!--银行卡弹窗-->
    <mt-popup v-model="bankCard" position="right" class="mint-popup-3" :modal="false">
      <mt-header fixed title="">
        <router-link to="" slot="left">
          <mt-button icon="back" @click="back"></mt-button>
        </router-link>
      </mt-header>
      银行卡
      <mt-button @click="pay" size="large" type="danger" class="dk_btn" :disdbled="isPay">{{payText}}</mt-button>
    </mt-popup>
  </div>
</template>

<script>
  import myHeader from '@/components/header'
  import Qs from 'qs';
  import {Toast} from 'mint-ui';

  export default {
    name: "recharge",
    components: {myHeader},
    data() {
      return {
        n: 0,
        user: JSON.parse(this.Cookie.get('user')),
        money: '',
        payMent: '1',
        payText: '已打款',
        isPay: false,
        options: [
          {
            label: '支付宝支付',
            value: '1'
          },
          {
            label: '微信支付',
            value: '2'
          },
          {
            label: '银行卡支付',
            value: '3',
          }
        ],
        // 弹窗
        weChat: false,
        alipay: false,
        bankCard: false,
      }
    },
    methods: {
      //前往支付
      toPay() {
        if (this.money && /^[0-9]+$/.test(this.money) && this.money % 100 == 0) {
          if (this.payMent == 1) {
            this.alipay = true;
          } else if (this.payMent == 2) {
            this.weChat = true;
          } else if (this.payMent == 3) {
            this.bankCard = true;
          }
        } else {
          Toast('请输入正确的金额!');
        }
      },
      //返回
      back() {
        this.alipay = false;
        this.weChat = false;
        this.bankCard = false;
      },
      //打款
      pay() {
        if (this.n < 1) {
          let formData = {userID: this.user.id, money: this.money, payMent: this.payMent};
          this.$http({
            url: "/order/recharge",
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
            Toast(data.info)
            if (data.errCode == 0) {
              this.isPay = true;
              this.payText = '正在充值,请稍后...';
              this.n++;
              let _this = this;
              setTimeout(function () {
                this.payText = '已打款';
                this.isPay = true;
                _this.$router.push({path: '/wallet'});
              }, 3000)
            }
          })
        } else {
          Toast('请勿重复提交')
        }
      }
    }

  }
</script>

<style lang="less">
  .recharge_container {
    .main {
      .money_container {
        .mint-cell-wrapper {
          background: none;
          border-bottom: solid 1px #e6e6e6;
        }
      }
      .mint-radio-input:checked + .mint-radio-core {
        background-color: #de181b;
        border-color: #de181b;
      }
      .warning {
        font-size: 0.6rem;
        padding: 20px 10px;
        color: #de181b;
      }
    }
    .mint-popup-3 {
      width: 100%;
      height: 100%;
      background-color: #fff;
      box-sizing: border-box;
      padding: 40px 10px;
      .mint-header {
        background: #de181b;
      }
    }
    .pay_btn {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      .mint-button {
        border-radius: 0;
        background: #e93b3b;
      }
    }
    .dk_btn {
      border-radius: 0;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      .mint-button {
        background: #e93b3b;
      }
    }
  }

  .mint-toast {
    z-index: 9999;
  }
</style>
