/* eslint-disable @typescript-eslint/no-var-requires */

declare const VENDOR: string;

export type VendorConfig = {
  name: string;
  title: string;
  client_id: number;
  style: {
    mapboxPrimaryColor: string;
  };
  clientapp: {
    title: string;
  };
  customerportal: {
    title: string;
  };
  incidentportal: {
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
};

export const config: VendorConfig = require(`./${VENDOR}/config.json`);
