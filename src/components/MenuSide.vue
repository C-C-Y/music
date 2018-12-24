<template>
  <transition name="menu">
    <div class="menuSide"
         v-show="homeMenuShow">
      <div class="left"
           @touchmove.prevent>
        <div class="personalInfo"
             ref="personalInfo" :style="bgc" @click="enterDeatil()">
          <img  
               alt=""
               class="avatar" :src="avatarUrl">
          <span class="nickName">{{nickname}}</span>
        </div>
        <div class="options">
          <div class="option">
            <svg class="icon "
                 aria-hidden="true">
              <use xlink:href="#icon-haoyou"></use>
            </svg>
            <span class="text">我的好友</span>
          </div>
          <div class="option" >
            <svg class="icon "
                 aria-hidden="true">
              <use xlink:href="#icon-clean"></use>
            </svg>
            <span class="text">清除缓存</span>
          </div>
          <div class="option">
            <svg class="icon "
                 aria-hidden="true">
              <use xlink:href="#icon-moonbyueliang"></use>
            </svg>
            <span class="text">夜间模式</span>
          </div>
          <div class="option" @click="unLoad()">
            <svg class="icon "
                 aria-hidden="true">
              <use xlink:href="#icon-tuichu"></use>
            </svg>
            <span class="text">退出登录</span>
          </div>
        </div>
      </div>
      <div class="right"
           @touchmove.prevent
           @click="toggeleHomeMenu()"></div>
    </div>
  </transition>
</template>

<script>
import api from "@/api/api";
import { mapState, mapMutations } from "vuex";
export default {
  name: "menuside",
  data() {
    return {
      personalInfo: null
    };
  },
  computed: {
    ...mapState(["homeMenuShow", "userInfo"]),
    avatarUrl() {
      return this.personalInfo ? this.personalInfo.profile.avatarUrl : "";
    },
    nickname() {
      return this.personalInfo ? this.personalInfo.profile.nickname : "";
    },
    bgc() {
      let bgcUrl = this.personalInfo
        ? `url(${this.personalInfo.profile.backgroundUrl})`
        : "";
      return {
        backgroundImage: bgcUrl,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0% 50%"
      };
    }
  },
  methods: {
    ...mapMutations(["toggeleHomeMenu"]),
    enterDeatil() {
      let userId = this.userInfo.id;
      this.$router.push({ name: "person", params: { userId } });
      this.toggeleHomeMenu(); //`/personalpage/${this.userInfo.id}`
    },
    unLoad() {
      let url = `${api.url}/logout`;
      this.$axios
        .get(url, {
          withCredentials: true
        })
        .then(() => {
          console.log("unloadSucceed");
          try {
            localStorage.clear();
          } catch (error) {
            console.log(error);
          }
          this.$router.push({ name: "load" });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.$nextTick(() => {
      this.$axios
        .get(`${api.url}/user/detail?uid=${this.userInfo.id}`, {
          withCredentials: true
        })
        .then(result => {
          this.personalInfo = result.data;
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
};
</script>

<style lang="stylus" scoped>
.menu-enter-active, .menu-leave-active
  transition all 0.3s linear
  transform translateX(0)
  opacity 1
.menu-enter, .menu-leave-to
  transform translateX(-100%)
  opacity 0
.menuSide
  position fixed
  top 0
  bottom 0
  width 100%
  z-index 20
  overflow hidden
  .left
    width 80%
    height 100vh
    float left
    background-color #333
    color #bbb
    .personalInfo
      display flex
      flex-direction column
      justify-content flex-end
      padding-left 0.2rem
      height 3rem
      background-color #888
      .avatar
        width 1.2rem
        height 1.2rem
        border-radius 1rem
      .nickName
        color #eee
        margin 0.2rem 0 0.3rem 0
        font-size 0.35rem
    .options
      display flex
      flex-direction column
      align-items stretch
      .option
        display flex
        align-items center
        height 0.7rem
        line-height 0.7rem
        font-size 0.3rem
        padding-left 0.2rem
        .text
          margin-left 0.15rem
  .right
    float right
    width 20%
    height 100vh
</style>
