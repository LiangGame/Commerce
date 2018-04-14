<template>
  <div class="commerce_container">
    <mt-header title="寄售宝">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <router-link to="/login" slot="right" v-if="!isLogin">
        <mt-button>登录</mt-button>
      </router-link>
      <router-link to="/person" slot="right" v-if="isLogin">
        <mt-button>个人中心</mt-button>
      </router-link>
    </mt-header>
    <div class="main">
      <mt-swipe :auto="3000">
        <mt-swipe-item v-for="item in items" :key="item.id">
          <a :href="item.href" rel="external nofollow">
            <img :src="item.url" class=""/>
            <span class="desc"></span>
          </a>
        </mt-swipe-item>
      </mt-swipe>
      <div class="shops">
        <h1>为您推荐</h1>
        <ul>
          <li class="good" v-for="item in goods">
            <router-link :to="{ name: '确定订单', params: { info: item }}">
              <img
                :src="item.img"
                width="100%" :alt="item.goodName">
              <div class="goodInfo">
                <p class="goodTitle" style="-webkit-box-orient: vertical">{{item.goodName}}</p>
                <div class="price"><span class="big_price">￥{{item.price ? (item.price+'').split('.')[0] : item.price}}.</span>{{item.price ? (item.price+'').split('.')[1] ? (item.price+'').split('.')[1] : '00':'' }}</div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
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
          url: 'https://m.360buyimg.com//mobilecms/s636x636_jfs/t148/3/276621205/370727/4f218479/538615f8N48880623.jpg!q70.jpg.dpg.webp'
        }, {
          title: '我的名字',
          href: 'http://baidu.com',
          url: 'https://m.360buyimg.com//mobilecms/s636x636_jfs/t148/3/276621205/370727/4f218479/538615f8N48880623.jpg!q70.jpg.dpg.webp'
        }],
        goods:[],
        isLogin: false
      }
    },
    created() {
      //验证是否登录
      let userInfo = this.Cookie.get('user');
      if (userInfo) {
        this.isLogin = true;
      }
      this.loadData();
    },
    methods:{
      //获取商品列表
      loadData(){
        this.$http({
          url: "/goods",
          method: "GET"
        }).then(data => {
          if(data){
            this.goods = data;
            console.log((this.goods[0].price + '').split('.'));
          }
        }).catch(error => {

        })
      }
    }

  }
</script>

<style lang="less">
  .commerce_container {
    background: #f5f5f5;
    .mint-header {
      background: #de181b;
    }
    .main {
      .mint-swipe-item {
        img {
          width: 100%;
          height: 300px;
        }
      }
      .mint-swipe {
        height: 300px;
        max-height: 300px;
        background: #f7f7f7;
        overflow: hidden;
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
      .shops {
        h1 {
          color: #f23030;
          text-align: center;
          font-weight: normal;
          font-size: 1.2rem;
          background: #fff;
          padding: 8px;
          margin: 5px 0;
        }
        ul {
          overflow: hidden;
          background: #f5f5f5;
          .good {
            float: left;
            width: 50%;
            box-sizing: border-box;
            padding-bottom: 2px;
            &:nth-child(2n) {
              padding-left: 2px;
            }
            &:nth-child(odd) {
              padding-right: 2px;
            }
            img {
            }
            .goodInfo {
              background: #fff;
              .goodTitle {
                color: #666;
                font-size: 0.8rem;
                word-break: break-all;
                display: -webkit-box;
                /* autoprefixer: off */
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                /* autoprefixer: on */
                text-overflow: ellipsis;
                overflow: hidden;
              }
              .price {
                color: #f23030;
                padding: 8px 0;
                .big_price {
                  font-size: 1.2rem;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
