<template>
  <div v-if="profile && songList">
    <card :initIndex="1"
          :tabArr="tabs" class="showCards" :secondMove="secondMove">
      <div class="music"
           slot="1">
        <p class="info border-bottom">歌单</p>
        <ul>
          <li v-for="item of songList"
              :key=item.id
              class="list border-bottom" @click="enterSongList(item.id)">
            <img :src="item.coverImgUrl"
                 alt=""
                 class="pic">
            <div class="desc ">
              
                <p class="name">{{item.name}}</p>
              <p class="record">{{item.trackCount+"首,播放"+item.playCount+"次"}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="activity"
           slot="2">
        <span class="myWord">后续可能会补上此功能</span>
      </div>
      <div class="userInfo"
           slot="3">
        <p class="title">个人信息</p>
        <p>等级:{{level}}</p>
        <p>年龄:{{age}}</p>
        <p>性别:{{gender}}</p>
        <p class="title">个人介绍</p>
        <p>{{desc}}</p>
      </div>
    </card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Card from "base/card.vue";
export default {
  name: "PersonalDetail",
  data() {
    return {
      profile: this.userInfo.profile
    };
  },
  components: {
    Card
  },
  props: {
    songList: {
      type: Array,
      default() {
        return [];
      }
    },
    userInfo: {
      type: Object,
      default() {
        return {};
      }
    },
    id: {
      type: [String, Number],
      default: null
    },
    secondMove: {
      type: [String, Number],
      default: 0
    }
  },
  computed: {
    ...mapGetters(["userId"]),
    tabs() {
      let tabs = [];
      if (this.userId == this.id) {
        tabs = ["音乐", "动态", "关于我"];
      } else {
        tabs = ["音乐", "动态", "关于TA"];
      }
      return tabs;
    },
    level() {
      let level = "";
      if (this.userInfo.level) {
        level = this.userInfo.level;
      } else {
        level = "未知";
      }
      return level;
    },
    age() {
      let userAge = "";
      if (this.profile.birthday) {
        let bornYear = new Date(this.profile.birthday).getFullYear();
        let nowYear = new Date().getFullYear();
        userAge = nowYear - bornYear;
      } else {
        userAge = "保密";
      }
      return userAge;
    },
    gender() {
      let userGender = "";
      if (this.profile.gender == 1) {
        userGender = "男";
      } else if (this.profile.gender == 2) {
        userGender = "女";
      } else {
        userGender = "保密";
      }
      return userGender;
    },
    desc() {
      let desc = "";
      if (this.profile.signature) {
        desc = this.profile.signature;
      } else {
        desc = "暂无个人介绍";
      }
      return desc;
    }
  },
  methods: {
    enterSongList(id) {
      this.$router.push({
        name: "songlist",
        params: {
          listId: id
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.showCards >>> .content
  position relative
  background-color #222
  color #ccc
  overflow-x hidden
  min-height 100%vh
  z-index 8
.border-bottom
  &:before  
    border-color #333
.music
  padding 0 .1rem
  .info
    height 0.6rem
    line-height 0.6rem
    margin-bottom -.1rem
    padding-left .1rem
  .list
    display flex
    margin-top .15rem
    .desc
      display flex
      flex-direction column
      justify-content center
      padding-left 0.2rem
      .name
        max-width 75%vw
        font-size 0.32rem
        height 0.35rem
        line-height 0.35rem
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
      .record
        margin-top .1rem  
        color #666 
        font-size .25rem
    .pic
      width 1.2rem
      height 1.2rem
      border-radius .15rem
.activity
  display flex
  flex-direction column
  align-items center
  padding-top .2rem 
  .myWord
    line-height .7rem
    font-size .3rem   
.userInfo
  line-height .5rem
  font-size .3rem
  padding-left .1rem
  .title
    line-height .8rem
    font-size .32rem
    color #eee    
</style>
