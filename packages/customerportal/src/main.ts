import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import { config } from "@fundermaps/vendor";
import { createApp, Plugin } from "vue";

const devtools: Plugin = {
  install(app) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    if (process.env.NODE_ENV === "development" && window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app;
    }
  }
};

createApp(App)
  .use(store)
  .use(router)
  .use(devtools)
  .provide("vendor_data", config)
  .mount("#app");
