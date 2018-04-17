<template>
  <div class="recharge_container">
    <my-header title="充值"/>
    <div class="main">
      <div class="money_container">
        <mt-field label="金额" placeholder="请输入充值金额" v-model="money"></mt-field>
      </div>
      <p class="warning">注意 : 充值最小金额为100,充值金额必须是100的整数倍</p>
      <mt-radio
        title="选择支付方式"
        v-model="payMent"
        :options="options">
      </mt-radio>
    </div>
    <div class="pay_btn">
      <mt-button class="confirm" size="large" @click="toPay" type="primary">前往支付</mt-button>
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
      <mt-button @click.once="pay" size="large" type="primary" class="dk_btn" :disabled="isOne">已打款</mt-button>
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
      <mt-button @click.once="pay" size="large" type="primary" class="dk_btn" :disabled="isOne">已打款</mt-button>
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
      <mt-button @click.once="pay" size="large" type="primary" class="dk_btn" :disabled="isOne">已打款</mt-button>
    </mt-popup>
  </div>
</template>

<script>
  import myHeader from '@/components/header'
  import Qs from 'qs';
  import {Toast,Indicator} from 'mint-ui';
  import {getPayMent,fileUrl} from "@/common/common";

  export default {
    name: "recharge",
    components: {myHeader},
    data() {
      return {
        isOne:false,
        fileUrl:fileUrl,
        n: 0,
        user: JSON.parse(this.Cookie.get('user')),
        money: '',
        payMent: '1',
        payMentList : {},
        payText: '已打款',
        isPay: false,
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
          }
        ],
        // 弹窗
        weChat: false,
        alipay: false,
        bankCard: false,
      }
    },
    methods: {
      getPayMent:getPayMent,
      //前往支付
      toPay() {
        if (this.money && /^[0-9]+$/.test(this.money) && this.money % 100 == 0) {
          if (this.payMent == 1) {
            this.alipay = true;
          } else if (this.payMent == 2) {
            this.weChat = true;
          } else if (this.payMent == 3) {
            this.bankCard = true;
          }
        } else {
          Toast('请输入正确的金额!');
        }
      },
      //返回
      back() {
        this.alipay = false;
        this.weChat = false;
        this.bankCard = false;
      },
      //打款
      pay() {
        Indicator.open('请稍后...');
        if (this.n < 1) {
          let formData = {userID: this.user.id, money: this.money, payMent: this.payMent};
          this.$http({
            url: "/order/recharge",
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
            Toast(data.info)
            if (data.errCode == 0) {
              this.isPay = true;
              this.payText = '正在充值,请稍后...';
              this.n++;
              let _this = this;
              setTimeout(function () {
                this.payText = '已打款';
                this.isPay = true;
                _this.$router.push({path: '/wallet'});
              }, 3000)
            }
          }).catch(()=>{
            Indicator.close();
          })
        } else {
            Indicator.close();          
          Toast('请勿重复提交')
        }
      }
    },
    created(){
      this.getPayMent(data => {
        this.payMentList = data.info;
      });
    }

  }
</script>

<style lang="less">
  @warning_color:#e93b3b;
  .recharge_container {
    .main {
      .money_container {
        .mint-cell-wrapper {
          background: none;
          border-bottom: solid 1px #e6e6e6;
        }
      }
      .mint-radio-input:checked + .mint-radio-core {
        background-color: #26a2ff;
        border-color: #26a2ff;
      }
      .warning {
        font-size: 1rem;
        padding: 20px 10px;
        color: #e93b3b;
      }
    }
    .mint-popup-3,.mint-popup{
      width: 100%;
      height: 100%;
      background-color: #fff;
      box-sizing: border-box;
      padding: 10px 10px;
      text-align: center;
    }
    .mint-popup{
      .id{
        width: 120px;
        margin: 0 auto;
        padding: 5px 10px;
        font-weight: 600;
        color: @warning_color;
        border: solid 1px #e6e6e6;
      }
      .id_warning{
        font-weight: bolder;
        color: @warning_color;
        margin: 5px auto;
      }
      .warning{
        text-align: left;
        color: @warning_color;
        font-size: 0.9rem;
        line-height: 1.5em;
        margin-top: 50px;
        margin-left: 25px;
      }
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
  }

  .mint-toast {
    z-index: 9999;
  }
</style>
