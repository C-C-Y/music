import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
import createLogger from "vuex/dist/logger";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "procuction";
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  plugins: debug ? [createLogger()] : []
});