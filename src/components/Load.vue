<template>
  <div class="load">
    <img src="../assets/img/logo.jpg"
         class="logo">
    <div class="iconBox">
      <svg class="icon loadIcon"
           aria-hidden="true">
        <use xlink:href="#icon-denglu"></use>
      </svg>
    </div>
    <div class="in">
      <input type="text"
             v-model="phone"
             placeholder="手机号"
             class="phone text">
    </div>
    <div class="in">
      <input type="password"
             v-model="password"
             placeholder="密码"
             class="password text">
    </div>
    <div class="loadText" @click="load">
      <span>登录</span>
    </div>
     <div class="test" @click="jump">
      <span>测试</span>
    </div> 
  </div>
</template>

<script>
// @ is an alias to /src
import api from "@/api/api";
export default {
  name: "load",
  data() {
    return {
      phone: "",
      password: ""
    };
  },
  methods: {
    load() {
      let phone = this.phone;
      let password = this.password;
      var x = `${api.url}/login/cellphone?phone=${phone}&password=${password}`;
      this.$axios
        .get(x, {
          withCredentials: true
        })
        .then(result => {
          if (result.status === 200) {
            console.log("success");
          }
        })
        .catch(err => {
          console.log("账号或密码不对", err);
        });
    },
    jump() {
      this.$emit("showRouter");
    }
  }
};
</script>

<style lang="stylus" scoped>
.load
  position absolute
  top 0
  bottom 0
  right 0
  left 0
  display flex
  flex-direction column
  align-items center
  background-color #333
  color #fff
  overflow hidden
  .iconBox
    margin-top 6%
    color red
    font-size 1rem
  .logo
    width 3.4rem
    height 3rem
    margin-top 15%
  .loadText
    font-size .5rem
    margin-top 1rem
    padding .2rem .9rem .2rem 1.2rem
    background-color red
    border .04rem solid red
    border-radius 0.8rem
    letter-spacing .3rem
  .test
    font-size .5rem
    margin-top .2rem
    padding .2rem .9rem .2rem 1.2rem
    background-color red
    border .04rem solid red
    border-radius 0.8rem
    letter-spacing .3rem
  .in
    display flex
    flex-direction column
    padding 0.2rem 0.4rem
    margin-top .4rem
    border .04rem solid red
    border-radius 0.8rem
    width 5.5rem
    height .8rem
    .text
      flex 1
      background-color #333
      font-size .3rem
      color #fff
      letter-spacing .05rem
    .text::-webkit-input-placeholder
      color #fff
</style>
