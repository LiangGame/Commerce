<template>
  <div class="bill_container">
    <my-header title="账单"/>
    <div class="main">
      <ul class="list">
        <li class="item" v-for="item in data" @click="billInfo(item)">
          <mt-cell :title="item.time" is-link><span>{{item.sum}}</span></mt-cell>
        </li>
      </ul>
      <mt-popup v-model="popupVisible" position="right" class="mint-popup" :modal="false">
        <div class="header">
          <mt-button icon="back" @click="back"></mt-button>
          <span class="headerTitle">账单明细</span>
        </div>
        <div class="popupContent">
          <mt-cell title="出账金额"><span>{{dataInfo.sum}}</span></mt-cell>
          <div class="info">
            <ul>
              <li><span class="label">时间</span><span class="value">{{dataInfo.time}}</span></li>
              <li><span class="label">支付方式</span><span class="value">{{dataInfo.payMent | Ment}}</span></li>
              <li><span class="label">余额变动类型</span><span class="value">{{dataInfo.type | status}}</span></li>
              <li><span class="label">账户</span><span class="value">{{dataInfo.userID}}</span></li>
            </ul>
          </div>
        </div>
      </mt-popup>
    </div>
  </div>
</template>

<script>
  import myHeader from '@/components/header'
  import {timestampToTime} from "@/common/common";

  export default {
    name: "index",
    components: {myHeader},
    data() {
      return {
        popupVisible: false,
        user: this.Cookie.get('user'),
        data: null,
        dataInfo: {}
      }
    },
    methods: {
      timestampToTime: timestampToTime,
      billInfo(item) {
        if(item){
          this.popupVisible = true;
          this.dataInfo = item;
        }
      },
      back() {
        this.popupVisible = false;
      },
      getBalance() {
        this.$http({
          url: "/balance/getList",
          method: "GET",
          params: {userID: this.user.id}
        }).then(data => {
          console.log(data);
          if (data.errCode == 0) {
            this.data = data.info;
            this.data.map(item => {
              item.time = this.timestampToTime(item.time)
            })
          }
        }).catch(error => {
        })
      },
    },
    created() {
      if (this.user) {
        this.user = JSON.parse(this.user);
        this.getBalance();
      }
    },
    filters:{
      Ment(value) {
        var type = null;
        if (value == 1) {
          type = '支付宝'
        } else if (value == 2) {
          type = '微信'
        } else if (value == 3) {
          type = '银行卡'
        } else if (value == 4) {
          type = '余额'
        }
        return type;
      },
      status(value){
        // 余额变动类型：1，购买。2，代售回款。3，提成。4，提现。5，充值
        var status = null;
        if(value == 1){
          status = '购买'
        }else if(value == 2) {
          status = '代售回款'
        }else if(value == 3) {
          status = '提成'
        }else if(value == 4) {
          status = '提现'
        }else if(value == 5) {
          status = '充值'
        }
        return status
      }
    }

  }
</script>

<style lang="less">
  .bill_container {
    .main {
      .list {
        .item {
          a {
            color: #333;
          }
          .mint-cell-wrapper {
            background: none;
          }
        }
      }
      .mint-popup {
        width: 100%;
        height: 100%;
        background: #fff;
        .header {
          width: 100%;
          height: 40px;
          line-height: 40px;
          background: #de181b;
          text-align: center;
          .mint-button {
            background: transparent;
            box-shadow: none;
            color: #fff;
            float: left;
          }
          .headerTitle {
            position: absolute;
            left: 50%;
            margin-left: -20px;
            color: #fff;
          }
        }
        .popupContent {
          padding: 10px 0;
          border-bottom: solid 1px #e6e6e6;
          .mint-cell {
            width: 100%;
            border-bottom: solid 1px #e6e6e6;
            .mint-cell-wrapper {
              background: none;
              line-height: 60px;
            }
            .mint-cell-text {
              color: #666;
              font-size: 1.2rem;
            }
            .mint-cell-value {
              color: #333;
              font-size: 1.8rem;
            }
          }
          li {
            overflow: hidden;
            padding: 5px 10px;
            .label {
              color: #666;
              float: left;
              width: 100px;
              text-align: justify;
              text-align-last: justify;
            }
            .value {
              float: right;
            }
          }
        }
      }
    }
  }
</style>
