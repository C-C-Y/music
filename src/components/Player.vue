<template>
  <div v-if="playingList.length"
       class="playBox">
    <transition name="normal">
      <div class="normalPlayer"
           v-show="fullScreen">
        <div class="background">
          <img :src="album.picUrl"
               alt=""
               width="100%"
               height="100%">
        </div>
        <div class="top border-bottom">
          <svg class="icon close"
               aria-hidden="true"
               @click="closeFullScreen()">
            <use xlink:href="#icon-ico_open"></use>
          </svg>
          <div class="songInfo">
            <span class="songName">{{currentSong.name}}</span>
            <div class="singerBox">
              <span class="singerName">{{singerName}}</span>
              <svg class="icon"
                   aria-hidden="true">
                <use xlink:href="#icon-youjiantou"></use>
              </svg>
            </div>
          </div>
        </div>
        <div class="middle">
          <div class="baseWrapper">
          </div>
          <div class="outerWrapper">
            <img :src="album.picUrl"
                 alt=""
                 class="cd">
          </div>
        </div>
        <div class="bottom">
          <div class="userAction">
            <svg class="icon likeIcon"
                 aria-hidden="true">
              <use xlink:href="#icon-xihuan1"></use>
            </svg>
            <svg class="icon"
                 aria-hidden="true">
              <use xlink:href="#icon-weibiaoti-"></use>
            </svg>
            <svg class="icon"
                 aria-hidden="true">
              <use xlink:href="#icon-icon"></use>
            </svg>
          </div>
          <div class="progressBar"></div>
          <div class="songOption">
            <svg class="icon fade"
                 aria-hidden="true">
              <use xlink:href="#icon-suijibofang"></use>
            </svg>
            <svg class="icon"
                 aria-hidden="true">
              <use xlink:href="#icon-48shangyishou"></use>
            </svg>
            <svg class="icon palyPause"
                 aria-hidden="true">
              <use xlink:href="#icon-bofang1"></use>
            </svg>
            <svg class="icon"
                 aria-hidden="true">
              <use xlink:href="#icon-49xiayishou"></use>
            </svg>
            <svg class="icon fade"
                 aria-hidden="true">
              <use xlink:href="#icon-liebiao"></use>
            </svg>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="miniPlayer"
           v-show="!fullScreen"
           @click="open()">
        <img :src="album.picUrl"
             alt=""
             class="miniAvatar">
        <div class="miniInfo">
          <span class="miniSongName">{{currentSong.name}}</span>
          <span class="author-lyric">{{singerName}}</span>
        </div>
        <svg class="icon miniPalyPause"
             aria-hidden="true">
          <use xlink:href="#icon-bofang1"></use>
        </svg>
        <svg class="icon fade miniMenu"
             aria-hidden="true">
          <use xlink:href="#icon-liebiao"></use>
        </svg>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "player",
  computed: {
    ...mapGetters([
      "playingList",
      "fullScreen",
      "isPlaying",
      "currentIndex",
      "Mode",
      "currentSong"
    ]),
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
  methods: {
    ...mapMutations(["setFullSCreen"]),
    closeFullScreen() {
      this.setFullSCreen(false);
    },
    open() {
      this.setFullSCreen(true);
    }
  }
};
</script>

<style lang="stylus" scoped>
.border-bottom
  &:before
    border-color #333
.like
  color red
.fade
  color #aaa
.playBox
  color #eee
  .normalPlayer
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    z-index 100
    background-color #191919
    display flex
    flex-direction column
    .background
      position absolute
      top 0
      left 0
      height 100%
      width 100%
      z-index -1
      opacity 0.6
      filter blur(20px)
    .top
      height 1.2rem
      display flex
      align-items center
      .close
        margin-left 0.4rem
        font-size 0.45rem
      .songInfo
        display flex
        flex-direction column
        margin-left 0.5rem
        .songName
          font-size 0.35rem
        .singerBox
          display flex
          align-items center
          margin-top 0.1rem
          font-size 0.26rem
          .singerName
            font-size 0.26rem
            color #aaa
    .middle
      height 60%
      position relative
      .baseWrapper
        position relative
        top 50%
        left 50%
        transform translate(-50%, -50%)
        width 75%
        height 75vw
        border-radius 37.5vw
        background-color #666
        opacity 0.5
      .outerWrapper
        position absolute
        top 0
        bottom 0
        right 0
        left 0
        margin auto
        width 71vw
        height 71vw
        border-radius 35.5vw
        background-color #222
        .cd
          position absolute
          top 0
          bottom 0
          right 0
          left 0
          margin auto
          width 60vw
          height 60vw
          border-radius 30vw
    .bottom
      flex 1
      display flex
      flex-direction column
      justify-content space-around
      .userAction
        display flex
        justify-content space-around
        font-size 0.5rem
        .likeIcon
          font-size 0.55rem
      .songOption
        display flex
        justify-content space-around
        font-size 0.55rem
        align-items center
        .palyPause
          font-size 0.8rem
    &.normal-enter-active,&.normal-leave-active
      transition all .3s 
      .top,.bottom
        transition all .3s cubic-bezier(.86,.18,.82,1.32)
    &.normal-enter,&.normal-leave-to
      opacity 0
      .top
        transform translateY(-100%)
      .bottom
        transform translateY(100%)  
  .miniPlayer
    position absolute
    bottom 0
    left 0
    right 0
    height 1.25rem
    z-index 99
    background-color #292929
    display flex
    align-items center
    .miniAvatar
      width 0.9rem
      height 0.9rem
      border-radius 0.1rem
      margin-left 0.1rem
    .miniInfo
      display flex
      height 0.9rem
      flex 1
      flex-direction column
      margin-left 0.15rem
      font-size 0.35rem
      .miniSongName
        flex 1.5
        line-height 0.54rem
      .author-lyric
        flex 1
        font-size 0.3rem
        color #999
    .miniPalyPause
      font-size 0.65rem
      margin-right 0.3rem
    .miniMenu
      font-size 0.5rem
      margin-right 0.15rem
    &.mini-enter-active,&.mini-leave-active
      opacity 1
      transition all .3s 
    &.mini-enter,&.mini-leave-to
      opacity 0

</style>
