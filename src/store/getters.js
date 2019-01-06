export const ifPlaying = state => state.ifPlaying;
export const playingList = state => state.playingList;
export const likedIdList = state => state.likedIdList;
export const fullScreen = state => state.fullScreen;
export const currentIndex = state => state.currentIndex;
export const Mode = state => state.mode;
export const userInfo = state => state.userInfo;
export const userId = state => state.userId;
export const userSongList = state => state.userSongList;
export const unablePlayList = state => state.unablePlayList;
export const needFresh = state => state.needFresh;
export const initPlay = state => state.initPlay;
export const songNoChange = state => state.songNoChange;
export const currentSong = state => {
  if (currentIndex !== -1) {
    return state.playingList[state.currentIndex];
  } else {
    return null;
  }
};
