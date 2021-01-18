import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import { config } from "@fundermaps/vendor";
import { createApp } from "vue";

const app = createApp(App)
  .use(store)
  .use(router)
  .provide("vendor", config.customerportal)
  .mount("#app");
