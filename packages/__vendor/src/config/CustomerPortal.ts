import { AppConfig, Package } from "../config";
declare const __VENDOR: string;

// TODO: Refactor this part in all package configs
let _config = null;
try {
  _config = require(`../vendors/${__VENDOR}/apps/customerportal/app.json`);
} catch (e) {
  console.warn(
    `Tried to load unsupported vendor (${__VENDOR}) for this application (customerportal). App config will be default.`
  );
}

const _defaultCustomerPortalConfig: AppConfig<Package.CustomerPortal> = {
  appTitle: _config?.appTitle || "Customer portal",
  home: {
    title: _config?.home.title || "Default home title",
    subtitle: _config?.home.subtitle || "Default home subtitle",
    content: _config?.home.content || "Default home content",
    image: _config?.home.image || "Default home image"
  },
  final: {
    content: _config?.final.content || "Default home content"
  }
};

export default _defaultCustomerPortalConfig;
