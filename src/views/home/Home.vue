<template>
  <div class="home">
    <tab></tab>
    <menu-side :userInfo = "menuInfo"></menu-side>
    <router-view></router-view>
  </div>
</template>

<script>
import Tab from "@/components/Tab.vue";
import MenuSide from "@/components/MenuSide.vue";
import { mapMutations } from "vuex";
export default {
  name: "home",
  data() {
    return {
      menuInfo: {}
    };
  },
  methods: {
    ...mapMutations(["toggeleHomeMenu"])
  },
  components: {
    Tab,
    MenuSide
  },
  created() {},
  deactivated() {
    this.toggeleHomeMenu(false);
  }
};
</script>

<style lang="stylus" scoped>
.home 
  margin-top .95rem 
  padding-top .3rem
  background-color #333
  color #fff
  font-size .35rem
</style>
