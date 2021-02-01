import Home from "@/views/Home.vue";
import { CustomerPortalConfig } from "@fundermaps/vendor";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    meta: {
      title: CustomerPortalConfig.title
    },

    component: Home
  }
  // {
  //   path: "/vragen",
  //   name: "Questions",
  //   props: { steps: 8 },
  //   // route level code-splitting
  //   // this generates a separate chunk (questions.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: Questions
  // }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
