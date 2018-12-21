import Vue from "vue";
export default {
  toggeleHomeMenu(state) {
    state.homeMenuShow = !state.homeMenuShow;
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
