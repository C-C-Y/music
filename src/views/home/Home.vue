<template>
  <div class="home" v-if="homeShow">
    <tab></tab>
    <menu-side ></menu-side>
    <router-view></router-view>
  </div>
</template>

<script>
import api from "@/api/api";
import Tab from "@/components/Tab.vue";
import MenuSide from "@/components/MenuSide.vue";
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "home",
  data() {
    return {
      homeShow: false
    };
  },
  methods: {
    ...mapMutations([
      "toggeleHomeMenu",
      "setLikedList",
      "setUserSongList",
      "setUserInfo",
      "initplayer"
    ]),
    getData(id) {
      let getUserInfo = this.$axios.get(`${api.url}/user/detail?uid=${id}`, {
        withCredentials: true
      });
      let getLikeList = this.$axios.get(`${api.url}/likelist?uid=${id}`, {
        withCredentials: true
      });
      let getSongList = this.$axios.get(`${api.url}/user/playlist?uid=${id}`, {
        withCredentials: true
      });
      this.$axios
        .all([getLikeList, getSongList, getUserInfo])
        .then(
          this.$axios.spread((like, song, info) => {
            this.setLikedList(like.data.ids);
            this.setUserSongList(song.data.playlist);
            this.setUserInfo(info.data);
            this.homeShow = true;
          })
        )
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    ...mapGetters(["userId", "initPlay"])
  },
  components: {
    Tab,
    MenuSide
  },
  deactivated() {
    this.toggeleHomeMenu(false);
  },
  created() {
    this.getData(this.userId);
  },
  mounted() {
    if (this.initPlay) {
      this.$nextTick(() => {
        this.initplayer();
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.home 
  margin-top .88rem 
  background-color #333
  color #fff
  font-size .31rem
</style>
