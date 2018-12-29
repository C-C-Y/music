<template>
  <div class="songListBox"
       v-if="playlist && playlist.tracks"
       >
    <div class="backBox"
         ref="backBox">
    </div>
    <svg class="icon backIcon"
         aria-hidden="true"
         @click="back()">
      <use xlink:href="#icon-fanhui"></use>
    </svg>
    <span class="topListName"
          v-show="topNameShow">{{playlist.name}}</span>
    <span class="topListName"
          v-show="!topNameShow">歌单</span>
    <list :songlist="playlist.tracks"
          :needListenScroll="true"
          @scroll="scroll"
          @showMenu="showOptionMenu"
          @playThis="playThis"
          :bounce="bounce"
          class="wrapper"
          :heightPercent="0.6">
      <div slot="listTop"
           class="listTop"
           ref="listTop">
        <div class="listBg"
             :style="listOuterBG"></div>
        <div class="firstlayer"
             :style="listBg"></div>
        <div class="listWrapper">
          <img :src="playlist.tracks[0].al.picUrl"
               class="leftPic">
          <div class="rightInfo">
            <span class="listName">{{playlist.name}}</span>
            <div class="extraInfo">
              <div class="comment">
                <svg class="icon commentIcon"
                     aria-hidden="true">
                  <use xlink:href="#icon-weibiaoti-"></use>
                </svg>
                <span class="commentText">评论</span>
              </div>
              <div class="creator">
                <img :src="playlist.creator.avatarUrl"
                     class="avatar">
                <span class="nickName">{{playlist.creator.nickname}}</span>
                <svg class="icon"
                     aria-hidden="true">
                  <use xlink:href="#icon-youjiantou"></use>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="listHeader"
           class="listHeader">
        <svg class="icon playIcon"
             aria-hidden="true">
          <use xlink:href="#icon-bofang1"></use>
        </svg>
        <span class="playAll">播放全部</span>
        <span class="count">{{"(共"+playlist.trackCount+"首)"}}</span>
      </div>
    </list>
    <transition name="option">
      <div class="OptionDetail"
           v-if="optionShow">
        <div class="optionTop"
             @click="closeOption()"></div>

        <div class="optionContent">
          <ul>
            <li class="optionSongName border-bottom">
              <span>{{"歌曲:"+ " " +optionObj.name}}</span>
            </li>
            <li class="optionItem border-bottom">
              <svg class="icon optionIcon"
                   aria-hidden="true">
                <use xlink:href="#icon-shoucang2"></use>
              </svg>
              <span>收藏到歌单</span>
            </li>
            <li class="optionItem border-bottom">
              <svg class="icon optionIcon"
                   aria-hidden="true">
                <use xlink:href="#icon-weibiaoti-"></use>
              </svg>
              <span>评论</span>
            </li>
            <li class="optionItem border-bottom">
              <svg class="icon optionIcon"
                   aria-hidden="true">
                <use xlink:href="#icon-geshou"></use>
              </svg>
              <span>{{"歌手: "+ optionObj.ar[0].name}}</span>
            </li>
            <li v-if="albumOption"
                class="optionItem border-bottom">
              <svg class="icon optionIcon"
                   aria-hidden="true">
                <use xlink:href="#icon-zhuanji"></use>
              </svg>
              <span class="album">{{"专辑: "+ optionObj.al.name}}</span>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <div class="noCopyright" v-if="noPlay" @touchstart="hiddenAlert">
      <span class="alertText">很抱歉,这首歌暂无版权</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import list from "base/list.vue";
import api from "@/api/api";
export default {
  name: "songlist",
  data() {
    return {
      playlist: {},
      optionObj: {},
      optionShow: false,
      albumOption: true,
      bounce: false,
      topNameShow: false,
      noPlay: false
    };
  },
  computed: {
    listBg() {
      let bg = `url('${this.playlist.tracks[0].al.picUrl}')`;
      return {
        backgroundImage: bg,
        backgroundPosition: "center",
        backgroundSize: "300% 300%",
        filter: "blur(15px) brightness(70%)"
      };
    },
    listOuterBG() {
      let bg = `url('${this.playlist.tracks[0].al.picUrl}')`;
      return {
        backgroundImage: bg,
        backgroundPosition: "center",
        backgroundSize: "300% 300%",
        filter: "brightness(5%)"
      };
    }
  },
  methods: {
    ...mapActions(["selectPlay"]),
    hiddenAlert() {
      this.noPlay = false;
    },
    back() {
      this.$router.go(-1);
    },
    playThis(index) {
      this.$axios
        .get(`${api.url}/check/music?id=${this.playlist.tracks[index].id}`)
        .then(() => {
          this.selectPlay({ list: this.playlist.tracks, index });
        })
        .catch(err => {
          console.log(err);
          this.noPlay = true;
        });
    },
    scroll(pos) {
      let listTopHeight = window.innerHeight * 0.4;
      let innerHeight = -window.innerHeight * 0.15;
      if (-pos.y <= listTopHeight) {
        let percent = -(pos.y / listTopHeight);
        this.$refs.backBox.style.opacity = percent;
      } else {
        this.$refs.backBox.style.opacity = 1;
      }
      if (pos.y < innerHeight) {
        this.topNameShow = true;
      } else {
        this.topNameShow = false;
      }
    },
    showOptionMenu(index) {
      this.optionShow = true;
      this.optionObj = this.playlist.tracks[index];
    },
    closeOption() {
      this.optionShow = false;
      this.optionObj = {};
    }
  },
  components: {
    list
  },
  created() {
    let url = api.url;
    let listId = this.$route.params.listId;
    this.$axios
      .get(`${url}/playlist/detail?id=${listId}`, {
        withCredentials: true
      })
      .then(result => {
        this.playlist = result.data.playlist;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="stylus" scoped>
.option-enter-active, .option-leave-active
  opacity 1
  transition all 0.5s ease
  transform translateY(0)
.option-enter, .option-leave-to
  opacity 0
  transform translateY(100%)
.border-bottom
  &:before
    border-color #444
.backBox
  position relative
  z-index 30
  height 1rem
  background-color #181818
  opacity 0
.backIcon
  position fixed
  top 0.28rem
  left 0.2rem
  font-size 0.45rem
  color #eee
  z-index 30
.topListName
  position fixed
  top 0
  left 1rem
  height 1rem
  line-height 1rem
  overflow hidden
  white-space nowrap
  max-width 70%
  font-size 0.35rem
  text-overflow ellipsis
  z-index 30
  color #eee
.noCopyright
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  opacity .6
  background-color #444
  display flex
  justify-content center
  align-items center
  color #111
  z-index 40
  .alertText
    background-color #fff
    height 1rem
    line-height 1rem 
    text-align center
    font-size .35rem
    padding 0 .2rem
    border-radius .2rem
    opacity .7
.wrapper
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  z-index 5
  .listTop
    position relative
    width 100%
    height 40% vh
    background-color rgba(200, 200, 200, 0.7)
    .firstlayer
      position absolute
      top 0
      right 0
      left 0
      bottom 0
      z-index 8
    .listBg
      position relative
      z-index 5
      height 100%
      width 100%
    .listWrapper
      position absolute
      top 0
      right 0
      left 0
      bottom 0
      z-index 10
      display flex
      align-items center
      color #ccc
      .leftPic
        width 30%
        height 30% vw
        margin-left 5%
      .rightInfo
        height 100%
        display flex
        flex-direction column
        justify-content center
        margin-left 0.2rem
        margin-right 0.2rem
        min-width 60%
        .listName
          font-size 0.35rem
          text-align left
        .extraInfo
          display flex
          font-size 0.3rem
          padding-right 0.2rem
          margin-top 0.3rem
          .comment
            display flex
            align-items center
            .commentIcon
              font-size 0.36rem
              margin-right 0.1rem
          .creator
            display flex
            align-items center
            margin-left 0.5rem
            .avatar
              width 0.6rem
              height 0.6rem
              border-radius 0.3rem
              margin-right 0.1rem
            .nickName
              margin-right 0.05rem
  .listHeader
    display flex
    align-items center
    padding-left 0.2rem
    width 100%
    height 0.8rem
    line-height 0.8rem
    background-color #333
    color #ccc
    font-size 0.4rem
    .playAll
      font-size 0.35rem
      margin-left 0.2rem
    .count
      font-size 0.3rem
      color #999
.OptionDetail
  position fixed
  top 1rem
  left 0
  right 0
  bottom 0
  display flex
  flex-direction column
  z-index 15
  .optionTop
    width 100%
    flex 1
  .optionContent
    width 100%
    background-color #333
    .optionSongName
      height 0.8rem
      line-height 0.8rem
      font-size 0.34rem
      color #ccc
      margin-left 0.2rem
    .optionItem
      height 1.1rem
      font-size 0.32rem
      color #ccc
      display flex
      align-items center
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
      max-width 100% vw
      .optionIcon
        margin-left 0.2rem
        margin-right 0.2rem
        font-size 0.45rem
      .album
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        max-width 80% vw
</style>
