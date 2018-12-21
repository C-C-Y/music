<template>
  <div>
    <div class="homeTab">
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
.homeTab
  margin-bottom .3rem
  display flex
  justify-content space-around
</style>
