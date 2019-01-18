<template>
  <div>
    <div class="top">
      <svg class="icon backIcon"
           aria-hidden="true"
           @click="back()">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
      <span class="topName">{{"评论("+ total+")"}}</span>
    </div>
    <scroll v-if="hotComment.length&&newComment.length"
            class="wrapper"
            :bounce="{top:false,left:false,right:false,bottom:true}"
            :pullUpLoad="true"
            :hasGotData="hasGotData"
            :data="[hotComment.length,newComment.length]"
            @pullingUp="getData">
      <div class="contentBox">
        <div class="songData" @click="play">
          <img v-lazy="song.pic"
               alt=""
               class="songPic">
          <div class="rightData">
            <p class="songName">{{song.name}}</p>
            <p class="singer">{{song.singer}}</p>
          </div>
          <svg class="icon enter"
               aria-hidden="true">
            <use xlink:href="#icon-youjiantou"></use>
          </svg>
        </div>
        <div class="hotComment">
          <p class="title">精彩评论</p>
          <div class="itemBox"
               v-for="(item,index) of hotComment"
               :key="index">
            <img v-lazy="item.user.avatarUrl"
                 alt=""
                 class="avatar">
            <img v-lazy="item.pendantData.imageUrl"
                 alt=""
                 v-if="item.pendantData"
                 class="avatar pendant">
            <div class="comment">
              <div class="extraInfo">
                <div class="left">
                  <p class="nickname">
                    {{item.user.nickname}}
                  </p>
                  <p class="commentTime">{{time(item.time)}}</p>
                </div>
                <div class="support">
                  <span class="supportCount">{{item.likedCount}}</span>
                  <svg class="icon supportIcon"
                       aria-hidden="true">
                    <use xlink:href="#icon-dianzan"></use>
                  </svg>
                </div>
              </div>
              <p class="content">{{item.content}}</p>
            </div>
          </div>
        </div>
        <div class="hotComment">
          <p class="title">最新评论</p>
          <div class="itemBox"
               v-for="(item,index) of newComment"
               :key="index">
            <img v-lazy="item.user.avatarUrl"
                 alt=""
                 class="avatar">
            <img v-lazy="item.pendantData.imageUrl"
                 alt=""
                 v-if="item.pendantData"
                 class="avatar pendant">
            <div class="comment">
              <div class="extraInfo">
                <div class="left">
                  <p class="nickname">
                    {{item.user.nickname}}
                  </p>
                  <p class="commentTime">{{time(item.time)}}</p>
                </div>
                <div class="support">
                  <span class="supportCount">{{item.likedCount||""}}</span>
                  <svg class="icon supportIcon"
                       aria-hidden="true">
                    <use xlink:href="#icon-dianzan"></use>
                  </svg>
                </div>
              </div>
              <p class="content">{{item.content}}</p>
            </div>
          </div>
        </div>
        <loading v-show="loadingShow"></loading>
      </div>
    </scroll>
    <loading v-else
             class="fullLoading"></loading>
  </div>
</template>

<script>
import api from "@/api/api";
import scroll from "base/scroll.vue";
import loading from "base/loading.vue";
import getTime from "asset/js/time.js";
import { mapActions } from "vuex";
export default {
  name: "songcomment",
  data() {
    return {
      page: 1,
      hotComment: [],
      newComment: [],
      hasGotData: false,
      song: {},
      loadingShow: false,
      nowTime: new Date().getTime(),
      total: ""
    };
  },
  components: {
    loading,
    scroll
  },
  computed: {
    offset() {
      return (this.page - 1) * 20;
    }
  },
  methods: {
    ...mapActions(["playSingleSong"]),
    play() {
      let songId = this.$route.params.songId;
      this.$axios
        .get(`${api.url}/song/detail?ids=${songId}`, {
          withCredentials: true
        })
        .then(result => {
          if (result.data.privileges[0].subp) {
            this.playSingleSong(result.data.songs[0]);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    back() {
      this.$router.go(-1);
    },
    time(stamp) {
      return getTime(this.nowTime, stamp);
    },
    getData() {
      let id = this.$route.params.songId;
      this.page == 1 ? (this.loadingShow = false) : (this.loadingShow = true);
      this.$axios
        .get(`${api.url}/comment/music?id=${id}&offset=${this.offset}&limit=20`)
        .then(result => {
          this.page++;
          this.total = result.data.total;
          this.newComment = this.newComment.concat(result.data.comments);
          if (result.data.hotComments) {
            this.hotComment = result.data.hotComments;
          }
          this.loadingShow = false;
          this.hasGotData = !this.hasGotData;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getData();
    this.song = this.$route.params.song;
  }
};
</script>

<style lang="stylus" scoped>
.fullLoading
  position absolute
  top 50%
  left 50%
  transform translate(-50%, -50%)
.top
  position fixed
  top 0
  left 0
  right 0
  height 0.9rem
  display flex
  align-items center
  padding 0 0.15rem
  font-size 0.32rem
  color #ddd
  background-color #181818
  .backIcon
    margin-right 0.15rem
    font-size 0.42rem
.wrapper
  position fixed
  top 0.88rem
  left 0
  right 0
  bottom 0
  overflow hidden
  color #ccc
  z-index 350
  .contentBox
    background-color #111
    .songData
      display flex
      align-items center
      padding 0.15rem
      background-color #111
      .songPic
        width 17vw
        height 17vw
        border-radius 0.1rem
      .rightData
        flex 1
        margin-left 0.15rem
        font-size 0.31rem
        .songName
          height 0.33rem
          line-height 0.33rem
        .singer
          margin-top 0.1rem
          height 0.29rem
          line-height 0.29rem
          font-size 0.27rem
          color rgba(0, 102, 221, 1)
          overflow hidden
          max-width 80vw
          text-overflow ellipsis
          white-space nowrap
      .enter
        font-size 0.35rem
        color #bbb
        margin-right 0
    .title
      height 0.6rem
      line-height 0.6rem
      padding-left 0.15rem
      font-size 0.26rem
      color #aaa
      background-color #151515
    .itemBox
      padding 0.15rem
      display flex
      position relative
      margin-top 0.2rem
      .avatar
        width 0.6rem
        height 0.6rem
        border-radius 0.3rem
        filter brightness(80%)
      .pendant
        position absolute
        top 0
        left 0
      .comment
        flex 1
        margin-left 0.15rem
        align-items stretch
        .extraInfo
          height 0.6rem
          display flex
          align-items center
          justify-content space-between
          .nickname
            font-size 0.27rem
            color #aaa
          .commentTime
            margin-top 0.08rem
            font-size 0.2rem
            color #777
          .support
            display flex
            align-items center
            font-size 0.27rem
            .supportIcon
              font-size 0.32rem
              margin-left 0.1rem
              margin-bottom 0.1rem
        .content
          margin-top 0.15rem
          line-height 0.34rem
          font-size 0.29rem
          color #ccc
</style>
