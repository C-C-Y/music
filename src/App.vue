<template>
  <div id="app">
    <keep-alive :exclude="['loadpage','songlist']">
      <router-view />
    </keep-alive>
     <player></player> 
  </div>
</template>

<script>
import Player from "comp/Player.vue";
export default {
  name: "app",
  components: {
    Player
  },
  data() {
    return {
      loadShow: true
    };
  },
  methods: {
    showRouter() {
      this.loadShow = false;
    }
  }
};
</script>

<style lang="stylus">
body
  font-family Arial Helvetica sans-serif
.icon
  width 1em
  height 1em
  vertical-align -0.15rem
  fill currentColor
  overflow hidden
</style>
