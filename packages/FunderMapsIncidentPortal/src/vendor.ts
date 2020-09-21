/* eslint-disable @typescript-eslint/no-var-requires */

export declare const VENDOR: string;

export type VendorConfig = {
    name: string,
    logo: any,
    home: {
        title: string,
        subtitle: string,
        content: string,
        image: any
    }
}

const vendor: VendorConfig = require(`../vendors/${VENDOR}/vendor.config`).default
export default vendor