<template>
  <scroll class="wrapper"
          :bounce="{top:false,bottom:true,left:false,right:false}"
          :data="dataArray"
          :pullUpLoad="true"
          :hasGotData="hasGotData"
           @pullingUp="getMoreData">
    <div>
      <div v-if="dataArray.length"
           class="content">
        <div v-if="type==1">
          <ul>
            <li v-for="(song, index) in dataArray"
                :key="song.id"
                class="songItem border-bottom"
                @click="playThis(song.id)">
              <span class="songIndex">{{index+1}}</span>

              <div class="songInfo">
                <span class="songName">{{song.name}}</span>
                <span class="authorAlbum">{{singerName(song)+"-"+(song.album&&song.album.name)}}</span>
              </div>
              <svg class="icon songOption"
                   aria-hidden="true"
                   @click.stop="showMenu(index)">
                <use xlink:href="#icon-icon"></use>
              </svg>
            </li>
          </ul>
        </div>
        <div v-if="type==10">
          <ul class="listBox">
            <li class="list border-bottom"
                v-for="list of dataArray"
                :key="list.id"
                @click="enterAlbum(list.id)">
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
        <div v-if="type==100">
          <div class="singerItem border-bottom"
               v-for="(item,index) of dataArray"
               :key="index"
               @click.stop="enterSinger(item.id)">
            <img v-lazy="item.img1v1Url"
                 alt=""
                 class="pic">
            <span class="singerName">{{item.name}}</span>
          </div>
        </div>
        <div v-if="type==1000">
          <div class="songList border-bottom"
               v-for="(item,index) of dataArray"
               :key="index"
               @click.stop="enterSongList(item.id)">
            <img v-lazy="item.coverImgUrl"
                 alt=""
                 class="pic">
            <div class="listDesc">
              <p class="listName">{{item.name}}</p>
              <p class="extraInfo">{{(extraInfo(item))}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="noContent" v-if="!noContent">暂无相关内容</div>
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
                <router-link class="optionItem border-bottom"
                             tag="li"
                             :to="{name:'singerpage',params:{singerId:optionObj.artists[0].id}}">
                  <svg class="icon optionIcon"
                       aria-hidden="true">
                    <use xlink:href="#icon-geshou"></use>
                  </svg>
                  <span class="album">{{"歌手: "+ singerName(optionObj)}}</span>
                </router-link>
                <li class="optionItem border-bottom">
                  <svg class="icon optionIcon"
                       aria-hidden="true">
                    <use xlink:href="#icon-zhuanjiguangpan"></use>
                  </svg>
                  <span class="album">{{"专辑: "+ optionObj.album.name}}</span>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      <loading v-show="!dataArray.length &&noContent"
               class="fullLoading"></loading>
    </div>
  </scroll>
</template>

<script>
import { mapActions } from "vuex";

import scroll from "base/scroll.vue";
import api from "@/api/api";
import loading from "base/loading.vue";
export default {
  name: "searchview",
  components: {
    scroll,
    loading
  },
  computed: {
    offset() {
      return (this.page - 1) * 30;
    }
  },
  data() {
    return {
      dataArray: [],
      type: 1,
      optionShow: false,
      optionObj: {},
      noContent: true,
      page: 1,
      hasGotData: false
    };
  },
  methods: {
    ...mapActions(["playSingleSong"]),
    playThis(id) {
      this.$axios
        .get(`${api.url}/song/detail?ids=${id}`, {
          withCredentials: true
        })
        .then(result => {
          let song = result.data.songs[0];
          this.playSingleSong(song);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getMoreData() {
      let type = this.$route.params.type;
      let key = this.$route.params.key;
      this.getData(key, type);
    },
    closeOption() {
      this.optionShow = false;
    },
    enterAlbum(id) {
      this.$router.push({ name: "album", params: { albumId: id } });
    },
    enterSongList(id) {
      this.$router.push({ name: "songlist", params: { listId: id } });
    },
    enterSinger(id) {
      this.$router.push({ name: "singerpage", params: { singerId: id } });
    },
    extraInfo(item) {
      let creator = "";
      if (item.creator) {
        creator = item.creator.nickname;
      }
      let count = item.playCount ? this.count(item.playCount) : "";
      let num = item.trackCount ? item.trackCount + "首" : "";
      let res = num + "  by" + creator + ",  " + count;
      return res;
    },
    count(num) {
      if (num <= 100000) {
        return "播放" + num + "次";
      }
      let res = "播放" + Math.ceil(num / 10000) + "万次";
      return res;
    },
    showMenu(index) {
      this.optionObj = this.dataArray[index];
      this.optionShow = true;
    },
    singerName(song) {
      let namelist = [];
      let singers = song.ar || song.artists;
      if (!singers) {
        return;
      }
      singers.forEach(item => {
        namelist.push(item.name);
      });
      let name = namelist.join("/");
      return name;
    },
    time(time, size) {
      let publishTime = new Date(time).toLocaleDateString();
      let res = publishTime.replace(/\//g, ".");
      res = res + ` ${size}首歌`;
      return res;
    },
    getData(key, type) {
      this.noContent = true;
      this.$axios
        .get(
          `${api.url}/search?keywords=${key}&type=${type}&offset=${
            this.offset
          }`,
          {
            withCredentials: true
          }
        )
        .then(result => {
          this.page += 1;
          let newData =
            result.data.result.songs ||
            result.data.result.albums ||
            result.data.result.artists ||
            result.data.result.playlists ||
            [];
          this.dataArray = [...this.dataArray, ...newData];
          if (!this.dataArray.length) {
            this.noContent = false;
          }
          this.hasGotData = !this.hasGotData;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.dataArray = [];
    this.hasGotData = false;
    let type = this.$route.params.type;
    let key = this.$route.params.key;
    this.getData(key, type);
  },
  watch: {
    $route(to, from) {
      this.dataArray = [];
      this.hasGotData = false;
      this.page = 1;
      if (to.params.type) {
        this.type = to.params.type;
      } else {
        return;
      }
      /*  if (!from.params.key || from.params.key !== to.params.key) {
        this.type = 1;
        this.getData(to.params.key, 1);
        return;
      } */
      if (from.params.type && to.params.type != from.params.type) {
        this.getData(from.params.key, to.params.type);
      } else {
        return;
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
.option-enter-active, .option-leave-active
  opacity 1
  transition all 0.5s ease
  transform translateY(0)
.option-enter, .option-leave-to
  opacity 0
  transform translateY(100%)
.noContent
  color #ccc
  position relative
  top 1rem
  text-align center
  font-size .32rem  
.OptionDetail
  position fixed
  top 0
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
.border-bottom
  &:before
    border-color #222
.wrapper
  position absolute
  top 1.9rem
  left 0
  right 0
  bottom 0
  overflow hidden
  .content
    position relative
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
        width 0.88rem
        margin 0 0.2rem
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
          color #999
          overflow-x hidden
      .songOption
        position absolute
        right 0.4rem
        font-size 0.35rem
        color #999
    .listBox
      position relative
      padding-top 0.15rem
      .list
        position relative
        height 1.1rem
        width 100%
        display flex
        align-items center
        padding-top 0.15rem
        .listPic
          height 0.9rem
          width 0.9rem
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
    .singerItem
      margin-top 0.15rem
      display flex
      align-items center
      padding 0 0.15rem 0 0.15rem
      font-size 0.32rem
      color #ccc
      &:first-child
        color rgba(0, 102, 221, 1)
      .pic
        height 0.9rem
        width 0.9rem
        border-radius 0.1rem
        margin-right 0.2rem
    .songList
      margin-top 0.15rem
      display flex
      align-items center
      padding 0 0.15rem 0 0.15rem
      color #ccc
      .pic
        height 0.9rem
        width 0.9rem
        border-radius 0.1rem
        margin-right 0.2rem
      .listDesc
        display flex
        flex-direction column
        justify-content center
        .listName
          height 0.5rem
          color rgba(0, 102, 221, 1)
          line-height 0.5rem
          font-size 0.3rem
          max-width 80vw
          overflow hidden
          white-space nowrap
          text-overflow ellipsis
        .extraInfo
          color #999
          font-size 0.25rem
          margin-top 0.1rem
          height 0.4rem
          line-height 0.4rem
          max-width 80vw
          overflow hidden
          white-space nowrap
          text-overflow ellipsis
</style>
