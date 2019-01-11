<template>
  <div v-if="dataList.length">
    <div class="top">
      <svg class="icon backIcon"
           aria-hidden="true"
           @click="back()">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
      <span class="topName">每日推荐</span>
    </div>
    <list :bounce="false"
          :songlist="dataList"
          :songImgShow="true"
          :heightPercent="0"
          class="wrapper"
          :unablePlayIdList=[]
          @playThis="plaSong"
          @showMenu="showOptionMenu">
      <div slot="listTop"
           class="listTop">
        <svg class="icon dayIcon"
             aria-hidden="true">
          <use xlink:href="#icon-rili30"
               v-if="today==31"></use>
          <use xlink:href="#icon-rili29"
               v-if="today==28"></use>
          <use xlink:href="#icon-rili31"
               v-if="today==30"></use>
          <use xlink:href="#icon-rili28"
               v-if="today==29"></use>
          <use xlink:href="#icon-rili27"
               v-if="today==26"></use>
          <use xlink:href="#icon-rili26"
               v-if="today==27"></use>
          <use xlink:href="#icon-rili25"
               v-if="today==23"></use>
          <use xlink:href="#icon-rili24"
               v-if="today==25"></use>
          <use xlink:href="#icon-rili23"
               v-if="today==22"></use>
          <use xlink:href="#icon-rili22"
               v-if="today==24"></use>
          <use xlink:href="#icon-rili21"
               v-if="today==20"></use>
          <use xlink:href="#icon-rili20"
               v-if="today==21"></use>
          <use xlink:href="#icon-rili19"
               v-if="today==19"></use>
          <use xlink:href="#icon-rili18"
               v-if="today==18"></use>
          <use xlink:href="#icon-rili17"
               v-if="today==16"></use>
          <use xlink:href="#icon-rili16"
               v-if="today==17"></use>
          <use xlink:href="#icon-rili15"
               v-if="today==15"></use>
          <use xlink:href="#icon-rili14"
               v-if="today==6"></use>
          <use xlink:href="#icon-rili13"
               v-if="today==14"></use>
          <use xlink:href="#icon-rili12"
               v-if="today==13"></use>
          <use xlink:href="#icon-rili11"
               v-if="today==10"></use>
          <use xlink:href="#icon-rili10"
               v-if="today==12"></use>
          <use xlink:href="#icon-rili9"
               v-if="today==9"></use>
          <use xlink:href="#icon-rili8"
               v-if="today==11"></use>
          <use xlink:href="#icon-rili7"
               v-if="today==8"></use>
          <use xlink:href="#icon-rili6"
               v-if="today==7"></use>
          <use xlink:href="#icon-rili5"
               v-if="today==5"></use>
          <use xlink:href="#icon-rili4"
               v-if="today==3"></use>
          <use xlink:href="#icon-rili3"
               v-if="today==4"></use>
          <use xlink:href="#icon-rili2"
               v-if="today==2"></use>
          <use xlink:href="#icon-rili1"
               v-if="today==1"></use>
        </svg>
        <span class="extraInfo">根据你的音乐口味生成,每天6:00更新</span>
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
</template>

<script>
import list from "base/list.vue";
import api from "@/api/api";
import { mapActions } from "vuex";
export default {
  name: "dailysong",
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
    today() {
      return new Date().getDate();
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
    }
  },
  components: {
    list
  },
  created() {
    this.$axios
      .get(`${api.url}/recommend/songs`, {
        withCredentials: true
      })
      .then(result => {
        this.dataList = result.data.recommend;
      })
      .catch(err => {
        console.log(err);
      });
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
.top
  position fixed
  top 0
  left 0
  right 0
  height 0.9rem
  display flex
  align-items center
  padding 0 0.2rem
  font-size 0.32rem
  color #ddd
  background-color #181818
  .backIcon
    font-size 0.42rem
.wrapper
  position fixed
  top 0.9rem
  left 0
  right 0
  bottom 0
  overflow hidden
  padding-bottom 1.2rem
  .listTop
    color #ccc
    height 30vh
    background-color #000
    display flex
    flex-direction column
    justify-content center
    align-items center 
    margin-top -.1rem
    .dayIcon
      font-size 1rem
    .extraInfo
      margin-top 0.15rem
      font-size 0.23rem
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
