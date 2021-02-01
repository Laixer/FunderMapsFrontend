/* eslint-disable @typescript-eslint/no-var-requires */
declare const __VENDOR: string;

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

export enum Package {
  CustomerPortal,
  IncidentPortal,
  ClientApp
}

export type AppConfig<Package> = {
  appTitle: string;
  [key: string]: any;
};

export const CustomerPortalConfig: AppConfig<Package.CustomerPortal> = require("./config/CustomerPortal").default;
export const ClientAppConfig: AppConfig<Package.ClientApp> = require("./config/ClientApp").default;
export const IncidentPortalConfig: AppConfig<Package.IncidentPortal> = require("./config/IncidentPortal").default;

export const vendorConfig: VendorConfig = require(`./vendors/${__VENDOR}/vendor.json`);
