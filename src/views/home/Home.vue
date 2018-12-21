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
import { mapState } from "vuex";
export default {
  name: "home",
  data() {
    return {
      menuInfo: {}
    };
  },
  components: {
    Tab,
    MenuSide
  },
  computed: {
    ...mapState(["userId"])
  },
  created() {}
};
</script>

<style lang="stylus" scoped>
.home 
  margin-top 1.2rem 
  padding-top .3rem
  background-color #333
  color #fff
  font-size .35rem
</style>
