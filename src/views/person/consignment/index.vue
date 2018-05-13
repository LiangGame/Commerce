<template>
  <div class="consignment_container">
    <mt-header title="我的订单">
      <router-link :to="{path:'/',query:{next:'mine'}}" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <!--<mt-button slot="right" @click.native="showFormat = true">筛选</mt-button>-->
    </mt-header>
    <div class="main">
      <div class="title">
        <ul>
          <li data-type="9" class="active" @click="formatData('')">全部</li>
          <li data-type="2" @click="formatData(2)">自提订单</li>
          <li data-type="1" @click="formatData(1)">代售订单</li>
          <li data-type="0" @click="formatData(3)">商城订单</li>
        </ul>
      </div>
      <div v-for="(item,index) in orderList" :key=index @click="orderInfo(item)">
        <mt-cell :key="index" :title="item.goodName" :label="item.status | zh" icon="more">
          <div><span>数量：</span><span style="color: #333">{{item.count}}</span></div>
          <div><span>总价：</span><span style="color: #26a2ff">{{'￥'+item.totalPrice}}</span></div>
          <img slot="icon" :src="fileUrl+item.img" width="55" height="55">
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
      <mt-cell title="订单状态" :value="goodInfo.status | zh"></mt-cell>
      <mt-cell title="数量" :value="goodInfo.count"></mt-cell>
      <mt-cell title="单价" :value="goodInfo.price"></mt-cell>
      <mt-cell title="总价" :value="goodInfo.totalPrice"></mt-cell>
      <div class="pay_btn" v-if="goodInfo.status == '未支付'">
        <mt-button class="confirm" size="large" @click="toPay" type="primary">立即支付</mt-button>
      </div>
    </mt-popup>
    <!--筛选-->
    <mt-popup
      v-model="showFormat"
      position="bottom"
      class="format">
      <mt-checklist
        class="page-part"
        title="请选择筛选条件"
        v-model="formatInfo"
        :options="formatList">
      </mt-checklist>
      <div style="text-align: center">
        <mt-button style="margin: 10px" size="small" @click="formatData" type="primary">确认</mt-button>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import Qs from 'qs';
  import {Toast, MessageBox} from 'mint-ui';
  import myHeader from '@/components/header'
  import {timestampToTime, fileUrl} from "@/common/common";

  export default {
    name: "consignment",
    components: {myHeader},
    data() {
      return {
        fileUrl: fileUrl,
        user: JSON.parse(localStorage.getItem('user')),
        orderList: [],
        allList:[],
        info: false,
        goodInfo: {},
        showFormat:false,
        formatList:['未支付','财务未确认','已结束'],
        formatInfo:[]
      }
    },
    methods: {
      timestampToTime: timestampToTime,
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
              if (item.payMent == 1) {
                item.payMent = '支付宝'
              } else if (item.payMent == 2) {
                item.payMent = '微信'
              } else if (item.payMent == 3) {
                item.payMent = '银行卡'
              } else if (item.payMent == 4) {
                item.payMent = '余额'
              }
            })
            this.orderList = data.info;
            this.allList = data.info;
          } else {
            Toast(data.info);
          }
        }).catch(error => {
          console.log(error)
        })
      },
      //前往支付
      toPay() {
        if (this.user) {
          if (this.user.status) {
            this.$router.push({
              path: '/pay',
              name: '立即支付',
              params: {price: this.goodInfo.totalPrice, num: this.goodInfo.count, goodId: this.goodInfo.goodID}
            })
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
        } else {
          Toast('未登录!')
        }
      },
      //订单详情
      orderInfo(item) {
        this.goodInfo = item;
        this.info = true;
      },
      //关闭弹窗
      back() {
        this.info = false;
      },
      //筛选
      formatData(type){
        $(event.target).siblings().className='';
        $(event.target).siblings().removeClass('active');
        $(event.target).addClass('active');

        this.$http({
          url: "/order/getAllList?userID="+this.user.id+'&type='+type,
          method: "GET",
        }).then(data => {
          if (data.errCode == 0) {
            data.info.map(item => {
              item.cerateTime = this.timestampToTime(item.cerateTime);
              item.payTime = this.timestampToTime(item.payTime);
              if (item.payMent == 1) {
                item.payMent = '支付宝'
              } else if (item.payMent == 2) {
                item.payMent = '微信'
              } else if (item.payMent == 3) {
                item.payMent = '银行卡'
              } else if (item.payMent == 4) {
                item.payMent = '余额'
              }else if (item.payMent == 5) {
                item.payMent = '迈达币'
              }
              if(type == 1){
                if(item.status == 2){
                  item.status = '已付款，代售中...'
                }
              }
            })
            this.orderList = data.info;
            this.allList = data.info;
          } else {
            Toast(data.info);
          }
        }).catch(error => {
          console.log(error)
        })
      }
    },
    created() {
      this.loadData();
    },
    filters:{
      zh(value){
        if (value == 0) {
          value = '未支付'
        } else if (value == 1) {
          value = '财务未确认'
        } else if (value == 2) {
          value = '已付款'
        } else if (value == 3) {
          value = '已首次返现'
        } else if (value == 4) {
          value = '已返全部佣金'
        }else if (value == 5) {
          value = '已发货'
        }else if (value == 6) {
          value = '已收货'
        }
        return value
      }
    }


  }
</script>

<style lang="less">
  .consignment_container {
    .main {
      .title{
        ul{
          height: 35px;
          line-height: 35px;
          background: #ddd;
          overflow: hidden;
          li{
            text-align: center;
            float: left;
            width: 25%;
            font-weight: 600;
            font-size: 14px;
          }
        }
        .active{
          color: #e93b3b;
        }
      }
      .mint-cell {
        height: 86px;
        padding: 15px 0;
        border-bottom: solid 1px #e6e6e6;
        .mint-cell-wrapper {
          background: none;
          height: 55px;
          .mint-cell-title {
            height: 55px;
            .mint-cell-text {
              margin-top: -25px;
              /*display: inline-block;*/
              position: relative;
              max-width: 70%;
              word-break: break-all;
              display: -webkit-inline-box;
              /* autoprefixer: off */
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              /* autoprefixer: on */
              text-overflow: ellipsis;
              overflow: hidden;
            }
            .mint-cell-label {
              margin-left: 60px;
              margin-top: -20px;
            }
          }
          .mint-cell-value {
            display: inline-block;
            width: 25%;
            font-size: 12px;
            & > div {
              padding: 0px 0;
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
        /*background: #26a2ff;*/
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
    }
    .format{
      width: 100%;
    }
  }
</style>
