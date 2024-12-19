function createEl({ type = 'div', content, attributes  } = {}) {
    const $el = document.createElement(type);

    if (content) typeof content === 'string' ? $el.textContent = content : $el.append(content);

    if (attributes) Object.entries(attributes).forEach(([key, value]) => {
        $el.setAttribute(key, value);
    })

    return $el;
}

const fistForm = document.querySelector('.fist-form');
const inputName = document.querySelector('input[name="user-name"]');
const textarea = document.querySelector('textarea[name="textarea"]');
const inputPhone = document.querySelector('input[name="tel"]');
const inputEmail = document.querySelector('input[name="email"]');
const submitButton = document.querySelector('.btn-submit-form');

function validForm() {
    let isValid = true;

    const errors = document.querySelectorAll('[data-error-for]');
    errors.forEach(error => error.remove());

    if (inputName.value.trim() === '') {
        isValid = false;
        const errorLable = createEl({
            type: 'label', 
            content: '*Required text field!', 
            attributes: {class: 'errorLabel', 'data-error-for': 'name' }
        });
        inputName.insertAdjacentElement('afterend', errorLable);
    }
    
    const textareaRegex = /^.{5,}$/;
    if (!textareaRegex.test(textarea.value)) {
        isValid = false;
        const errorLabel = createEl({
            type: 'label',
            content: '*Message must be at least 5 characters long',
            attributes: { class: 'errorLabel', 'data-error-for': 'textarea' }
        });
        textarea.insertAdjacentElement('afterend', errorLabel);
	}

    const phoneRegex = /^\+380\d{9}$/;
    if (!phoneRegex.test(inputPhone.value)) {
        isValid = false;
        const errorLabel = createEl({
            type: 'label',
            content: '*Phone number must start with +380 and contain 9 digits.',
            attributes: { class: 'errorLabel', 'data-error-for': 'phone' }
        });
        inputPhone.insertAdjacentElement('afterend', errorLabel);
    }

    const emailRegex = /^[a-zA-Z0-9.+-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
    if (!emailRegex.test(inputEmail.value)) {
        isValid = false;
        const errorLabel = createEl({
            type: 'label',
            content: '*Email must contain "@" and a dot.',
            attributes: { class: 'errorLabel', 'data-error-for': 'email' }
        });
        inputEmail.insertAdjacentElement('afterend', errorLabel);
    }

    return isValid;
}

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    const isValid = validForm();
    if(isValid) {
        console.log(`Name: ${inputName.value},\nMassage: ${textarea.value},\nPhone number: ${inputPhone.value},\nEmail: ${inputEmail.value}.`);
        const successLabel = createEl({
            type: 'label',
            content: 'Success!',
            attributes: { class: 'successLabel', 'data-success-for': 'submit' }
        });
        submitButton.insertAdjacentElement('afterend', successLabel)
        fistForm.reset();
    }
});

inputName.addEventListener('input', () => {
    const error = inputName.parentElement.querySelector('[data-error-for="name"]')
    if (inputName.value.trim() !== '') {
        if (error) error.remove();
    }
});

textarea.addEventListener('input', () => {
    const error = textarea.parentElement.querySelector('[data-error-for="textarea"]')
    if (textarea.value.length >= 5) {
        if (error) error.remove();
    }
});

inputPhone.addEventListener('input', () => {
    const phoneRegex = /^\+380\d{9}$/;
    const error = inputPhone.parentElement.querySelector('[data-error-for="phone"]')
    if (phoneRegex.test(inputPhone.value)) {
        if (error) error.remove();
    }
});

inputEmail.addEventListener('input', () => {
    const emailRegex = /^[a-zA-Z0-9.+-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    const error = inputEmail.parentElement.querySelector('[data-error-for="email"]')
    if (emailRegex.test(inputEmail.value)) {
        if (error) error.remove();
    }
});