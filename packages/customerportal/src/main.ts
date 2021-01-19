import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import { config } from "@fundermaps/vendor";
import { createApp } from "vue";

const app = createApp(App)
  .use(store)
  .use(router)
  .provide("vendor_data", config.customerportal)
  .provide("vendor_style", config.style)
  .mount("#app");
