/**
 * Take care of loading an asset
 */
async function asset(path: string): Promise<unknown> {
  return await import(/* webpackIgnore: true */ `@/assets/${path}`);
}

/**
 * Take care of loading an icon
 */
export async function icon(name: string): Promise<unknown> {
  return await asset(`icons/${name}`);
}

/**
 * Take care of loading an image
 */
export async function image(name: string): Promise<unknown> {
  return await asset(`image/${name}`);
}
