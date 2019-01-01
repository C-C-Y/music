<template>
  <div v-if="personalInfo.profile && songlist.playlist"
       class="personPage">
    <div class="back">
      <svg class="icon"
           aria-hidden="true"
           @click="back()">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
      <span v-show="topNickname"
            class="nickname">{{personalInfo.profile.nickname}}</span>
    </div>
    <div class="userInfo"
         ref="userInfo">
      <img :src="personalInfo.profile.avatarUrl"
           alt=""
           class="avatar">
      <span class="title">{{personalInfo.profile.nickname}}</span>
      <span class="extraInfo">{{extraInfo}}</span>
    </div>
    <div class="background"
         :style="bgimg"
         ref="bg">
      <div class="filter"
           ref="filter"></div>
    </div>
    <scroll :data="[songlist.playlist,personalInfo.profile]"
            class="card"
            @scroll="scroll"
            :listenScroll="listenScroll"
            :probeType="probeType"
            :canScroll="canScroll"
            :bounce="bounce">
      <person-detail :songList="songlist"
                     :userInfo="personalInfo"
                     :secondMove="secondMove"></person-detail>
    </scroll>
  </div>
</template>

<script>
import api from "@/api/api";
import PersonDetail from "comp/PersonDetail.vue";
import scroll from "base/scroll.vue";
import { prefixStyle } from "asset/js/dom.js";
const transform = prefixStyle("transform");
export default {
  name: "personalPage",
  data() {
    return {
      personalInfo: {},
      songlist: {},
      scrollY: 0,
      canScroll: true,
      secondMove: 0,
      bounce: {
        top: true,
        left: true,
        right: true,
        bottom: false
      },
      topNickname: false
    };
  },
  components: {
    PersonDetail,
    scroll
  },
  computed: {
    avatar() {
      let avatarUrl = "";
      if (this.personalInfo.profile.avatarUrl) {
        avatarUrl = this.personalInfo.profile.avatarUrl;
      }
      return avatarUrl;
    },
    bgimg() {
      let bgcUrl = `url(${this.personalInfo.profile.backgroundUrl})`;
      return {
        backgroundImage: bgcUrl,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0% 50%"
      };
    },
    extraInfo() {
      return `关注${this.personalInfo.profile.follows}   |   粉丝${
        this.personalInfo.profile.followeds
      }`;
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    scroll(pos) {
      this.scrollY = pos.y;
    }
  },
  created() {
    this.probeType = 3;
    this.listenScroll = true;
    let id = this.$route.params.userId;
    let getUserDetail = this.$axios.get(`${api.url}/user/detail?uid=${id}`, {
      withCredentials: true
    });
    let getSongList = this.$axios.get(`${api.url}/user/playlist?uid=${id}`, {
      withCredentials: true
    });
    this.$axios
      .all([getUserDetail, getSongList])
      .then(
        this.$axios.spread((detail, songlist) => {
          this.personalInfo = detail.data;
          this.songlist = songlist.data;
        })
      )
      .catch(err => {
        console.log(err);
      });
  },
  watch: {
    scrollY(newval) {
      let vw = window.innerWidth;
      let cardTop = vw * 0.75;
      let bgPaddingBottom = vw * 1.2;
      let opacity = 1 + newval / (cardTop - 50) - 0.05;
      opacity = opacity < 0 ? 0 : opacity;
      let val = newval / 1.3;
      if (cardTop + newval <= 50) {
        this.secondMove = newval;
        this.topNickname = true;
        this.$refs.bg.style.zIndex = 20;
        this.$refs.bg.style.paddingBottom = 0;
        this.$refs.bg.style.height = "50px";
        this.$refs.filter.style.backgroundColor = "#222";
        this.$refs.bg.style.opacity = 1;
        this.$refs.bg.style[transform] = `translateY(0)`;
      } else if (newval < 0 && cardTop + newval > 50) {
        this.secondMove = 0;
        this.topNickname = false;
        this.canScroll = true;
        this.$refs.bg.style.zIndex = 0;
        this.$refs.bg.style.paddingBottom = `${bgPaddingBottom}px`;
        this.$refs.bg.style.height = 0;
        this.$refs.filter.style.backgroundColor = "rgba(7, 17, 27, 0.4)";
        this.$refs.bg.style[transform] = `translateY(${val}px)`;
        this.$refs.userInfo.style[transform] = `translateY(${val}px)`;
        this.$refs.bg.style.opacity = opacity;
        this.$refs.userInfo.style.opacity = opacity;
      } else {
        this.secondMove = 0;
        this.topNickname = false;
        this.canScroll = true;
        this.$refs.userInfo.style[transform] = `translateY(${newval}px)`;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.personPage
  position fixed
  top 0
  right 0
  left 0
  bottom 0
  background-color #222
  .back
    position fixed
    top 0.2rem
    left 0.2rem
    display flex
    align-items center
    color #fff
    font-size 0.5rem
    z-index 30
    .nickname
      font-size 0.34rem
      color #eee
      margin-left 0.2rem
  .userInfo
    display flex
    flex-direction column
    position absolute
    top 2.5rem
    left 0.3rem
    z-index 6
    font-size 0.35rem
    .title
      color #eee
      margin-top 0.2rem
    .avatar
      width 1.2rem
      height 1.2rem
      border-radius 1rem
    .extraInfo
      color #999
      font-size 0.25rem
      margin-top 0.3rem
  .background
    position relative
    height 0
    padding-bottom 120%
    color #eee
    z-index 1
    .filter
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      background-color rgba(7, 17, 27, 0.4)
  .card
    position fixed
    top 75% vw
    bottom 0
    z-index 8
    width 100%
</style>
