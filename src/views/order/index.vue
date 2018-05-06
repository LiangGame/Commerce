<template>
  <div class="order_container">
    <my-header title="确认订单"/>
    <div class="main">
      <!--<div class="address_container">-->
      <!--<h2>张三 <span>155****0000</span></h2>-->
      <!--<p class="address">浙江省杭州市浙江省杭州市浙江省杭州市浙江省杭州市浙江省杭州市浙江省杭州市浙江省杭州市浙江省杭州市</p>-->
      <!--</div>-->
      <div class="shopInfo_container">
        <div class="shopImg_container">
          <img :src="good.img ? fileUrl+good.img : ''" style="width: 2.5rem;height: 2.5rem" :alt="good.goodName">
        </div>
        <div class="shop_content">
          <div class="shopTitle">
            <strong>{{good.goodName}}</strong>
            <p>{{good.goodDescribe}}</p>
          </div>
        </div>
        <div class="shopNumber">
          <div style="float: right">
            <div class="price">
              <span class="big_price">￥</span><span class="big_price">{{good.price ? (good.price+'').split('.')[0] : good.price}}.</span>{{good.price
              ? (good.price+'').split('.')[1] ? (good.price+'').split('.')[1] : '00':'' }}
            </div>
            <div style="float: right;overflow: hidden">
              <label> 数量 : </label>
              <a href="javascript:void(0)" @click="minus">-</a>
              <input type="number" id="number" v-model="number"/>
              <a href="javascript:void(0)" @click="add">+</a>
            </div>
          </div>
        </div>
        <div class="price_container">
          <div class="price_top">
            <span class="label">商品金额</span>
            <span class="price">￥{{good.price ? (good.price+'').split('.')[0] : good.price}}.{{good.price ? (good.price+'').split('.')[1] ? (good.price+'').split('.')[1] : '00':'' }}</span>
          </div>
          <div class="price_middle">
            <span class="label">运费</span>
            <span class="price">+￥0.00</span>
          </div>
          <div class="price_bottom">
            <span class="count_price"><span class="label">总价:</span><span class="big_price">￥{{priceTotal ? (priceTotal+'').split('.')[0] : priceTotal}}.{{priceTotal ? (priceTotal+'').split('.')[1] ? (priceTotal+'').split('.')[1] : '00':'' }}</span></span>
          </div>
        </div>
        <div style="padding: 0 10px" v-if="payMent">
          <div style="background: #ddd;color: #e93b3b;margin: 0 -10px;padding: 5px 10px">购买方式：</div>
          <div style="margin-top: 1rem">
            <mt-button size="large" type="danger" @click="toPay(0)">自提</mt-button>
            <mt-button size="large" type="primary" @click="toPay(1)">代售</mt-button>
          </div>
        </div>
        <div style="padding: 0 10px" v-if="!payMent">
          <div style="background: #ddd;color: #e93b3b;margin: 0 -10px;padding: 5px 10px">收货地址：</div>
          <div>
            <mt-field v-model="address" placeholder="请填写详细地址 如：**省**市**区**路**号*室" style="margin: 0 -10px;min-height: 35px"></mt-field>
          </div>
          <div style="margin-top: 1rem;text-align: right;overflow: hidden">
            <!--<mt-button size="large" type="danger" @click="toPay(0)">自提</mt-button>-->
            <mt-button style="float: right" size="large" type="primary" @click="toPay(1)">购买</mt-button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {MessageBox, Toast} from 'mint-ui';
  import myHeader from '@/components/header'
  import {fileUrl} from "@/common/common";

  export default {
    name: "order",
    components: {myHeader},
    data() {
      return {
        fileUrl: fileUrl,
        user: this.Cookie.get('user'),
        number: 1,
        good: {},
        priceTotal: 0,
        payMent:this.$route.params.payMent,
        address:''
      }
    },
    created() {
      console.log(this.$route.params.payMent);
      if (this.user) {
        this.user = JSON.parse(this.user)
      }
      console.log(this.$route.params.info);
      if (!this.$route.params.info) {
        this.$router.push('/');
      } else {
        this.good = this.$route.params.info;
        this.priceTotal = this.number * this.good.price
      }

    },
    methods: {
      minus() {
        if (this.number > 1) {
          this.number--;
          this.priceTotal = this.number * this.good.price
        }
      },
      add() {
        this.number++;
        this.priceTotal = this.number * this.good.price
      },
      //前往支付
      toPay(num) {
        if(num){
          if (this.user) {
            if (this.user.status) {
              this.$router.push({
                name: '立即支付',
                params: {price: this.priceTotal, num: this.number, goodId: this.good.goodID,type:num}
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
        }else {
          MessageBox({
            title: '提示',
            message: '·自提购买方式需您到店提货且无法获得代言费<br>' +
            '·请谨慎购买！',
            showCancelButton: true
          }).then(action => {
            if (action == 'confirm') {
              if (this.user) {
                if (this.user.status) {
                  this.$router.push({
                    name: '立即支付',
                    params: {price: this.priceTotal, num: this.number, goodId: this.good.goodID,type:num}
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
            }
          });
        }
      }
    }
  }
</script>

<style lang="less">
  .mint-msgbox-message{
    font-size: 14px;
    text-align: left;
    color: #333;
  }
  .mint-msgbox-content{
    padding: 10px 0 20px 10px;
  }
  .mint-cell-wrapper{
    height: 35px;
  }
  .order_container {
    .main {
      .address_container {
        padding: 10px;
        background: #fff url('../../assets/pic/order_border.png') -7px bottom repeat-x;
        background-size: 60px;
        h2 {
          font-size: 18px;
        }
        .address {
          padding: 8px 20px 8px 0;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .shopInfo_container {
        position: relative;
        min-height: 75px;
        padding: 0;
        font-size: 16px;
        padding-top: 15px;
        .shopImg_container {
          width: 2.5rem;
          height: 2.5rem;
          position: absolute;
          top: 15px;
          left: 10px;
        }
        .shop_content {
          padding-left: 3rem;
          min-height: 40px;
          .shopTitle {
            color: #333;
            line-height: 20px;
            /*margin-bottom: 5px;*/
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .shopNumber {
          overflow: hidden;
          padding-right: 20px;
          /*margin-top: 35px;*/
          .price {
            font-size: 0.4rem;
            overflow: hidden;
            float: right;
            line-height: 27px;
            color: #e93b3d;
            font-weight: 600;
            width: 100%;
            text-align: right;
            /*display: inline-block;*/
            /*padding-right: 10px;*/
            .big_price {
              font-size: 18px;
            }
          }
          label {
            float: left;
            line-height: 25px;
            margin-right: 15px;
            font-size: 0.4rem;
          }
          a {
            float: left;
            display: inline-block;
            width: 0.6rem;
            height: 0.6rem;
            line-height: 0.6rem;
            border: solid 1px #CBCBCB;
            text-align: center;
            font-size: 18px;
            color: #333;
          }
          #number {
            float: left;
            width: 1rem;
            height: 0.6rem;
            border: none;
            border-top: solid 1px #CBCBCB;
            border-bottom: solid 1px #CBCBCB;
            text-align: center;
            & {
              outline: none;
            }
          }
        }

      }
      .price_container {
        padding: 20px 10px;
        .price_top, .price_middle, .price_bottom {
          overflow: hidden;
          margin: 15px 0;
        }
        .label {
          float: left;
          font-size: 14px;
        }
        .price {
          float: right;
          font-size: 14px;
          color: #e93b3b;
        }
        .count_price {
          float: right;
          .label {
            font-size: 14px;
            font-weight: 600;
            line-height: 24px;
          }
          .big_price {
            font-size: 18px;
            color: #e93b3b;
            font-weight: 600;
          }
        }
      }
      .mint-button--large {
        display: inline-block;
        width: 49%;
        float: left;
        border-radius: 4px;
        &:first-child{
          margin-right: 5px;
        }
      }
    }
  }
</style>
