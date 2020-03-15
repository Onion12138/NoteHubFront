import Vue from "vue";
import Vuex from "vuex";
import * as actions from "./actions";
import * as getters from "./getters";
import state from "./state";
import mutations from "./mutations";

import createLogger from "vuex/dist/logger";

Vue.use(Vuex);

// 开发环境为true，生产环境为false
const debug = process.env.NODE_ENV !== "production";
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  plugin: debug ? [createLogger()] : []
});
