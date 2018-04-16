<template>
  <div class="wallet_container">
    <my-header title="钱包"/>
    <div class="main">
      <img :src="require('@/assets/pic/money.png')" width="100" height="100" alt="">
      <h2>我的零钱</h2>
      <router-link to="/bill"><h1 class=money>￥<span>{{money}}</span></h1></router-link>
      <p class="hint">点击余额查看明细</p>
      <mt-button class="confirm" size="large" type="danger" @click="toRecharge">充值</mt-button>
      <mt-button class="confirm" size="large" type="default" @click="toWithdrawals">提现</mt-button>
    </div>
  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui';
  import myHeader from '@/components/header'

  export default {
    name: "index",
    components: {myHeader},
    data() {
      return {
        money: '0.00',
        user: this.Cookie.get('user')
      }
    },
    methods: {
      //充值
      toRecharge() {
        if (this.user.status) {
          this.$router.push({path: '/recharge'});
        } else {
          MessageBox({
            title: '提示',
            message: '未实名,是否前往认证?',
            showCancelButton: true
          }).then(action => {
            if (action == 'confirm') {
              this.$router.push({path: '/certification'});
            }
          });
        }
      },
      //提现
      toWithdrawals() {
        if (this.user.status) {
          this.$router.push({path: '/withdrawals'});
        } else {
          MessageBox({
            title: '提示',
            message: '未实名,是否前往认证?',
            showCancelButton: true
          }).then(action => {
            if (action == 'confirm') {
              this.$router.push({path: '/certification'});
            }
          });
        }
      }
    },
    created() {
      if(this.user){
        this.user = JSON.parse(this.user);
        this.money = this.user.balance;
      }
    }

  }
</script>

<style lang="less">
  .wallet_container {
    .main {
      padding: 30px 10px 0 10px;
      text-align: center;
      h2 {
        font-weight: 500;
        color: #333;
        padding: 10px 0;
      }
      .money {
        margin: 0;
        color: #333;
      }
      .hint {
        padding: 10px 0;
        color: #666;
      }
      .mint-button {
        margin: 15px 0;
      }
    }
  }
</style>
