import {GET_SCHEDULELIST, put, PUT_RETRYSCHEDULE} from "./networks.js";


let Grid = tui.Grid;

class CustomButton {
    constructor(props) {
        const el = document.createElement('button');
        const {text, event} = props.columnInfo.renderer.options;

        el.textContent = text;
        el.addEventListener('click', function (e) {
            event(e, grid.getRow(props.rowKey))
        });

        this.el = el;
        this.render(props);
    }

    getElement() {
        return this.el;
    }

    render(props) {
        this.el.value = String(props.value);
    }
}

const dataSource = {
    api: {
        readData: {url: `${GET_SCHEDULELIST}`, method: 'GET', initParams: {param: 'param'}}
    }
};

const grid = new Grid({
    data: dataSource,
    el: document.getElementById('grid'), // 컨테이너 엘리먼트
    columns: [
        {name: 'scheduleid', hidden: true,},
        {name: 'status', hidden: true,},
        {name: 'filepath', hidden: true,},
        {name: 'threadid', hidden: true,},
        {
            header: 'PID',
            name: 'pid',
            editor: 'text',
            width: 200,
            required: true
        },
        {
            header: 'PSMILES',
            name: 'psmiles',
            editor: 'text',
            width: 200,
            required: true
        },
        {
            header: 'EMAIL',
            name: 'email',
            editor: 'text',
            width: 200,
            required: true
        },
        {
            header: '상태',
            name: 'statusnm',
            editor: 'text',
            width: 100,
            required: true
        },
        {
            header: '실패사유',
            name: 'msg',
            editor: 'text',
            required: true
        },
        {
            header: '재수행',
            name: 'reload',
            editor: 'text',
            align: 'center',
            required: true,
            renderer: {
                type: CustomButton,
                options: {
                    text: '재수행'
                    , event: function (ev, rows) {
                        if (!rows.email || rows.email.indexOf('@daewoong.co.kr') == -1) {
                            alert('대웅(@daewoong.co.kr) 이메일만 작성 가능합니다.');
                            ev.preventDefault();
                            return;
                        }

                        if(rows.status == '001') {
                            alert('실행중인 상태는 재수행 할 수 없습니다.');
                            ev.preventDefault();
                            return;
                        }

                        const scheduleid = rows.scheduleid;
                        const email = rows.email;

                        retrySchedule(scheduleid, email);

                        ev.preventDefault();
                    }
                }
            }
        }
    ],
});

function retrySchedule(scheduleid, email) {
    put(PUT_RETRYSCHEDULE, {
        scheduleid: scheduleid
        , email: email
    }).then((res) => {
        console.log(res);
        retrieveData();

    });
}


/**
 * 조회(retrieve)버튼 클릭
 * @type {Element}
 */
const $btn = document.querySelector('button-template-submit');
$btn.addEventListener('click', () => {
    retrieveData();
});

function retrieveData() {
    grid.readData();
}