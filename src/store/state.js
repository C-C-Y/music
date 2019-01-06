import { playMode } from "asset/js/config.js";
let defaultUserid = null;
let defaultPlayMode = playMode.sequence;
let defaultInitPlay = false;

try {
  if (localStorage.playingList && localStorage.playingList.length) {
    defaultInitPlay = true;
  }
  if (localStorage.userId) {
    defaultUserid = localStorage.userId;
  }
  if (localStorage.playMode) {
    defaultPlayMode = Number(localStorage.playMode);
  }
} catch (error) {
  console.log(error);
}

export default {
  homeMenuShow: false,
  userInfo: {},
  ifPlaying: false,
  playingList: [],
  fullScreen: false,
  currentIndex: -1,
  mode: defaultPlayMode,
  likedIdList: [],
  userSongList: [],
  userId: defaultUserid,
  needFresh: false,
  initPlay: defaultInitPlay,
  songNoChange: false
};
