<template>
  <div class="header_container">
    <mt-header :title="title">
      <!--<router-link to="/" slot="left">-->
        <mt-button icon="back" @click="back" slot="left"></mt-button>
      <!--</router-link>-->
    </mt-header>
  </div>
</template>

<script>
  export default {
    name: "index",
    props: ['title'],
    methods:{
      back(){
        history.back(-1);
      }
    }
  }
</script>

<style lang="less" scoped>
  .header_container {
    .mint-header {
      background: #de181b;
    }
  }
</style>
