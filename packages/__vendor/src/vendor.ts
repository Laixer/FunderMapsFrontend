/* eslint-disable @typescript-eslint/no-var-requires */
export declare const VENDOR: string;

export type VendorConfig = {
    name: string,
    client_id: number,
    style: {
        mapboxPrimaryColor: string,
    },
    background: any,
    logo: any,
    home: {
        title: string,
        subtitle: string,
        content: string,
        image: any
    },
    final: {
        content: string
    }
}

export const favicon = require(`/${VENDOR}/favicon.ico`)

const vendor: VendorConfig = require(`/${VENDOR}/vendor.config`).default
export default vendor
