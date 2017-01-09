import VueI18n from "vue-i18n";
import Vue from "vue";
import zh from "./zh-CN";
import en from "./en";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: window.localStorage.getItem("lang") || "zh",
  fallbackLocale: "zh",
  messages: {
    zh,
    en,
  },
});

export default i18n;
