import Vue from "vue";
import Vuex from "vuex";
import language from "./language"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lang: language || "en",
    viewWidth: NaN,
  },
  mutations: {
    ["SET_LANG"](state, payload) {
      window.localStorage.setItem("lang", payload);
      state.lang = payload;
    },
    ["SET_VIEW_WIDTH"](state, payload) {
      state.viewWidth = payload;
    },
  },
  actions: {},
  modules: {},
});
