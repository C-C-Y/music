<template>
  <div class="background"
      v-if ="bgInfo !=null" :style="bgimg">
    <div class="back" @click="back()">
      <svg class="icon"
           aria-hidden="true">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
    </div>
    <div class="userInfo">
    <img :src="bgInfo.avatarUrl" alt="" class="avatar">
    <span class="title">{{bgInfo.nickname}}</span>
    <span class="extraInfo">{{extraInfo}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "background",
  props: {
    bgInfo: {
      type: Object,
      default: null
    }
  },
  computed: {
    bgimg() {
      let bgcUrl = this.bgInfo ? `url(${this.bgInfo.backgroundUrl})` : "";
      return {
        backgroundImage: bgcUrl,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0% 50%"
      };
    },
    extraInfo() {
      return `关注${this.bgInfo.follows}   |   粉丝${this.bgInfo.followeds}`;
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="stylus" scoped>
.background
  position relative
  height 0
  padding-bottom 80%
  color #eee
  font-size .4rem
  .back
    position fixed
    top .2rem
    left .2rem
    color #fff
    font-size .6rem
  .userInfo
    display flex
    flex-direction column
    position absolute
    top 2.5rem
    left .3rem
    .title
      color #eee
      margin-top .2rem
    .avatar
      width 1.6rem
      height 1.6rem
      border-radius 1rem 
    .extraInfo
      font-size .27rem  
      margin-top .3rem 
</style>
