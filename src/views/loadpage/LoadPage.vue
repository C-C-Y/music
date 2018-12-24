<template>
  <div class="loadBox">
    <div class="backBox">
      <svg class="icon"
           aria-hidden="true"
           @click="back()">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
      <span class="loadWay">手机号登陆</span>
    </div>
    <div class="inputBox">
      <div class="phoneBox">
        <svg class="icon"
             aria-hidden="true">
          <use xlink:href="#icon-shouji"></use>
        </svg>
        <input type="text"
               placeholder="请输入手机号"
               class="phone"
               maxlength="11"
               @input="phoneInput()"
               @focus="loadInfoHidden()"
               ref="phone">
      </div>
      <div class="passwordBox">
        <svg class="icon"
             aria-hidden="true">
          <use xlink:href="#icon-mima"></use>
        </svg>
        <input type="password"
               placeholder="请输入密码"
               class="password"
               @focus="loadInfoHidden()"
               @input="passwordInput()"
               ref="password">
      </div>
    </div>
    <div class="loadBtn"
         @click="loadBtnPress()">
      <span>登录</span>
    </div>
    <div class="loadAlert"
          v-show="infoShow">{{loadInfo}}</div>
  </div>
</template>

<script>
import api from "@/api/api";
import { mapMutations } from "vuex";
export default {
  name: "loadpage",
  data() {
    return {
      phone: "",
      password: "",
      loadInfo: "",
      infoShow: false
    };
  },
  methods: {
    ...mapMutations(["ifUserInfo"]),
    phoneInput() {
      let val = event.target.value.replace(/[^\d]/g, "");
      event.target.value = val;
      this.phone = val;
    },
    passwordInput() {
      let val = event.target.value.replace(/[\u4e00-\u9fa5]/g, "");
      event.target.value = val;
      this.password = val;
    },
    back() {
      this.$router.go(-1);
    },
    loadBtnPress() {
      let phoneLength = this.phone.length;
      let passwordLength = this.password.length;
      if (phoneLength == 0) {
        this.loadInfo = "请输入手机号";
        this.infoShow = true;
        return;
      }
      if (phoneLength > 0 && phoneLength < 11) {
        this.loadInfo = "请输入正确的手机号";
        this.infoShow = true;
        return;
      }
      if (passwordLength == 0) {
        this.loadInfo = "请输入密码";
        this.infoShow = true;
        return;
      }
      this.userLoad(this.phone, this.password);
    },
    userLoad(phone, password) {
      let url = `${
        api.url
      }/login/cellphone?phone=${phone}&password=${password}`;
      this.$axios
        .get(url, {
          withCredentials: true
        })
        .then(result => {
          let userObject = {
            id: result.data.profile.userId,
            nickname: result.data.profile.nickname,
            phone,
            password
          };
          this.ifUserInfo(userObject);
          this.$refs.phone.value = "";
          this.$refs.password.value = "";
          this.$router.push({ name: "home" });
        })
        .catch(err => {
          console.log("账号或密码不对", err);
          this.infoShow = true;
          this.loadInfo = "手机号或密码不对";
        });
    },
    loadInfoHidden() {
      this.infoShow = false;
    }
  },
  beforeDestroy() {
    console.log("des");
    this.$refs.phone.value = "";
    this.$refs.password.value = "";
  }
};
</script>

<style lang="stylus" scoped>
.loadBox
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  background-color #000
  overflow hidden
  .backBox
    height 1rem
    line-height 1rem
    padding-left 0.2rem
    display flex
    align-items center
    color #fff
    font-size 0.4rem
    background-color #111
    .loadWay
      margin-left 0.35rem
  .inputBox
    margin-top 5%
    left 0.2rem
    font-size 0.6rem
    .phoneBox, .passwordBox
      margin-top 3%
      display flex
      align-items center
      .phone, .password
        background-color #000
        color #eee
        height .8rem
        font-size 0.35rem
        margin-left 0.15rem
        caret-color red
  .loadBtn
    margin-top 15%
    margin-left 50%
    display flex
    justify-content center
    align-items center
    transform translateX(-50%)
    width 85%
    height 1rem
    border-radius .5rem
    background-color red
    font-size .4rem
    color #eee
  .loadAlert
    display inline-block
    margin-top 10%
    margin-left 50%
    transform translateX(-50%)
    padding .3rem .6rem
    border-radius .5rem
    font-size .3rem
    color #eee
    background-color rgba(200,200,200,.4) 
    white-space nowrap
</style>
