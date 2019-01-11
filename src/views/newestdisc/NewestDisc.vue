<template>
  <div>
    <div v-if="list.length">
      <div class="top">
        <svg class="icon backIcon"
             aria-hidden="true"
             @click="back()">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
        <span class="topName">新碟上架</span>
      </div>
      <scroll :data="list"
              class="wrapper"
              @pullingUp="getData"
              :pullUpLoad="{threshold: 50}"
              :probeType="3"
              :bounce="{top:false,left:false,right:false,bottom:true}"
              :hasGotData="hasGotData">
        <div class="content">
          <div class="listItem"
               v-for="(item,index) of list"
               :key="index"
               @click="enterList(item.id)">
            <div class="itemImg">
              <img v-lazy="item.picUrl"
                   alt=""
                   class="img">
            </div>
            <div class="listDesc">
              <p class="listName">{{item.name}}</p>
              <p class="listCreator">{{singerName(item)}}</p>
              <p class="extraInfo">{{"公司: "+item.company}}</p>
            </div>
          </div>
          <loading v-show="loadingShow">
          </loading>
        </div>
      </scroll>
    </div>
    <loading v-else
             class="fullLoading"></loading>
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
      hasGotData: false,
      page: 1
    };
  },
  components: {
    scroll,
    loading
  },
  computed: {
    offset() {
      return (this.page - 1) * 15;
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
    enterList(id) {
      this.$router.push({ name: "album", params: { albumId: id } });
    },
    back() {
      this.$router.replace({ name: "recommend" });
    },
    getData() {
      this.loadingShow = true;
      this.$axios
        .get(`${api.url}/top/album?offset=${this.offset}&limit=15`, {
          withCredentials: true
        })
        .then(result => {
          this.page += 1;
          this.loadingShow = false;
          this.list = this.list.concat(result.data.albums);
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
  transform translate(-50%, -50%)
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
  top 0.88rem
  left 0
  right 0
  bottom 0
  overflow hidden
  background-color #111
  color #ccc
  .content
    padding 0.2rem 0.1rem 1.2rem 0.1rem
    .listItem
      display flex
      margin-bottom 0.15rem
      .itemImg
        position relative
        .img
          width 37vw
          height 37vw
          filter brightness(80%)
      .listDesc
        margin-left 0.2rem
        display flex
        flex 1
        flex-direction column
        justify-content space-around
        padding 0.2rem 0
        .listName
          overflow hidden
          text-overflow ellipsis
          display -webkit-box
          -webkit-line-clamp 2
          -webkit-box-orient vertical
          font-size 0.3rem
          line-height 0.33rem
        .listCreator
          color #999
          font-size 0.27rem
          height 0.35rem
          line-height 0.35rem
        .extraInfo
          overflow hidden
          text-overflow ellipsis
          display -webkit-box
          -webkit-line-clamp 2
          -webkit-box-orient vertical
          line-height 0.27rem
          font-size 0.23rem
          color #aaa
</style>
