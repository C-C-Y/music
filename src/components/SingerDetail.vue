<template>
  <scroll class="innerWrapper"
          ref="wrapper"
          :bounce="false"
          :data="[hotSongs.length,albumList.length,video.length]"
          @scroll="scroll"
          :listenScroll="true"
          :probeType="3"
          :canScroll="innerCanScroll">
    <div class="content"
         ref="innerContent">
      <div class="hotsong"
           v-if="hotSongs.length&&cardIndex==0">
        <div v-for="(item,index) of hotSongs"
             :key="index"
             class="song border-bottom" @click="play(index)">
          <span class="index">{{index+1}}</span>
          <div class="songInfo">
            <p class="songName">{{item.name}}</p>
            <p class="authorAlbum">{{singerName(item)+"-"+item.al.name}}</p>
          </div>
          <svg class="icon songOption"
               aria-hidden="true"
               @click.stop="showMenu(index)">
            <use xlink:href="#icon-icon"></use>
          </svg>
        </div>
      </div>
      <div v-if="albumList.length&&cardIndex==1">
        <ul class="listBox">
          <li class="list border-bottom"
              v-for="list of albumList"
              :key="list.id" @click="enterSongList(list.id)">
            <img v-lazy="list.picUrl"
                 alt=""
                 class="listPic">
            <div class="listDesc">
              <p class="listName">{{list.name}}</p>
              <p class="publishTime">{{time(list.publishTime,list.size)}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="video"
           v-if="cardIndex==2">
        以后可能会加上
      </div>
      <div class="info"
           v-if="cardIndex==3">
        <p class="title">简介</p>
        <p class="desc">{{singerInfo}}</p>
      </div>
    </div>
  </scroll>
</template>

<script>
// import loading from "base/loading.vue";
import scroll from "base/scroll.vue";
import { mapActions } from "vuex";

export default {
  name: "SingerDetail",
  data() {
    return {};
  },
  components: {
    scroll
  },
  props: {
    innerCanScroll: {
      type: Boolean,
      default: false
    },
    cardIndex: {
      type: Number,
      default: 0
    },
    singerId: {
      type: [Number, String],
      default: null
    },
    hotSongs: {
      type: Array,
      default() {
        return [];
      }
    },
    albumList: {
      type: Array,
      default() {
        return [];
      }
    },
    video: {
      type: Array,
      default() {
        return [];
      }
    },
    singerInfo: {
      type: String,
      default: ""
    }
  },
  computed: {},
  methods: {
    ...mapActions(["selectPlay"]),
    showMenu(index) {
      this.$emit("showMenu", index);
    },
    play(index) {
      let list = [...this.hotSongs];
      this.selectPlay({ list, index });
    },
    scroll(pos) {
      this.$emit("innerScroll", pos.y);
    },
    time(time, size) {
      let publishTime = new Date(time).toLocaleDateString();
      let res = publishTime.replace(/\//g, ".");
      res = res + ` ${size}首歌`;
      return res;
    },
    singerName(song) {
      let namelist = [];
      let singers = song.ar || song.artists;
      singers.forEach(item => {
        namelist.push(item.name);
      });
      let name = namelist.join("/");
      return name;
    },
    enterSongList(id) {
      this.$router.push({
        name: "album",
        params: {
          albumId: id
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.border-bottom
  &:before
    border-color #333
.fullLoading
  position absolute
  top 50%
  left 50%
  transform translate(-50%, -50%)
.innerWrapper
  position relative
  height 86.5vh
  overflow hidden
  background-color #111
  .content 
    min-height 86.5vh
    background-color #111
    .song
      position relative
      height 1.1rem
      width 100%
      display flex
      align-items center
      .index
        font-size 0.35rem
        width 0.8rem
        text-align center
      .songInfo
        display flex
        flex-direction column
        .songName
          font-size 0.32rem
          overflow-x hidden
          max-width 70% vw
          white-space nowrap
          text-overflow ellipsis
          color #ccc
        .authorAlbum
          height 0.4rem
          line-height 0.4rem
          font-size 0.25rem
          max-width 70% vw
          white-space nowrap
          text-overflow ellipsis
          color #777
          overflow-x hidden
      .songOption
        position absolute
        right 0.4rem
        font-size 0.35rem
        color #999
    .listBox
      position relative
      padding-top .15rem
      .list
        position relative
        height 1.1rem
        width 100%
        display flex
        align-items center
        padding-top .15rem
        .listPic
          height 0.85rem
          width 0.85rem
          border-radius 0.1rem
          margin-left 0.15rem
        .listDesc
          display flex
          flex-direction column
          justify-content center
          margin-left 0.2rem
          .listName
            line-height 0.45rem
            font-size 0.3rem
            color #eee
            flex 1
            white-space nowrap
            overflow hidden
            text-overflow ellipsis
          .publishTime
            line-height 0.3rem
            font-size 0.23rem
            color #999
    .video
      padding-top .5rem
      line-height .5rem
      height .5rem
      font-size .32rem
      color #ccc
      text-align center        
    .info
      padding .15rem .15rem 1.2rem .15rem
      .title
        height .6rem
        line-height .6rem
        font-size .32rem
        color #ddd
      .desc
        margin-top .15rem
        color #999
        font-size .27rem
        line-height .35rem  
</style>
