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
    <div style="margin-top: 20px;" v-if="this.$route.params.type == 2">
      <div>
        <p style="height: 35px;line-height:35px;background:#E2E7EA;padding-left: 10px">提货地址：</p>
        <p style="padding: 10px;font-size: 18px;color: #e93b3b">{{address}}</p>
      </div>
    </div>
    <div class="pay_btn">
      <mt-button class="confirm" size="large" @click="calcMaxOrder" type="primary">立即支付</mt-button>
    </div>
    <!--微信弹窗-->
    <mt-popup v-model="weChat" position="right" class="mint-popup-3" :modal="false" align="center">
      <img :src="require('@/assets/pic/weChat-logo.jpg')" alt="" width="50%">
      <img :src="payMentList.weixin ? fileUrl+payMentList.weixin : ''" alt="" width="60%">
      <h2 style="margin: 10px 0;font-weight: 500">户名:{{payMentList.weixinname}}</h2>
      <p class="id">您的ID:{{user.id}}</p>
      <p class="id_warning">转账时请备注您的ID</p>
      <p class="warning">
        温馨提示：<br>
        请截图保存,在微信中打开扫一扫<br>
        转账时请核对户名,以免造成损失
      </p>
      <mt-button @click.once="payByOrderID" size="large" type="primary" class="dk_btn" :disabled="isOne">已打款</mt-button>
    </mt-popup>
    <!--支付宝弹窗-->
    <mt-popup v-model="alipay" position="right" class="mint-popup-3" :modal="false">
      <img :src="require('@/assets/pic/apliay-logo.jpg')" alt="" width="45%" style="margin-bottom: 25px">
      <img :src="payMentList.zhifubao ? fileUrl+payMentList.zhifubao : ''" alt="">
      <h2 style="margin: 10px 0;font-weight: 500">户名:{{payMentList.zhifubaoname}}</h2>
      <p class="id">您的ID:{{user.id}}</p>
      <p class="id_warning">转账时请备注您的ID</p>
      <p class="warning">
        温馨提示：<br>
        请截图保存,在支付宝中打开扫一扫<br>
        转账时请核对户名,以免造成损失
      </p>
      <mt-button @click.once="payByOrderID" size="large" type="primary" class="dk_btn" :disabled="isOne">已打款</mt-button>
    </mt-popup>
    <!--银行卡弹窗-->
    <mt-popup v-model="bankCard" position="right" class="mint-popup" :modal="false">
      <img :src="require('@/assets/pic/pay-logo.jpg')" alt="" width="45%" style="margin-bottom: 25px">
      <div style="text-align: left">
        <p style="line-height: 2em;"><span class="bank_label">户名：</span>{{payMentList.cardName}}</p>
        <p style="line-height: 2em;"><span class="bank_label">开户行：</span>{{payMentList.cardBank}}</p>
        <p style="line-height: 2em;"><span class="bank_label">银行卡号：</span>{{payMentList.cardNub}}</p>
      </div>
      <p class="id" style="margin-top: 30px">您的ID:{{user.id}}</p>
      <!--<p class="id_warning">转账时请备注您的ID</p>-->
      <p class="warning">
        温馨提示：<br>
        转账时请核对入账信息,以免造成损失<br>
        转账时请备注您的ID
      </p>
      <mt-button @click.once="payByOrderID" size="large" type="primary" class="dk_btn" :disabled="isOne">已打款</mt-button>
    </mt-popup>
  </div>
</template>

<script>
  import myHeader from '@/components/header'
  import Qs from 'qs';
  import {getWinHeight, getPayMent, fileUrl} from "@/common/common";
  import {Toast, Indicator} from 'mint-ui';

  export default {
    name: "pay",
    components: {myHeader},
    data() {
      return {
        isOne: false,
        fileUrl: fileUrl,
        n: 0,
        height: 'height:' + this.getWinHeight() + 'px',
        user: JSON.parse(localStorage.getItem('user')),
        price: this.$route.params.price,
        count: this.$route.params.num,
        goodID: this.$route.params.goodId,
        payMent: '4',
        payMentList: {},
        options: [],
        // 弹窗
        weChat: false,
        alipay: false,
        bankCard: false,
        orderID: null,
        address:''
      }
    },
    methods: {
      getWinHeight: getWinHeight,
      getPayMent: getPayMent,
      //获取商品最大购买数量
      calcMaxOrder() {
        if (this.$route.params.type == 1) {
          Indicator.open('请稍后...');
          if (this.n <= 1) {
            let formData = {goodID: this.goodID, userID: this.user.id};
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
              if (data.errCode == 0) {
                if (+data.info.max - data.info.count > 0) {
                  this.n++;
                  this.cerateOrder();
                } else {
                  Indicator.close();
                  Toast('超出最大购买数量,剩余购买数量:' + (+data.info.max - data.info.count))
                }
              } else {
                Indicator.close();
                Toast(data.info);
              }
            })
          } else {
            Toast('请勿重复提交')
          }
        } else {
          this.cerateOrder();
        }
      },
      //创建订单
      cerateOrder() {
        if (this.$route.params.type != 3) {
          let formData = {
            userID: this.user.id,
            goodID: this.goodID,
            count: this.count,
            payMent: this.payMent,
            type: this.$route.params.type
          };
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
              if (formData.payMent == 4) {
                Toast(data.info);
              } else {
                Toast(data.info.info);
              }
              setTimeout(function () {
                if (formData.payMent == 2) {
                  _this.weChat = true;
                } else if (formData.payMent == 1) {
                  _this.alipay = true;
                } else if (formData.payMent == 3) {
                  _this.bankCard = true;
                } else if (formData.payMent == 4) {
                  _this.$router.push('/');
                }
              }, 3000)
            }
          }).catch(error => {
            Indicator.close();
            console.log(error);
          })
        } else if (this.$route.params.type == 3) {
          let user = this.$route.params.address;
          let formData = {
            userID: this.user.id,
            goodID: this.goodID,
            count: this.count,
            payMent: this.payMent,
            address: user.address,
            phone: user.phone,
            name: user.name
          };
          this.$http({
            url: "/order/createMallOrder",
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
            Toast(data.info);
            let _this = this;
            setTimeout(function () {
              _this.$router.push({path: '/', query: {next: 'shop'}});
            }, 3000)
          })
        }
      },
      //用户确认付款
      payByOrderID() {
        this.isOne = true;
        Indicator.open('正在获取支付信息，请稍等...');
        let formData = {orderID: this.orderID};
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
          this.isOne = false;
          Indicator.close();
          let _this = this;
          if (data.errCode == 0) {
            Toast('恭喜成为代言人,即将获得丰厚奖励');
            setTimeout(function () {
              _this.$router.push('/');
            }, 3000)
          }
        }).catch((err) => {
          console.log(err);
          Indicator.close();
        })
      }
    },
    created() {
      this.getPayMent(data => {
        this.payMentList = data.info;
      });

      if (!this.$route.params.price) {
        this.$router.push('/');
      };
      if (this.$route.params.type == 3) {
        this.options = [
          {
            label: '迈达币',
            value: '5'
          }];
        this.payMent = '5';
      } else {
        this.options = [
          {
            label: '余额支付',
            value: '4'
          }]
      }

      if (this.$route.params.type == 2) {
        this.$http({
          url: "/config/getAddress",
          method: "GET"
        }).then(data => {
          if(data.errCode == 0){
            this.address = data.info[0].address
          }
        })
      }
    }

  }
</script>

<style lang="less">
  @warning_color: #e93b3b;
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
          font-size: 14px;
        }
      }
      .mint-radio-input:checked + .mint-radio-core {
        background-color: #26a2ff;
        border-color: #26a2ff;
      }
    }
    .mint-popup-3, .mint-popup {
      width: 100%;
      height: 100%;
      background-color: #fff;
      box-sizing: border-box;
      padding: 10px 10px;
      text-align: center;
    }
    .mint-popup {
      .id {
        width: 120px;
        margin: 0 auto;
        padding: 5px 10px;
        font-weight: 600;
        color: @warning_color;
        border: solid 1px #e6e6e6;
      }
      .id_warning {
        font-weight: bolder;
        color: @warning_color;
        margin: 5px auto;
      }
      .warning {
        text-align: left;
        color: @warning_color;
        font-size: 0.9rem;
        line-height: 1.5em;
        margin-top: 50px;
        margin-left: 25px;
      }
    }
    .mint-popup {
      /*text-align: left;*/
    }
    .bank_label {
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
    .dk_btn {
      border-radius: 0;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      .mint-button {
        background: #26a2ff;
      }
    }
    .mint-toast {
      z-index: 9999;
    }
  }
</style>
