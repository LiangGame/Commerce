<template>
  <div class="pay_container" :style="height">
    <my-header title="收银台"/>
    <div class="main">
      <div class="price_content">
        <span>需支付: <span class="price">{{price}}元</span></span>
      </div>
      <mt-radio
        title="选择支付方式"
        v-model="payMent"
        :options="options">
      </mt-radio>
    </div>
    <div class="pay_btn">
      <mt-button class="confirm" size="large" @click="calcMaxOrder" type="danger">立即支付</mt-button>
    </div>
    <!--微信弹窗-->
    <mt-popup v-model="weChat" position="right" class="mint-popup-3" :modal="false" align="center">
      <img src="../../assets/pic/money.png" alt="">
      <mt-button @click.once="payByOrderID" size="large" type="danger" class="dk_btn">已打款</mt-button>
    </mt-popup>
    <!--支付宝弹窗-->
    <mt-popup v-model="alipay" position="right" class="mint-popup-3" :modal="false">
      <img src="../../assets/pic/money.png" alt="">
      <mt-button @click.once="payByOrderID" size="large" type="danger" class="dk_btn">已打款</mt-button>
    </mt-popup>
    <!--银行卡弹窗-->
    <mt-popup v-model="bankCard" position="right" class="mint-popup-3" :modal="false">
      银行卡
      <mt-button @click.once="payByOrderID" size="large" type="danger" class="dk_btn">已打款</mt-button>
    </mt-popup>
  </div>
</template>

<script>
  import myHeader from '@/components/header'
  import Qs from 'qs';
  import {getWinHeight} from "@/common/common";
  import {Toast,Indicator } from 'mint-ui';

  export default {
    name: "pay",
    components: {myHeader},
    data() {
      return {
        n : 0,
        height: 'height:' + this.getWinHeight() + 'px',
        user: JSON.parse(this.Cookie.get('user')),
        price: this.$route.params.price,
        count: this.$route.params.num,
        goodID: this.$route.params.goodId,
        payMent: '4',
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
          },
          {
            label: '余额支付',
            value: '4'
          }
        ],
        // 弹窗
        weChat: false,
        alipay: false,
        bankCard: false,
        orderID: null
      }
    },
    methods: {
      getWinHeight: getWinHeight,
      //获取商品最大购买数量
      calcMaxOrder(){
        Indicator.open('请稍后...');
        if(this.n <= 1){
          let formData = {goodID:this.goodID,userID:this.user.id};
          this.$http({
            url: "/goods/calcMaxOrder",
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
            if(data.errCode == 0){
              if(+data.info.max - data.info.count > 0){
                this.n++;
                this.cerateOrder();
              }else {
                Indicator.close();
                Toast('超出最大购买数量,剩余购买数量:'+(+data.info.max - data.info.count))
              }
            }else {
              Indicator.close();
              Toast(data.info);
            }
          })
        }else {
          Toast('请勿重复提交')
        }
      },
      //创建订单
      cerateOrder() {
        let formData = {
          userID: this.user.id,
          goodID: this.goodID,
          count: this.count,
          payMent: this.payMent
        };
        console.log('here');
        this.$http({
          url: "/order/cerateOrder",
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
          if (data.errorCode != 0) {
            Indicator.close();
            Toast(data.info);
          } else {
            Indicator.close();
            let _this = this;
            _this.orderID = data.info.orderID;
            if(formData.payMent == 4){
              Toast(data.info);
            }else {
              Toast(data.info.info);
            }
            setTimeout(function () {
              console.log('102>>>', formData.payMent);
              if (formData.payMent == 2) {
                _this.weChat = true;
              }else if(formData.payMent == 1){
                _this.alipay = true;
              }else if(formData.payMent == 3){
                _this.bankCard = true;
              }else if(formData.payMent == 4){
                _this.$router.push('/person');
              }
            }, 3000)
          }
        }).catch(error => {
          Indicator.close();
          console.log(error);
        })
      },
      //用户确认付款
      payByOrderID() {
        let formData = {orderID:this.orderID};
        this.$http({
          url: "/order/payByOrderID",
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
          let _this = this;
          if(data.errCode == 0){
            console.log(138,'here');
            Toast(data.info);
            setTimeout(function () {
              _this.$router.push('/');
            },3000)
          }
        })
      }
    },
    created() {
      if(!this.$route.params.price){
        this.$router.push('/');
      }
    }

  }
</script>

<style lang="less">
  .pay_container {
    .main {
      background: #e2e7ea;
      .price_content {
        background: #fff;
        padding: 10px;
        text-align: right;
        border-bottom: solid 1px #e6e6e6;
        margin-bottom: 15px;
        .price {
          color: #e93b3b;
          font-size: 1rem;
        }
      }
      .mint-radio-input:checked + .mint-radio-core {
        background-color: #de181b;
        border-color: #de181b;
      }
    }
    .mint-popup-3 {
      width: 100%;
      height: 100%;
      background-color: #fff;
      box-sizing: border-box;
      padding: 40px 10px;
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
    .dk_btn{
      border-radius: 0;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      .mint-button {
        background: #e93b3b;
      }
    }
    .mint-toast{
      z-index: 9999;
    }
  }
</style>
