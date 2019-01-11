import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/store";
import fastClick from "fastclick";
import VueLazyLoad from "vue-lazyload";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "style/reset.css";
import "asset/js/icon.js";
import "style/border.css";
import "babel-polyfill";
import "swiper/dist/css/swiper.css";
import axios from "axios";

Vue.use(VueLazyLoad, {
  loading: require("./assets/img/loading.jpg")
}); //可以加第二参数{loading:require(url)} 将地址图片作为未加载完成显示的loading图片
Vue.use(VueAwesomeSwiper);
Vue.config.productionTip = false;
fastClick.attach(document.body);
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
