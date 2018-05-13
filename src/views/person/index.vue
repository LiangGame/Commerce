<template>
  <div class="person_container">
    <my-header title="个人中心"/>
    <div class="about">
      <!--<span class="about01"><span class="laba"></span> {{about}}</span>-->
      <span class="about01" ref="about"><span class="laba"></span>{{about}}</span>
    </div>
    <mt-cell title="我的ID"><span>{{userId}}</span></mt-cell>
    <mt-cell title="我的会员"><span>{{member}}</span></mt-cell>
    <router-link to="/wallet">
      <mt-cell title="钱包" is-link></mt-cell>
    </router-link>
    <router-link to="/consignment">
      <mt-cell title="我的寄售" is-link></mt-cell>
    </router-link>
    <!--<router-link to="/certification">-->
    <p @click="toCertification(JSON.parse(userInfo).status)">
      <mt-cell title="实名认证" is-link>
        <span v-if="isCertification">已认证</span>
      </mt-cell>
    </p>

    <!--</router-link>-->
    <router-link to="/share">
      <mt-cell title="分享" is-link></mt-cell>
    </router-link>
    <router-link to="/updatePwd">
      <mt-cell title="修改密码" is-link></mt-cell>
    </router-link>
    <div class="exit">
      <mt-button class="confirm" size="large" type="primary" @click="signOut">退出登录</mt-button>
    </div>
  </div>
</template>

<script>
  import myHeader from '@/components/header'
  import {Toast} from 'mint-ui'

  export default {
    name: "index",
    components: {myHeader},
    data() {
      return {
        userInfo: null,
        isCertification: false,
        userId: '',
        member: null,
        el: '',
        about: '',
        width: ''
      }
    },
    mounted() {
      this.el = this.$mount().$refs.about;
    },
    updated() {
      this.width = $('.about01').width();
      this.scoll();
    },
    created() {
      //验证是否登录
      this.userInfo = localStorage.getItem('user');
      if (!this.userInfo) {
        this.$router.push('/');
      }
      //获取个人信息
      if (this.userInfo) {
        this.userId = JSON.parse(this.userInfo).id
        this.member = JSON.parse(this.userInfo).member
        if (JSON.parse(this.userInfo).status) {
          this.isCertification = true;
        }
      }
      this.getUserInfo();
      this.getNotice();
      // this.toCertification(JSON.parse(userInfo).status);
    },
    methods: {
      scoll(){
        let _this = this;
        let winWidth = 0;
        if (window.innerHeight)
          winWidth = window.innerWidth;
        else if ((document.body) && (document.body.clientWidth))
          winWidth = document.body.clientWidth;
        let i = winWidth;
        setInterval(function () {
          i -= 5;
          if (i < -_this.width) {
            i = winWidth;
          }
          _this.el.style.marginLeft = i + 'px';
          _this.el.style.marginLeft += 'px';
        }, 100)
      },
      //退出登录
      signOut() {
        localStorage.removeItem('user');
        this.$router.push('/login');
      },
      //获取用户信息
      getUserInfo() {
        this.$http({
          url: "/user/getInfo",
          method: "GET",
          params: {id: this.userId}
        }).then(data => {
          if (data.errCode == 0) {
            // this.Cookie.set("user", data.info, {expires: 1});
            localStorage.setItem('user',JSON.stringify(data.info))
          } else if (data.errCode == -1) {
            Toast(data.info);
            localStorage.removeItem('user');
            this.$router.push('/login');
          } else {
            Toast(data.info);
          }
        }).catch(error => {
          console.log(error)
        })
      },
      //前往实名认证
      toCertification(isCertification) {
        if (!isCertification) {
          this.$router.push('/certification');
        } else {

        }
      },
      //获取公告
      getNotice() {
        this.$http({
          url: "/config/getNotice",
          method: "GET",
          params: {}
        }).then(data => {
          if (data.errCode == 0) {
            this.about = data.info.info
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>

<style lang="less">
  .person_container {
    .about {
      white-space: nowrap;
      overflow: hidden;
      background: rgba(51, 51, 51, 0.6);
      color: #fff;
      .about01 {
        display: inline-block;
        overflow: hidden;
        clear: both;
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
    .mint-cell {
      background: none;
      .mint-cell-wrapper {
        background: none;
      }
      border-bottom: solid 1px #e6e6e6;
      .mint-cell-text {
        color: #333;
      }
    }
    .exit {
      margin-top: 50px;
      padding: 0 10px;
    }
  }
</style>
