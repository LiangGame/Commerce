<template>
  <div class="home_container">
    <my-header title="商城"></my-header>
    <div class="main">
      <mt-swipe :auto="3000">
        <mt-swipe-item v-for="item in items" :key="item.id">
          <a :href="item.href" rel="external nofollow">
            <img :src="item.url" class="img"/>
            <span class="desc"></span>
          </a>
        </mt-swipe-item>
      </mt-swipe>
      <div class="shopTitle">
        <span class="title_text">泰国原装进口休闲零食 小老板海苔卷 脆紫菜烤海苔卷 原味 32.4g/盒（新老包装随机发货）</span>
        <p class="act">幸福莫过于孩子眼中的世界，颜色缤纷，味道甜美。有儿时玩伴，有满满零食箱，像个孩子，乐在京东</p>
        <div class="price_content">
            <span class="price">
              <span class="yang_price">￥</span><span class="big_price">13</span><span class="small_price">.90</span>
              <p class="after_price"><s>价格: 13.90</s></p>
            </span>
          <span class="carriage">运费: 0.00</span>
          <span class="after_address">原产地: 杭州</span>
        </div>
        <div>
          <mt-cell title="已选" is-link @click.native="popupVisible = true">
            <span style="float: left;color: #333">烤海苔卷 原味 32.4g/盒</span>
          </mt-cell>
          <mt-popup v-model="popupVisible" position="bottom" class="mint-popup-4">
            <div class="popup_container">
              <div class="shop_container">
                <div class="shopImg">
                  <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2544269114,2104066965&fm=27&gp=0.jpg" alt="">
                </div>
                <div class="shop_price">￥13.90</div>
              </div>
              <div class="number_container">
                <label> 数量 : </label>
                <a href="javascript:void(0)" @click="minus">-</a>
                <input type="number" id="number" v-model="number">
                <a href="javascript:void(0)" @click="add">+</a>
              </div>
              <div class="bottom">
                <span class="close" @click="close">取消</span>
                <span class="confirm">立即购买</span>
              </div>
            </div>
          </mt-popup>
        </div>
        <div class="shopInfo">
          <div class="s_header">详情</div>
          <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2544269114,2104066965&fm=27&gp=0.jpg" alt="">
          <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2544269114,2104066965&fm=27&gp=0.jpg" alt="">
          <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2544269114,2104066965&fm=27&gp=0.jpg" alt="">
          <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2544269114,2104066965&fm=27&gp=0.jpg" alt="">
        </div>
      </div>
    </div>
    <mt-tabbar>
      <mt-tab-item id=""><router-link to="/order">立即购买</router-link></mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import myHeader from '@/components/header'
  export default {
    name: "index",
    components: {myHeader},
    data() {
      return {
        items: [{
          title: '你的名字',
          href: 'http://baidu.com',
          url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2544269114,2104066965&fm=27&gp=0.jpg'
        }, {
          title: '我的名字',
          href: 'http://baidu.com',
          url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=845224913,672761462&fm=27&gp=0.jpg'
        }],
        popupVisible: false,
        number: 1
      }
    },
    mounted() {
      
    },
    methods: {
      takePhoto() {
        console.log('taking photo');
      },
      openAlbum() {
        console.log('opening album');
      },
      goBack() {
        history.go(-1);
      },
      minus(){
        if(this.number > 1){
          this.number--;
        }
      },
      add(){
        this.number++;
      },
      close(){
        this.popupVisible = false;
      }
    },
  }
</script>

<style lang="less">
  .home_container {
    .main {
      margin-bottom: 50px;
      .mint-swipe-item{
        img {
          width: 100%;
          height: 420px;
        }
      }
      .mint-swipe {
        height: 420px;
        background: #f7f7f7;
      }
      .desc {
        font-weight: 600;
        opacity: .9;
        padding: 5px;
        height: 20px;
        line-height: 20px;
        width: 100%;
        color: #fff;
        position: absolute;
        bottom: 0;
      }
      .shopTitle {
        padding: 10px 10px 0 10px;
        .title_text {
          font-size: 16px;
          line-height: 20px;
          color: #232326;
        }
        .act {
          margin: 11px 10px 0 0;
          font-size: 13px;
          line-height: 17px;
          text-align: justify;
          color: #81838e;
        }
        .price_content {
          overflow: hidden;
          .price {
            width: 33.33%;
            float: left;
            margin-top: 7px;
            font-family: Helvetica;
            font-size: 23px;
            font-weight: 700;
            line-height: 23px;
            color: #f23030;
            .big_price {
              display: inline-block;
              font-size: 23px;
              line-height: 23px;
            }
            .small_price {
              display: inline-block;
              font-size: 17px;
              line-height: 17px;
            }
            .after_price {
              font-weight: 200;
              font-size: 14px;
              line-height: 14px;
              color: #666;
            }
          }
          .carriage {
            display: inline-block;
            width: 33.33%;
            margin-top: 27px;
            margin-left: 0;
            color: #666;
            text-align: center;
          }
          .after_address {
            width: 33.33%;
            float: right;
            margin-top: 27px;
            color: #666;
            text-align: right;
          }
        }
      }
      .mint-cell-title{
        display: inline-block !important;
        flex: 0.4;
        color: #666;
      }
      .mint-popup-4 {
        width: 100%;
        background: #fff;
        clear: both;
        .popup_container{
          .bottom{
            z-index: 99999;
            width: 100%;
            span{
              float: left;
              display: inline-block;
              width: 50%;
              padding: 10px 0;
              text-align: center;
              color: #fff;
            }
            .close{
              background: #FFB03F;
            }
            .confirm{
              background: #F23030;
            }
          }
        }
        .shop_container{
          padding: 0 10px;
          .shopImg{
            display: inline-block;
            position: relative;
            top: -25px;
            width: 100px;
            height: 100px;
            img{
              width: 100px;
              height: 100px;
            }
          }
          .shop_price{
            display: inline-block;
            position: relative;
            top: -26px;
            font-size: 15px;
            font-weight: 700;
            line-height: 15px;
            color: #f23030;
          }
        }
        .number_container{
          padding: 0 10px;
          overflow: hidden;
          margin-bottom: 150px;
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
            font-size: 25px;
            color: #333;
          }
          #number{
            float: left;
            width: 80px;
            height: 25px;
            border: solid 1px #CBCBCB;
            text-align: center;
            &{
              outline: none;
            }
          }
        }
      }
      .shopInfo{
        .s_header{
          font-size: 16px;
          color: #666;
          text-align: center;
          padding-bottom: 15px;
        }
        img{
          width: 100%;
        }
      }
    }
    .mint-tabbar{
      position: fixed;
      background: #de181b;
      padding: 10px;
      .mint-tab-item-label{
        font-size: 16px;
      }
      a{
        color: #fff;
      }
    }
  }
</style>
