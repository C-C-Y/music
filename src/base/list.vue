<template>
  <scroll :data="songlist"
          :probeType="needListen.probeType"
          :listenScroll="needListen.listenScroll"
          @scroll="scroll"
          :bounce="bounce"
          ref="ssee">
    <div>
      <slot name="listTop"></slot>
      <div class="listContent"
           ref="listContent">
        <slot name="listHeader"></slot>
        <div class="songsBox">
          <ul>
            <li v-for="(song, index) in songlist"
                :key="song.id"
                class="songItem border-bottom"
                @click="playThis(index)">
              <span class="songIndex"
                    v-if="!songImgShow">{{index+1}}</span>
              <img v-lazy="album(song).picUrl"
                   class="songImg"
                   v-if="songImgShow">
              <div class="songInfo"
                   :class="{'noCopyright':unablePlayIdList.includes(song.id)}">
                <span class="songName">{{song.name}}</span>
                <span class="authorAlbum"
                      :class="{'noCopyright':unablePlayIdList.includes(song.id)}">{{singerName(song)+"-"+album(song).name}}</span>
              </div>
              <svg class="icon songOption"
                   aria-hidden="true"
                   @click.stop="showMenu(index)">
                <use xlink:href="#icon-icon"></use>
              </svg>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </scroll>
</template>

<script>
import scroll from "base/scroll.vue";
export default {
  name: "list",
  data() {
    return {};
  },
  components: {
    scroll
  },
  props: {
    bounce: {
      type: [Object, Boolean],
      default() {
        return true;
      }
    },
    songlist: {
      type: Array,
      default() {
        return [];
      }
    },
    unablePlayIdList: {
      type: Array,
      default: null
    },
    songImgShow: {
      type: Boolean,
      default: false
    },
    needListenScroll: {
      type: Boolean,
      default: false
    },
    heightPercent: {
      type: Number,
      default: 0.6
    }
  },
  computed: {
    needListen() {
      if (this.needListenScroll) {
        return {
          probeType: 3,
          listenScroll: true
        };
      } else {
        return {
          probeType: 1,
          listenScroll: false
        };
      }
    }
  },
  methods: {
    singerName(song) {
      let namelist = [];
      let singers = song.ar || song.artists;
      singers.forEach(item => {
        namelist.push(item.name);
      });
      let name = namelist.join("/");
      return name;
    },
    album(song) {
      return song.al || song.album;
    },
    scroll(pos) {
      this.$emit("scroll", pos);
    },
    showMenu(index) {
      this.$emit("showMenu", index);
    },
    playThis(index) {
      this.$emit("playThis", index);
    }
  },
  mounted() {
    if (this.heightPercent) {
      this.$nextTick(() => {
        let innerHeight = window.innerHeight * this.heightPercent;
        let height = innerHeight;
        this.$refs.listContent.style.minHeight = `${height}px`;
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.border-bottom
  &:before
    border-color #333
.noCopyright
  color #777 !important
.listContent
  background-color #222
  color #ccc
  padding-bottom 1.25rem
  .songItem
    position relative
    height 1.1rem
    width 100%
    display flex
    align-items center
    .songIndex
      font-size 0.35rem
      width 0.8rem
      text-align center
    .songImg
      height 80%
      width .88rem
      margin 0 .2rem
    .songInfo
      display flex
      flex-direction column
      .songName
        font-size 0.32rem
        overflow-x hidden
        max-width 70% vw
        white-space nowrap
        text-overflow ellipsis
      .authorAlbum
        height 0.4rem
        line-height 0.4rem
        font-size 0.25rem
        max-width 70% vw
        white-space nowrap
        text-overflow ellipsis
        color #999
        overflow-x hidden
    .songOption
      position absolute
      right 0.4rem
      font-size 0.35rem
      color #999
</style>
