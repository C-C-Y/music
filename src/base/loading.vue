<template lang="">
    <div class="music">
      <ul class="movement">
        <li class="li1 item"><span class="ani-li"></span></li>
        <li class="li2 item"><span class="ani-li"></span></li>
        <li class="li3 item"><span class="ani-li"></span></li>
        <li class="li4 item"><span class="ani-li"></span></li>
        <li class="li5 item"><span class="ani-li"></span></li>
        <li class="li6 item"><span class="ani-li"></span></li>
      </ul>
      <div class="state">正在加载中</div>
    </div>
</template>

<script>
export default {
  name: "loading"
};
</script>

<style lang="stylus" scoped>
.music
  height 18px
  display flex
  justify-content center
  align-items center 
  .state 
    font-size .25rem
.movement
  width 80px
  height 18px
li
  position relative
  float left
  height 100%
  width 10%
  overflow hidden
  margin-right 1px
span
  position absolute
  bottom 0
  display block
  height 100%
  width 10px
  background red
.li1 span
  animation waves 0.8s linear 0s infinite alternate
  -webkit-animation waves 0.8s linear 0s infinite alternate
.li2 span
  animation waves 0.9s linear 0s infinite alternate
  -webkit-animation waves 0.9s linear 0s infinite alternate
.li3 span
  animation waves 1s linear 0s infinite alternate
  -webkit-animation waves 1s linear 0s infinite alternate
.li4 span
  animation waves 0.8s linear 0s infinite alternate
  -webkit-animation waves 0.8s linear 0s infinite alternate
.li5 span
  animation waves 0.7s linear 0s infinite alternate
  -webkit-animation waves 0.7s linear 0s infinite alternate
.li6 span
  animation waves 0.8s linear 0s infinite alternate
  -webkit-animation waves 0.8s linear 0s infinite alternate
@keyframes waves
  10%
    height 20%
  20%
    height 60%
  40%
    height 40%
  50%
    height 100%
  100%
    height 50%
@keyframes waves
  10%
    height 20%
  20%
    height 60%
  40%
    height 40%
  50%
    height 100%
  100%
    height 50%
</style>
