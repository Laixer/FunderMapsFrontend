import Home from "@/views/Home.vue";
import { appConfig } from "@fundermaps/vendor";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    meta: {
      title: appConfig.title
    },
    component: Home
  },
  {
    path: "/vragen",
    name: "Questions",
    meta: {
      title: appConfig.title
    },
    component: () => import("../views/Questions.vue")
  }
  // {
  //   path: '/klaar',
  //   name: 'Finish',
  //   component: () => import('../views/Finish.vue')
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
