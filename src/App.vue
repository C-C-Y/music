<template>
  <div id="app">
    <div v-if="loadShow">
      <load @showRouter="showRouter()">
      </load>
    </div>
    <div v-else>
      <tab></tab>
      <menu-side></menu-side>
      <router-view />
      <!-- <player></player> -->
    </div>
  </div>
</template>

<script>
import Load from "@/components/Load.vue";
import Tab from "@/components/Tab.vue";
import MenuSide from "@/components/MenuSide.vue";
export default {
  name: "app",
  components: {
    Load,
    Tab,
    MenuSide
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
