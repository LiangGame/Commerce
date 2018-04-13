<template>
  <div class="wallet_container">
    <my-header title="钱包"/>
    <div class="main">
      <img :src="require('@/assets/pic/money.png')" width="100" height="100" alt="">
      <h2>我的零钱</h2>
      <router-link to="/bill"><h1 class=money>￥<span>{{money}}</span></h1></router-link>
      <p class="hint">点击余额查看明细</p>
      <mt-button class="confirm" size="large" type="danger">充值</mt-button>
      <mt-button class="confirm" size="large" type="default">提现</mt-button>
    </div>
  </div>
</template>

<script>
  import myHeader from '@/components/header'

  export default {
    name: "index",
    components: {myHeader},
    data() {
      return {
        money: '0.00'
      }
    },
    methods: {
      getBalance() {
        this.$http({
          url: "/balance/getList",
          method: "GET",
          params: {userID: JSON.parse(this.Cookie.get('user')).id}
        }).then(data => {
          console.log(data);
          if (data.errCode == 0) {

          }
        }).catch(error => {
        })
      }
    },
    created() {
      this.getBalance();
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
