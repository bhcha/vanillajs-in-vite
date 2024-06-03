import {get, post, request,downloadFile} from "./networks.js";
import {showImagePreview} from "./commonPop.js";
import {validateForm} from "./commonDom.js";


const $btn = document.querySelector('button-template-submit');


$btn.addEventListener('click', () => {
    if(!$btn.isButtonClick) return;

    const $form = document.querySelector('form')
    const formData = new FormData($form);
    const param = _.object(formData);

    if(!validateForm($form, param)) return;

    if(param['email'].indexOf('@daewoong.co.kr') == -1) {
        alert('대웅(@daewoong.co.kr) 이메일만 작성 가능합니다.');
        return;
    }

    $btn.processLoading();

    post(formData.get('action'), param).then((res)=> {
        if (res.status == 0) {
            $btn.processRestore();
            alert(res.msg);
        } else {
            const scheduleid = res["scheduleid"];
            const schedulestatus = res["schedulestatus"];


            if(schedulestatus == '004') {
                alert("신청이 완료 되었습니다. 완료후 메일 발송 예정입니다.");
            } else if(schedulestatus == '002') {
                const filepath = res["filepath"];

                const fileName = filepath.split('/').pop();
                downloadFile(fileName);
            }

            $btn.processComplelte();


        }
    });
});
