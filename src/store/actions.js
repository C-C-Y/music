export default {
  selectPlay({ commit }, { list, index }) {
    commit("replacePlayList", list);
    commit("setCurrentIndex", index);
    commit("setFullSCreen", true);
    commit("setPlayingState", true);
  }
};
