/* eslint-disable @typescript-eslint/no-var-requires */

export declare const VENDOR: string;

export type VendorConfig = {
    name: string,
    logo: any
}

const vendor: VendorConfig = require(`../vendors/${VENDOR}/vendor.config`).default
export default vendor