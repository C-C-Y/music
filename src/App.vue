<template>

  <div id="app">
    <keep-alive exclude="['load','loadpage']">
      <router-view />
    </keep-alive>
    <!-- <player></player> -->
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
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
