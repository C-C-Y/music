<template>
  <div>
    <div class="top">
      <svg class="icon backIcon"
           aria-hidden="true"
           @click="back()">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
      <span class="topName">最新音乐</span>
    </div>
    <div class="tab">
      <router-link tag="span"
                   :to="{name:'areas',params:{areaId:1}}"
                   active-class="active">推荐</router-link>
      <router-link tag="span"
                   :to="{name:'areas',params:{areaId:7}}"
                   active-class="active">华语</router-link>
      <router-link tag="span"
                   :to="{name:'areas',params:{areaId:96}}"
                   active-class="active">欧美</router-link>
      <router-link tag="span"
                   :to="{name:'areas',params:{areaId:16}}"
                   active-class="active">韩国</router-link>
      <router-link tag="span"
                   :to="{name:'areas',params:{areaId:8}}"
                   active-class="active">日本</router-link>
    </div>
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "latestsongs",
  methods: {
    back() {
      this.$router.replace({ name: "recommend" });
    }
  }
};
</script>

<style lang="stylus" scoped>
.active
  color red
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
.tab
  position fixed
  top .88rem
  left 0
  right 0
  height 0.7rem
  background-color #181818
  display flex
  justify-content space-around
  align-items center
  font-size 0.3rem
  color #ddd
</style>
