import {renderContent} from "./layout.js";
import {defineWebComponents} from "@/components/component-define.js";


function setRouter() {
    const path = location.pathname;

    renderContent(path);

    document.querySelectorAll('a').forEach($a => {
        $a.addEventListener('click', (event) => {
            const path = $a.getAttribute('href');
            if ($a.href === path) {
                return;
            }
            event.preventDefault();
            history.pushState(null, null, path);
            setRouter();
        })
    })

    if (path !== '/') return;
}

function main() {
    setRouter();

    defineWebComponents();

    window.addEventListener('popstate', setRouter);
}



main();


