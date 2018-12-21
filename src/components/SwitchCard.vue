<template>
  <div class="cards">
    <div class="tag">
      <span @click="showCard('0')" >音乐</span>
      <span @click="showCard('1')">动态</span>
      <span @click="showCard('2')">关于我</span>
    </div>
    <div class="music" v-show="ifShow('0')">
      <p class="info border-bottom">歌单</p>
      <ul>
        <li v-for="item of listArr"
            :key=item.id
            class="list ">
          <img :src="item.coverImgUrl"
               alt=""
               class="pic">
          <div class="desc border-bottom">
            <div class="nameBox">
              <p class="name"
                 >{{item.name}}</p>
            </div>
            <p class="record">{{item.trackCount+"首,播放"+item.playCount+"次"}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="activity" v-show="ifShow('1')">
      <span class="myWord">作者及其朋友都未发过动态,不知道动态如何展示...</span>
      <span class="myWord">如果可以请加我好友"山楂心",向我展示你的动态!</span>
      <span class="myWord">后续可能会补上此功能</span>
    </div>
    <div class="personalInfo" v-show="ifShow(2)">
      <p class="title">个人信息</p>
      <p>等级:{{level}}</p>
      <p>年龄:{{age}}</p>
      <p>性别:{{gender}}</p>
      <p class="title">个人介绍</p>
      <p>{{desc}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "switchcard",
  data() {
    return {
      cardName: "0"
    };
  },
  props: {
    listArr: {
      type: Array,
      default() {
        return [];
      }
    },
    personInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    level() {
      let level = "";
      if (this.personInfo && this.personInfo.level) {
        level = this.personInfo.level;
      } else {
        level = "未知";
      }
      return level;
    },
    age() {
      let userAge = "";
      if (this.personInfo.profile && this.personInfo.profile.birthday) {
        let bornYear = new Date(this.personInfo.profile.birthday).getFullYear();
        let nowYear = new Date().getFullYear();
        userAge = nowYear - bornYear;
      } else {
        userAge = "保密";
      }
      return userAge;
    },
    gender() {
      let userGender = "";
      if (this.personInfo.profile && this.personInfo.profile.gender == 1) {
        userGender = "男";
      } else if (
        this.personInfo.profile &&
        this.personInfo.profile.gender == 2
      ) {
        userGender = "女";
      } else {
        userGender = "保密";
      }
      return userGender;
    },
    desc() {
      let desc = "";
      if (this.personInfo.profile && this.personInfo.profile.signature) {
        desc = this.personInfo.profile.signature;
      } else {
        desc = "暂无个人介绍";
      }
      return desc;
    }
  },
  methods: {
    showCard(name) {
      if (this.cardName === name) {
        return;
      } else {
        this.cardName = name;
      }
    },
    ifShow(tag) {
      return tag == this.cardName;
    }
  }
};
</script>

<style lang="stylus" scoped>
.border-bottom
  &:before  
    border-color #444
.cards
  background-color #333
  color #ccc
  overflow-x hidden
  .tag
    display flex
    justify-content space-around
    height 1rem
    line-height 1rem
    background-color #444
    font-size 0.35rem
    color #ccc
  .music
    padding-left .2rem    
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
        .nameBox
          min-width 5rem
          .name
            width 90%
            font-size 0.35rem
            height 0.37rem
            line-height 0.37rem
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
        .record
          margin-top .1rem  
          color #666 
      .pic
        width 1.4rem
        height 1.4rem
        border-radius .15rem
  .activity
    display flex
    flex-direction column
    align-items center
    padding-top .2rem 
    .myWord
      line-height .7rem
      font-size .3rem   
  .personalInfo
    line-height .5rem
    font-size .3rem
    padding-left .1rem 
    .title
      line-height .8rem
      font-size .35rem
      color #eee
</style>
