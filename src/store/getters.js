export const isPlaying = state => state.isPlaying;
export const playingList = state => state.playingList;
export const fullScreen = state => state.fullScreen;
export const currentIndex = state => state.currentIndex;
export const Mode = state => state.mode;
export const currentSong = state => {
  return state.playingList[state.currentIndex];
};
