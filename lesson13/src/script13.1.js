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
  tel: value => /^\+380\d{9}$/.test(value) || '*Phone number must start with +380 and contain 9 digits.',
  email: value => /^[a-zA-Z0-9.+-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(value) || '*Email must contain "@" and a dot.'
};

const form = document.forms.form;

function isFieldValid(name, value) {
    const validateFn = validators[name];
    return validateFn ? validateFn(value) : true;
}

function showFieldError(name, message) {
    const parent = form.elements[name].parentElement;
    const error = Array.from(parent.children).find(child => child.dataset.errorFor === name);

    if (!error) {
        const errorLabel = createEl({
            type: 'label',
            content: message,
            attributes: { class: 'errorLabel', 'data-error-for': name }
        });
        form.elements[name].insertAdjacentElement('afterend', errorLabel);
    }
}

function clearFieldError(name) {
    const parent = form.elements[name].parentElement;
    const error = Array.from(parent.children).find(child => child.dataset.errorFor === name);
    if (error) error.remove();
}

function validateField(name, value) {
    const isValid = isFieldValid(name, value);

    if (isValid !== true) {
        showFieldError(name, isValid);
    } else {
        clearFieldError(name);
    }

    return isValid === true;
}

function validateForm() {
    return Object.entries(validators).every(([name]) => {
        const value = form.elements[name]?.value.trim();
        return validateField(name, value);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm()) {
        console.log(`Name: ${form.elements.name.value.trim()},\nMessage: ${form.elements.textarea.value.trim()},\nPhone number: ${form.elements.tel.value.trim()},\nEmail: ${form.elements.email.value.trim()}.`);
        const successLabel = createEl({
            type: 'label',
            content: 'Success!',
            attributes: { class: 'successLabel', 'data-success-for': 'submit' }
        });
        form.elements.submit.insertAdjacentElement('afterend', successLabel);

        form.reset();
    }
});

form.addEventListener('input', (e) => {
    const successLabel = Array.from(form.children).find(child => child.classList.contains('successLabel'));
    if (successLabel) successLabel.remove();

    const { name, value } = e.target;
    if (validators[name]) validateField(name, value.trim());
});