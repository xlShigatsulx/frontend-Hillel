function createEl({ type = 'div', content, attributes  } = {}) {
    const $el = document.createElement(type);

    if (content) typeof content === 'string' ? $el.textContent = content : $el.append(content);

    if (attributes) Object.entries(attributes).forEach(([key, value]) => {
        $el.setAttribute(key, value);
    })

    return $el;
}

const div = createEl({ type: 'div'});
const list = createEl({ type: 'ul', content: 'Task List:', attributes: {class: 'list'}});
const input = createEl({ type: 'input'});
const buttonInput = createEl({ type: 'button', content: 'Add', attributes: {class: 'buttonInput'}});

div.appendChild(list);
div.appendChild(input);
div.appendChild(buttonInput);
document.body.appendChild(div);

buttonInput.addEventListener('click', () => {
    if(!(input.value)) {
        console.log('Input is empty!')
    } else {
        const fragment = document.createDocumentFragment();
        const li = createEl({type: 'li', content: input.value, attributes: {class: 'newLi'}});
        const button = createEl({type: 'button', content: 'remove', attributes: {class: 'newButton'}});

        button.addEventListener('click', () => {
            li.remove();
            button.remove();
        }, {once: true});

        li.appendChild(button);
        fragment.appendChild(li);
        list.appendChild(fragment);
        input.value = '';
    }
});