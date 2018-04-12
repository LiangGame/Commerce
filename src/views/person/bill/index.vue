<template>
    <div class="bill_container">
      <my-header title="账单"/>
      <div class="main">
        <ul class="list">
            <li class="item" @click="billInfo"><mt-cell title="2018-04-12 12:00:00" is-link ><span>-1.00</span></mt-cell></li>
            <li class="item" @click="billInfo"><mt-cell title="2018-04-12 12:00:00" is-link ><span>-2.00</span></mt-cell></li>
        </ul>
        <mt-popup v-model="popupVisible" position="right" class="mint-popup" :modal="false">
            <div class="header">
                <mt-button icon="back" @click="back"></mt-button>
                <span class="headerTitle">账单明细</span>
            </div>
            <div class="popupContent">
                <mt-cell title="出账金额"><span>2.00</span></mt-cell>
                <div class="info">
                    <ul>
                        <li><span class="label">类型</span><span class="value">支出</span></li>
                        <li><span class="label">时间</span><span class="value">2018-04-12 12:00:00</span></li>
                        <li><span class="label">交易单号</span><span class="value">1321545461323111133</span></li>
                        <li><span class="label">剩余零钱</span><span class="value">99.99</span></li>
                        <li><span class="label">备注</span><span class="value">防守打法</span></li>
                    </ul>
                </div>
            </div>
        </mt-popup>
      </div>
    </div>
</template>

<script>
  import myHeader from '@/components/header'
  export default {
    name: "index",
    components: {myHeader},
    data(){
        return{
            popupVisible: false,
        }
    },
    methods:{
        billInfo(){
            this.popupVisible = true;
        },
        back(){
            this.popupVisible = false;
        }
    }

  }
</script>

<style lang="less">
    .bill_container {
      .main{
        .list{
            .item{
                a{
                    color: #333;
                }
                .mint-cell-wrapper{
                    background: none;
                }
            }
        }
        .mint-popup {
            width: 100%;
            height: 100%;
            background: #fff;
            .header{
                width: 100%;
                height: 40px;
                line-height: 40px;
                background: #de181b;
                text-align: center;
                .mint-button{
                    background: transparent;
                    box-shadow: none;
                    color: #fff;
                    float: left;
                }
                .headerTitle{
                    position: absolute;
                    left: 50%;
                    margin-left: -20px;
                    color: #fff;
                }
            }
            .popupContent{
                padding: 10px 0;
                border-bottom: solid 1px #e6e6e6;
                .mint-cell{
                    width: 100%;
                    border-bottom: solid 1px #e6e6e6;
                    .mint-cell-wrapper{
                        background: none;
                        line-height: 60px;
                    }
                    .mint-cell-text{
                        color: #666;
                        font-size: 1.2rem;
                    }
                    .mint-cell-value{
                        color: #333;
                        font-size: 1.8rem;
                    }
                }
                li{
                    overflow: hidden;
                    padding: 5px 10px;
                    .label{
                        color: #666;
                        float: left;
                        width: 56px;
                        text-align: justify;
                        text-align-last: justify;
                    }
                    .value{
                        float: right;
                    }
                }
            }
        }
      }
    }
</style>
