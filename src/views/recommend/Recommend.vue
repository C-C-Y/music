<template>
  <scroll :data="[bannerData,songList,newSong,albumList]"
          :bounce="{top:true,left:false,right:false,bottom:false}"
          class="recommendBox">
    <div>
      <banner class="banner"
              :bannerData="bannerData"
              :heightPercent="0.3"></banner>
      <div class="recommendItem">
        <div class="itemBox"
             @click="enterFM">
          <div class="itemIcon">
            <svg class="icon optionIcon"
                 aria-hidden="true">
              <use xlink:href="#icon-diantaizhibo"></use>
            </svg>
          </div>
          <span class="itemDesc">私人FM</span>
        </div>
        <div class="itemBox"
             @click="enterDaily">
          <div class="itemIcon specialDate">
            <svg class="icon optionIcon"
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
          </div>
          <span class="itemDesc">每日推荐</span>
        </div>
        <router-link class="itemBox"
                     tag="div"
                     to="/superblist">
          <div class="itemIcon">
            <svg class="icon optionIcon"
                 aria-hidden="true">
              <use xlink:href="#icon-liebiao"></use>
            </svg>
          </div>
          <span class="itemDesc">歌单</span>
        </router-link>
        <router-link class="itemBox"
                     tag="div"
                     :to="{name:'ranklist'}">
          <div class="itemIcon">
            <svg class="icon optionIcon"
                 aria-hidden="true">
              <use xlink:href="#icon-paixingbang"></use>
            </svg>
          </div>
          <span class="itemDesc">排行榜</span>
        </router-link>
      </div>
      <div>
        <router-link class="top"
                     tag="div"
                     to="/superblist">
          <span class="text">推荐歌单</span>
          <svg class="icon allIcon"
               aria-hidden="true">
            <use xlink:href="#icon-youjiantou"></use>
          </svg>
        </router-link>
        <div class="listBox">
          <router-link class="itemBox"
                       v-for="item of songList"
                       :key="item.id"
                       tag="div"
                       :to="{name:'songlist',params:{listId:item.id}}">
            <img v-lazy="item.picUrl"
                 alt="图片"
                 class="itemPic">
            <div class="listDesc">{{item.name}}</div>
            <div class="playCount">
              <svg class="icon countIcon"
                   aria-hidden="true">
                <use xlink:href="#icon-erji"></use>
              </svg>
              <span class="count">{{count(item.playcount)}}</span>
            </div>
          </router-link>
        </div>
      </div>
      <div v-if="newSong.length && albumList.length"
           class="newMusic">
        <p class="newMusicTop">最新音乐</p>
        <div class="listBox">
          <router-link class="itemBox"
                       tag="div"
                       :to="{name:'latestsongs'}">
            <img v-lazy="newSong[0].song.album.picUrl"
                 alt="图片"
                 class="itemPic titleImg">
            <p class="listDesc">推荐合口味的新歌</p>
            <span class="desc">
              新歌推荐
            </span>
          </router-link>
          <div class="itemBox"
               @click="playThis(newSong[1].song)">
            <img v-lazy="newSong[1].song.album.picUrl"
                 alt="图片"
                 class="itemPic">
            <div class="listDesc">{{newSong[1].name}}</div>
          </div>
          <div class="itemBox"
               @click="playThis(newSong[2].song)">
            <img v-lazy="newSong[2].song.album.picUrl"
                 alt="图片"
                 class="itemPic">
            <div class="listDesc">{{newSong[2].name}}</div>
          </div>
          <router-link class="itemBox"
                       tag="div"
                       :to="{name:'newestdisc'}">
            <img v-lazy="albumList[0].picUrl"
                 alt="图片"
                 class="itemPic titleImg">
            <div class="listDesc">最新碟片</div>
            <span class="desc">
              新碟上架
            </span>
          </router-link>
          <router-link class="itemBox"
                       tag="div"
                       :to="{name:'album',params:{albumId:albumList[1].id}}">
            <img v-lazy="albumList[1].picUrl"
                 alt="图片"
                 class="itemPic">
            <div class="listDesc">{{albumList[1].name}}</div>
          </router-link>
          <router-link class="itemBox"
                       tag="div"
                       :to="{name:'album',params:{albumId:albumList[2].id}}">
            <img v-lazy="albumList[2].picUrl"
                 alt="图片"
                 class="itemPic">
            <div class="listDesc">{{albumList[2].name}}</div>
          </router-link>
        </div>
      </div>
    </div>
  </scroll>
</template>

<script>
import scroll from "base/scroll.vue";
import api from "@/api/api.js";
import banner from "base/banner.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "recommend",
  data() {
    return {
      bannerData: [],
      songList: [],
      newSong: [],
      albumList: []
    };
  },
  components: {
    banner,
    scroll
  },
  computed: {
    ...mapGetters(["currentIndex", "playingList", "fm"]),
    today() {
      return new Date().getDate();
    }
  },
  methods: {
    ...mapActions(["selectPlay", "playSingleSong"]),
    ...mapMutations([
      "setFullSCreen",
      "replacePlayList",
      "setChangeStatus",
      "setCurrentIndex",
      "setFmState"
    ]),
    playThis(song) {
      this.playSingleSong(song);
    },
    count(num) {
      let res = Math.ceil(num / 10000) + "万";
      return res;
    },
    enterDaily() {
      this.$router.push("/dailysong");
    },
    getFMdata() {
      this.$axios
        .get(`${api.url}/personal_fm`, {
          withCredentials: true
        })
        .then(result => {
          let fmList = [...result.data.data];
          this.setFmState(1);
          this.selectPlay({ list: fmList, index: 0, fm: 1 });
        })
        .catch(err => {
          console.log(err);
        });
    },
    enterFM() {
      if (this.fm) {
        this.setFullSCreen(true);
      } else {
        this.getFMdata();
      }
    },
    getData() {
      let getBanner = this.$axios.get(`${api.url}/banner`, {
        withCredentials: true
      });
      let getRecomList = this.$axios.get(`${api.url}/recommend/resource`, {
        withCredentials: true
      });
      let getNewSong = this.$axios.get(`${api.url}/personalized/newsong`, {
        withCredentials: true
      });
      let getNewAlbum = this.$axios.get(
        `${api.url}/top/album?offset=0&limit=3`,
        {
          withCredentials: true
        }
      );
      this.$axios
        .all([getBanner, getRecomList, getNewSong, getNewAlbum])
        .then(
          this.$axios.spread((banner, list, song, album) => {
            this.bannerData = banner.data.banners;
            this.newSong = song.data.result.slice(0, 3);
            this.songList = list.data.recommend.slice(0, 6);
            this.albumList = album.data.albums;
          })
        )
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getData();
  },
  watch: {
    currentIndex(val) {
      if (this.fm && val == this.playingList.length - 1) {
        this.$axios
          .get(`${api.url}/personal_fm`, {
            withCredentials: true
          })
          .then(result => {
            if (this.FMfirstClick) {
              this.setFMfirstClick(false);
            }
            let newfmList = this.playingList.concat(result.data.data);
            this.replacePlayList(newfmList);
          })
          .catch(err => {
            console.log(err);
          });
      }
      if (val == 3) {
        let playList = [...this.playingList];
        playList.splice(0, 3);
        this.setChangeStatus(true);
        this.setCurrentIndex(val - 3);
        this.replacePlayList(playList);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.recommendBox
  position fixed
  top 1.7rem
  left 0
  right 0
  bottom 0
  overflow hidden
  background-color #171717
  color #eee
  .banner
    height 0
    width 100%
    padding-bottom 37.05%
    background-color #777
  .recommendItem
    display flex
    justify-content space-around
    margin-top 0.4rem
    .itemBox
      display flex
      flex-direction column
      align-items center
      position relative
      .itemIcon
        height 1rem
        width 1rem
        border-radius 0.5rem
        background-color #555
        display flex
        position relative
        justify-content center
        align-items center
        color #fff
        font-size 0.45rem
      .specialDate
        font-size 0.5rem
      .itemDesc
        margin-top 0.2rem
        font-size 0.27rem
  .newMusic
    margin-top 0.5rem
    padding-bottom 1.2rem
    .newMusicTop
      margin-left 0.2rem
      height 0.45rem
      line-height 0.45rem
      font-size 0.3rem
  .top
    display flex
    height 0.45rem
    line-height 0.45rem
    align-items center
    margin-top 0.4rem
    .text
      font-size 0.3rem
      margin-left 0.2rem
    .allIcon
      margin-left 0.1rem
      font-size 0.3rem
  .listBox
    display flex
    justify-content space-between
    padding 0 0.15rem
    flex-wrap wrap
    .itemBox
      width 31vw
      display flex
      flex-direction column
      position relative
      margin-top 0.15rem
      .playCount
        position absolute
        top 0.1rem
        right 0.1rem
        font-size 0.2rem
        display flex
        align-items center
        color #fff
        .countIcon
          margin-right 0.05rem
          font-size 0.3rem
      .itemPic
        width 100%
        height 31vw
        filter brightness(80%)
        margin-bottom 0.15rem
      .titleImg
        filter brightness(8%)
      .listDesc
        overflow hidden
        text-overflow ellipsis
        display -webkit-box
        -webkit-line-clamp 2
        -webkit-box-orient vertical
        font-size 0.25rem
        line-height 0.3rem
      .desc
        position absolute
        top 40%
        left 50%
        transform translate(-50%, -50%)
        display inline-block
        width 50%
        font-size 0.4rem
</style>
