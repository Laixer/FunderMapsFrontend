import Home from "@/views/Home.vue";
import { IncidentPortalConfig } from "@fundermaps/vendor";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    meta: {
      title: IncidentPortalConfig.title
    },
    component: Home
  },
  {
    path: "/vragen",
    name: "Questions",
    meta: {
      title: IncidentPortalConfig.title
    },
    component: () => import("../views/Questions.vue")
  },
  {
    path: "/bedankt",
    name: "Finish",
    meta: {
      title: IncidentPortalConfig.title
    },
    component: () => import("../views/Finish.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
