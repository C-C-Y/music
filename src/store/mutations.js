export default {
  toggeleHomeMenu(state, tag = true) {
    if (tag) {
      state.homeMenuShow = !state.homeMenuShow;
    } else {
      state.homeMenuShow = false;
    }
  },
  setUserInfo(state, userObject) {
    state.userInfo = userObject;
  },
  setUserId(state, id) {
    state.userId = id;
    try {
      localStorage.userId = id;
    } catch (error) {
      console.log(error);
    }
  },
  setUserSongList(state, list) {
    state.userSongList = list;
  },
  changeLikeList(state, songInfo) {
    let IDlist = state.likedIdList;
    if (songInfo.tag) {
      IDlist.push(songInfo.id);
    } else {
      let idIndex = IDlist.indexOf(songInfo.id);
      IDlist.splice(idIndex, 1);
    }
    state.likedIdList = IDlist;
  },
  setLikedList(state, idList) {
    state.likedIdList = idList;
  },
  setPlayingState(state, flag) {
    state.ifPlaying = flag;
  },
  replacePlayList(state, list) {
    state.playingList = list;
    try {
      localStorage.playingList = JSON.stringify(list);
    } catch (error) {
      console.log(error);
    }
  },

  clearPlayList(state) {
    state.playingList = [];
    state.playListId = 0;
    try {
      localStorage.playingList = [];
      localStorage.playListId = 0;
    } catch (error) {
      console.log(error);
    }
  },
  addSong(state, item) {
    state.initPlay = false;
    state.playingList.splice(state.currentIndex + 1, 0, item);
    try {
      let list = [];
      if (localStorage.playingList) {
        list = JSON.parse(localStorage.playingList);
      }
      list.splice(state.currentIndex + 1, 0, item);
      localStorage.playingList = JSON.stringify(list);
    } catch (error) {
      console.log(error);
    }
  },
  deleteSong(state, index) {
    state.playingList.splice(index, 1);
    let list = state.playingList;
    try {
      localStorage.playingList = JSON.stringify(list);
    } catch (error) {
      console.log(error);
    }
  },
  setFullSCreen(state, flag) {
    state.fullScreen = flag;
  },
  setPlayMode(state, mode) {
    state.initPlay = false;
    state.mode = mode;
    try {
      localStorage.playMode = mode;
    } catch (error) {
      console.log(error);
    }
  },
  setCurrentIndex(state, index) {
    state.initPlay = false;
    state.currentIndex = index;
    try {
      localStorage.currentIndex = index;
    } catch (error) {
      console.log(error);
    }
  },
  setFresh(state) {
    state.needFresh = true;
  },
  setInitPlay(state) {
    state.initPlay = false;
  },
  setChangeStatus(state, tag) {
    state.songNoChange = tag;
  },
  initplayer(state) {
    try {
      state.playingList = JSON.parse(localStorage.playingList);
      state.currentIndex = Number(localStorage.currentIndex);
    } catch (error) {
      console.log(error);
    }
  },
  setFmState(state, tag) {
    state.fm = tag;
    try {
      localStorage.fm = tag;
    } catch (error) {
      console.log(error);
    }
  }
};
