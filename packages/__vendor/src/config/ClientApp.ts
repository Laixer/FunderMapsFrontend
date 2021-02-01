import { AppConfig, Package } from "../config";
declare const __VENDOR: string;

// TODO: Refactor this part in all package configs
let _config = null;
try {
  _config = require(`../vendors/${__VENDOR}/apps/clientapp/app.json`);
} catch (e) {
  console.warn(
    `Tried to load unsupported vendor (${__VENDOR}) for this application (clientapp). App config will be default.`
  );
}

const _defaultClientAppConfig: AppConfig<Package.ClientApp> = {
  appTitle: _config?.appTitle || "FunderMaps"
};

export default _defaultClientAppConfig;
