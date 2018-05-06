<template>
    <div class="myVip_container">
      <mt-header title="我的会员">
        <router-link :to="{path:'/',query:{next:'mine'}}" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="myVip_main">
        <div class="title">
          <span style="margin-right: 20px">会员(12)</span>
          <span class="vipType" style="background: #e93b3b"></span><span style="margin-right: 20px">(8)</span>
          <span class="vipType" style="background: #56abf2"></span><span style="margin-right: 20px">(2)</span>
          <span class="vipType" style="background: #5a5a5a;"></span><span style="margin-right: 20px">(2)</span>
        </div>
        <div class="list_box">
          <div class="first_vip">
            <h3><img slot="icon" src="../../../src/assets/pic/group_fill.png" alt="">一级会员(8)</h3>
            <ul>
              <li>
                <div class="left fl">
                  <span class="vipType" style="background: #e93b3b"></span>
                </div>
                <div class="right fl">
                  <p>张三</p>
                  <p>ID:88888</p>
                </div>
              </li>
              <li>
                <div class="left fl">
                  <span class="vipType" style="background: #e93b3b"></span>
                </div>
                <div class="right fl">
                  <p>张三</p>
                  <p>ID:88888</p>
                </div>
              </li>
              <li>
                <div class="left fl">
                  <span class="vipType" style="background: #e93b3b"></span>
                </div>
                <div class="right fl">
                  <p>张三</p>
                  <p>ID:88888</p>
                </div>
              </li>
              <li>
                <div class="left fl">
                  <span class="vipType" style="background: #e93b3b"></span>
                </div>
                <div class="right fl">
                  <p>张三</p>
                  <p>ID:88888</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="second_vip">
            <h3><img slot="icon" src="../../../src/assets/pic/group_fill.png" alt="">二级会员(8)</h3>
            <ul>
              <li>
                <div class="left fl">
                  <span class="vipType" style="background: #56abf2"></span>
                </div>
                <div class="right fl">
                  <p>张三</p>
                  <p>ID:88888</p>
                </div>
              </li>
              <li>
                <div class="left fl">
                  <span class="vipType" style="background: #56abf2"></span>
                </div>
                <div class="right fl">
                  <p>张三</p>
                  <p>ID:88888</p>
                </div>
              </li>
              <li>
                <div class="left fl">
                  <span class="vipType" style="background: #e93b3b"></span>
                </div>
                <div class="right fl">
                  <p>张三</p>
                  <p>ID:88888</p>
                </div>
              </li>
              <li>
                <div class="left fl">
                  <span class="vipType" style="background: #5a5a5a"></span>
                </div>
                <div class="right fl">
                  <p>张三</p>
                  <p>ID:88888</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "myVip"
    }
</script>

<style lang="less">
    .myVip_container {
      .fl{
        float: left;
      }
      .vipType{
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-top: 13px;
        margin-right: 5px;
      }
      .myVip_main{
        .title{
          height: 45px;
          line-height: 45px;
          padding: 0 10px;
          border-bottom: solid 1px #e6e6e6;
          span{
            float: left;
          }
        }
        .list_box{
          padding: 10px;
          h3{
            color: #666;
            margin-bottom: 8px;
            img{
              width: 32px;
              height: 32px;
            }
          }
          ul{
            overflow: hidden;
            margin-bottom: 8px;
            li{
              width: 33.33%;
              overflow: hidden;
              float: left;
              margin: 5px 0;
            }
          }
          .first_vip{
            overflow: hidden;
          }
          .second_vip{
            overflow: hidden;
          }
        }
      }
    }
</style>
