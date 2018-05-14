<template>
  <div class="commerce_container">
    <mt-header title="恒迈达">
      <!--<router-link to="/" slot="left">-->
      <!--<mt-button icon="back"></mt-button>-->
      <!--</router-link>-->
      <router-link to="/login" slot="right" v-if="!isLogin">
        <mt-button>登录</mt-button>
      </router-link>
      <!--<router-link to="/person" slot="right" v-if="isLogin">-->
      <!--<mt-button>个人中心</mt-button>-->
      <!--</router-link>-->
    </mt-header>
    <mt-tab-container class="page-tabbar-container" v-model="selected">
      <mt-tab-container-item id="index">
        <div class="main">
          <mt-swipe :auto="3000">
            <mt-swipe-item v-for="item in imgList1" :key="item.id">
              <a :href="item.href" rel="external nofollow">
                <img :src="item.url ? item.url : ''" class=""/>
                <span class="desc"></span>
              </a>
            </mt-swipe-item>
          </mt-swipe>
          <div class="shops">
            <h1 style="background: #56abf2;color: white;padding: 0;margin: 0">代售商城</h1>
            <ul>
              <li class="good" v-for="item in goods">
                <router-link :to="{ name: '确定订单', params: { info: item ,payMent:true}}">
                  <img
                    :src="item.img ? fileUrl+item.img : ''"
                    width="100%" :alt="item.goodName">
                  <div class="goodInfo">
                    <p class="goodTitle" style="-webkit-box-orient: vertical">{{item.goodName}}</p>
                    <div class="price">
                      <span class="big_price">￥{{item.price ? (item.price+'').split('.')[0] : item.price}}.</span>
                      {{item.price ? (item.price+'').split('.')[1] ? (item.price+'').split('.')[1] : '00':'' }}
                      <span style="float: right;color:#333">月销量：{{item.volume ? item.volume:'0'}}</span>
                    </div>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="shop">
        <div class="main">
          <mt-swipe :auto="3000">
            <mt-swipe-item v-for="item in imgList2" :key="item.id">
              <a :href="item.href" rel="external nofollow">
                <img :src="item.url ? item.url : ''" class=""/>
                <span class="desc"></span>
              </a>
            </mt-swipe-item>
          </mt-swipe>
          <!--<div class="orderType">
            <ul>
              <router-link to="/myOrder">
                <li>
                  <img slot="icon" src="../../assets/pic/people_fil.png" alt="">
                  <div>我的订单</div>
                </li>
              </router-link>
              <li>
                <img slot="icon" src="../../assets/pic/cart_fil.png" alt="">
                <div>未付款</div>
              </li>
              <router-link to="/service">
                <li>
                  <img slot="icon" src="../../assets/pic/mark_fill.png" alt="">
                  <div>催发货</div>
                </li>
              </router-link>
            </ul>
          </div>-->
          <div class="shops">
            <h1 style="background: #56abf2;color: white;padding: 0;margin: 0">推荐商品</h1>
            <ul>
              <li class="good" v-for="item in goods">
                <router-link :to="{ name: '确定订单', params: { info: item,payMent:false }}">
                  <img
                    :src="item.img ? fileUrl+item.img : ''"
                    width="100%" :alt="item.goodName">
                  <div class="goodInfo">
                    <p class="goodTitle" style="-webkit-box-orient: vertical">{{item.goodName}}</p>
                    <div class="price">
                      <span class="big_price">￥{{item.price ? (item.price+'').split('.')[0] : item.price}}.</span>
                      {{item.price ? (item.price+'').split('.')[1] ? (item.price+'').split('.')[1] : '00':'' }}
                      <span style="float: right;color:#333">月销量：{{item.volume ? item.volume:'0'}}</span>
                    </div>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="mine">
        <div class="person_box">
          <div class="person_top">
            <div style="margin-top:25px;width:100%">
              <div class="Pt_left">
                <img src="../../assets/pic/person_logo.png" width="80" height="40"/>
              </div>
              <div class="Pt_middle">
                ID: <span>{{userId}}</span>
              </div>
              <div class="Pt_right">
                <mt-button class="signOut" size="large" type="primary" @click="signOut">退出登录</mt-button>
              </div>
            </div>
          </div>
          <div class="affiche">
            <div class="about">
              <div style="float: left">
                <img src="../../assets/pic/u662.png" width="25" height="25"/>
              </div>
              <div style="background: #aaa;margin: 0 10px 0 30px;border-radius: 15px">
                <span class="about01" ref="about">{{about}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="person_main">
          <ul>
            <li>
              <router-link :to="{path:'/myVip',query:{id:userId}}">
                <img src="../../assets/pic/u633.png"/>
                <div>我的团队</div>
              </router-link>
            </li>
            <li>
              <router-link to="/wallet">
                <img src="../../assets/pic/u637.png"/>
                <div>钱包</div>
              </router-link>
            </li>
            <li>
              <router-link to="/consignment">
                <img src="../../assets/pic/u267.png"/>
                <div>我的订单</div>
              </router-link>
            </li>
            <li @click="toCertification()">
              <img src="../../assets/pic/u645.png"/>
              <div>实名认证</div>
            </li>
            <li>
              <router-link to="/share">
                <img src="../../assets/pic/u649.png"/>
                <div>分享</div>
              </router-link>
            </li>
            <li>
              <router-link to="/agency">
                <img src="../../assets/pic/u653.png"/>
                <div>代理资格</div>
              </router-link>
            </li>
            <li>
              <router-link to="/updatePwd">
                <img src="../../assets/pic/u18.png"/>
                <div>修改密码</div>
              </router-link>
            </li>
            <li>
              <router-link to="/service">
                <img src="../../assets/pic/u670.png"/>
                <div>联系客服</div>
              </router-link>
            </li>
            <li @click="_alert">
              <!--<router-link to="/service">-->
                <img src="../../assets/pic/hf.png"/>
                <div>话费充值</div>
              <!--</router-link>-->
            </li>
            <li @click="_alert">
              <!--<router-link to="/service">-->
                <img src="../../assets/pic/jp.png"/>
                <div>机票预订</div>
              <!--</router-link>-->
            </li>
          </ul>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>

    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="index">
        <img slot="icon" src="../../assets/pic/homepage.png">
        首页
      </mt-tab-item>
      <mt-tab-item id="shop">
        <img slot="icon" src="../../assets/pic/cart.png">
        钱包商城
      </mt-tab-item>
      <mt-tab-item id="mine">
        <img slot="icon" src="../../assets/pic/people.png">
        个人中心
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
  import myHeader from '@/components/header'
  import {fileUrl} from "@/common/common";
  import {Toast} from 'mint-ui'

  export default {
    name: "index",
    components: {myHeader},
    data() {
      return {
        imgList1:[],
        imgList2:[],
        userId: '',
        about: '',
        selected: this.$route.query.next || 'index',
        fileUrl: fileUrl,
        items: [{
          title: '你的名字',
          href: '',
          url: require('@/assets/pic/20180122022031488.jpg')
        }],
        goods: [],
        isLogin: false
      }
    },
    watch: {
      selected: function (val, oldVal) {
        // 这里就可以通过 val 的值变更来确定
        if (val != 'mine') {
          this.loadData()
        } else {
          this.getNotice()
        }

        this.userInfo = localStorage.getItem('user');
        if (this.selected == "mine") {
          //验证是否登录
          console.log(this.userInfo);
          if (!this.userInfo) {
            this.selected = "index"
            Toast("未登录！");
          } else {
            this.userId = JSON.parse(this.userInfo).id;
            this.getUserInfo();
          }
          //获取个人信息
          if (this.userInfo) {
            this.userId = JSON.parse(this.userInfo).id
            this.member = JSON.parse(this.userInfo).member
            if (JSON.parse(this.userInfo).status) {
              this.isCertification = true;
            }
          }
        } else if (this.selected == "shop") {
          this.getAD(2)
          this.$router.push({path: '/', query: {next: 'shop'}});
        } else {
          this.getAD(1)
          this.$router.push({path: '/', query: {next: 'index'}})
        }
      }
    },
    created() {
      //验证是否登录
      let userInfo = localStorage.getItem('user');
      if (userInfo) {
        this.isLogin = true;
      }
      if(this.selected == 'mine'){
        this.userId = JSON.parse(userInfo).id
        this.getUserInfo();
        this.getNotice();
      }else{
        this.loadData();
        if(this.selected == 'index'){
          this.getAD(1);
        }else {
          this.getAD(2);
        }
      }
    },
    methods: {
      //获取轮播图
      getAD(type = 1) {
        this.$http({
          url: '/config/getAD',
          method: 'GET',
          params: {type: type}
        }).then(data => {
          if (data.errCode == 0) {
            if (type == 1) {
              this.imgList1 = [];
            }else {
              this.imgList2 = [];
            }
            data.info.map(item => {
              if (type == 1) {
                this.imgList1.push({name:item.img,url:this.fileUrl+item.img,id:item.id})
              } else {
                this.imgList2.push({name:item.img,url:this.fileUrl+item.img,id:item.id})
              }
            })
          }
        })
      },
      //前往实名认证
      toCertification(isCertification) {
        // if (!isCertification) {
          this.$router.push('/certification');
        // } else {
        //   Toast("已认证！")
        // }
      },
      //退出登录
      signOut() {
        // localStorage.removeItem('user');
        localStorage.removeItem('user')
        this.$router.push('/login');
        this.userInfo = null;
      },
      //获取公告
      getNotice() {
        this.$http({
          url: "/config/getConfig",
          method: "GET",
          params: {}
        }).then(data => {
          if (data.errCode == 0) {
            this.about = data.info.notice
          }
        }).catch(error => {
          console.log(error)
        })
      },
      //获取用户信息
      getUserInfo() {
        this.$http({
          url: "/user/getInfo",
          method: "GET",
          params: {id: this.userId}
        }).then(data => {
          if (data.errCode == 0&&data.info) {
            // this.Cookie.set("user", data.info, {expires: 1});
            localStorage.setItem('user',JSON.stringify(data.info))
          } else if (data.errCode == -1) {
            Toast(data.info);
            // localStorage.removeItem('user');
            localStorage.removeItem('user')
            this.$router.push('/login');
          } else {
            Toast(data.info);
          }
        }).catch(error => {
          console.log(error)
        })
      },
      scoll() {
        let _this = this;
        let winWidth = 0;
        if (window.innerHeight)
          winWidth = window.innerWidth;
        else if ((document.body) && (document.body.clientWidth))
          winWidth = document.body.clientWidth;
        let i = winWidth;
        setInterval(function () {
          if (i < -_this.width) {
            i = winWidth - 10;
          }
          _this.el.style.marginLeft = i + 'px';
          _this.el.style.marginLeft += 'px';
          i -= 5;
        }, 100)
      },
      //获取商品列表
      loadData() {
        let type = 1;
        if (this.selected == 'index') {
          type = 1
        } else {
          type = 3
        }
        this.$http({
          url: "/goods?type=" + type,
          method: "GET"
        }).then(data => {
          if (data) {
            this.goods = data;
          }
        }).catch(error => {

        })
      },
      //alert
      _alert(){
        Toast('正在研发对接中...')
      }
    },
    mounted() {
      this.el = this.$mount().$refs.about;
      this.width = $('.about01').width();
      this.scoll();
    }
  }
</script>

<style lang="less">
  .commerce_container {
    background: #f5f5f5;
    .mint-header {
      background: #26a2ff;
    }
    .main {
      .mint-swipe-item {
        img {
          width: 100%;
          height: 6.5rem;
          max-height: 160px;
        }
      }
      .mint-swipe {
        height: 6.5rem;
        max-height: 160px;
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
          font-size: 16px;
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
            min-height: 220px;
            box-sizing: border-box;
            padding-bottom: 2px;
            &:nth-child(2n) {
              padding-left: 2px;
            }
            &:nth-child(odd) {
              padding-right: 2px;
            }
            img {
              min-height: 150px;
            }
            .goodInfo {
              background: #fff;
              .goodTitle {
                color: #666;
                font-size: 12px;
                word-break: break-all;
                display: -webkit-box;
                /* autoprefixer: off */
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                /* autoprefixer: on */
                text-overflow: ellipsis;
                overflow: hidden;
              }
              .price {
                color: #f23030;
                padding: 8px 0;
                .big_price {
                  font-size: 14px;
                }
              }
            }
          }
        }
      }
    }
    .orderType {
      ul {
        overflow: hidden;
        text-align: center;
        li {
          width: 33.33%;
          float: left;
        }
      }
      a {
        color: #333;
      }
    }
    .about {
      white-space: nowrap;
      overflow: hidden;
      /*background: rgba(51, 51, 51, 0.6);*/
      color: #fff;
      .about01 {
        display: inline-block;
        overflow: hidden;
        clear: both;
        margin-top: 2px;
      }
      .laba {
        float: left;
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url('../../assets/pic/megaphone.png') no-repeat 100% 100%;
        background-size: cover;
        overflow: hidden;
        clear: both;
      }
    }
    .person_top {
      overflow: hidden;
      height:120px;
      div {
        float: left;
        width: 33.33%;
      }
      .Pt_left {
        box-sizing: border-box;
        padding: 15px 10px;
      }
      .Pt_middle {
        line-height: 70px;
        color: #e93b3b;
        font-weight: bolder;
        font-size: 18px;
        text-align: center;
      }
      .Pt_right {
        height: 70px;
        position: relative;
        box-sizing: border-box;
        padding-right: 10px;
        text-align: center;
        .signOut {
          padding: 0;
          width: 80%;
          position: absolute;
          top: 50%;
          right: 10px;
          margin-top: -20px;
          height: 35px;
        }
      }
    }
    .person_main {
      overflow: hidden;
      margin-bottom: 55px;
      ul {
        li {
          float: left;
          width: 33.33%;
          text-align: center;
          color: #333;
          img {
            width: 1.5rem;
            height: 1.5rem;
          }
          a {
            color: #333;
          }
        }
      }
    }
  }
</style>
