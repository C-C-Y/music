import Vue from "vue";
export default {
  toggeleHomeMenu(state, tag = true) {
    if (tag) {
      state.homeMenuShow = !state.homeMenuShow;
    } else {
      state.homeMenuShow = false;
    }
  },
  ifUserInfo(state, userObject = { id: false }) {
    Vue.set(state, "userInfo", userObject);
    try {
      localStorage.userInfo = JSON.stringify(userObject);
    } catch (error) {
      console.log(error);
    }
  }
};
