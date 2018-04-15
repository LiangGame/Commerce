<template>
    <div class="share_container">
      <my-header title="邀请码"/>
      <div class="main">
        <vue-qr :bgSrc='src' :logoSrc="src2" :text="shareSrc" height="200" width="200"></vue-qr>
        <p>您的邀请码</p>
        <div class="id"><span>您的ID : 123456</span></div>
      </div>
    </div>
</template>

<script>
  import myHeader from '@/components/header'
  import VueQr from 'vue-qr'
  import {comUrl} from "@/common/common";

  export default {
    name: "share",
    components: {myHeader,VueQr},
    data(){
      return{
        src:'', // bgSrc欲嵌入的背景图地址
        src2:'', // logoSrc欲嵌入至二维码中心的 LOGO 地址
        shareSrc:comUrl+'?id='
      }
    },
    created(){
      let user = this.Cookie.get('user')
      if(user){
        this.shareSrc += JSON.parse(user).id;
        console.log(this.shareSrc);
      }
    }
  }
</script>

<style lang="less" scoped>
    .share_container {
      .main{
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -125px;
        margin-left: -100px;
        p{
          color: #de181b;
        }
        .id{
          font-weight: 600;
          font-size: 1.5rem;
          color: #56abf2;
        }
      }
    }
</style>
