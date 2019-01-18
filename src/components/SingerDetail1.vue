<template>
  <div class="box">
    <card :initIndex="1"
          :tabArr="tabs" class="showCards" :secondMove="secondMove" @seclect="seclect">
      <div class="hotSong"
           slot="1">
        <div v-for="(item,index) of hotSongs" :key="index" class="song border-bottom">
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
      <div class="albumList"
           slot="2">
           <div v-if="albumList.length">
        <ul class="listBox">
          <li class="list border-bottom" v-for="list of albumList" :key="list.id">
            <img v-lazy="list.picUrl" alt="" class="listPic">
            <div class="listDesc">
              <p class="listName">{{list.name}}</p>
              <p class="publishTime">{{time(list.publishTime,list.size)}}</p>
            </div>
          </li>
        </ul>
        </div>
         <loading v-else
             class="fullLoading"></loading>
      </div>
      <div class="video"
           slot="3">
        以后可能会加上
      </div>
      <div class="activity"
           slot="4">
        <span class="myWord">作者及其朋友都未发过动态,不知道动态如何展示...</span>
        <span class="myWord">如果可以请加我好友"山楂心",向我展示你的动态!</span>
        <span class="myWord">后续可能会补上此功能</span>
      </div>
    </card>
  </div>
</template>

<script>
import Card from "base/card.vue";
import loading from "base/loading.vue";

export default {
  name: "SingerDetail",
  data() {
    return {
      tabs: ["热门单曲", "专辑", "视频", "艺人信息"]
    };
  },
  components: {
    Card,
    loading
  },
  props: {
    singerId: {
      type: Number,
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
    },
    secondMove: {
      type: [String, Number],
      default: 0
    }
  },
  computed: {},
  methods: {
    time(time, size) {
      let publishTime = new Date(time).toLocaleDateString();
      let res = publishTime.replace(/\//g, ".");
      res = res + ` ${size}首歌`;
      return res;
    },
    seclect(index) {
      this.$emit("seclect", index);
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
        name: "songlist",
        params: {
          listId: id
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.showCards >>> .content
  position relative
  background-color #222
  color #ccc
  overflow-x hidden
  min-height 100%vh
  z-index 8
.border-bottom
  &:before  
    border-color #333
.fullLoading
  position absolute
  top 50%
  left 50%
  transform translate(-50%, -50%)    
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
.albumList
  position relative      
  .list
    position relative
    height 1.1rem
    width 100%
    display flex
    align-items center
    margin-top .15rem
    .listPic
      height .85rem
      width .85rem
      border-radius .1rem
      margin-left .15rem
    .listDesc
      display flex
      flex-direction column
      justify-content center
      margin-left .2rem
      .listName
        line-height .45rem
        font-size .3rem
        color #eee
        flex  1
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
      .publishTime
        line-height .3rem
        font-size .23rem
        color #999
.activity
  display flex
  flex-direction column
  align-items center
  padding-top .2rem 
  .myWord
    line-height .7rem
    font-size .3rem   
</style>
