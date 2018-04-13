<template>
  <div class="commerce_container">
    <mt-header title="寄售宝">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <router-link to="/login" slot="right">
        <mt-button>登录</mt-button>
      </router-link>
    </mt-header>
    <div class="main">
      <mt-swipe :auto="3000">
        <mt-swipe-item v-for="item in items" :key="item.id">
          <a :href="item.href" rel="external nofollow">
            <img :src="item.url" class="img"/>
            <span class="desc"></span>
          </a>
        </mt-swipe-item>
      </mt-swipe>
      <div class="shops">
        <h1>为您推荐</h1>
        <ul>
          <li class="good">
            <router-link to="/home">
              <img
                src="https://m.360buyimg.com//mobilecms/s636x636_jfs/t148/3/276621205/370727/4f218479/538615f8N48880623.jpg!q70.jpg.dpg.webp"
                width="100%" alt="">
              <div class="goodInfo">
                <p class="goodTitle" style="-webkit-box-orient: vertical">艾璐歌 摩托车 迷你小跑车 四冲程 手拉启动雷鹰三代 纯汽油版跑车可选前后减震真空胎 黑色小轮子</p>
                <div class="price"><span class="big_price">￥950</span>.00</div>
              </div>
            </router-link>
          </li>
          <li class="good">
            <img
              src="https://m.360buyimg.com//mobilecms/s636x636_jfs/t148/3/276621205/370727/4f218479/538615f8N48880623.jpg!q70.jpg.dpg.webp"
              width="100%" alt="">
            <div class="goodInfo">
              <p class="goodTitle">艾璐歌 摩托车 迷你小跑车 四冲程 手拉启动雷鹰三代 纯汽油版跑车可选前后减震真空胎 黑色小轮子</p>
              <div class="price"><span class="big_price">￥950</span>.00</div>
            </div>
          </li>
          <li class="good">
            <img
              src="https://m.360buyimg.com//mobilecms/s636x636_jfs/t148/3/276621205/370727/4f218479/538615f8N48880623.jpg!q70.jpg.dpg.webp"
              width="100%" alt="">
            <div class="goodInfo">
              <p class="goodTitle">艾璐歌 摩托车 迷你小跑车 四冲程 手拉启动雷鹰三代 纯汽油版跑车可选前后减震真空胎 黑色小轮子</p>
              <div class="price"><span class="big_price">￥950</span>.00</div>
            </div>
          </li>
          <li class="good">
            <img
              src="https://m.360buyimg.com//mobilecms/s636x636_jfs/t148/3/276621205/370727/4f218479/538615f8N48880623.jpg!q70.jpg.dpg.webp"
              width="100%" alt="">
            <div class="goodInfo">
              <p class="goodTitle">艾璐歌 摩托车 迷你小跑车 四冲程 手拉启动雷鹰三代 纯汽油版跑车可选前后减震真空胎 黑色小轮子</p>
              <div class="price"><span class="big_price">￥950</span>.00</div>
            </div>
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
                word-break:break-all;
                display: -webkit-box;
                /* autoprefixer: off */
                -webkit-box-orient: vertical;
                -webkit-line-clamp:2;
                /* autoprefixer: on */
                text-overflow:ellipsis;                                                
                overflow:hidden;
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
