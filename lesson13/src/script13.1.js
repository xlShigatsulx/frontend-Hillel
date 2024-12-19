"use strict";

function createEl({ type = 'div', content, attributes  } = {}) {
    const $el = document.createElement(type);

    if (content) typeof content === 'string' ? $el.textContent = content : $el.append(content);

    if (attributes) Object.entries(attributes).forEach(([key, value]) => {
        $el.setAttribute(key, value);
    })

    return $el;
}

const validators = {
  name: value => value.trim() !== '' || '*Required text field!',
  textarea: value => /^.{5,}$/.test(value) || '*Message must be at least 5 characters long',
  phone: value => /^\+380\d{9}$/.test(value) || '*Phone number must start with +380 and contain 9 digits.',
  email: value => /^[a-zA-Z0-9.+-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(value) || '*Email must contain "@" and a dot.'
};

const form = document.forms.form;

function validateField(name, value) {
    const validateFn = validators[name];
    if (!validateFn) return true;
    const result = validateFn(value);

    const error = form.elements[name].parentElement.querySelector(`[data-error-for="${name}"]`);
    if (result !== true) {
        if (!error) {
            const errorLabel = createEl({
                type: 'label',
                content: result,
                attributes: { class: 'errorLabel', 'data-error-for': name }
            });
            form.elements[name].insertAdjacentElement('afterend', errorLabel);
        }
    } else {
        if (error) error.remove();
    }
    return result === true;
}

function validateForm() {
    let isValid = true;
    Object.entries(validators).forEach(([name]) => {
        const value = form.elements[name]?.value.trim();
        if (!validateField(name, value)) isValid = false;
    });
    return isValid;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm()) {
        console.log(`Name: ${form.elements.name.value.trim()},\nMessage: ${form.elements.textarea.value.trim()},\nPhone number: ${form.elements.phone.value.trim()},\nEmail: ${form.elements.email.value.trim()}.`);
        const successLabel = createEl({
            type: 'label',
            content: 'Success!',
            attributes: { class: 'successLabel', 'data-success-for': 'submit' }
        });
        form.elements.submit.insertAdjacentElement('afterend', successLabel);

        form.reset();
        document.querySelectorAll('.errorLabel').forEach(label => label.remove());
    }
});

form.addEventListener('input', (e) => {
    const { name, value } = e.target;
    if (validators[name]) validateField(name, value.trim());
});