<template>
  <div class="consignment_container">
    <my-header title="我的寄售"/>
    <div class="main">
      <div v-for="(item,index) in orderList" @click="orderInfo(item)">
        <mt-cell :key="index" :title="item.goodName" :label="item.status" icon="more">
          <div><span>数量：</span><span style="color: #333">{{item.count}}</span></div>
          <div><span>总价：</span><span style="color: #e93b3b">{{'￥'+item.totalPrice}}</span></div>
          <img slot="icon" :src="item.img" width="55" height="55">
        </mt-cell>
      </div>
    </div>
    <!--订单详情弹窗-->
    <mt-popup v-model="info" position="right" class="mint-popup-3" :modal="false">
      <mt-header fixed title="">
        <router-link to="" slot="left">
          <mt-button icon="back" @click="back"></mt-button>
        </router-link>
      </mt-header>
      <mt-cell title="下单时间" :value="goodInfo.cerateTime"></mt-cell>
      <mt-cell title="支付时间" :value="goodInfo.payTime"></mt-cell>
      <mt-cell title="支付方式" :value="goodInfo.payMent"></mt-cell>
      <mt-cell title="订单状态" :value="goodInfo.status"></mt-cell>
      <mt-cell title="数量" :value="goodInfo.count"></mt-cell>
      <mt-cell title="单价" :value="goodInfo.price"></mt-cell>
      <mt-cell title="总价" :value="goodInfo.totalPrice"></mt-cell>
      <div class="pay_btn" v-if="goodInfo.status == '未支付'">
        <mt-button class="confirm" size="large" @click="toPay" type="danger">立即支付</mt-button>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import {Toast,MessageBox} from 'mint-ui';
  import myHeader from '@/components/header'
  import {timestampToTime} from "@/common/common";

  export default {
    name: "consignment",
    components: {myHeader},
    data() {
      return {
        user: JSON.parse(this.Cookie.get('user')),
        orderList: [],
        info: false,
        goodInfo: {}
      }
    },
    methods: {
      timestampToTime:timestampToTime,
      // 获取订单列表
      loadData() {
        this.$http({
          url: "/order/getAllList",
          method: "GET",
          params: {userID: this.user.id}
        }).then(data => {
          if (data.errCode == 0) {
            data.info.map(item => {
              item.cerateTime = this.timestampToTime(item.cerateTime);
              item.payTime = this.timestampToTime(item.payTime);
              if(item.status == 0){
                item.status = '未支付'
              }else if(item.status == 1){
                item.status = '财务未确认'
              }else if(item.status == 2){
                item.status = '已付款'
              }else if(item.status == 3){
                item.status = '已返第一次佣金'
              }else if(item.status == 4){
                item.status = '已返全部佣金'
              }
              if(item.payMent == 1){
                item.payMent = '支付宝'
              }else if(item.payMent == 2){
                item.payMent = '微信'
              }else if(item.payMent == 3){
                item.payMent = '银行卡'
              }else if(item.payMent == 4){
                item.payMent = '余额'
              }
            })
            this.orderList = data.info;
          } else {
            Toast(data.info);
          }
        }).catch(error => {
          console.log(error)
        })
      },
      //前往支付
      toPay() {
        if(this.user){
          if(this.user.status){
            this.$router.push({name: '立即支付', params: {price: this.priceTotal, num: this.number, goodId: this.good.id}})
          }else {
            MessageBox({
              title: '提示',
              message: '未实名,是否前往认证?',
              showCancelButton: true
            }).then(action => {
              if (action == 'confirm'){
                this.$router.push({ path: '/certification'});
              }
            });
          }
        }else {
          Toast('未登录!')
        }
      },
      //订单详情
      orderInfo(item) {
        this.goodInfo = item;
        this.info = true;
        console.log(item);
      },
      //关闭弹窗
      back() {
        this.info = false;
      },
    },
    created() {
      this.loadData();
    }

  }
</script>

<style lang="less">
  .consignment_container {
    .main {
      .mint-cell {
        padding: 15px 0;
        border-bottom: solid 1px #e6e6e6;
        .mint-cell-wrapper {
          background: none;
          .mint-cell-title{
            height: 55px;
            .mint-cell-text{
              margin-top: -25px;
              display: inline-block;
              position: relative;
            }
            .mint-cell-label{
              margin-left: 60px;
              margin-top: -20px;

            }
          }
          .mint-cell-value {
            display: inline-block;
            width: 25%;
            & > div {
              padding: 7px 0;
            }
          }
        }
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
    }
  }
</style>
