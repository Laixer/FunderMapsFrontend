/* eslint-disable @typescript-eslint/no-var-requires */

export declare const VENDOR: string;

export type VendorConfig = {
  name: string;
  client_id: number;
  style: {
    mapboxPrimaryColor: string;
  };
  background: string;
  logo: string;
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

const config: VendorConfig = require(`./${VENDOR}/config.json`);
export default config;
