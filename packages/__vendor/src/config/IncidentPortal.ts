import { AppConfig, Package } from "../config";
declare const __VENDOR: string;

// TODO: Refactor this part in all package configs
let _config = null;
try {
  _config = require(`../vendors/${__VENDOR}/apps/incidentportal/app.json`);
} catch (e) {
  console.warn(
    `Tried to load unsupported vendor (${__VENDOR}) for this application (incidentportal). App config will be default.`
  );
}

const _defaultIncidentPortalConfig: AppConfig<Package.IncidentPortal> = {
  appTitle: _config?.appTitle || "Incident portal",
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

export default _defaultIncidentPortalConfig;
