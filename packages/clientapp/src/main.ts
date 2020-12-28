import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";

import { config } from "@fundermaps/vendor"

console.log(config.home)
createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
