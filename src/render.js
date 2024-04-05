import {getContent} from "./layout.js";
import {request} from "../public/commons/communication.js";


function renderHtml(r) {
    const $app = document.querySelector('#app');
    $app.innerHTML = r;
}

function render() {
    console.log('render is called');

    const path = location.pathname;

    _.go(
        getContent(path)
        ,renderHtml
    );

    document.querySelectorAll('a').forEach($a => {
        $a.addEventListener('click', (event) => {
            const path = $a.getAttribute('href');
            if ($a.href === path) {
                return;
            }
            event.preventDefault();
            history.pushState(null, null, path);
            render();
        })
    })

    if (path !== '/') return;
}

function main() {
    render();


    window.addEventListener('popstate', render);
}

main();