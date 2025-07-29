
export function getAssetUrl(path: string) {
  return new URL(`./res/${path}`, import.meta.url).href;
}