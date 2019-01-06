<template>
  <div v-show="!needFresh">
    <div class="load"
         v-if="needLoad">
      <div class="bgTop"></div>
      <div class="content">
        <img src="../../assets/img/logo.jpg"
             class="logo">
        <button class="loadbtn"
                @click="enterLoadPage()">手机号登陆</button>
        <!--  -->
      </div>
    </div>
    <div v-else
         class="hasLoad"></div>
  </div>
</template>

<script>
import api from "@/api/api.js";
import { mapGetters } from "vuex";

export default {
  name: "load",
  data() {
    return {
      needLoad: false
    };
  },
  methods: {
    enterLoadPage() {
      this.$router.push({ name: "loadpage" });
    }
  },
  computed: {
    ...mapGetters(["needFresh"])
  },
  mounted() {
    this.$nextTick(() => {
      let url = `${api.url}/login/status`;
      this.$axios
        .get(url, {
          withCredentials: true
        })
        .then(() => {
          setTimeout(() => {
            this.$router.push({ name: "home" });
          }, 1500);
        })
        .catch(() => {
          setTimeout(() => {
            this.needLoad = true;
          }, 1500);
        });
    });
  },
  created() {
    if (this.needFresh) {
      window.location.reload();
    }
    /* let url = `${api.url}//logout`;
    this.$axios.get(url, {
      withCredentials: true
    });*/
  }
};
</script>

<style lang="stylus" scoped>
.load
  position relative
  background-color #000
  color red
  height 100vh
  width 100vw
  overflow hidden
  .bgTop
    position absolute
    top 0
    left 0
    right 0
    height 30%
    background-image url('../../assets/img/unload.jpg')
    background-size 100% 100%
    z-index 4
  .content
    position absolute
    top 0
    bottom 0
    right 0
    left 0
    z-index 5
    display flex
    flex-direction column
    align-items center
    .logo
      width 3.2rem
      height 2.3rem
      margin-top 28%
    .loadText
      font-size 0.4rem
      margin-top 0.5rem
      padding 0.15rem 0.7rem 0.15rem 1rem
      border 0.01rem solid red
      border-radius 0.8rem
      letter-spacing 0.3rem
    .loadbtn
      padding 0.15rem 0.3rem
      margin-top 1rem
      border 0.01rem solid red
      border-radius 0.8rem
      width 5.3rem
      height 1rem
      background-color #000
      font-size 0.4rem
      letter-spacing 0.05rem
      color #eee
    .loadbtn:link
      background-color red
    .loadbtn:visited
      background-color #000
    .loadbtn:hover
      background-color #000
    .loadbtn:active
      background-color red
    .loadInfo
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      padding 0.2rem 0.3rem
      height 1rem
      line-height 1rem
      text-align center
      font-size 0.4rem
      border-radius 0.2rem
      background-color rgba(255, 255, 255, 0.2)
      color #111
      z-index 2
.hasLoad
  position absolute
  top 0
  bottom 0
  left 0
  right 0
  background-image url('../../assets/img/loaded.jpg')
  background-repeat no-repeat
  background-size 100% 100%
</style>
