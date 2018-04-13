<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
  @import "./style/normalize.css";
  @import "./style/common.less";

  body{
    font-family: 'Microsoft YaHei';
    max-width: 640px;
    margin: 0 auto;
  }
  .mint-tabbar{
    max-width: 620px;
    box-sizing: border-box;
    margin: 0 auto;
  }
  .mint-button{
    font-size: 1rem;
  }
  .mint-cell-wrapper{
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
