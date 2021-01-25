/* eslint-disable @typescript-eslint/no-var-requires */

declare const __VENDOR: string;

export type VendorConfig = {
  name: string;
  title: string;
  client_id: number;
  style: {
    mapboxPrimaryColor: string;
  };
};

export type CustomerPortalConfig = {
  title: string;
  home: {
    title: string;
    subtitle: string;
    content: string;
    image: string;
  };
  final: {
    content: string;
  };
};

export type ClientAppConfig = {
  title: string;
};

export type IncidentPortalConfig = {
  title: string;
  home: {
    title: string;
    subtitle: string;
    content: string;
    image: string;
  };
  final: {
    content: string;
  };
};

export const vendorConfig: VendorConfig = require(`./${__VENDOR}/config/_vendor.json`);
export const customerPortalConfig: CustomerPortalConfig = require(`./${__VENDOR}/config/customerportal.json`);
export const clientAppConfig: ClientAppConfig = require(`./${__VENDOR}/config/clientapp.json`);
export const incidentPortalConfig: IncidentPortalConfig = require(`./${__VENDOR}/config/incidentportal.json`);
