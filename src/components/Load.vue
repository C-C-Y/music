<template>
  <div>
    <div class="load"
         v-if="Load">
      <div class="bgTop"></div>
      <div class="content">
        <img src="../assets/img/logo.jpg"
             class="logo">
        <div class="in">
          <input type="text"
                 v-model="phone"
                 placeholder="手机号"
                 class="phone text">
        </div>
        <div class="in">
          <input type="password"
                 v-model="password"
                 placeholder="密码"
                 class="password text">
        </div>
        <div class="loadText"
             @click="userLoad()">
          <span>登录</span>
        </div>
        <div class="test"
             @click="jump">
          <span>测试</span>
        </div>
        <span class="loadInfo"
              v-show="infoShow">{{loadInfo}}</span>
      </div>
    </div>
    <div v-else
         class="hasLoad"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import api from "@/api/api";
import { mapMutations, mapState } from "vuex";
export default {
  name: "load",
  data() {
    return {
      phone: "",
      password: "",
      loadInfo: "",
      infoShow: false
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    Load() {
      return !this.userInfo.id;
    }
  },
  methods: {
    ...mapMutations(["ifUserInfo"]),
    userLoad(loaded = false) {
      let phone = loaded ? this.userInfo.phone : this.phone;
      let password = loaded ? this.userInfo.password : this.password;
      var x = `${api.url}/login/cellphone?phone=${phone}&password=${password}`;
      this.$axios
        .get(x, {
          withCredentials: true
        })
        .then(result => {
          if (result.status === 200 && !loaded) {
            this.loadInfo = "登录成功";
            this.infoShow = true;
            let userObject = {
              id: result.data.profile.userId,
              nickname: result.data.profile.nickname,
              phone,
              password
            };
            this.ifUserInfo(userObject);
            setTimeout(() => {
              this.infoShow = false;
              this.$router.push({ name: "home" });
            }, 300);
          } else if (result.status === 200 && loaded) {
            setTimeout(() => {
              this.$router.push({ name: "home" });
            }, 2000);
          }
        })
        .catch(err => {
          console.log("账号或密码不对", err);
          this.infoShow = true;
          this.loadInfo = "账号或密码不对";
        });
    },
    jump() {
      localStorage.clear();
    }
  },
  created() {
    if (localStorage.userInfo && JSON.parse(localStorage.userInfo).id) {
      this.userLoad(true);
    }
  }
};
</script>

<style lang="stylus" scoped>
.load
  position relative
  background-color #000
  color red
  height 100vh
  width 100vw
  overflow hidden
  .bgTop
    position absolute
    top 0
    left 0
    right 0
    height 30%
    background-image url('../assets/img/unload.jpg')
    background-size 100% 100%
    z-index 4
  .content
    position absolute
    top 0
    bottom 0
    right 0
    left 0  
    z-index 5
    display flex
    flex-direction column
    align-items center
    .logo
      width 3rem
      height 2.6rem
      margin-top 35%
    .loadText
      font-size 0.5rem
      margin-top 1rem
      padding 0.2rem 0.9rem 0.2rem 1.2rem
      border 0.04rem solid red
      border-radius 0.8rem
      letter-spacing 0.3rem
    .test
      font-size 0.5rem
      margin-top 0.2rem
      padding 0.2rem 0.9rem 0.2rem 1.2rem
      background-color red
      border 0.04rem solid red
      border-radius 0.8rem
      letter-spacing 0.3rem
      color #eee
    .in
      display flex
      flex-direction column
      padding 0.2rem 0.4rem
      margin-top 0.4rem
      border 0.04rem solid red
      border-radius 0.8rem
      width 5.5rem
      height 0.8rem
      .text
        flex 1
        background-color #000
        font-size 0.3rem
        letter-spacing 0.05rem
        color #eee
      .text::-webkit-input-placeholder
        color #bbb
    .loadInfo
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      padding 0.2rem 0.3rem
      height 1rem
      line-height 1rem
      text-align center
      font-size 0.4rem
      border-radius 0.2rem
      background-color rgba(255, 255, 255, 0.2)
      color #111
      z-index 2
.hasLoad
  position absolute
  top 0
  bottom 0
  left 0
  right 0
  background-image url('../assets/img/loaded.jpg')
  background-repeat no-repeat
  background-size 100% 100%
</style>
