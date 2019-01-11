<template>
<div>
  <div class="songListBox"
       v-if="playlist && playlist.songs">
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
          v-show="!topNameShow">专辑</span>
    <list :songlist="playlist.songs"
          :unablePlayIdList="unablePlayIdList"
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
          <img v-lazy="playlist.album.picUrl"
               class="leftPic">
          <div class="rightInfo">
            <span class="listName">{{playlist.album.name}}</span>
            <div class="creator">
                <img v-lazy="playlist.album.artist.picUrl"
                     class="avatar">
                <span class="nickName">{{singerName(playlist.album)}}</span>
                <svg class="icon enter"
                     aria-hidden="true">
                  <use xlink:href="#icon-youjiantou"></use>
                </svg>
              </div>
              <div class="comment">
                <svg class="icon commentIcon"
                     aria-hidden="true">
                  <use xlink:href="#icon-weibiaoti-"></use>
                </svg>
                <span class="commentText">评论</span>
              </div>
          </div>
        </div>
      </div>
      <div slot="listHeader"
           class="listHeader">
        <div class="playAllSong" @click.stop="playAll()">
          <svg class="icon playIcon"
               aria-hidden="true">
            <use xlink:href="#icon-bofang1"></use>
          </svg>
          <span class="playAll">播放全部</span>
          <span class="count">{{"(共"+playlist.songs.length+"首)"}}</span>
        </div>
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
              <span class="album">{{"歌手: "+ singerName(optionObj)}}</span>
            </li>
            <li v-if="albumOption"
                class="optionItem border-bottom">
              <svg class="icon optionIcon"
                   aria-hidden="true">
                <use xlink:href="#icon-zhuanjiguangpan"></use>
              </svg>
              <span class="album">{{"专辑: "+ optionObj.al.name}}</span>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <div class="noCopyright"
         v-if="noPlay"
         @touchstart="hiddenAlert">
      <span class="alertText">很抱歉,这首歌暂无版权</span>
    </div>
  </div>
  <loading v-else
             class="fullLoading"></loading>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import list from "base/list.vue";
import api from "@/api/api";
import loading from "base/loading.vue";
export default {
  name: "album",
  data() {
    return {
      playlist: {},
      optionObj: {},
      optionShow: false,
      albumOption: false,
      bounce: false,
      topNameShow: false,
      noPlay: false,
      unablePlayIdList: [],
      canplayIdList: [],
      songPlayList: []
    };
  },
  components: {
    loading,
    list
  },
  computed: {
    listBg() {
      let bg = `url('${this.playlist.album.picUrl}')`;
      return {
        backgroundImage: bg,
        backgroundPosition: "center",
        backgroundSize: "300% 300%",
        filter: "blur(15px) brightness(70%)"
      };
    },
    listOuterBG() {
      let bg = `url('${this.playlist.album.picUrl}')`;
      return {
        backgroundImage: bg,
        backgroundPosition: "center",
        backgroundSize: "300% 300%",
        filter: "brightness(5%)"
      };
    }
  },
  methods: {
    singerName(item) {
      let namelist = [];
      let singers = item.ar || item.artists;
      singers.forEach(item => {
        namelist.push(item.name);
      });
      let name = namelist.join("/");
      return name;
    },
    ...mapActions(["selectPlay"]),
    playAll() {
      this.selectPlay({ list: this.songPlayList, index: 0 });
    },
    checkPlay(list) {
      let unablePlayList = [];
      let canplayIdList = [];
      let songPlayList = [];
      list.forEach((item, index) => {
        if (item.privilege.subp == 0) {
          unablePlayList.push(item.id);
        } else {
          songPlayList.push(list[index]);
          canplayIdList.push(item.id);
        }
      });
      this.unablePlayIdList = unablePlayList;
      this.canplayIdList = canplayIdList;
      this.songPlayList = songPlayList;
    },
    hiddenAlert() {
      this.noPlay = false;
    },
    back() {
      this.$router.go(-1);
    },
    playThis(index) {
      let id = this.playlist.songs[index].id;
      if (this.unablePlayIdList.includes(id)) {
        this.noPlay = true;
      } else {
        let songIndex = this.canplayIdList.indexOf(id);
        this.selectPlay({ list: this.songPlayList, index: songIndex });
      }
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
      this.optionObj = this.playlist.songs[index];
    },
    closeOption() {
      this.optionShow = false;
      this.optionObj = {};
    }
  },
  created() {
    let url = api.url;
    let albumId = this.$route.params.albumId;
    this.$axios
      .get(`${url}/album?id=${albumId}`, {
        withCredentials: true
      })
      .then(result => {
        this.playlist = result.data;
        this.checkPlay(result.data.songs);
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
.fullLoading
  position absolute 
  top 50%
  left 50%
  transform translate(-50%,-50%)  
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
  opacity 0.6
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
    font-size 0.35rem
    padding 0 0.2rem
    border-radius 0.2rem
    opacity 0.7
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
        height 30vw
        display flex
        flex-direction column
        justify-content space-around
        margin-left 0.2rem
        margin-right 0.2rem
        min-width 60%
        color #eee
        .listName
          font-size 0.35rem
          text-align left
        .comment
          display flex
          align-items center
          .commentIcon
            font-size 0.36rem
            margin-right 0.1rem
        .creator
          display flex
          align-items center
          .avatar
            width 0.6rem
            height 0.6rem
            border-radius 0.3rem
            margin-right 0.1rem
          .nickName
            font-size .23rem
            margin-right 0.2rem
          .enter
            font-size .35rem  
  .listHeader
    height 0.8rem
    background-color #333
    color #ccc
    font-size 0.4rem
    .playAllSong
      display flex
      align-items center
      padding-left 0.2rem
      height 100%
      .playAll
        font-size 0.32rem
        margin-left 0.2rem
      .count
        font-size 0.3rem
        color #999
.OptionDetail
  position fixed
  top .9rem
  left 0
  right 0
  bottom 0
  display flex
  flex-direction column
  z-index 200
  .optionTop
    width 100%
    flex 1
  .optionContent
    width 100%
    background-color #333
    .optionSongName
      height 0.8rem
      line-height 0.8rem
      font-size 0.32rem
      color #ccc
      margin-left 0.2rem
    .optionItem
      height 1rem
      font-size 0.3rem
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
