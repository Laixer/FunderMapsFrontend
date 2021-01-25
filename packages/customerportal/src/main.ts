import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import { appConfig, CustomerPortalConfig, VendorConfig, vendorConfig } from "@fundermaps/vendor";
import { createApp } from "vue";

createApp(App)
  .use(store)
  .use(router)
  .provide<CustomerPortalConfig>("app_config", appConfig as CustomerPortalConfig)
  .provide<VendorConfig>("vendor_config", vendorConfig)
  .mount("#app");
