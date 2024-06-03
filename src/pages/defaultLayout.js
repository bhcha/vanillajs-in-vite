export const DefaultLayout = (children) => {
    function render() {
        document.querySelector('#app').innerHTML = `
              <div>
                <img alt="Logo" src="/images/logo.jpg"  width="150" height="150"/> <!-- 이미지 삽입 -->
                <h1>Welcome to DAISY</h1>
                <p class="system-text">${import.meta.env.VITE_TITLE}</p> <!-- 시스템 이름 출력 -->
                <!-- 추가 링크 -->
                <div class="link-box">
                    ${children}
                </div>
              </div>
            `;

        //todo 이벤트 처리
    }

    render();
}