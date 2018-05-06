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
        if(this.title == '充值'|| this.title == '提现'){
          this.$router.push('/wallet');
        }else if(this.title == '钱包' || this.title=='邀请码') {
          this.$router.push({name:'首页',query:{next:'mine'}});
        }else if(this.title == '个人中心') {
          this.$router.push('/');
        }else {
          history.back(-1);
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .header_container {
    .mint-header {
      /*background: #26a2ff;*/
    }
  }
</style>
