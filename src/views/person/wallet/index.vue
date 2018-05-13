<template>
  <div class="wallet_container">
    <my-header title="钱包"/>
    <div class="main">
      <img :src="require('@/assets/pic/u807.png')" width="100" height="100" alt="">
      <router-link to="/bill">
        <h1 class=money>￥<span>{{money}}</span></h1>
        <p class="hint">点击余额查看明细</p>
      </router-link>
      <!--@click="info"-->
      <h2 class=money >迈达币：￥
        <span>{{rewardPoint}}
        <!--<span style="display: inline-block;width: 25px;height: 25px;line-height: 25px;border-radius: 50%;background: #56abf2;color: #ffff00">?</span>-->
      </span>
      </h2>
      <mt-button class="confirm" size="large" type="primary" @click="toRecharge">充值</mt-button>
      <mt-button class="confirm" size="large" type="default" @click="toWithdrawals">提现</mt-button>
    </div>
    <mt-popup v-model="popupVisible" class="popup">
      **************************
      **************************
    </mt-popup>
  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui';
  import myHeader from '@/components/header';

  export default {
    name: "index",
    components: {myHeader},
    data() {
      return {
        rewardPoint: '0.00',
        money: '0.00',
        user: localStorage.getItem('user'),
        popupVisible: false
      }
    },
    methods: {
      //充值
      toRecharge() {
        if (this.user.status) {
          this.$router.push({path: '/recharge'});
        } else {
          MessageBox({
            title: '提示',
            message: '未实名,是否前往认证?',
            showCancelButton: true
          }).then(action => {
            if (action == 'confirm') {
              this.$router.push({path: '/certification'});
            }
          });
        }
      },
      //提现
      toWithdrawals() {
        if (this.user.status) {
          this.$router.push({path: '/withdrawals'});
        } else {
          MessageBox({
            title: '提示',
            message: '未实名,是否前往认证?',
            showCancelButton: true
          }).then(action => {
            if (action == 'confirm') {
              this.$router.push({path: '/certification'});
            }
          });
        }
      },
      //获取用户信息
      getUserInfo() {
        this.$http({
          url: "/user/getInfo",
          method: "GET",
          params: {id: this.user.id}
        }).then(data => {
          if (data.errCode == 0) {
            this.money = data.info.balance;
            this.rewardPoint = data.info.rewardPoint;
          } else {
            if (this.user) {
              this.user = JSON.parse(this.user);
              this.money = this.user.balance;
            }
            // this.money = JSON.parse(localStorage.getItem('user')).balance
          }
        }).catch(error => {
          console.log(error)
        })
      },
      info() {
        this.popupVisible = true;
      }
    },
    created() {
      if (localStorage.getItem('user')) {
        this.user = JSON.parse(localStorage.getItem('user'));
      }
      this.getUserInfo();
    }

  }
</script>

<style lang="less">
  .wallet_container {
    .main {
      padding: 30px 10px 0 10px;
      text-align: center;
      h2 {
        font-weight: 500;
        color: #333;
        padding: 10px 0;
      }
      .money {
        margin: 0;
        color: #333;
      }
      .hint {
        padding: 10px 0;
        color: #666;
      }
      .mint-button {
        margin: 15px 0;
      }
    }
    .popup {
      width: 245px;
      padding: 20px 10px;
      border-radius: 10px;
    }
  }
</style>
