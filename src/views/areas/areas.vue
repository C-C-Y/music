<template>
  <div >
    <div v-if="dataList.length">
    <list :bounce="false"
          :songlist="dataList"
          :songImgShow="false"
          :heightPercent="0"
          class="wrapper"
          :unablePlayIdList=[]
          @playThis="plaSong"
          @showMenu="showOptionMenu">
      <div slot="listTop"
           class="listTop">
        <div class="box">
          <span class="left">{{name[0]}}</span>
          <div class="right">
            <span class="top">{{name[1]}}</span>
            <span class="bottom">最新单曲</span>
          </div>
        </div>

      </div>
      <div slot="listHeader"
           class="listHeader">
        <div class="playAllSong"
             @click.stop="playAll()">
          <svg class="icon playIcon"
               aria-hidden="true">
            <use xlink:href="#icon-bofang1"></use>
          </svg>
          <span class="playAll">播放全部</span>
          <span class="count">{{"(共"+dataList.length+"首)"}}</span>
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
              <span class="album">{{"歌手: "+ singerName}}</span>
            </li>
            <li v-if="albumOption"
                class="optionItem border-bottom">
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
    </div>
    <loading v-else class="load"></loading>
  </div>
</template>

<script>
import loading from "base/loading.vue";
import list from "base/list.vue";
import api from "@/api/api";
import { mapActions } from "vuex";
export default {
  name: "areas",
  data() {
    return {
      dataList: [],
      optionShow: false,
      optionObj: {},
      albumOption: true
    };
  },
  computed: {
    singerName() {
      let namelist = [];
      let singers = this.optionObj.ar || this.optionObj.artists;
      singers.forEach(item => {
        namelist.push(item.name);
      });
      let name = namelist.join("/");
      return name;
    },
    name() {
      let areaId = this.$route.params.areaId;
      let name = "";
      switch (areaId) {
        case 1:
          name = "推荐";
          break;
        case 7:
          name = "华语";
          break;
        case 96:
          name = "欧美";
          break;
        case 8:
          name = "日本";
          break;
        case 16:
          name = "韩国";
          break;
      }
      return name;
    }
  },
  methods: {
    ...mapActions(["selectPlay"]),
    playAll() {
      this.selectPlay({ list: this.dataList, index: 0 });
    },
    back() {
      this.$router.go(-1);
    },
    plaSong(index) {
      let list = [...this.dataList];
      this.selectPlay({ list, index });
    },
    showOptionMenu(index) {
      this.optionShow = true;
      this.optionObj = this.dataList[index];
    },
    closeOption() {
      this.optionShow = false;
      this.optionObj = {};
    },
    getData(areaId) {
      if (areaId == 1) {
        this.$axios
          .get(`${api.url}/personalized/newsong`, {
            withCredentials: true
          })
          .then(result => {
            let list = [];
            result.data.result.forEach(item => {
              list.push(item.song);
            });
            this.dataList = list;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$axios
          .get(`${api.url}/top/song?type=${areaId}`, {
            withCredentials: true
          })
          .then(result => {
            this.dataList = result.data.data;
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  components: {
    list,
    loading
  },
  created() {
    let areaId = this.$route.params.areaId;
    this.getData(areaId);
  },
  watch: {
    $route(to, from) {
      if (from.params.areaId && to.params.areaId == from.params.areaId) {
        return;
      } else if (to.params.areaId) {
        this.dataList = [];
        this.getData(to.params.areaId);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.border-bottom
  &:before
    border-color #444
.option-enter-active, .option-leave-active
  opacity 1
  transition all 0.5s ease
  transform translateY(0)
.option-enter, .option-leave-to
  opacity 0
  transform translateY(100%)
.load
  position absolute 
  top 50%
  left 50%
  transform translate(-50%,-50%)  
.wrapper
  position fixed
  top 1.56rem
  left 0
  right 0
  bottom 0
  overflow hidden
  padding-bottom 1.2rem
  .listTop
    color #ccc
    height 25vh
    background-color #000
    display flex
    flex-direction column
    justify-content center
    align-items center
    margin-top -0.1rem
    position relative
    .box
      position absolute
      left 0.5rem
      bottom 0.8rem
      font-size 0.25rem
      display flex
      .left
        font-size 0.7rem
      .right
        display flex
        flex-direction column
        justify-content flex-end
        .top
          font-size 0.4rem
        .bottom
          color #aaa
  .listHeader
    height 0.8rem
    background-color #333
    color #ccc
    font-size 0.35rem
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
  top 0.9rem
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
