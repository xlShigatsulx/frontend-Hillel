function createEl({ type = 'div', content, attributes  } = {}) {
    const $el = document.createElement(type);

    if (content) typeof content === 'string' ? $el.textContent = content : $el.append(content);

    if (attributes) Object.entries(attributes).forEach(([key, value]) => {
        $el.setAttribute(key, value);
    })

    return $el;
}

const div = createEl({ type: 'div'});
const button1 = createEl({ type: 'button', content: 'Button №1', attributes: {class: 'button1', 'data-button': '1'}});
const button2 = createEl({ type: 'button', content: 'Button №2', attributes: {class: 'button2', 'data-button': '2'}});
const button3 = createEl({ type: 'button', content: 'Button №3', attributes: {class: 'button3', 'data-button': '3'}});

div.appendChild(button1);
div.appendChild(button2);
div.appendChild(button3);
document.body.appendChild(div);

div.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON') {
        const buttonNumber = e.target.dataset.button;
        alert(`Clicked button №${buttonNumber}`);
        console.log(`Clicked button №${buttonNumber}`);
    }
});