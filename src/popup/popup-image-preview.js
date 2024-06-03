
export class popupImagePreview extends HTMLElement {
    constructor() {
        super();
        console.log('mounted popupImagePreview');

        this.dom = this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        this.render();

        this.btn = this.dom.querySelector('#popCloseBtn');

        this.btn.addEventListener('click', () => {
            this.closePopup();
        });

        window.addEventListener('keyup', this.closeEvent);
    }

    closeEvent = (event) => {
        if(event.keyCode === 27) {
            this.closePopup();
        }
    }

    closePopup() {
        window.removeEventListener('keyup', this.closeEvent);
        document.querySelector("popup-image-preview").remove();
    }


    // 사용자 정의 요소가 document의 DOM에서 연결 해제되었을 때마다 호출됩니다.
    disconnectedCallback() {}
    // 사용자 정의 요소가 새로운 document로 이동되었을 때마다 호출됩니다.
    adoptedCallback() {}
    // 사용자 정의 요소의 특성들 중 하나가 추가되거나, 제거되거나, 변경될 때마다 호출됩니다. 어떤 특성이 변경에 대해 알릴지는 static get observedAttributes 메서드에서 명시됩니다.
    attributeChangedCallback(name, oldValue, newValue) {}

    render() {
        this.dom.innerHTML = this.template(
            {
                src: this.getAttribute('src'),
                title: this.getAttribute('title'),
                bottom: this.getAttribute('bottom'),
            }
        );
    }

    template(state) {
        return `
            <style>
                input[type="button"] {
                  padding: 10px 20px;
                  background-color: #7F7F7F;
                  color: #fff;
                  text-decoration: none;
                  border: none;
                  border-radius: 5px;
                  cursor: pointer;
                }
            
                .image-popup {
                  position: fixed; /* Set position to fixed for proper positioning */
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  background-color: rgba(0, 0, 0, 0.7);
                  z-index: 100;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  padding: 20px;
                  border: 2px solid #ccc; /* Add border to the popup container */
                }
                
                .popup-image {
                  max-width: 80%;
                  max-height: 80vh;
                  margin-bottom: 10px;
                  object-fit: contain;
                  border: 1px solid #ccc;
                }
                
                
                
                .popup-close:hover {
                  background-color: #ddd;
                }
            </style>
            
             <div class="image-popup">
                <div>Inputed KCB ID: ${state.title}</div>
                <img class="popup-image" src="${state.src}" alt=""/>
                <div>The 2D image for ${state.bottom}</div>
                <input type="button" value="Close" id="popCloseBtn"/>
            </div>
        `;
    }
}
