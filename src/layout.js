import '../public/css/style.css'
import {post, request} from "../public/commons/communication.js";


const DefaultLayout = (children) =>
`
  <div>
    <img alt="Logo" src="/images/logo.jpg"  width="150" height="150"/> <!-- 이미지 삽입 -->
    <h1>Welcome to DAISY</h1>
    <p class="system-text">Daewoong AI System</p> <!-- 시스템 이름 출력 -->
    <!-- 추가 링크 -->
    <div class="link-box">
        ${children}
    </div>
  </div>
`;

const TemplateLayout = (children) =>
`
    <img alt="Logo" src="/images/logo.jpg"  width="150" height="150"/> <!-- 이미지 삽입 -->
    <h1 class="template-h1">${children.menuName}</h1>
    
    <form method="POST" action="${children.action}"">
        ${children.content}        

        <!-- 제출 버튼 -->
        <input type="submit" name="submit" value="Predict" />

        <!-- 도움말 다운로드 버튼을 아래로 이동 -->
        ${children.filePath ? `<a class="help-button" target="_blank" href="${children.filePath}">Need Help?</a>` : ""}
    </form>

    <label><br><br><br> Mail to Webmaster: <a href="${children.webmasterMail}" target="_tip"">${children.webmasterMail}</a></label>

    <div style="text-align: center; margin-top: 20px;">
        <button onclick="window.location.href='/'" style="padding: 10px 20px; background-color: #7F7F7F; color: #fff; border: none; border-radius: 5px; cursor: pointer;">
            Go to Home
        </button>
    </div>
`;

export const getContent = (path) => {
    return path === "/" ?
            _.go(
                getMenuList()
                , _.map(menu => `<p><a href="${menu.path}">${menu.menuName}</a></p> `)
                , _.reduce(_.add)
                , DefaultLayout
            )
            : _.go(
                getTemplate(path)
                , TemplateLayout
            )
}

const getTemplate = (path) => post('/test/gettemplate3.json', {path:path});
const getMenuList = () => request('/test/menulist.json');
