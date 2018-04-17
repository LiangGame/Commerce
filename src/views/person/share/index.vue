<template>
  <div class="share_container">
    <my-header title="邀请码"/>
    <div class="main">
      <div v-if="isShare">
        <vue-qr :bgSrc='src' :logoSrc="src2" :text="shareSrc" height="200" width="200"></vue-qr>
        <!--<p>您的邀请码</p>-->
        <div class="id"><span>您的邀请码 : {{userId}}</span></div>

        <mt-button style="margin-top:25px" size="large" class="copy" type="primary"
                   v-clipboard:copy="shareSrc"
                   v-clipboard:success="onSuccess"
                   v-clipboard:error="onError">复制推广链接
        </mt-button>
        <p class="warning">
          温馨提示:<br>
          钱包余额低于3500或低于1单代售订单，您将无法分享获得代言费!
        </p>
      </div>
      <div v-if="!isShare" class="noShare">
        <h3>您的钱包余额低于3500或者是没代售订单。</h3>
        <div class="btn_container">
          <mt-button style="margin-top:25px" size="large" class="copy" type="primary" @click="toPay">去购买</mt-button>
          <mt-button style="margin-top:25px" size="large" class="copy" type="primary" @click="toCz">去充值</mt-button>
        </div>
      </div>
      <!-- :data-clipboard-text = "https://www.baidu.com/" -->
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
        Toast('复制失败!')
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
    .main {
      text-align: center;
      position: absolute;
      padding: 0 10px;
      p {
        color: #26a2ff;
      }
      .id {
        font-weight: 600;
        font-size: 1.5rem;
        color: #56abf2;
      }
      .warning {
        font-size: 1rem;
        padding: 20px 10px;
        color: #e93b3b;
        text-align: left;
      }
      .btn_container {

      }
      .noShare{
        margin: 0 auto;
        margin-top: 30%;
        h3{
          color: #e93b3b;
        }
      }
    }
  }
</style>
