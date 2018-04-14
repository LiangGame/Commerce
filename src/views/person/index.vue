<template>
    <div class="person_container">
      <my-header title="个人中心"/>
      <mt-cell title="我的ID"><span>{{userId}}</span></mt-cell>
      <mt-cell title="我的会员"><span>99</span></mt-cell>
      <router-link to="/updatePwd"><mt-cell title="修改密码" is-link ></mt-cell></router-link>
      <router-link to="/wallet"><mt-cell title="钱包" is-link ></mt-cell></router-link>
      <router-link to="/consignment"><mt-cell title="我的寄售" is-link ></mt-cell></router-link>
      <router-link to="/certification"><mt-cell title="实名认证" is-link ></mt-cell></router-link>
      <router-link to="/share"><mt-cell title="分享" is-link ></mt-cell></router-link>
      <div class="exit">
        <mt-button class="confirm" size="large" type="danger" @click="signOut">退出登录</mt-button>
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
        userId:''
      }
    },
    created(){
      //验证是否登录
      let userInfo = this.Cookie.get('user');
      if (!userInfo) {
        this.$router.push('/');
      }
      //获取个人信息
      console.log(JSON.stringify(userInfo));
      this.userId = JSON.parse(userInfo).id
    },
    methods:{
      //退出登录
      signOut(){
        this.Cookie.remove('user');
        this.$router.push('/login');
      }
    }
  }
</script>

<style lang="less">
    .person_container {
      .mint-cell{
        background: none;
        .mint-cell-wrapper{
          background: none;
        }
        border-bottom: solid 1px #e6e6e6;
        .mint-cell-text{
          color: #333;
        }
      }
      .exit{
        margin-top: 50px;
        padding: 0 10px;
      }
    }
</style>
