/* eslint-disable @typescript-eslint/no-var-requires */

declare const __VENDOR: string;
declare const __APP: string;

// TODO: Remove all traces of client_id. We have decided to deploy a backend application
//       per vendor. Therefore some config like 'client_id' will be moved to the server-side.
export type VendorConfig = {
  name: string;
  title: string;
  client_id: number;
  style: {
    mapboxPrimaryColor: string;
  };
};

type AppConfig = {
  title: string;
};

export type ClientAppConfig = AppConfig;

export interface CustomerPortalConfig extends AppConfig {
  home: {
    title: string;
    subtitle: string;
    content: string;
    image: string;
  };
  final: {
    content: string;
  };
}

export interface IncidentPortalConfig extends AppConfig {
  home: {
    title: string;
    subtitle: string;
    content: string;
    image: string;
  };
  final: {
    content: string;
  };
}

export const vendorConfig: VendorConfig = require(`./${__VENDOR}/vendor.json`);
export const appConfig = require(`./${__VENDOR}/apps/${__APP}/app.json`);
