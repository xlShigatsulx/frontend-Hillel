const $form = $('.js--form');
const $list = $('.js--todos-wrapper');

function createEl({ type = 'div', content, attributes } = {}) {
	const $el = $(`<${type}>`);

	if (content) typeof content === 'string' ? $el.text(content) : $el.append(content);

	if (attributes) {
		$.each(attributes, (key, value) => {
			if (key === 'checked') {
				$el.prop('checked', value);
			} else {
				$el.attr(key, value);
			}
		})
	}

	return $el;
}

function createTodoItem(todoText, $list, isChecked = false, id = crypto.randomUUID() ) {
	const $li = createEl({
		type: 'li',
		attributes: {
			class: `todo-item ${isChecked ? 'todo-item--checked' : ''}`,
			'data-id': id,
		},
	});

	const $span = createEl({
		type: 'span',
		content: todoText,
		attributes: { class: 'todo-item__description' },
	});

	const $checkbox = createEl({
		type: 'input',
		attributes: { type: 'checkbox', checked: isChecked },
	});

	const $button = createEl({
		type: 'button',
		content: 'Видалити',
		attributes: { class: 'todo-item__delete' },
	});

	$button.on('click', function () {
		$li.remove()
		saveTodos($list)
	});

	$checkbox.on('change', function () {
		$li.toggleClass('todo-item--checked', this.checked)
		saveTodos($list)
	});

	$li.append($checkbox, $span, $button);
	$list.append($li);
	saveTodos($list);
}

function saveTodos($list) {
	const todos = $list.children().map(function () {
			const $item = $(this);
			return {
				id: $item.data('id'),
				text: $item.find('.todo-item__description').text(),
				isChecked: $item.find('input[type="checkbox"]').prop('checked'),
			}
		}).get();
	localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos($list) {
	const todos = JSON.parse(localStorage.getItem('todos')) || [];
	todos.forEach(todo => {
		createTodoItem(todo.text, $list, todo.isChecked, todo.id)
	});
}

function syncTodos($list, newTodos) {
	const currentTodos = $list.children().map(function () {
		const $item = $(this);
		return {
			id: $item.data('id'),
			text: $item.find('.todo-item__description').text(),
			isChecked: $item.find('input[type="checkbox"]').prop('checked'),
		}
	}).get();

	newTodos.forEach(todo => { if (!currentTodos.find(t => t.id === todo.id)) createTodoItem(todo.text, $list, todo.isChecked, todo.id);});

	currentTodos.forEach(todo => { if (!newTodos.find(t => t.id === todo.id)) $list.find(`[data-id="${todo.id}"]`).remove(); });

	newTodos.forEach(todo => {
		const $existingTodo = $list.find(`[data-id="${todo.id}"]`);
		if ($existingTodo.length) {
			const $checkbox = $existingTodo.find('input[type="checkbox"]');
			const $description = $existingTodo.find('.todo-item__description');
			if ($checkbox.prop('checked') !== todo.isChecked) {
				$checkbox.prop('checked', todo.isChecked);
				$existingTodo.toggleClass('todo-item--checked', todo.isChecked);
			}
			if ($description.text() !== todo.text) $description.text(todo.text);
		}
	})
}

$form.on('submit', function (e) {
	e.preventDefault();
	const $input = $form.find('.js--form__input');
	if ($input.val()) {
		createTodoItem($input.val(), $list);
		$input.val('');
	}
});

loadTodos($list);

$(window).on('storage', function (e) {
	if (e.originalEvent.key === 'todos') {
		const newTodos = JSON.parse(e.originalEvent.newValue) || [];
		syncTodos($list, newTodos);
	}
});
