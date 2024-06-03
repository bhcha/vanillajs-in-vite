export const el = html => {
    const wrap = document.createElement("div");
    wrap.innerHTML = html;
    return wrap.children[0]
}

export function makeScripts(src) {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = src;
    return script;
}

export function setEventFromStaticJS(srcs) {
    return _.go(
        srcs ?? [],
        _.filter(Boolean),
        _.map(src => makeScripts(src)),
        scripts => {
            if (scripts.length === 0) return; // Early return within the pipe
            document.body.append(...scripts);
        }
    );
}

export function validateForm($form, param) {
    const { L, C } = _;
    return _.go(
        $form.querySelectorAll('[required]'),
        L.filter(input => !param[input.name]),
        L.take(1),
        _.each(input => {
            if (input) {
                input.focus();
                alert(`"${input.previousElementSibling.textContent}" is required.`);
            }
        }),
        inputs => inputs.length === 0
    );
}