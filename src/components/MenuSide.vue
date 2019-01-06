<template>
  <transition name="menu">
    <div class="menuSide"
         v-show="homeMenuShow">
      <div class="left"
           @touchmove.prevent>
        <div class="userInfo"
             ref="userInfo needsclick" :style="bgc" @click="enterDeatil()">
          <img  
               alt=""
               class="avatar needsclick" :src="avatarUrl">
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
  computed: {
    ...mapState(["homeMenuShow", "userInfo", "userId"]),
    avatarUrl() {
      return this.userInfo.profile.avatarUrl;
    },
    nickname() {
      return this.userInfo.profile.nickname;
    },
    bgc() {
      let bgcUrl = `url(${this.userInfo.profile.backgroundUrl})`;
      return {
        backgroundImage: bgcUrl,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0% 50%"
      };
    }
  },
  methods: {
    ...mapMutations(["toggeleHomeMenu", "clearPlayList", "setFresh"]),
    enterDeatil() {
      let userId = this.userId;
      this.$router.push(`/personalpage/${userId}`);
      this.toggeleHomeMenu();
    },
    unLoad() {
      let url = `${api.url}/logout`;
      this.$axios
        .get(url, {
          withCredentials: true
        })
        .then(() => {
          this.clearPlayList();
          this.setFresh();
          try {
            localStorage.clear();
          } catch (error) {
            console.log(error);
          }
          setTimeout(() => {
            this.$router.push({ name: "load" });
          }, 1000);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
.menu-enter-active, .menu-leave-active
  transition all 0.3s 
  .left
    transition all .3s 
    transform translateX(0)
    opacity 1
.menu-enter, .menu-leave-to
  .left
    transform translateX(-100%)
.menuSide
  position fixed
  top 0
  bottom 0
  width 100%
  z-index 20
  overflow hidden
  .left
    position absolute
    width 80%
    height 100vh
    background-color #333
    color #bbb
    z-index 20
    .userInfo
      display flex
      flex-direction column
      justify-content flex-end
      padding-left 0.2rem
      height 4.5rem
      background-color #888
      filter brightness(90%)
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
        height 0.8rem
        line-height 0.8rem
        font-size 0.32rem
        padding-left 0.2rem
        .text
          margin-left 0.15rem
  .right
    position absolute
    width 100%
    height 100vh
    background-color #222
    opacity .3
    z-index 1
</style>
