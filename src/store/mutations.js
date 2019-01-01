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
  },
  setPlayingState(state, flag) {
    state.ifPlaying = flag;
  },
  replacePlayList(state, list) {
    state.playingList = list;
  },
  clearPlayList(state) {
    state.playingList = [];
  },
  addSong(state, item) {
    state.playingList.splice(state.currentIndex + 1, 0, item);
  },
  DeleteSong(state, index) {
    state.playingList.splice(index, 1);
  },
  setFullSCreen(state, flag) {
    state.fullScreen = flag;
  },
  setPlayMode(state, mode) {
    state.mode = mode;
  },
  setCurrentIndex(state, index) {
    state.currentIndex = index;
  }
};
