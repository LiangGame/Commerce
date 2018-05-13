<template>
  <div id="app">
    <!--<div ref="Certification" class="warning" v-if="isCertification" @click="toCertification">未进行实名，<u style="color: #26a2ff;">前往认证</u></div>-->
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        user: localStorage.getItem('user'),
        isCertification: true
      }
    },
    methods: {
      toCertification() {
        this.$router.push({path: '/certification'});
        this.isCertification = false;
      }
    },
    created() {
      if (this.user) {
        if (JSON.parse(this.user).status) {
          this.isCertification = false;
        } else {
          this.isCertification = true;
        }
      }else {
        this.isCertification = false;
      }
      // if (this.$route.path == '/certification') {
      //   this.isCertification = false;
      // } else {
      //   this.isCertification = true;
      // }
    }
  }
</script>

<style lang="less">
  @import "./style/normalize.css";
  @import "./style/common.less";

  #app {
    & > .warning {
      width: 100%;
      max-width: 630px;
      text-align: center;
      color: #fff;
      font-size: 18px;
      padding: 5px;
      position: absolute;
      z-index: 99999999;
      top: 40px;
      background: rgba(51, 51, 51, 0.6);
    }
    margin-bottom: 55px;
  }

  body {
    font-family: 'Microsoft YaHei';
    max-width: 640px;
    margin: 0 auto;
    background: #f6f6f6;
  }
  .mint-tabbar {
    max-width: 620px;
    box-sizing: border-box;
    margin: 0 auto;
  }

  .mint-button {
    font-size: 14px;
  }

  .mint-cell-wrapper {
    font-size: 12px;
  }
  .mint-toast{
    /*position: relative;*/
    z-index: 999999999 !important;
  }
  .mint-indicator{
    position: relative;
    z-index: 999999999;
  }
  .mint-tabbar{
    position: fixed;
  }
  /*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
  /*}*/
</style>
