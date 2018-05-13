<template>
  <div class="agency_container">
    <mt-header title="加入代理">
      <router-link :to="{path:'/',query:{next:'mine'}}" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="agency_box">
      <img src="../../assets/pic/u985.png"/>
      <p class="title">推广专属</p>
      <p class="price">￥3500.00</p>
      <mt-button class="join" size="large" type="primary" @click="join()"
                 v-if="(new Date(this.user.agentEndTime)).getTime() < (new Date()).getTime()">马上加入
      </mt-button>
      <div v-else>
        <mt-cell title="有效期至" :value="user.agentEndTime"></mt-cell>
        <mt-cell title="自动续费" >
          <mt-switch v-model="status" @change="handleChange"></mt-switch>
        </mt-cell>
      </div>
    </div>
    <!--<div class="warning">
      <p class="title">
        温馨提示：
      </p>
      <p class="content">
        加入代理后将冻结代理专属3500元，30天后操作解冻提现。提现后将失去代理资格
      </p>
    </div>-->
  </div>
</template>

<script>
  import {MessageBox, Toast} from 'mint-ui';
  import {timestampToTime} from '@/common/common.js'

  export default {
    name: "agency",
    data() {
      return {
        user: {},
        status: false
      }
    },
    methods: {
      timestampToTime: timestampToTime,
      join() {
        MessageBox({
          title: '温馨提示',
          message: '首次成为代理，可享受“代言费”奖励及全国市场推广奖励，每3个月需重新激活，是否确认购买？',
          showCancelButton: true
        }).then(action => {
          if (action == 'confirm') {
            this.$router.push({path: '/agencyPay'});
          } else {
            return false
          }
        });
      },
      handleChange(){
        let _status = 0;
        let title = '开启';
        if(this.status){
          _status = 1;
          title = '开启';
        }else {
          _status = -1;
          title = '取消';
        }
        MessageBox({
          title: '温馨提示',
          message: '是否'+title+'自动续费？',
          showCancelButton: true
        }).then(action => {
          if (action == 'confirm') {
            this.$http({
              url: "/user/changeAgentAuto",
              method: "GET",
              params: {id: this.user.id,status:_status}
            }).then(data => {
              if(data.errCode == 0){
                if(this.status){
                  Toast('开启自动续费！')
                }else {
                  Toast('关闭自动续费！')
                }
              }else {
                Toast(data.info)
              }
            })
          } else {
            if(this.status){
              this.status = false;
            }else {
              this.status = true;
            }
            return false
          }
        });
      }
    },
    created() {
      let _user = localStorage.getItem('user');
      if (_user) {
        this.user = JSON.parse(_user);
        if(this.user.agentEndTime)
          this.user.agentEndTime = this.timestampToTime(this.user.agentEndTime);

        if(this.user.isAuto == 1){
          this.status = true;
        }else {
          this.status = false;
        }
      }

    }
  }
</script>

<style lang="less">
  .agency_container {
    .mint-cell{
      margin: 0 -10px;
      &:first-child{
        border-bottom: solid 1px #e6e6e6;
      }
    }
    .mint-cell-title {
      text-align: left;
    }
    .agency_box {
      padding: 10px;
      text-align: center;
      .title {
        margin: 10px auto;
        font-size: 18px;
      }
      .price {
        color: #e93b3b;
        font-size: 18px;
        font-weight: 600;
        margin: 10px auto;
      }
    }
    .warning {
      .title {
        background: #E2E7EA;
        height: 35px;
        line-height: 35px;
        color: #333;
        padding-left: 10px;
      }
      .content {
        padding: 10px;
        font-size: 18px;
        color: #e93b3b;
        font-weight: 600;
        line-height: 0.8rem;
      }
    }
  }
</style>
