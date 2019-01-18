<template>
  <transition name="playList">
    <div class="listPage">
      <div class="filter"
           @click="close"></div>
       <div class="list">  
      <div class="top">
        <div class="left" @click="changeMode()">
          <svg class="icon mode"
               aria-hidden="true"
               v-show="Mode==2"
               >
            <use xlink:href="#icon-suijibofang"></use>
          </svg>
          <svg class="icon mode"
               aria-hidden="true"
               v-show="Mode==0"
               >
            <use xlink:href="#icon-xunhuanbofang"></use>
          </svg>
          <svg class="icon mode"
               aria-hidden="true"
               v-show="Mode==1"
               @click="changeMode()">
            <use xlink:href="#icon-danquxunhuan"></use>
          </svg>
          <span class="modeDesc">{{modeName+`(${playingList.length})`}}</span>
        </div>
        <div class="claearList" @click.stop="closePlay">
          <svg class="icon clear"
               aria-hidden="true"
               @click="clearAll()">
            <use xlink:href="#icon-icon--"></use>
          </svg>
          <span>清空列表</span>
        </div>
      </div>
      <scroll :data="playingList"
              :bounce="false"
              class="wrapper" ref="listSroll">
        <div class="content">
          <div class="songItem border-bottom"
               v-for="(item,index) of playingList"
               :key="item.id" @click.stop="playSong(index)" ref="listItem">
            <div class="itemLeft" :class="{'playing':ifPlay(index)}">
              <svg class="icon"
                   aria-hidden="true"
                   v-show="ifPlay(index)">
                <use xlink:href="#icon-xiaolaba"></use>
              </svg>
              <span class="songName" >{{item.name}}</span>
              <span class="singerName" >{{"-"+ singerName(item)}}</span>
            </div>
            <svg class="icon delete"
                 aria-hidden="true" @click.stop="deleteItem(index)">
              <use xlink:href="#icon-fork"></use>
            </svg>
          </div>
        </div>
      </scroll>
      </div>
    </div>
    </transition>
</template>

<script>
import scroll from "base/scroll.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "playlist",
  components: {
    scroll
  },
  props: {
    specialShow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(["playingList", "Mode", "currentIndex", "ifPlaying"]),
    modeName() {
      let modeName = "";
      switch (this.Mode) {
        case 0:
          modeName = "顺序播放";
          break;
        case 1:
          modeName = "循环播放";
          break;
        case 2:
          modeName = "随机播放";
          break;
      }
      return modeName;
    }
  },
  methods: {
    ...mapMutations(["deleteSong", "setCurrentIndex", "setChangeStatus"]),
    ...mapActions(["closePlay"]),
    playSong(index) {
      if (this.currentIndex == index) {
        this.close();
        if (!this.ifPlaying) {
          this.$emit("play");
        }
      } else {
        this.setCurrentIndex(index);
      }
    },
    changeMode() {
      this.$emit("changeMode");
    },
    deleteItem(index) {
      if (index == this.currentIndex && index == this.playingList.length - 1) {
        if (this.playingList.length > 1) {
          this.setCurrentIndex(0);
          this.deleteSong(index);
        } else {
          this.closePlay();
        }
      } else if (index < this.currentIndex) {
        console.log("ssss");
        this.setChangeStatus(true);
        this.setCurrentIndex(this.currentIndex - 1);
        this.deleteSong(index);
      } else {
        this.deleteSong(index);
      }
    },
    ifPlay(index) {
      return this.currentIndex == index;
    },
    close() {
      this.$emit("closeList");
    },
    singerName(song) {
      let namelist = [];
      let singers = song.ar || song.artists;
      singers.forEach(item => {
        namelist.push(item.name);
      });
      let name = namelist.join("/");
      return name;
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        if (this.currentIndex > 8 && this.$refs.listSroll) {
          let firsetEle = this.$refs.listItem[this.currentIndex - 3];
          this.$refs.listSroll.scroll.scrollToElement(firsetEle, 100);
        }
      }, 20);
    });
  }
};
</script>

<style lang="stylus" scoped>
.border-bottom
  &:before
    border-color #363636
.playing
  color red
  .songName
    margin-left .1rem
  .singerName
    color red !important
.listPage
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  z-index 421
  overflow hidden
  .filter
    position relative
    width 100%
    height 100%
    background-color #333
    opacity 0.4
  .list
    position fixed
    bottom 0
    left 0
    right 0
    z-index 120
    height 58vh
    overflow hidden
    .top
      height 8vh
      display flex
      align-items center
      justify-content space-between
      padding 0 0.2rem
      font-size 0.32rem
      background-color #282828
      border-radius .3rem .3rem 0 0
      .left, .claearList
        display flex
        align-items center 
        .modeDesc
          margin-left .2rem 
        .mode,.clear
          font-size .4rem 
        .mode
          font-size .45rem 
        .clear
          margin-right .15rem
    .wrapper
      position fixed
      bottom 0
      left 0
      right 0
      height 50.3vh
      overflow hidden
      .content
        min-height 100%
        background-color #282828
        .songItem
          height 0.8rem
          line-height 0.8rem
          display flex
          align-items center
          justify-content space-between
          padding 0 0.2rem
          font-size 0.3rem
          .itemLeft
            flex 1
            overflow hidden
            white-space nowrap
            display flex
            align-items center
            margin-right .2rem
            .singerName
              white-space nowrap
              overflow hidden
              text-overflow ellipsis
              width 40%
              margin-left .1rem
              font-size 0.27rem
              color #999
 .playList-enter-active, .playList-leave-active
  transition all 0.3s
  .list
    transition all 0.3s
    opacity 1
.playList-enter, .playList-leave-to
  opacity 0
  .list
    transform translateY(100%)
    opacity 0
</style>
