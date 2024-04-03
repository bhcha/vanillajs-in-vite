import '../public/css/style.css'
import {request} from "../public/commons/communication.js";

document.querySelector('#app').innerHTML = `
  <div>
    <img alt="Logo" width="150" height="150"/> <!-- 이미지 삽입 -->
    <h1>Welcome to DAISY</h1>
    <p class="system-text">Daewoong AI SYstem</p> <!-- 시스템 이름 출력 -->
    <!-- 추가 링크 -->
    <div class="link-box">

    </div>
  </div>
`