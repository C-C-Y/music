<template>
  <div class="music">
    <div class="musicTab">
    <router-link :to="{name:'recommend'}" tag="span">推荐</router-link>
    <router-link :to="{name:'news'}" tag="span">朋友</router-link>
    <router-link :to="{name:'radio'}" tag="span">电台</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "music"
};
</script>

<style lang="stylus" scoped>
.music
  position fixed
  top .88rem
  left 0
  right 0
  background-color #333
  .musicTab
    padding-bottom .04rem
    display flex
    justify-content space-around
    align-items center
    height .8rem
</style>
