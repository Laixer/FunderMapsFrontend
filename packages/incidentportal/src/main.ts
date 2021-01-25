import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import { appConfig, IncidentPortalConfig, VendorConfig, vendorConfig } from "@fundermaps/vendor";
import { createApp } from "vue";

createApp(App)
  .use(store)
  .use(router)
  .provide<IncidentPortalConfig>("app_config", appConfig as IncidentPortalConfig)
  .provide<VendorConfig>("vendor_config", vendorConfig)
  .mount("#app");
