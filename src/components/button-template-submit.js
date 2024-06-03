
export class buttonTemplateSubmit extends HTMLElement {
    constructor() {
        super();
        console.log('mounted buttonTemplateSubmit');

        this.dom = this.attachShadow({ mode: "open" });
        this.isClick = true;
    }

    connectedCallback() {
        this.render();
        this.orgText = this.getAttribute('text');

        console.log(this.orgText);
    }

    // 사용자 정의 요소가 document의 DOM에서 연결 해제되었을 때마다 호출됩니다.
    disconnectedCallback() {
        console.log('disconnectedCallback');
    }
    // 사용자 정의 요소가 새로운 document로 이동되었을 때마다 호출됩니다.
    adoptedCallback() {
        console.log('adoptedCallback');
    }
    // 사용자 정의 요소의 특성들 중 하나가 추가되거나, 제거되거나, 변경될 때마다 호출됩니다. 어떤 특성이 변경에 대해 알릴지는 static get observedAttributes 메서드에서 명시됩니다.
    attributeChangedCallback(name, oldValue, newValue) {
        console.log('attributeChangedCallback');
    }
    observedAttributeChangedCallback(name, oldValue, newValue) {
        console.log('observedAttributeChangedCallback');
    }

    get isButtonClick() {
        return this.isClick;
    }

    set isButtonClick(value) {
        this.isClick = value;
    }


    processLoading() {
        this.isButtonClick = false;
        this.updateSubmitButton('loading!','loading');
    }

    processComplelte() {
        this.isButtonClick = false;
        this.updateSubmitButton('Complete!','completed');
    }

    processRestore() {
        this.isButtonClick = true;
        this.updateSubmitButton(this.orgText,'');
    }

    updateSubmitButton(text, classList) {
        this.dom.querySelector('#templateSubmitBtn').classList = '';
        this.dom.querySelector('#templateSubmitBtn').value = text;
        classList && this.dom.querySelector('#templateSubmitBtn').classList.add(classList);
    }

    render() {
        this.dom.innerHTML = this.template({
                text: this.getAttribute('text'),
                classList: this.getAttribute('classList'),
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
            
            input[type="button"]:hover {
              background-color: #0056b3;
            }
            
            input[type="button"].loading {
              background-color: #c8c816;
            }
            
            input[type="button"].completed {
              background-color: #17b300;
            }
            </style>
            
            <input id="templateSubmitBtn" type="button" name="submit" value="${state.text}" />
        `;
    }
}
