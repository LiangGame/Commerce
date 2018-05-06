<template>
  <div class="agencyPay_container">
    <mt-header title="代理支付">
      <router-link :to="{path:'/',query:{next:'mine'}}" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="agencyPay_box">
      <div class="top">
        <div class="left fl">
          <img src="../../assets/pic/u985.png"/>
        </div>
        <div class="right fl">
          <p>代理专属</p>
          <p class="price">￥3500.00</p>
        </div>
      </div>
      <div class="price_box">
        合计金额：<span class="price">￥3500.00</span>
      </div>
      <div class="payment">
        <mt-radio
          title="选择支付方式"
          v-model="payMent"
          :options="options">
        </mt-radio>
      </div>
      <div class="btn_box">
        <mt-button size="small" type="primary">立即支付</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "agencyPay",
    data() {
      return {
        payMent: '4', options: [
          {
            label: '余额支付',
            value: '4'
          }
        ],
      }
    }
  }
</script>

<style lang="less">
  .agencyPay_container {
    .fl{
      float: left;
    }
    .agencyPay_box{
      .top{
        overflow: hidden;
        padding: 10px;
        .left{
          img{
            width: 3rem;
            height: 3rem;
          }
        }
        .right{
          line-height: 1.5rem;
          padding-left: 10px;
          font-size: 18px;
          .price{
            color: #e93b3b;
            font-size: 18px;
            font-weight: 600;
          }
        }
      }
      .price_box{
        height: 35px;
        line-height: 35px;
        border: solid 1px #e6e6e6;
        background: white;
        text-align: right;
        padding-right: 10px;
        .price{
          color: #e93b3b;
          font-weight: 600;
        }
      }
      .btn_box{
        padding-top: 20px;
        padding-right: 10px;
        text-align: right;
      }
    }
  }
</style>
