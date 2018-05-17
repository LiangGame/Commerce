<template>
  <div class="myVip_container">
    <mt-header title="我的会员">
      <router-link :to="{path:'/',query:{next:'mine'}}" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button slot="right" @click="getInfo"><span style="font-size: 20px;text-align: right">？</span></mt-button>
    </mt-header>
    <div class="myVip_main">
      <div class="title">
        <div style="overflow:hidden;line-height:48px">
          <span style="margin-right: 20px">会员({{member.level1Count+member.level2Count}})</span>
          <span class="vipType" style="background: #e93b3b"></span><span style="margin-right: 20px">({{member.type1}})</span>
          <span class="vipType" style="background: #56abf2"></span><span style="margin-right: 20px">({{member.type2}})</span>
          <span class="vipType" style="background: #5a5a5a;"></span><span style="margin-right: 20px">({{member.type3}})</span>
        </div>
        <div style="display:block;margin-top:-10px">有效代售单量：{{orderCount}}</div>
      </div>
      <div class="list_box">
        <div class="first_vip">
          <h3><img slot="icon" src="../../../src/assets/pic/group_fill.png" alt="">一级会员({{member.level1Count}})</h3>
          <ul>
            <li v-for="item in member.level1Res">
              <div class="left fl">
                <p class="vipType" style="background: #e93b3b" v-if="item.isAgent"></p>
                <p class="vipType" style="background: #5a5a5a" v-if="item.isAgent == 0&&item.orderCount == 0"></p>
                <p class="vipType" style="background: #56abf2" v-if="item.orderCount > 0"></p>
              </div>
              <div class="right fl">
                <p>{{item.realName ? item.realName:'未实名'}} x {{item.orderCount}}</p>
                <p>ID:{{item.id}}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="second_vip">
          <h3><img slot="icon" src="../../../src/assets/pic/group_fill.png" alt="">二级会员({{member.level2Count}})</h3>
          <ul>
            <li v-for="item in member.level2Res">
              <div class="left fl">
                <p class="vipType" style="background: #e93b3b" v-if="item.isAgent"></p>
                <p class="vipType" style="background: #5a5a5a" v-if="item.isAgent == 0&&item.orderCount == 0"></p>
                <p class="vipType" style="background: #56abf2" v-if="item.orderCount > 0"></p>
              </div>
              <div class="right fl">
                <p>{{item.realName ? item.realName:'未实名'}} x {{item.orderCount}}</p>
                <p>ID:{{item.id}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <mt-popup v-model="popupVisible" class="popup">
      <p><span class="red"></span>代表代理会员</p>
      <p><span class="blue"></span>代表代售会员</p>
      <p><span class="black"></span>代表普通会员</p>
    </mt-popup>
  </div>
</template>

<script>
  export default {
    name: "myVip",
    data() {
      return {
        userID:this.$route.query.id,
        member:{},
        popupVisible:false,
        orderCount:0
      }
    },
    methods:{
      //获取会员数据
      getMember(userID){
        this.$http({
          url: "/user/getMember",
          method: "GET",
          params: {id:userID}
        }).then(data =>{
          if(data.errCode == 0){
            this.member = data.info;
            data.info.level1Res.map(item => {
              this.orderCount += item.orderCount
            })
            data.info.level2Res.map(item => {
              this.orderCount += item.orderCount
            })
          }
        })
      },
      //弹窗
      getInfo(){
        this.popupVisible = true;
      }
    },
    created(){
      this.getMember(this.userID);
    }
  }
</script>

<style lang="less">
  .myVip_container {
    .fl {
      float: left;
    }
    .vipType {
      display: block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin-top: 13px;
      margin-right: 5px;
    }
    .myVip_main {
      .title {
        height: 65px;
        // line-height: 45px;
        padding: 0 10px;
        border-bottom: solid 1px #e6e6e6;
        span {
          float: left;
        }
      }
      .list_box {
        padding: 10px;
        h3 {
          color: #666;
          margin-bottom: 8px;
          img {
            width: 32px;
            height: 32px;
          }
        }
        ul {
          overflow: hidden;
          margin-bottom: 8px;
          li {
            height: 46px;
            width: 33.33%;
            overflow: hidden;
            float: left;
            margin: 5px 0;
            .left{
              margin-right: 5px;
              .vipType {
                display: block;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                margin-top: 0px;
                margin-right: 0px;
              }
            }
          }
        }
        .first_vip {
          overflow: hidden;
        }
        .second_vip {
          overflow: hidden;
        }
      }
    }
    .popup{
      width: 245px;
      padding: 20px 10px;
      border-radius: 10px;
      p{
        height: 35px;
        line-height: 35px;
      }
      .red,.blue,.black{
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        float: left;
        margin-top: 8px;
        margin-right: 10px;
      }
      .red{
        background: #e93b3b;
      }
      .blue{
        background: #56abf2;
      }
      .black{
        background: #333;
      }
    }
  }
</style>
