import Vue from "vue";
import Router from "vue-router";
import Home from "../views/home/Home.vue";
import Recommend from "../views/recommend/Recommend.vue";
import News from "../views/news/News.vue";
import Radio from "../views/radio/Radio.vue";
import MV from "../views/mv/MV.vue";
import Load from "../views/load/Load.vue";
import Music from "../views/music/Music.vue";

Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "load",
      component: Load
    },
    {
      path: "/loadPage",
      name: "loadpage",
      component: () => import("../views/loadpage/LoadPage.vue"),
      beforeEnter: (to, from, next) => {
        if (from.name !== "load") {
          next(false);
          return;
        }
        next();
      }
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      redirect: { name: "music" },
      children: [
        {
          path: "personal",
          name: "personal",
          component: () => import("../views/personal/Personal.vue")
        },
        {
          path: "music",
          name: "music",
          component: Music,
          redirect: { name: "recommend" },
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
          path: "mv",
          name: "mv",
          component: MV
        }
      ]
    },
    {
      path: "/latestsongs",
      name: "latestsongs",
      component: () => import("../views/latestsongs/LatestSongs.vue"),
      redirect: { name: "areas", params: { areaId: 1 } },
      children: [
        {
          path: "areas/:areaId",
          name: "areas",
          component: () => import("../views/areas/areas.vue")
        }
      ]
    },
    {
      path: "/personalpage/:userId",
      name: "person",
      component: () => import("../views/personalPage/PersonalPage.vue")
    },
    {
      path: "/songlist/:listId",
      name: "songlist",
      component: () => import("../views/songlist/SongList.vue")
    },
    {
      path: "/album/:albumId",
      name: "album",
      component: () => import("../components/album.vue")
    },
    {
      path: "/ranklist",
      name: "ranklist",
      component: () => import("../views/ranklist/RankList.vue")
    },
    {
      path: "/dailysong",
      name: "dailysong",
      component: () => import("../views/dailySong/DailySong.vue")
    },
    {
      path: "/superblist",
      name: "superblist",
      component: () => import("../views/superblist/SuperbList.vue")
    },
    {
      path: "/newestdisc",
      name: "newestdisc",
      component: () => import("../views/newestdisc/NewestDisc.vue")
    },
    {
      path: "/search",
      name: "search",
      children: [
        {
          path: "searchView/:type",
          name: "searchview",
          component: () => import("../components/SearchView.vue")
        }
      ],
      component: () => import("../views/search/Search.vue")
    },
    {
      path: "/songcomment/:songId",
      name: "songcomment",
      component: () => import("../views/songcomment/SongComment.vue")
    },
    {
      path: "/singerpage/:singerId",
      name: "singerpage",
      component: () => import("../views/singerPage/SingerPage.vue")
    }
    /*
    
    {
      path: "/singer/:id",
      name: "singer",
      component: () => import("../views/singer/Singer.vue")
    },
    {
      path: "/comment/:id",
      name: "comment",
      component: () => import("../views/comment/Comment.vue")
    } */
  ]
});

export default router;
