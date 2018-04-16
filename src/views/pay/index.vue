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
      <mt-button class="confirm" size="large" @click="calcMaxOrder" type="primary">立即支付</mt-button>
    </div>
    <!--微信弹窗-->
    <mt-popup v-model="weChat" position="right" class="mint-popup-3" :modal="false" align="center">
      <img :src="fileUrl+payMentList.weixin" alt="">
      <p>微信</p>
      <mt-button @click.once="payByOrderID" size="large" type="primary" class="dk_btn">已打款</mt-button>
    </mt-popup>
    <!--支付宝弹窗-->
    <mt-popup v-model="alipay" position="right" class="mint-popup-3" :modal="false">
      <img :src="fileUrl+payMentList.zhifubao" alt="">
      <p>支付宝</p>
      <mt-button @click.once="payByOrderID" size="large" type="primary" class="dk_btn">已打款</mt-button>
    </mt-popup>
    <!--银行卡弹窗-->
    <mt-popup v-model="bankCard" position="right" class="mint-popup" :modal="false">
      <p><span class="bank_label">开户行：</span>{{payMentList.cardBank}}</p>
      <p><span class="bank_label">持卡人姓名：</span>{{payMentList.cardName}}</p>
      <p><span class="bank_label">银行卡号：</span>{{payMentList.cardNub}}</p>
      <mt-button @click.once="payByOrderID" size="large" type="primary" class="dk_btn">已打款</mt-button>
    </mt-popup>
  </div>
</template>

<script>
  import myHeader from '@/components/header'
  import Qs from 'qs';
  import {getWinHeight,getPayMent,fileUrl} from "@/common/common";
  import {Toast,Indicator } from 'mint-ui';

  export default {
    name: "pay",
    components: {myHeader},
    data() {
      return {
        fileUrl:fileUrl,
        n : 0,
        height: 'height:' + this.getWinHeight() + 'px',
        user: JSON.parse(this.Cookie.get('user')),
        price: this.$route.params.price,
        count: this.$route.params.num,
        goodID: this.$route.params.goodId,
        payMent: '4',
        payMentList : {},
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
      getPayMent:getPayMent,
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
        Indicator.open('请稍后...');
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
          Indicator.close();
          let _this = this;
          if(data.errCode == 0){
            console.log(138,'here');
            Toast(data.info);
            setTimeout(function () {
              _this.$router.push('/');
            },3000)
          }
        }).catch(()=>{
          Indicator.close();
        })
      }
    },
    created() {
      this.getPayMent(data => {
        this.payMentList = data.info;
      });
      console.log(206,this.$route.params);
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
          color: #26a2ff;
          font-size: 1rem;
        }
      }
      .mint-radio-input:checked + .mint-radio-core {
        background-color: #26a2ff;
        border-color: #26a2ff;
      }
    }
    .mint-popup-3,.mint-popup{
      width: 100%;
      height: 100%;
      background-color: #fff;
      box-sizing: border-box;
      padding: 40px 10px;
      text-align: center;
    }
    .mint-popup{
      text-align: left;
    }
    .bank_label{
      display: inline-block;
      width: 100px;
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
    .dk_btn{
      border-radius: 0;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      .mint-button {
        background: #26a2ff;
      }
    }
    .mint-toast{
      z-index: 9999;
    }
  }
</style>
