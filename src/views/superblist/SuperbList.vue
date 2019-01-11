<template>
  <div >
    <div class="top">
      <svg class="icon backIcon"
           aria-hidden="true"
           @click="back()">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
      <span class="topName">精品歌单</span>
    </div>
    <scroll :data="list"
            class="wrapper"
            @pullingUp="getData"
            :pullUpLoad="{threshold: 50}"
            :probeType="3"
            :hasGotData="hasGotData"
            v-if="list.length">
      <div class="content">
        <div class="listItem"
             v-for="item of list"
             :key="item.id"
             @click="enterList(item.id)">
          <div class="itemImg">
            <img v-lazy="item.coverImgUrl"
                 alt=""
                 class="img" >
            <div class="playCount">
              <svg class="icon countIcon"
                   aria-hidden="true">
                <use xlink:href="#icon-erji"></use>
              </svg>
              <span class="count">{{count(item.playCount)}}</span>
            </div>
          </div>
          <div class="listDesc">
            <p class="listName">{{item.name}}</p>
            <p class="listCreator">{{"by "+item.creator.nickname}}</p>
            <p class="extraInfo">{{item.copywriter}}</p>
          </div>
        </div>
        <loading v-show="loadingShow">
        </loading>
      </div>
    </scroll>
    <loading v-else class="fullLoading"></loading>
  </div>
</template>

<script>
import api from "@/api/api";
import scroll from "base/scroll.vue";
import loading from "base/loading.vue";
//  :pullUpLoad="{threshold: 50}"
export default {
  name: "superblist",
  data() {
    return {
      list: [],
      loadingShow: false,
      hasGotData: false
    };
  },
  components: {
    scroll,
    loading
  },
  computed: {
    updateTime() {
      let length = this.list.length;
      return length ? this.list[length - 1].updateTime : "1503639064232";
    }
  },
  methods: {
    enterList(id) {
      this.$router.push({ name: "songlist", params: { listId: id } });
    },
    back() {
      this.$router.replace({ name: "recommend" });
    },
    count(num) {
      let res = "";
      if (num < 10000) {
        res = Math.ceil(num / 1000) + "千";
        return res;
      }
      res = Math.ceil(num / 10000) + "万";
      return res;
    },
    getData() {
      this.loadingShow = true;
      this.$axios
        .get(
          `${api.url}/top/playlist/highquality?before=${
            this.updateTime
          }&limit=15`,
          {
            withCredentials: true
          }
        )
        .then(result => {
          this.loadingShow = false;
          let newList = [...this.list, ...result.data.playlists];
          this.list = newList;
          this.hasGotData = !this.hasGotData;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style lang="stylus" scoped>
.fullLoading
  position absolute 
  top 50%
  left 50%
  transform translate(-50%,-50%)  
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
  top .88rem
  left 0
  right 0
  bottom 0
  overflow hidden
  background-color #111 
  color #ccc
  .content
    padding .2rem .1rem 1.2rem .1rem 
    .listItem
      display flex
      margin-bottom .15rem
      .itemImg
        position relative
        .img
          width 37vw
          height 37vw
          filter brightness(80%)
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
      .listDesc
        margin-left .2rem
        display flex
        flex 1
        flex-direction column
        justify-content space-around
        padding .2rem 0
        .listName
          overflow hidden
          text-overflow ellipsis
          display -webkit-box
          -webkit-line-clamp 2
          -webkit-box-orient vertical
          font-size .3rem
          line-height 0.33rem   
        .listCreator
          color #999
          font-size .22rem
          height .35rem
          line-height .35rem
        .extraInfo
          overflow hidden
          text-overflow ellipsis
          display -webkit-box
          -webkit-line-clamp 2
          -webkit-box-orient vertical
          line-height 0.27rem   
          font-size .27rem
          color #aaa  

</style>
