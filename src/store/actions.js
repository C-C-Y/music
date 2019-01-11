export default {
  selectPlay({ commit, state }, { list, index, fm = 0 }) {
    if (!fm && state.fm) {
      commit("setFmState", 0);
      commit("setFMfirstClick", false);
    }
    if (fm) {
      commit("setPlayMode", 0);
    }
    commit("replacePlayList", list);
    commit("setCurrentIndex", index);
    commit("setFullSCreen", true);
    commit("setPlayingState", true);
  },
  closePlay({ commit }) {
    commit("setCurrentIndex", -1);
    commit("clearPlayList");
  },
  playSingleSong({ commit, state }, song) {
    if (state.playingList.includes(song) && state.currentSong == song) {
      commit("setFullSCreen", true);
      commit("setPlayingState", true);
      return;
    }
    commit("addSong", song);
    commit("setCurrentIndex", state.currentIndex + 1);
    commit("setFullSCreen", true);
    commit("setPlayingState", true);
  }
};
