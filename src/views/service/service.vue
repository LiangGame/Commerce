<template>
  <div class="service_container">
    <mt-header title="联系客服">
      <router-link :to="{path:'/',query:{next:'mine'}}" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div style="padding: 10px">
      <div style="margin-top: 20px;line-height: 45px;text-align: center">
      <span style="margin-right: 20px">
        <img src="../../assets/pic/u308.png" height="45" width="45"/>
      </span>
        <span style="font-weight: 600;font-size: 16px;border-left: solid 2px #333;padding-left: 20px">
        微信专属客服
      </span>
      </div>
      <div style="text-align: center;margin: 20px 0">
        <img src="../../assets/pic/money.png" style="width: 5rem;height: 5rem"/>
        <p style="font-weight: 600;font-size: 16px;margin-top: 20px">打开微信扫一扫添加为好友</p>
      </div>
      <mt-button type="primary" size="large">0851-85945546</mt-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "service",
    data() {
      return {}
    }
  }
</script>

<style lang="less" scoped>
  .service_container {

  }
</style>
