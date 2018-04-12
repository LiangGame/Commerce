<template>
    <div class="order_container">
      <my-header title="确认订单"/>
      <div class="main">
        <div class="address_container">
          <h2>张三 <span>155****0000</span></h2>
          <p class="address">浙江省杭州市浙江省杭州市浙江省杭州市浙江省杭州市浙江省杭州市浙江省杭州市浙江省杭州市浙江省杭州市</p>
        </div>
        <div class="shopInfo_container">
          <div class="shopImg_container">
            <img :src="require('@/assets/pic/money.png')" width="75" height="75" alt="">
          </div>
          <div class="shop_content">
            <div class="shopTitle">
              <strong>Apple Mac mini台式电脑 (Core i5 处理器/4GB内存/500G存储 MGEM2CH/A)</strong>
            </div>
            <div class="shopNumber">
              <div class="price"><span class="big_price">￥</span><span class="big_price">99</span>.99</div>
              <label> 数量 : </label>
              <a href="javascript:void(0)" @click="minus">-</a>
              <input type="number" id="number" v-model="number"/>
              <a href="javascript:void(0)" @click="add">+</a>
            </div>
          </div>
          <div class="price_container">
            <div class="price_top">
              <span class="label">商品金额</span>
              <span class="price">￥99.99</span>
            </div>
            <div class="price_middle">
              <span class="label">运费</span>
              <span class="price">+￥0.00</span>
            </div>
            <div class="price_bottom">
              <span class="count_price"><span class="label">总价:</span><span class="big_price">￥99.99</span></span>
            </div>
          </div>
          <div style="padding: 0 10px">
            <router-link to="/pay"><mt-button size="large" type="danger">立即支付</mt-button></router-link>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
  import myHeader from '@/components/header'

  export default {
    name: "order",
    components: {myHeader},
    data(){
      return{
        number:'1'
      }
    },
    methods:{
      minus(){
        if(this.number > 1){
          this.number--;
        }
      },
      add(){
        this.number++;
      }
    }
  }
</script>

<style lang="less" scoped>
    .order_container {
      .main{
        .address_container{
          padding: 10px;
          background: #fff url('../../assets/pic/order_border.png') -7px bottom repeat-x;
          background-size: 60px;
          h2{
            font-size: 1.2rem;
          }
          .address{
            padding: 8px 20px 8px 0;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .shopInfo_container{
          position: relative;
          min-height: 75px;
          padding: 0;
          font-size: 0.8rem;
          padding-top: 15px;
          .shopImg_container{
            width: 75px;
            height: 75px;
            position: absolute;
            top: 15px;
            left: 10px;
          }
          .shop_content{
            padding-left: 95px;
            .shopTitle{
              height: 40px;
              color: #333;
              line-height: 20px;
              margin-bottom: 5px;
              font-size: 1rem;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .shopNumber{
              overflow: hidden;
              .price{
                float: left;
                line-height: 27px;
                color: #e93b3d;
                font-weight: 600;
                display: inline-block;
                padding-right: 10px;
                .big_price{
                  font-size: 1.6rem;
                }
              }
              label{
                float: left;
                line-height: 25px;
                margin-right: 15px;
              }
              a{
                float: left;
                display: inline-block;
                width: 25px;
                height: 25px;
                line-height: 25px;
                border: solid 1px #CBCBCB;
                text-align: center;
                font-size: 2rem;
                color: #333;
              }
              #number{
                float: left;
                width: 80px;
                height: 25px;
                border: none;
                border-top: solid 1px #CBCBCB;
                border-bottom: solid 1px #CBCBCB;
                text-align: center;
                &{
                  outline: none;
                }
              }
            }
          }

        }
        .price_container{
          padding: 20px 10px;
          .price_top,.price_middle,.price_bottom{
            overflow: hidden;
            margin: 15px 0;
          }
          .label{
            float: left;
            font-size: 1rem;
          }
          .price{
            float: right;
            font-size: 1rem;
            color: #e93b3b;
          }
          .count_price{
            float: right;
            .label{
              font-size: 1rem;
              font-weight: 600;
            }
            .big_price{
              font-size: 1.6rem;
              color: #e93b3b;
              font-weight: 600;
            }
          }
        }
      }
    }
</style>
