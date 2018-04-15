<template>
    <div class="person_container">
      <my-header title="个人中心"/>
      <mt-cell title="我的ID"><span>{{userId}}</span></mt-cell>
      <mt-cell title="我的会员"><span>{{member}}</span></mt-cell>
      <router-link to="/updatePwd"><mt-cell title="修改密码" is-link ></mt-cell></router-link>
      <router-link to="/wallet"><mt-cell title="钱包" is-link ></mt-cell></router-link>
      <router-link to="/consignment"><mt-cell title="我的寄售" is-link ></mt-cell></router-link>
      <!--<router-link to="/certification">-->
      <p @click="toCertification(JSON.parse(userInfo).status)">
        <mt-cell title="实名认证" is-link>
          <span v-if="isCertification">已认证</span>
        </mt-cell>
      </p>

      <!--</router-link>-->
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
        userInfo:null,
        isCertification:false,
        userId:'',
        member:null
      }
    },
    created(){
      //验证是否登录
      this.userInfo = this.Cookie.get('user');
      if (!this.userInfo) {
        this.$router.push('/');
      }
      //获取个人信息
      if(this.userInfo){
        this.userId = JSON.parse(this.userInfo).id
        this.member = JSON.parse(this.userInfo).member
        if(JSON.parse(this.userInfo).status){
          this.isCertification = true;
        }
      }
      this.getUserInfo();
      // this.toCertification(JSON.parse(userInfo).status);
    },
    methods:{
      //退出登录
      signOut(){
        this.Cookie.remove('user');
        this.$router.push('/login');
      },
      //获取用户信息
      getUserInfo(){
        this.$http({
          url: "/user/getInfo",
          method: "GET",
          params: {id: this.userId}
        }).then(data => {
          console.log(data);
          if (data.errCode == 0) {
            this.Cookie.set("user", data.info, { expires: 1 });
          } else {
            Toast(data.info);
          }
        }).catch(error => {
          console.log(error)
        })
      },
      //前往实名认证
      toCertification(isCertification){
        console.log(isCertification);
        if(!isCertification){
          this.$router.push('/certification');
        }else {

        }
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
