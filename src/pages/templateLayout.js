import {setEventFromStaticJS} from "@/statics/commonDom.js";

export const TemplateLayout = (childrens) => {
    console.log(childrens);
    if(childrens.length > 1){
        alert("두개 이상의 템플릿이 조회되었습니다.");
        return;
    }
    const children = childrens[0];
    function render() {
        document.querySelector('#app').innerHTML = `
            <img alt="Logo" src="/images/logo.jpg"  width="150" height="150"/> <!-- 이미지 삽입 -->
            <h1 class="template-h1">${children.menuName}</h1>
            
            <form>
                ${children.content}        
        
                <!-- 제출 버튼 -->
                <input type="hidden" id="templateType" name="templateType" value="${children.templateType}" />
                <input type="hidden" id="action" name="action" value="${children.action}" />
                <button-template-submit text="${children.templateType}" ></button-template-submit>
        
                <!-- 도움말 다운로드 버튼을 아래로 이동 -->
                ${children.filePath ? `<a class="help-button" target="_blank" href="${children.filePath}">Need Help?</a>` : ""}
            </form>
        
            <label><br><br><br> Mail to Webmaster: <a href="mailto:${children.webmasterMail}" target="_tip"">${children.webmasterMail}</a></label>
        
            <div style="text-align: center; margin-top: 20px;">
                <button onclick="window.location.href='/'" style="padding: 10px 20px; background-color: #7F7F7F; color: #fff; border: none; border-radius: 5px; cursor: pointer;">
                    Go to Home
                </button>
            </div>
        `;

        //todo 이벤트 처리
    }

    render();

    setEventFromStaticJS(['/statics/template.js', children.actionSrc]);
}
