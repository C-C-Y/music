<template>
  <transition name="options">
    <div class="optionBox">
      <div class="filter"
           @click="closeOption"></div>
      <div class="alert" v-if="alertShow">{{alertInfo}}</div>     
      <div class="miniSongList"
           v-if="songlistShow&&songList.length">
        <div class="top">收藏到歌单</div>
        <div class="listItem"
             v-for="item of songList"
             :key="item.id"
             @click="collectItem(item.id)">
          <img :src="item.coverImgUrl"
               alt=""
               class="pic">
          <div class="listDesc">
            <p class="name">
              {{item.name}}
            </p>
            <p class="listLength">
              {{item.trackCount+"首"}}
            </p>
          </div>
        </div>
      </div>
      <div class="content"
           v-show="contentShow">
        <div class="optionTop">
          <span>{{"歌曲: "+currentSong.name}}</span>
        </div>
        <div class="optionItem"
             @click="collect">
          <svg class="icon icons specialIcon"
               aria-hidden="true">
            <use xlink:href="#icon-shoucang2"></use>
          </svg>
          <span class="txt border-bottom">收藏到歌单</span>
        </div>
        <div class="optionItem "
             v-if="commentShow">
          <svg class="icon icons"
               aria-hidden="true">
            <use xlink:href="#icon-weibiaoti-"></use>
          </svg>
          <span class="txt border-bottom">评论</span>
        </div>
        <div class="optionItem ">
          <svg class="icon icons"
               aria-hidden="true">
            <use xlink:href="#icon-geshou"></use>
          </svg>
          <span class="txt border-bottom">{{"歌手: "+singerName}}</span>
        </div>
        <div class="optionItem "
             v-if="albumShow">
          <svg class="icon icons"
               aria-hidden="true">
            <use xlink:href="#icon-zhuanjiguangpan"></use>
          </svg>
          <span class="txt border-bottom">{{"专辑: "+album.name}}</span>
        </div>
      </div>

    </div>
  </transition>

</template>

<script>
import { mapGetters } from "vuex";
import api from "@/api/api";
export default {
  name: "options",
  data() {
    return {
      contentShow: true,
      songlistShow: false,
      songList: [],
      alertShow: false,
      alertInfo: "添加成功",
      i: null
    };
  },
  methods: {
    closeOption() {
      this.$emit("close");
    },
    collectItem(listId) {
      this.songlistShow = false;
      this.$axios
        .get(
          `${api.url}/playlist/tracks?op=add&pid=${listId}&tracks=${
            this.currentSong.id
          }`,
          {
            withCredentials: true
          }
        )
        .then(() => {
          console.log("succ");
          this.alertShow = true;
          this.i = setTimeout(() => {
            this.alertShow = false;
            this.$emit("close");
          }, 1000);
        })
        .catch(() => {
          this.alertInfo = "歌单已存在这首歌";
          this.alertShow = true;
          this.i = setTimeout(() => {
            this.alertShow = false;
            this.$emit("close");
          }, 1000);
        });
    },
    collect() {
      if (this.userSongList.length) {
        this.songList = this.userSongList;
        this.contentShow = false;
        this.songlistShow = true;
      } else {
        this.getData(this.userId);
      }
    },
    getData(id) {
      this.$axios
        .get(`${api.url}/user/playlist?uid=${id}`, {
          withCredentials: true
        })
        .then(result => {
          this.songList = result.data.playlist;
          this.contentShow = false;
          this.songlistShow = true;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    ...mapGetters(["userSongList", "userId"]),
    singerName() {
      let namelist = [];
      let singers = this.currentSong.ar || this.currentSong.artists;
      singers.forEach(item => {
        namelist.push(item.name);
      });
      let name = namelist.join("/");
      return name;
    },
    album() {
      let album = this.currentSong.al
        ? this.currentSong.al
        : this.currentSong.album;
      return album;
    }
  },
  props: {
    currentSong: {
      type: Object,
      default: null
    },
    commentShow: {
      type: Boolean,
      default: true
    },
    albumShow: {
      type: Boolean,
      default: true
    }
  },
  destroyed() {
    this.i = null;
  }
};
</script>
<style lang="stylus" scoped>
.border-bottom
  &:before
    border-color #333
    bottom -0.15rem
.optionBox
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  z-index 200
  .alert
    position absolute
    top 50%
    left 50%
    z-index 10
    transform translate(-50%,-50%)
    width 3rem
    height 1.7rem
    line-height 1.7rem
    text-align center
    font-size .34rem
    color #eee
    background-color #222
    border-radius .3rem
    opacity .8
    padding 0 .2rem
  .miniSongList
    position absolute
    top 50%
    left 50%
    transform translate(-50%,-50%)
    margin auto
    width 90%
    color #ddd
    font-size .32rem
    background-color #222
    border-radius .2rem
    padding .3rem 0
    .top
      height .8rem
      line-height .8rem
      padding 0 .3rem
    .listItem
      height 1.1rem
      display flex
      align-items center
      .pic
        width .8rem
        height .8rem
        margin-left .3rem
      .listDesc  
        padding 0 .2rem
        .listLength
          font-size .27rem
          color #999
          height .3rem
          line-height .3rem 
        .name
          max-width 65vw 
          overflow hidden
          white-space nowrap  
          text-overflow ellipsis
          height .5rem
          line-height .5rem 
          
  .filter
    position relative
    width 100%
    height 100%
    background-color #333
    opacity 0.4
  .content
    min-height 60% vh
    position absolute
    left 0
    right 0
    bottom 0
    color #bbb
    padding 0.2rem 0.2rem
    font-size 0.32rem
    background-color #222
    border-radius 0.3rem 0.3rem 0 0
    .optionTop
      height 0.8rem
      display flex
      align-items center
    .optionItem
      height 0.8rem
      display flex
      align-items center
      max-width 90% vw
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
      .icons
        font-size 0.5rem
        margin-right 0.15rem
        color red
      .specialIcon
        font-size 0.43rem
      .txt
        flex 1
.options-enter-active, .options-leave-active
  transition all 0.3s
  .content
    transition all 0.3s
    opacity 1
.options-enter, .options-leave-to
  opacity 0
  .content
    transform translateY(100%)
</style>
