export default {
  selectPlay({ commit, state }, { list, index, fm = 0 }) {
    if (!fm && state.fm) {
      commit("setFmState", 0);
    }
    if (fm) {
      commit("setPlayMode", 0);
    }
    if (state.currentSong && state.currentSong.id == list[index].id) {
      commit("setFullSCreen", true);
      commit("setPlayingState", true);
    } else {
      commit("replacePlayList", list);
      commit("setCurrentIndex", index);
      commit("setFullSCreen", true);
      commit("setPlayingState", true);
    }
  },
  closePlay({ commit }) {
    commit("setCurrentIndex", -1);
    commit("clearPlayList");
  },
  playSingleSong({ commit, state }, song) {
    let itemIndex = 0;
    let res = state.playingList.some((item, index) => {
      if (item.id == song.id) {
        itemIndex = index;
        return true;
      } else return false;
    });
    if (res) {
      if (itemIndex == state.currentIndex) {
        commit("setFullSCreen", true);
        commit("setPlayingState", true);
        return;
      } else {
        commit("setCurrentIndex", itemIndex);
        commit("setFullSCreen", true);
        commit("setPlayingState", true);
        return;
      }
    } else {
      commit("addSong", song);
      commit("setCurrentIndex", state.currentIndex + 1);
      commit("setFullSCreen", true);
      commit("setPlayingState", true);
    }
  }
};
