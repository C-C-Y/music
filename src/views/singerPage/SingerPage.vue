<template>
  <div class="singerPage">
    <div v-if="hotSongs.length">
      <div class="head">
        <svg class="icon backIcon"
             aria-hidden="true"
             @click="back()">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
        <span class="singerName">{{singerInfo.name}}</span>
      </div>
      <div class="imgBox"
           ref="bg"
           :style="bgImg">
        <img :src="singerInfo.picUrl"
             alt=""
             class="img"
             @load="showPic"
             :style="{visibility:picShow}"
             ref="img">
      </div>
      <scroll class="wrapper"
              :bounce="{top:true,bottom:false,left:false,right:false}"
              :probeType="3"
              :listenScroll="true"
              @scroll="outerScroll"
              ref="outer"
              :canScroll="outerCanScroll"
              :momentum="false">
        <div>
          <div class="filter"
               ref="filter">
            <div class="enterPerson" ref="person" @click.stop="enterPerson" v-if="singerInfo.accountId">个人主页</div>
            <div class="tab">
              <span class="tabItem" :class="{'active':cardIndex==0}"
                    @click="seclect(0)">热门单曲</span>
              <span class="tabItem" :class="{'active':cardIndex==1}"
                    @click="seclect(1)">专辑</span>
              <span class="tabItem" :class="{'active':cardIndex==2}"
                    @click="seclect(2)">视频</span>
              <span class="tabItem" :class="{'active':cardIndex==3}"
                    @click="seclect(3)">艺人信息</span>
            </div>
          </div>
          <singer-detail :hotSongs="hotSongs"
                         :albumList="albumList"
                         :video="video"
                         :singerInfo="singerInfo.briefDesc"
                         :singerId="singerId"
                         :innerCanScroll="innerCanScroll"
                         @innerScroll="innerScroll" ref="inner"
                         :cardIndex="cardIndex"></singer-detail>
        </div>
      </scroll>
    </div>
    <loading v-else
             class="fullLoading"></loading>
  </div>
</template>
<script>
import api from "@/api/api";
import scroll from "base/scroll.vue";
import loading from "base/loading.vue";
import SingerDetail from "comp/SingerDetail.vue";
import { prefixStyle } from "asset/js/dom.js";
const transform = prefixStyle("transform");
const filter = prefixStyle("filter");
export default {
  name: "singerpage",
  data() {
    return {
      picShow: "hidden",
      hotSongs: [],
      singerInfo: {},
      albumList: [],
      video: [],
      scrollY: 0,
      cardIndex: 0,
      innerScrollY: 0,
      innerCanScroll: false,
      outerCanScroll: true
    };
  },
  components: {
    loading,
    scroll,
    SingerDetail
  },
  computed: {
    singerId() {
      return this.$route.params.singerId;
    },
    bgImg() {
      let bgcUrl = `url(${require("asset/img/bgc.jpg")})`;
      let vw = window.innerWidth;
      let cardTop = vw * 0.75;
      return {
        backgroundImage: bgcUrl,
        backgroundSize: `${vw}px ${cardTop}px`,
        backgroundRepeat: "no-repeat"
      };
    }
  },
  methods: {
    enterPerson() {
      let userId = this.singerInfo.accountId;
      this.$router.push({ name: "person", params: { userId } });
    },
    seclect(index) {
      this.cardIndex = index;
      if (this.innerScrollY < 0) {
        this.$refs.inner.$refs.wrapper.scroll.scrollTo(0, 0, 0);
      }
      if (index == 1 && !this.albumList.length) {
        let singerId = this.$route.params.singerId;
        this.$axios
          .get(`${api.url}/artist/album?id=${singerId}&limit=50`, {
            withCredentials: true
          })
          .then(result => {
            this.albumList = result.data.hotAlbums;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    showPic() {
      this.picShow = "visible";
    },
    outerScroll(pos) {
      this.scrollY = pos.y;
    },
    innerScroll(y) {
      this.innerScrollY = y;
    },
    back() {
      this.$router.go(-1);
    }
  },
  created() {
    let singerId = this.$route.params.singerId;
    this.$axios
      .get(`${api.url}/artists?id=${singerId}`, {
        withCredentials: true
      })
      .then(result => {
        this.hotSongs = result.data.hotSongs;
        this.singerInfo = result.data.artist;
      })
      .catch(err => {
        console.log(err);
      });
  },
  watch: {
    scrollY(newval) {
      let vh = window.innerHeight;
      let cardTop = vh * 0.5;
      let topHeight = vh * 0.135;
      let opacity = 0.65 + newval / (cardTop - topHeight) - 0.05;
      opacity = opacity < 0 ? 0 : opacity;
      let brightNess = 85 + (newval * 65) / (cardTop - topHeight);
      let scale = 1 + (newval * 0.15) / (cardTop - topHeight);
      scale = scale > 1.1 ? 1.1 : scale;
      let val = newval / 1.3;
      if (
        cardTop + newval <= topHeight &&
        this.cardIndex != 2 &&
        this.cardIndex != 3
      ) {
        this.$refs.outer.scroll.disable();
        this.$refs.inner.$refs.wrapper.scroll.enable();
        /* this.outerCanScroll = false;
        this.innerCanScroll = true; */
      } else if (newval < 0 && cardTop + newval > topHeight) {
        this.$refs.bg.style.zIndex = 3;
        this.$refs.img.style[filter] = `brightness(${brightNess}%)`;
        this.$refs.person.style.opacity = opacity;
        this.$refs.img.style[transform] = `scale(${scale})`;
        this.$refs.bg.style[transform] = `translateY(${val}px)`;
        /* this.$refs.userInfo.style.opacity = opacity; */
      } else {
        this.$refs.img.style[transform] = `scale(${scale})`;
      }
    },
    innerScrollY(newval, oldval) {
      if (oldval < 0 && newval == 0) {
        this.$refs.outer.scroll.enable();
        this.$refs.inner.$refs.wrapper.scroll.stop();
        this.$refs.outer.scroll.scrollTo(0, this.scrollY, 0);
        this.$refs.inner.$refs.wrapper.scroll.disable();
        /* this.outerCanScroll = true;
        this.innerCanScroll = false; */
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.fullLoading
  position absolute
  top 50%
  left 50%
  transform translate(-50%, -50%)
.active
  color red  
.singerPage
  background-color #111
  .head
    position fixed
    top 0
    left 0
    right 0
    height 7.5vh
    display flex
    align-items center
    color #fff
    padding-left 0.15rem
    font-size 0.5rem
    z-index 30
    .singerName
      flex 1
      text-align center
      font-size 0.34rem
      padding-right 0.65rem
  .imgBox
    width 100%
    height 120vw
    position relative
    z-index 3
    overflow hidden
    .img
      transform-origin center
      margin-left -10vw
      width 120vw
      height 100% vw
  .wrapper
    position fixed
    top 7vh
    bottom 0
    z-index 8
    width 100%
    overflow hidden
    .filter
      position relative
      width 100%
      height 43vh
      .tab
        position absolute
        bottom 0
        left 0
        right 0
        height 6.5vh
        margin-bottom -.02rem
        display flex
        justify-content space-around
        align-items center
        background-color #222
        font-size 0.32rem
        color #ccc
        border-radius .3rem .3rem 0 0 
      .enterPerson
        position absolute
        bottom 1.3rem
        left 50%
        transform translateX(-50%)
        height 0.5rem
        line-height 0.5rem
        text-align center
        border-radius 0.2rem
        padding 0.05rem 0.25rem
        background-color #222
        opacity 0.65
        color #fff
</style>
