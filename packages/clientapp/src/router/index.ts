import { isAdmin, isLoggedIn, logout } from "@/services/auth";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue")
  },
  // Authentication & User
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
    meta: {
      layout: "login",
      public: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  // Public pages
  if (to.meta && to.meta.public) {
    next();
  } else if (isLoggedIn()) {
    // Admin pages are only visible to admins
    // Anyone else will get a 404
    if (to.meta && to.meta.admin) {
      if (isAdmin()) {
        next();
      } else {
        next({ name: "404" });
      }
      // Regular dashboard pages are not available to admins
    } else {
      if (isAdmin() && (!to.meta || !to.meta.profile)) {
        next({ name: "admin-dashboard" });
      } else {
        next();
      }
    }
  } else {
    // If the user is logged in, log out first
    if (isLoggedIn()) {
      logout();
    }
    next({ name: "login" });
  }
});

export default router;
