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
          <div :class="{'commonWrapper':true,'base':!CDshow,'outer':CDshow}"
               @click="enterLyric">
            <div class="baseWrapper">
            </div>
            <div class="outerWrapper"
                 ref="rotateCD"
                 :style="{animationPlayState:ifRotate}">
              <img :src="album.picUrl"
                   alt=""
                   class="cd">
            </div>
            <div class="userAction">
              <svg class="icon unlike"
                   aria-hidden="true"
                   v-show="!ifLiked"
                   @click.stop="likeOrdislike(true)">
                <use xlink:href="#icon-xihuan1"></use>
              </svg>
              <svg class="icon liked"
                   aria-hidden="true"
                   v-show="ifLiked"
                   @click.stop="likeOrdislike(false)">
                <use xlink:href="#icon-xihuan2"></use>
              </svg>
              <svg class="icon"
                   aria-hidden="true"
                   @click.stop="enterComment">
                <use xlink:href="#icon-weibiaoti-"></use>
              </svg>
              <svg class="icon"
                   @click.stop="toggleShowOption"
                   aria-hidden="true">
                <use xlink:href="#icon-icon"></use>
              </svg>
            </div>
          </div>
          <scroll :class="{'base':CDshow,'outer':!CDshow}"
                  class="commonWrapper lyricPage"
                  :data="lyricObj&&lyricObj.lines"
                  :bounce="false"
                  ref="lyricList"
                  v-show="lyricObj"
                  @click.native="enterCD">
            <div class="lyricWrapper"
                 @click.stop="enterCD">
              <p class="lyricLine"
                 :class="{'current':currentLineNum===index}"
                 v-for="(line, index) in (lyricObj&&lyricObj.lines)"
                 :key="line.time"
                 ref="line">{{line.txt}}</p>
            </div>
          </scroll>
          <div class="commonWrapper noLyric"
               :class="{'base':CDshow,'outer':!CDshow}"
               v-if="!lyricObj"
               @click.stop="enterCD">
            纯音乐无歌词
          </div>
        </div>
        <div class="bottom">
          <div class="progressBar">
            <span class="currentTime">{{playedTime}}</span>
            <bar :percent="playPercent"
                 @changePercent="changeCurrentTime"></bar>
            <span class="totalTime">{{totalTime}}</span>
          </div>
          <div class="songOption">
            <svg class="icon fade"
                 aria-hidden="true"
                 v-show="Mode==2"
                 :class="{'ifShow':fm}"
                 @click="changeMode()">
              <use xlink:href="#icon-suijibofang"></use>
            </svg>
            <svg class="icon fade"
                 aria-hidden="true"
                 v-show="Mode==0"
                 :class="{'ifShow':fm}"
                 @click="changeMode()">
              <use xlink:href="#icon-xunhuanbofang"></use>
            </svg>
            <svg class="icon fade"
                 aria-hidden="true"
                 v-show="Mode==1"
                 :class="{'ifShow':fm}"
                 @click="changeMode()">
              <use xlink:href="#icon-danquxunhuan"></use>
            </svg>
            <svg class="icon"
                 aria-hidden="true"
                 @click="!fm && previous()"
                 :class="{'ifFade':fm}">
              <use xlink:href="#icon-48shangyishou"></use>
            </svg>
            <svg class="icon palyPause"
                 aria-hidden="true"
                 @click="play_pause"
                 v-show="!ifPlaying">
              <use xlink:href="#icon-bofang1"></use>
            </svg>
            <svg class="icon palyPause"
                 aria-hidden="true"
                 @click="play_pause"
                 v-show="ifPlaying">
              <use xlink:href="#icon-zanting1"></use>
            </svg>
            <svg class="icon"
                 aria-hidden="true"
                 @click="next">
              <use xlink:href="#icon-49xiayishou"></use>
            </svg>
            <svg class="icon fade"
                 aria-hidden="true"
                 :class="{'ifShow':fm}"
                 @click.stop="showList">
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
          <span class="author-lyric">{{lyricOrName}}</span>
        </div>
        <circle-progress :percent="playPercent"
                         @play_pause="play_pause">
          <svg class="icon miniPalyPause special"
               aria-hidden="true"
               v-show="!ifPlaying">
            <use xlink:href="#icon-bofang2"></use>
          </svg>
          <svg class="icon miniPalyPause"
               aria-hidden="true"
               v-show="ifPlaying">
            <use xlink:href="#icon-iconstop"></use>
          </svg>
        </circle-progress>
        <svg class="icon unlike"
             aria-hidden="true"
             v-show="fm&&!ifLiked"
             @click.stop="likeOrdislike(true)">
          <use xlink:href="#icon-xihuan1"></use>
        </svg>
        <svg class="icon liked"
             aria-hidden="true"
             v-show="fm&&ifLiked"
             @click.stop="likeOrdislike(false)">
          <use xlink:href="#icon-xihuan2"></use>
        </svg>
        <svg class="icon fade miniMenu"
             aria-hidden="true"
             @click.stop="showList"
             v-if="!fm">
          <use xlink:href="#icon-liebiao"></use>
        </svg>
      </div>
    </transition>
    <options :currentSong="currentSong"
             :commentShow="false"
             v-if="optionShow"
             @close="toggleShowOption"></options>
    <play-list v-if="listShow"
               @closeList="closeList"
               @changeMode="changeMode"
               :specialShow="listShow"
               @play="play_pause"></play-list>
    <audio :src="songUrl"
           ref="audio"
           @canplay="play"
           preload="auto"
           @ended="playEnd"
           @loadedmetadata="showTotalTime"
           @timeupdate="updateTime"
           :autoplay="true&&!initPlay"></audio>
  </div>
</template>

<script>
import Lyric from "lyric-parser";
import api from "@/api/api.js";
import { mapGetters, mapMutations } from "vuex";
import bar from "base/bar.vue";
import scroll from "base/scroll.vue";
import CircleProgress from "base/circleProgress.vue";
import options from "base/options.vue";
import PlayList from "comp/PlayList.vue";
export default {
  name: "player",
  data() {
    return {
      songUrl: "",
      currentTime: "0",
      songTime: "0",
      CDshow: true,
      lyric: "",
      lyricObj: null,
      currentLineNum: -1,
      hasUpTop: true,
      firstTime: 0,
      currentLyric: null,
      optionShow: false,
      listShow: false
    };
  },
  components: {
    bar,
    CircleProgress,
    scroll,
    options,
    PlayList
  },
  computed: {
    ...mapGetters([
      "playingList",
      "fullScreen",
      "ifPlaying",
      "currentIndex",
      "Mode",
      "currentSong",
      "likedIdList",
      "initPlay",
      "songNoChange",
      "fm"
    ]),
    ifRotate() {
      return this.ifPlaying ? "running" : "paused";
    },
    ifLiked() {
      return this.likedIdList.includes(this.currentSong.id);
    },
    lyricOrName() {
      if (this.ifPlaying && this.currentLyric) {
        return this.currentLyric;
      } else {
        return this.singerName;
      }
    },
    playedTime() {
      return this.pieceTime(this.currentTime);
    },
    totalTime() {
      return this.pieceTime(this.songTime);
    },
    singerName() {
      if (this.currentSong) {
        let namelist = [];
        let singers = this.currentSong.ar || this.currentSong.artists;
        singers.forEach(item => {
          namelist.push(item.name);
        });
        let name = namelist.join("/");
        return name;
      } else {
        return "";
      }
    },
    album() {
      if (this.currentSong) {
        let album = this.currentSong.al
          ? this.currentSong.al
          : this.currentSong.album;
        return album;
      } else {
        return "";
      }
    },
    playPercent() {
      return this.currentTime / this.songTime;
    }
  },
  methods: {
    ...mapMutations([
      "setFullSCreen",
      "setPlayingState",
      "setPlayMode",
      "setCurrentIndex",
      "changeLikeList",
      "setInitPlay",
      "setChangeStatus"
    ]),
    enterComment() {
      this.$router.push({
        name: "songcomment",
        params: {
          songId: this.currentSong.id,
          song: {
            pic: this.currentSong.al.picUrl,
            name: this.currentSong.name,
            singer: this.singerName
          }
        }
      });
      this.closeFullScreen();
    },
    showList() {
      this.listShow = true;
    },
    closeList() {
      this.listShow = false;
    },
    toggleShowOption() {
      this.optionShow = !this.optionShow;
    },
    likeOrdislike(tag) {
      this.$axios
        .get(`${api.url}/like?id=${this.currentSong.id}&like=${tag}`, {
          withCredentials: true
        })
        .then(() => {
          let songInfo = {
            id: this.currentSong.id,
            tag
          };
          this.changeLikeList(songInfo);
        })
        .catch(err => {
          console.log(err);
        });
    },
    enterLyric() {
      if (this.ifPlaying) {
        this.$refs.rotateCD.style.animationPlayState = "paused";
      }
      this.CDshow = false;
    },
    enterCD() {
      if (this.ifPlaying) {
        this.$refs.rotateCD.style.animationPlayState = "running";
      }
      this.CDshow = true;
    },
    changeCurrentTime(newPercent) {
      let newTime = newPercent * this.songTime;
      this.$refs.audio.currentTime = newTime;
      if (!this.ifPlaying) {
        this.$refs.audio.play();
      }
      if (this.lyricObj) {
        this.lyricObj.seek(newTime * 1000);
      }
    },
    nextSequenceIndex(index, tag) {
      let newIndex = null;
      if (tag) {
        newIndex = index == this.playingList.length - 1 ? 0 : index + 1;
        return newIndex;
      } else {
        newIndex = index == 0 ? this.playingList.length - 1 : index - 1;
        return newIndex;
      }
    },
    playEnd() {
      let index = -1;
      if (this.playingList.length == 1) {
        this.$refs.audio.play();
        this.lyricObj.seek(0);
        return;
      }
      if (this.Mode == 0) {
        index = this.nextSequenceIndex(this.currentIndex, true);
        this.setCurrentIndex(index);
        return;
      } else if (this.Mode == 1) {
        this.$refs.audio.play();
        this.lyricObj.seek(0);
        return;
      } else {
        index = Math.floor(Math.random() * this.playingList.length);
        this.setCurrentIndex(index);
      }
    },
    previous() {
      let index = -1;
      if (this.Mode == 0 || this.Mode == 1) {
        index = this.nextSequenceIndex(this.currentIndex, false);
        this.setCurrentIndex(index);
      } else {
        index = Math.floor(Math.random() * this.playingList.length);
        this.setCurrentIndex(index);
      }
    },
    next() {
      let index = -1;
      if (this.Mode == 0 || this.Mode == 1) {
        index = this.nextSequenceIndex(this.currentIndex, true);
        this.setCurrentIndex(index);
      } else {
        index = Math.floor(Math.random() * this.playingList.length);
        this.setCurrentIndex(index);
      }
    },
    changeMode() {
      let newMode = this.Mode == 2 ? 0 : this.Mode + 1;
      this.setPlayMode(newMode);
    },
    play() {
      if (this.initPlay) {
        return;
      }
      if (!this.$refs.audio.currentTime && this.lyricObj) {
        this.lyricObj.play();
      }
      if (!this.ifPlaying) {
        this.setPlayingState(true);
      }
      this.$refs.audio.play();
    },
    closeFullScreen() {
      this.setFullSCreen(false);
    },
    open() {
      this.setFullSCreen(true);
    },
    play_pause() {
      if (this.initPlay) {
        this.setInitPlay();
        this.play();
        return;
      }
      const audio = this.$refs.audio;
      if (this.ifPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      this.setPlayingState(!this.ifPlaying);
      this.lyricObj.togglePlay();
    },
    pieceTime(time) {
      let minutes = Math.floor(time / 60);
      let seconds = Math.round(time % 60);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      let newTime = minutes + ":" + seconds;
      return newTime;
    },
    showTotalTime() {
      this.songTime = this.$refs.audio.duration;
    },
    updateTime() {
      if (this.currentSong) {
        this.currentTime = this.$refs.audio.currentTime;
      }
    },
    handleLyric({ lineNum, txt }) {
      this.currentLineNum = lineNum;
      if (lineNum > 4) {
        let lineEl = this.$refs.line[lineNum - 4];
        this.$refs.lyricList.scroll.scrollToElement(lineEl, 1000);
        this.hasUpTop = false;
      } else if (this.$refs.lyricList) {
        this.$refs.lyricList.scroll.scrollTo(0, 0, 1000);
        this.hasUpTop = true;
      }
      this.currentLyric = txt;
    },
    getData(val) {
      let getSongUrl = this.$axios.get(`${api.url}/song/url?id=${val.id}`);
      let getSongLyric = this.$axios.get(
        `${api.url}/lyric?id=${this.currentSong.id}`
      );
      this.$axios
        .all([getSongUrl, getSongLyric])
        .then(
          this.$axios.spread((urlData, lyricData) => {
            this.songUrl = urlData.data.data[0].url;
            if (lyricData.data.lrc) {
              this.lyric = lyricData.data.lrc.lyric;
              this.lyricObj = new Lyric(this.lyric, this.handleLyric);
              if (this.lyricObj.lines[0]) {
                this.firstTime = this.lyricObj.lines[0].time / 1000;
              }
            } else {
              this.lyricObj = null;
            }
          })
        )
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {
    currentSong(val, oldval) {
      if (val) {
        if (oldval === val) {
          if (this.songNoChange) {
            this.setChangeStatus(false);
          }
          return;
        }
        if (
          this.lyricObj &&
          this.$refs.lyricList.scroll &&
          !this.songNoChange
        ) {
          this.lyricObj.stop();
          this.$refs.lyricList.scroll.scrollTo(0, 0, 1000);
        }
        this.lyric = "";
        this.currentLyric = null;
        this.getData(val);
      } else {
        this.listShow = false;
        this.songUrl = "";
        if (this.lyricObj) {
          this.lyricObj.stop();
          this.lyricObj = null;
        }
      }
    },
    currentTime(val) {
      if (
        val <= this.firstTime &&
        !this.hasUpTop &&
        this.$refs.lyricList.scroll
      ) {
        this.$refs.lyricList.scroll.scrollTo(0, 0, 1000);
      }
    },
    ifPlaying(val) {
      if (val && this.$refs.audio && this.lyricObj) {
        this.$refs.audio.play();
        this.lyricObj.togglePlay();
      }
    },
    fullScreen(val) {
      let wrapper = this.$refs.lyricList;
      if (val && wrapper && wrapper.scroll) {
        this.CDshow = true;
        if (this.ifPlaying) {
          this.$refs.rotateCD.style.animationPlayState = "running";
        }
        setTimeout(() => {
          this.$refs.lyricList.scroll.refresh();
          let lineEl = this.$refs.line[this.currentLineNum - 5];
          this.$refs.lyricList.scroll.scrollToElement(lineEl, 100);
        }, 20);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.border-bottom
  &:before
    border-color #333
.current
  color #eee
.like
  color red
.fade
  color #ccc
.ifShow
  visibility hidden
.ifFade
  color #777
.unlike
  margin-right 0.15rem
  font-size 0.55rem
.liked
  margin-right 0.15rem
  font-size 0.55rem
  color red
@keyframes CDrotate
  from
    transform rotate(0)
  to
    transform rotate(360deg)
.base
  opacity 0
  z-index 10
.outer
  opacity 1
  z-index 20
.playBox
  color #eee
  .normalPlayer
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    z-index 400
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
            color #ccc
    .middle
      height 70%
      position relative
      .noLyric
        font-size 0.35rem
        display flex
        justify-content center
        align-items center
      .commonWrapper
        position absolute
        width 100%
        height 100%
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
          animation CDrotate 30s linear infinite
          position absolute
          top 0
          left 0
          right 0
          bottom 0
          margin auto
          width 71vw
          height 71vw
          border-radius 35.5vw
          background-color #222
          .cd
            position absolute
            top 0
            left 0
            right 0
            bottom 0
            margin auto
            width 60vw
            height 60vw
            border-radius 30vw
        .userAction
          position absolute
          width 100%
          bottom 0.5rem
          display flex
          justify-content space-around
          font-size 0.5rem
      .lyricPage
        color #bbb
        font-size 0.3rem
        width 100%
        height 100%
        overflow hidden
        .lyricWrapper
          width 100%
          .lyricLine
            overflow hidden
            text-overflow ellipsis
            display -webkit-box
            -webkit-line-clamp 2
            -webkit-box-orient vertical
            padding 0 0.3rem
            line-height 0.9rem
            text-align center
    .bottom
      flex 1
      display flex
      flex-direction column
      justify-content space-around
      padding 0.3rem 0
      .progressBar
        display flex
        justify-content center
        align-items center
      .songOption
        display flex
        justify-content space-around
        font-size 0.55rem
        align-items center
        .palyPause
          font-size 0.8rem
    &.normal-enter-active, &.normal-leave-active
      transition all 0.3s
      .top, .bottom
        transition all 0.3s cubic-bezier(0.86, 0.18, 0.82, 1.32)
    &.normal-enter, &.normal-leave-to
      opacity 0
      .top
        transform translateY(-100%)
      .bottom
        transform translateY(100%)
  .miniPlayer
    position fixed
    bottom 0
    left 0
    right 0
    height 1.15rem
    z-index 99
    background-color #292929
    display flex
    align-items center
    .miniAvatar
      width 0.8rem
      height 0.8rem
      border-radius 0.1rem
      margin-left 0.1rem
    .miniInfo
      display flex
      height 0.8rem
      flex 1
      flex-direction column
      margin-left 0.15rem
      font-size 0.3rem
      .miniSongName
        line-height 0.45rem
      .author-lyric
        line-height 0.35rem
        max-width 62% vw
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        font-size 0.25rem
        color #999
    .miniPalyPause
      position absolute
      top 50%
      left 50%
      transform translate(-48%, -55%)
      font-size 0.32rem
      color #eee
    .special
      transform translate(-40%, -57%)
    .miniMenu
      font-size 0.5rem
      margin-right 0.15rem
    &.mini-enter-active, &.mini-leave-active
      opacity 1
      transition all 0.3s
    &.mini-enter, &.mini-leave-to
      opacity 0
</style>
