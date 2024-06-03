import {post, request} from "./networks.js";
import {showImagePreview} from "./commonPop.js";
import {validateForm} from "./commonDom.js";


const $btn = document.querySelector('button-template-submit');


$btn.addEventListener('click', () => {
    if(!$btn.isButtonClick) return;

    const $form = document.querySelector('form')
    const formData = new FormData($form);
    const param = _.object(formData);

    if(!validateForm($form, param)) return;

    $btn.processLoading();

    post(formData.get('action'), param).then((res)=> {
        if (res.status == 0) {
            $btn.processRestore();
            alert(res.msg);
        } else {
            $btn.processComplelte();

            // type이 action이면 동기 처리
            if(param.templateType == 'action') {

                async function displayImage(filename) {
                    const response = await request(filename);
                    const imageUrl = response.image_url;

                    showImagePreview(imageUrl, res.id, res.smiles);

                    $btn.processRestore();
                }
                displayImage(res.src);
            }
        }
    });
});