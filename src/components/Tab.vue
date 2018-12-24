
<template>
  <div class="tabBox">
    <svg class="icon menu"
         aria-hidden="true" @click="toggeleHomeMenu()">
      <use xlink:href="#icon-caidan"></use>
    </svg>
    <div class="main">
      <router-link to="/home/personal"
                   class="icon personal"
                   tag="svg"
                   aria-hidden="true">
        <use xlink:href="#icon-denglu"></use>
      </router-link>
      <router-link to="/home/music"
                   class="icon music"
                   tag="svg"
                   aria-hidden="true">
        <use xlink:href="#icon-yinle"></use>
      </router-link>
      <router-link to="/home/mv"
                   class="icon mv"
                   tag="svg"
                   aria-hidden="true">
        <use xlink:href="#icon-shipinbofangyingpian"></use>
      </router-link>
    </div>
    <router-link to="/search"
                 class="icon search"
                 tag="svg"
                 aria-hidden="true">
      <use xlink:href="#icon-sousuo1"></use>
    </router-link>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "tab",
  methods: {
    ...mapMutations(["toggeleHomeMenu"])
  }
};
</script>

<style lang="stylus" scoped>
.tabBox
  position fixed
  top 0
  left 0
  right 0
  display flex
  align-items center
  justify-content space-between
  height 1rem
  background-color #333
  font-size 0.55rem
  color  #fff
  .menu
    flex 1
    margin-left -.9rem
  .search
    flex 1 
    margin-right -.9rem
  .main  
    flex 1
    display flex
    justify-content space-between
    
</style>
