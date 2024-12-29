"use strict";

function createEl({ type = 'div', content, attributes } = {}) {
    const $el = document.createElement(type);

    if (content) typeof content === 'string' ? $el.textContent = content : $el.append(content);

    if (attributes) Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'checked') {
            $el.checked = value;
        } else {
            $el.setAttribute(key, value);
        }
    });

    return $el;
}

function createTodoItem(todoText, list, isChecked = false, id = Date.now()) {
    const fragment = document.createDocumentFragment();

    const li = createEl({
        type: 'li',
        attributes: { 
            class: `todo-item ${isChecked ? 'todo-item--checked' : ''}`,
            'data-id': id
        },
    });

    const span = createEl({
        type: 'span',
        content: todoText,
        attributes: { class: 'todo-item__description' },
    });

    const checkbox = createEl({
        type: 'input',
        attributes: { type: 'checkbox', checked: isChecked }
    });

    const button = createEl({
        type: 'button',
        content: 'Видалити',
        attributes: { class: 'todo-item__delete' },
    });

    button.addEventListener('click', () => {
        li.remove();
        saveTodos(list);
    }, { once: true });

    checkbox.addEventListener('change', e => {
        if (e.target.checked) {
            li.classList.add('todo-item--checked');
        } else {
            li.classList.remove('todo-item--checked');
        }
        saveTodos(list);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(button);
    fragment.appendChild(li);
    list.appendChild(fragment);
    saveTodos(list);
}

function saveTodos(list) {
    const todos = Array.from(list.children).map((item) => {
        return {
            id: item.getAttribute('data-id'),
            text: item.querySelector('.todo-item__description').textContent,
            isChecked: item.querySelector('input[type="checkbox"]').checked
        };
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos(list) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
        createTodoItem(todo.text, list, todo.isChecked, todo.id);
    });
}

function syncTodos(list, newTodos) {
    const currentTodos = Array.from(list.children).map((item) => ({
        id: item.getAttribute('data-id'),
        text: item.querySelector('.todo-item__description').textContent,
        isChecked: item.querySelector('input[type="checkbox"]').checked
    }));

    newTodos.forEach(todo => {
        if (!currentTodos.find(t => t.id === todo.id)) {
            createTodoItem(todo.text, list, todo.isChecked, todo.id);
        }
    });

    currentTodos.forEach(todo => {
        if (!newTodos.find(t => t.id === todo.id)) {
            list.querySelector(`[data-id="${todo.id}"]`).remove();
        }
    });

    newTodos.forEach(todo => {
        const existingTodo = list.querySelector(`[data-id="${todo.id}"]`);
        if (existingTodo) {
            const checkbox = existingTodo.querySelector('input[type="checkbox"]');
            const description = existingTodo.querySelector('.todo-item__description');
            if (checkbox.checked !== todo.isChecked) {
                checkbox.checked = todo.isChecked;
                existingTodo.classList.toggle('todo-item--checked', todo.isChecked);
            }
            if (description.textContent !== todo.text) {
                description.textContent = todo.text;
            }
        }
    });
}

const form = document.forms.form;
const list = document.querySelector(".js--todos-wrapper");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (e.target.value.value) createTodoItem(e.target.value.value, list);
    e.target.reset();
});

loadTodos(list);

window.addEventListener('storage', (e) => {
    if (e.key === 'todos') {
        const newTodos = JSON.parse(e.newValue) || [];
        syncTodos(list, newTodos);
    }
});