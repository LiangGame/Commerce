<template>
  <div id="app">
    <div ref="Certification" class="warning" v-if="isCertification" @click="toCertification">未进行实名，<u style="color: #e93b3b;">前往认证</u></div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        user: JSON.parse(this.Cookie.get('user')),
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
        if (this.user.status) {
          this.isCertification = false;
        } else {
          this.isCertification = true;
        }
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
      font-size: 1rem;
      padding: 5px;
      position: absolute;
      z-index: 99999999;
      top: 40px;
      background: rgba(51, 51, 51, 0.6);
    }
  }

  body {
    font-family: 'Microsoft YaHei';
    max-width: 640px;
    margin: 0 auto;
  }

  .mint-tabbar {
    max-width: 620px;
    box-sizing: border-box;
    margin: 0 auto;
  }

  .mint-button {
    font-size: 1rem;
  }

  .mint-cell-wrapper {
    font-size: 0.8rem;
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
