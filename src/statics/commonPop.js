import {el} from "./commonDom.js";

export function showImagePreview(preview, title, bottom) {
    document.querySelector("#app").append(
        el(`<popup-image-preview src="${preview}" title="${title}" bottom="${bottom}">`)
    );
}
