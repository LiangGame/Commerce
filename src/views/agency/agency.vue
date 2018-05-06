<template>
  <div class="agency_container">
    <mt-header title="加入代理">
      <router-link :to="{path:'/',query:{next:'mine'}}" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="agency_box">
      <img src="../../assets/pic/u985.png"/>
      <p class="title">推广专属</p>
      <p class="price">￥3500.00</p>
      <mt-button class="join" size="large" type="primary" @click="join()">马上加入</mt-button>
    </div>
    <div class="warning">
      <p class="title">
        温馨提示：
      </p>
      <p class="content">
        加入代理后将冻结代理专属3500元，30天后操作解冻提现。提现后将失去代理资格
      </p>
    </div>
  </div>
</template>

<script>
  import {MessageBox, Toast} from 'mint-ui';

  export default {
    name: "agency",
    methods:{
      join(){
        MessageBox({
          title: '温馨提示',
          message: '加入代理后可享受代言费，开启瓜分千万代言费！',
          showCancelButton: true
        }).then(action => {
          if (action == 'confirm') {
            this.$router.push({path: '/agencyPay'});
          }else {
            return false
          }
        });
      }
    }
  }
</script>

<style lang="less">
  .agency_container {
    .agency_box {
      padding: 10px;
      text-align: center;
      .title{
        margin: 10px auto;
        font-size: 18px;
      }
      .price{
        color: #e93b3b;
        font-size: 18px;
        font-weight: 600;
        margin: 10px auto;
      }
    }
    .warning{
      .title{
        background: #E2E7EA;
        height: 35px;
        line-height: 35px;
        color: #333;
        padding-left: 10px;
      }
      .content{
        padding: 10px;
        font-size: 18px;
        color: #e93b3b;
        font-weight: 600;
        line-height: 0.8rem;
      }
    }
  }
</style>
