<template>
  <div>
    <div v-if="list.length">
      <div class="top">
        <svg class="icon backIcon"
             aria-hidden="true"
             @click="back()">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
        <span class="topName">排行榜</span>
      </div>
      <scroll class="wrapper"
              :bounce="false"
              :data="list">
        <div class="content">
          <div class="listItem"
               v-for="item of list"
               :key="item.id"
               @click="enterList(item.id)">
            <div class="imgBox">
              <img v-lazy="item.coverImgUrl"
                   alt=""
                   class="img">
              <span class="updateTime">{{item.updateFrequency}}</span>
              <div class="playCount">
              <svg class="icon countIcon"
                   aria-hidden="true">
                <use xlink:href="#icon-erji"></use>
              </svg>
              <span class="count">{{count(item.playCount)}}</span>
            </div>
            </div>
            <p class="desc">{{item.name}}</p>

          </div>
        </div>
      </scroll>
    </div>
    <loading v-else
             class="fullLoading"></loading>
  </div>
</template>

<script>
import scroll from "base/scroll.vue";
import api from "@/api/api.js";
import loading from "base/loading.vue";
export default {
  name: "ranklist",
  data() {
    return {
      list: []
    };
  },
  components: {
    scroll,
    loading
  },
  methods: {
    count(num) {
      let res = Math.ceil(num / 10000) + "万";
      return res;
    },
    back() {
      this.$router.replace({ name: "recommend" });
    },
    enterList(id) {
      this.$router.push({ name: "songlist", params: { listId: id } });
    }
  },
  created() {
    this.$axios
      .get(`${api.url}/toplist`, {
        withCredentials: true
      })
      .then(result => {
        this.list = result.data.list;
      })
      .catch(err => {
        console.log(err);
      });
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
    font-size 0.4rem
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
    padding 0 0.1rem 1.2rem 0.1rem
    display flex
    justify-content space-between
    flex-wrap wrap
    font-size 0.3rem
    .listItem
      width 31vw
      margin-top .5rem
      .imgBox
        position relative
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
        .img
          width 31vw
          height 31vw
          filter brightness(85%)
        .updateTime
          font-size .23rem
          position absolute
          bottom 0.2rem
          left 0.1rem
      .desc
        margin-top .15rem
        line-height 0.33rem
</style>
