function createEl({ type = 'div', content, attributes  } = {}) {
    const $el = document.createElement(type);

    if (content) typeof content === 'string' ? $el.textContent = content : $el.append(content);

    if (attributes) Object.entries(attributes).forEach(([key, value]) => {
        $el.setAttribute(key, value);
    })

    return $el;
}

const div = createEl({ type: 'div'});
const button1 = createEl({ type: 'button', content: 'Prompt', attributes: {class: 'button1'}});
const button2 = createEl({ type: 'button', content: 'Other Web', attributes: {class: 'button2'}});

div.appendChild(button1);
div.appendChild(button2);
document.body.appendChild(div);

(() => {
    let userUrlMassage = '';
    button1.addEventListener('click', () => {
        const input = prompt('Enter your Url');
        if (!input) {
        console.log('No URL entered.');
        } else {
            userUrlMassage = input;
        }
    });

    button2.addEventListener('click', () => {
        if (!userUrlMassage) {
            console.log('No URL saved yet!');
        } else {
            location.href = userUrlMassage;
        }
    });
})();
    