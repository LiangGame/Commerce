<template>
    <div class="myOrder_container">
      <mt-header title="我的订单">
        <router-link :to="{path:'/',query:{next:'shop'}}" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="order_list" v-for="item in orderData">
        <div class="left fl">
          <img src="../../../src/assets/pic/money.png" alt="" width="90" height="90">
        </div>
        <div class="right fl">
          <div class="r_top">大叔大树大所大</div>
          <div class="r_middle">
            <span>数量 x 1</span>
            <span>￥3500.00</span>
          </div>
          <div class="r_bottom">
            <p>待发货</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "myOrder",
      data(){
          return{
            orderData:[1,2,3]
          }
      }
    }
</script>

<style lang="less">
    .myOrder_container {
      .fl{
        float: left;
      }
      .order_list{
        overflow: hidden;
        padding: 10px;
        border-bottom: solid 1px #e6e6e6;
        .left{
          width: 30%;
        }
        .right{
          box-sizing: border-box;
          padding-left: 10px;
          width: 70%;
          div{
            height: 30px;
            line-height: 30px;
          }
          .r_top{
            word-break: break-all;
            display: -webkit-box;
            /* autoprefixer: off */
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            /* autoprefixer: on */
            text-overflow: ellipsis;
            overflow: hidden;
          }
          p{
            text-align: center;
            width: 70%;
            background: #4caf50;
            border-radius: 15px;
            color: white;
            font-size: 14px;
            height: 20px;
            line-height: 20px;
            margin-top: 5px;
          }
        }
      }
    }
</style>
