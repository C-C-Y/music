import Vue from "vue";
import Router from "vue-router";
import Home from "../views/home/Home.vue";
import Recommend from "../views/recommend/Recommend.vue";
import News from "../views/news/News.vue";
import Radio from "../views/radio/Radio.vue";
import Personal from "../views/personal/Personal.vue";
import MV from "../views/mv/MV.vue";

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      redirect: "/home/recommend",
      children: [
        {
          path: "recommend",
          name: "recommend",
          component: Recommend
        },
        {
          path: "news",
          name: "news",
          component: News
        },
        {
          path: "radio",
          name: "radio",
          component: Radio
        }
      ]
    },
    {
      path: "/personal",
      name: "personal",
      component: Personal
    },
    {
      path: "/mv",
      name: "mv",
      component: MV
    },
    {
      path: "/search",
      name: "search",
      component: () => import("../views/search/Search.vue")
    }
  ]
});
