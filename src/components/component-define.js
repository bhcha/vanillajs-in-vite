import {buttonTemplateSubmit} from "@/components/button-template-submit.js";
import {popupImagePreview} from "@/popup/popup-image-preview.js";

export function defineWebComponents() {
    (function defineElements() {
        window.customElements.define("button-template-submit", buttonTemplateSubmit);
        window.customElements.define("popup-image-preview", popupImagePreview);
    })();
}