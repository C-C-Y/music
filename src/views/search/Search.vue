<template>
  <div class="searchPage">
    <div class="head">
      <svg class="icon backIcon"
           aria-hidden="true"
           @click="back()">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
      <form action=""
            class="form border-bottom">
        <input type="search"
               v-model="text"
               class="input"
               ref="input"
               autocomplete="off"
               @keypress="search"
               @keydown="keyInput">
      </form>
      <svg class="icon clearIcon"
           aria-hidden="true"
           @click="clear()">
        <use xlink:href="#icon-fork"></use>
      </svg>
    </div>
    <div class="hotSearch"
         v-if="!viewShow">
      <p class="title">热门搜索</p>
      <div class="itemBox">
        <div class="hotItem"
             v-for="(item,index) of hotSearch"
             :key="index" @click.stop="searchItem(item.first)">
          {{item.first}}
        </div>
      </div>
    </div>
    <div v-if="viewShow">
      <div class="tab">
        <router-link tag="span"
                     :to="{name:'searchview',params:{type:'1',key:text}}"
                     active-class="active">单曲</router-link>
        <router-link tag="span"
                     :to="{name:'searchview',params:{type:'100',key:text}}"
                     active-class="active">歌手</router-link>
        <router-link tag="span"
                     :to="{name:'searchview',params:{type:'10',key:text}}"
                     active-class="active">专辑</router-link>
        <router-link tag="span"
                     :to="{name:'searchview',params:{type:'1000',key:text}}"
                     active-class="active">歌单</router-link>
        <!-- <router-link tag="span"
                     :to="{name:'searchview',params:{type:'1002',key:text}}" active-class="active">用户</router-link> -->
      </div>
     
        <router-view></router-view>
    </div>
    
    <!-- <loading></loading> -->
  </div>
</template>

<script>
// import loading from "base/loading.vue";
import api from "@/api/api";

export default {
  name: "search",
  components: {
    /* loading */
  },
  data() {
    return {
      viewShow: false,
      text: "",
      hotSearch: []
    };
  },
  methods: {
    searchItem(item) {
      this.text = item;
      this.viewShow = true;
      this.$router.push({
        name: "searchview",
        params: { type: "1", key: item }
      });
    },
    search(e) {
      let code = e.keyCode;
      if (code == "13") {
        e.preventDefault();
        this.viewShow = true;
        this.$router.push({
          name: "searchview",
          params: { type: "1", key: this.text }
        });
      } else {
        this.closeView();
      }
    },
    closeView() {
      this.viewShow = false;
      if (this.$router.name != "search") {
        this.$router.push({ name: "search" });
      }
    },
    keyInput(e) {
      let code = e.keyCode;
      if (code == "8") {
        this.closeView();
      }
    },
    clear() {
      this.text = "";
      this.$refs.input.focus();
      this.closeView();
    },
    back() {
      this.$router.replace({ name: "recommend" });
    }
  },
  created() {
    this.$axios
      .get(`${api.url}/search/hot`, {
        withCredentials: true
      })
      .then(result => {
        this.hotSearch = result.data.result.hots;
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {
    this.$refs.input.focus();
  }
};
</script>

<style lang="stylus" scoped>
.active
  color red
.border-bottom
  &:before
    border-color #444
.searchPage
  background-color #111
  position fixed
  top 0
  right 0
  left 0
  bottom 0
  .head
    position absolute
    top 0
    left 0
    right 0
    height 1rem
    display flex
    align-items center
    padding-left 0.15rem
    padding-right 0.1rem
    color #ccc
    background-color #181818
    .backIcon
      font-size 0.4rem
    .form
      flex 1
      margin 0 0 0 0.2rem
    .input
      width 100%
      background-color #181818
      caret-color red
      color #ddd
      font-size 0.34rem
      appearance none
    .input::-webkit-search-cancel-button
      display none
    .clearIcon
      font-size 0.4rem
      margin 0 0.2rem 0 0.2rem
  .hotSearch
    position absolute
    top 1.25rem
    left 0
    right 0
    color #ccc
    .title
      height 0.5rem
      line-height 0.5rem
      padding-left 0.2rem
      font-size 0.31rem
      margin-bottom 0.15rem
    .itemBox
      display flex
      flex-wrap wrap
      font-size 0.28rem
      padding 0 0.2rem 0 0
      .hotItem
        padding 0.15rem 0.3rem
        border-radius 0.34rem
        background-color #181818
        margin-left 0.2rem
        margin-bottom 0.2rem
  .tab
    position absolute
    top 0.98rem
    left 0
    right 0
    height 0.9rem
    line-height 0.9rem
    display flex
    justify-content space-around
    font-size 0.3rem
    color #ccc
    background-color #181818
</style>
