<template>
    <div class="pay_container">
      <my-header title="收银台"/>
      <div class="main">
        <div class="price_content">
          <span>需支付: <span class="price">99.99元</span></span>
        </div>
        <!--<mt-cell title="" is-link>-->
          <!--<span style="float: left;color: #333"></span>-->
        <!--</mt-cell>-->
      </div>
      <mt-tabbar>
        <mt-tab-item id="">余额支付</mt-tab-item>
      </mt-tabbar>
    </div>
</template>

<script>
  import myHeader from '@/components/header'
  export default {
    name: "pay",
    components: {myHeader},

  }
</script>

<style lang="less">
    .pay_container {
      .main{
        background: #e2e7ea;
        .price_content{
          background: #fff;
          padding: 10px;
          text-align: right;
          border-bottom: solid 1px #e6e6e6;
          margin-bottom: 15px;
          .price{
            color: #e93b3b;
            font-size: 1rem;
          }
        }
      }
      .mint-tabbar{
        position: fixed;
        background: #de181b;
        padding: 10px;
        .mint-tab-item-label{
          font-size: 1rem;
          color: #fff;
        }
      }
    }
</style>
