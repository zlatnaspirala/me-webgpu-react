export function getAssetUrl(path) {
    return new URL(`./res/${path}`, import.meta.url).href;
}
