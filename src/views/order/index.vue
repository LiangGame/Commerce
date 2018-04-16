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
          <img :src="fileUrl+good.img" width="75" height="75" :alt="good.goodName">
        </div>
        <div class="shop_content">
          <div class="shopTitle">
            <strong>{{good.goodName}}</strong>
            <p>{{good.goodDescribe}}</p>
          </div>
        </div>
        <div class="shopNumber">
          <div style="float: right">
            <div class="price"><span class="big_price">￥</span><span class="big_price">{{good.price ? (good.price+'').split('.')[0] : good.price}}.</span>{{good.price
              ? (good.price+'').split('.')[1] ? (good.price+'').split('.')[1] : '00':'' }}
            </div>
            <label> 数量 : </label>
            <a href="javascript:void(0)" @click="minus">-</a>
            <input type="number" id="number" v-model="number"/>
            <a href="javascript:void(0)" @click="add">+</a>
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
        <div style="padding: 0 10px">
          <mt-button size="large" type="danger" @click="toPay">前往支付</mt-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { MessageBox,Toast } from 'mint-ui';
  import myHeader from '@/components/header'
  import {fileUrl} from "@/common/common";

  export default {
    name: "order",
    components: {myHeader},
    data() {
      return {
        fileUrl:fileUrl,
        user: this.Cookie.get('user'),
        number: 1,
        good: null,
        priceTotal: 0
      }
    },
    created() {
      if(this.user){
        this.user = JSON.parse(this.user)
      }
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
      toPay() {
        if(this.user){
          if(this.user.status){
            this.$router.push({name: '立即支付', params: {price: this.priceTotal, num: this.number, goodId: this.good.goodID}})
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
      }
    }
  }
</script>

<style lang="less" scoped>
  .order_container {
    .main {
      .address_container {
        padding: 10px;
        background: #fff url('../../assets/pic/order_border.png') -7px bottom repeat-x;
        background-size: 60px;
        h2 {
          font-size: 1.2rem;
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
        font-size: 0.8rem;
        padding-top: 15px;
        .shopImg_container {
          width: 75px;
          height: 75px;
          position: absolute;
          top: 15px;
          left: 10px;
        }
        .shop_content {
          padding-left: 95px;
          min-height: 40px;
          .shopTitle {
            color: #333;
            line-height: 20px;
            margin-bottom: 5px;
            font-size: 1rem;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .shopNumber {
          overflow: hidden;
          padding-right: 20px;
          margin-top: 15px;
          .price {
            float: left;
            line-height: 27px;
            color: #e93b3d;
            font-weight: 600;
            display: inline-block;
            padding-right: 10px;
            .big_price {
              font-size: 1.3rem;
            }
          }
          label {
            float: left;
            line-height: 25px;
            margin-right: 15px;
          }
          a {
            float: left;
            display: inline-block;
            width: 25px;
            height: 25px;
            line-height: 25px;
            border: solid 1px #CBCBCB;
            text-align: center;
            font-size: 1.2rem;
            color: #333;
          }
          #number {
            float: left;
            width: 50px;
            height: 25px;
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
          font-size: 1rem;
        }
        .price {
          float: right;
          font-size: 1rem;
          color: #e93b3b;
        }
        .count_price {
          float: right;
          .label {
            font-size: 1rem;
            font-weight: 600;
            line-height: 1.9rem;
          }
          .big_price {
            font-size: 1.3rem;
            color: #e93b3b;
            font-weight: 600;
          }
        }
      }
    }
  }
</style>
