<template>
  <div class="share_container">
    <my-header title="邀请码"/>
    <!--<p class="warning">
          温馨提示:<br>
          钱包余额低于3500或低于1单代售订单，您将无法分享获得代言费!
        </p>-->
    <div class="top">

      <img src="../../../assets/pic/share01.png" width="100%"/>
    </div>
    <div v-if="isShare" class="middle">
      <div style="color: white;font-size: 18px;overflow: hidden">
        <div style="text-align: center;width: 50%;float: left">
          <vue-qr :bgSrc='src' :logoSrc="src2" :text="shareSrc" height="100" width="100" :size="90" :margin="0"
                  style="display: inline-block;"></vue-qr>
          <p>您的邀请码:{{userId}}</p>
        </div>
        <div style="text-align: center;width: 50%;float: left">
          <mt-button style="margin-top:25px;background: #48912c" size="large" class="copy" type="primary"
                     v-clipboard:copy="shareSrc"
                     v-clipboard:success="onSuccess"
                     v-clipboard:error="onError">复制推广链接
          </mt-button>
        </div>
      </div>
    </div>
    <div v-if="!isShare" class="middle noShare">
      <h3>您的钱包余额低于3500或者是没代售订单。</h3>
      <div class="btn_container">
        <mt-button size="large" class="copy" type="danger" @click="toPay">去购买</mt-button>
        <mt-button size="large" class="copy" type="primary" @click="toCz">去充值</mt-button>
      </div>
    </div>
    <div class="bottom">
      <img src="../../../assets/pic/share02.png" width="100%"/>
    </div>
  </div>
</template>

<script>
  import myHeader from '@/components/header'
  import VueQr from 'vue-qr'
  import {comUrl} from "@/common/common";
  import {Toast} from 'mint-ui'

  export default {
    name: "share",
    components: {myHeader, VueQr},
    data() {
      return {
        isShare: false,
        userId: '',
        src: '', // bgSrc欲嵌入的背景图地址
        src2: '', // logoSrc欲嵌入至二维码中心的 LOGO 地址
        shareSrc: comUrl + '?id='
      }
    },
    methods: {
      onSuccess(e) {
        Toast('复制成功!')
      },
      onError(e) {
        Toast('该浏览器不支持一键复制功能;请手动复制!')
      },
      //获取分享资格
      getShare() {
        this.$http({
          url: "/user/getShare",
          method: "GET",
          params: {id: this.userId}
        }).then(data => {
          console.log(data);
          if (data.errCode == 0) {
            this.isShare = data.info
          }
        }).catch(error => {
          console.log(error)
        })
      },
      //前往首页
      toPay() {
        this.$router.push('/');
      },
      //前往充值页面
      toCz() {
        this.$router.push('/recharge');
      }
    },
    created() {
      let user = this.Cookie.get('user')
      if (user) {
        this.shareSrc += JSON.parse(user).id;
        this.userId = JSON.parse(user).id;
        console.log(this.shareSrc);
      }
      this.getShare()
    }
  }
</script>

<style lang="less" scoped>
  .share_container {
    .noShare {
      overflow: hidden;
      margin: 0 auto;
      h3 {
        text-align: center;
        color: #fff;
        font-size: 1.5rem;
      }
      .btn_container{
        overflow: hidden;
        .mint-button{
          width: 49%;
          float: left;
          margin-top: 10px;
          &:first-child{
            margin-right: 5px;
          }
        }
      }
    }
    .middle {
      background: url("../../../assets/pic/share03.png");
      padding: 0 20px;
    }
  }
</style>
