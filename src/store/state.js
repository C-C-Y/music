import { playMode } from "asset/js/config.js";
let defaultUserInfo = {
  id: false
};
try {
  if (localStorage.userInfo && JSON.parse(localStorage.userInfo).id) {
    defaultUserInfo = JSON.parse(localStorage.userInfo);
  }
} catch (error) {
  console.log(error);
}

export default {
  homeMenuShow: false,
  userInfo: defaultUserInfo,
  ifPlaying: false,
  playingList: [],
  fullScreen: false,
  currentIndex: -1,
  mode: playMode.sequence
};
