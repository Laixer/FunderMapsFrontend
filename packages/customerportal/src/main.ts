import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import { FoundationType } from "@fundermaps/common";
import { createApp } from "vue";

const test: FoundationType = new FoundationType(FoundationType.Type.NoPile);
console.log(test.translate());

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
