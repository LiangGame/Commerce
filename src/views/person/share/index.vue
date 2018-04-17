<template>
    <div class="share_container">
      <my-header title="邀请码"/>
      <div class="main">
        <vue-qr :bgSrc='src' :logoSrc="src2" :text="shareSrc" height="200" width="200"></vue-qr>
        <!--<p>您的邀请码</p>-->
        <div class="id"><span>您的邀请码 : {{userId}}</span></div>

        <mt-button style="margin-top:25px" size="large" class="copy" type="primary"
          v-clipboard:copy="shareSrc"
          v-clipboard:success="onSuccess"
          v-clipboard:error="onError">复制推广链接</mt-button>
        <!-- :data-clipboard-text = "https://www.baidu.com/" -->
      </div>
    </div>
</template>

<script>
  import myHeader from '@/components/header'
  import VueQr from 'vue-qr'
  import {comUrl} from "@/common/common";
  import clipboard from 'clipboard';//复制到粘贴板
  // var clipboard = new Clipboard('.copy');

  export default {
    name: "share",
    components: {myHeader,VueQr},
    data(){
      return{
        userId:'',
        src:'', // bgSrc欲嵌入的背景图地址
        src2:'', // logoSrc欲嵌入至二维码中心的 LOGO 地址
        shareSrc:comUrl+'?id='
      }
    },
    methods:{
      onSuccess(e){
        Toast('复制成功!')
      },
      onError(e){
        Toast('复制失败!')
      }
    },
    created(){
      let user = this.Cookie.get('user')
      if(user){
        this.shareSrc += JSON.parse(user).id;
        this.userId = JSON.parse(user).id;
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
          color: #26a2ff;
        }
        .id{
          font-weight: 600;
          font-size: 1.5rem;
          color: #56abf2;
        }
      }
    }
</style>
