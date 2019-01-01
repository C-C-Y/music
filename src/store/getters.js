export const ifPlaying = state => state.ifPlaying;
export const playingList = state => state.playingList;
export const fullScreen = state => state.fullScreen;
export const currentIndex = state => state.currentIndex;
export const Mode = state => state.mode;
export const currentSong = state => {
  if (currentIndex !== -1) {
    return state.playingList[state.currentIndex];
  } else {
    return null;
  }
};
