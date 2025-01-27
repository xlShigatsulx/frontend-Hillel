"use strict";

var $form = $('.js--form');
var $list = $('.js--todos-wrapper');
function createEl() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'div' : _ref$type,
    content = _ref.content,
    attributes = _ref.attributes;
  var $el = $("<".concat(type, ">"));
  if (content) typeof content === 'string' ? $el.text(content) : $el.append(content);
  if (attributes) {
    $.each(attributes, function (key, value) {
      if (key === 'checked') {
        $el.prop('checked', value);
      } else {
        $el.attr(key, value);
      }
    });
  }
  return $el;
}
function createTodoItem(todoText, $list) {
  var isChecked = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var id = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : crypto.randomUUID();
  var $li = createEl({
    type: 'li',
    attributes: {
      "class": "todo-item ".concat(isChecked ? 'todo-item--checked' : ''),
      'data-id': id
    }
  });
  var $span = createEl({
    type: 'span',
    content: todoText,
    attributes: {
      "class": 'todo-item__description'
    }
  });
  var $checkbox = createEl({
    type: 'input',
    attributes: {
      type: 'checkbox',
      checked: isChecked
    }
  });
  var $button = createEl({
    type: 'button',
    content: 'Видалити',
    attributes: {
      "class": 'todo-item__delete'
    }
  });
  $button.on('click', function () {
    $li.remove();
    saveTodos($list);
  });
  $checkbox.on('change', function () {
    $li.toggleClass('todo-item--checked', this.checked);
    saveTodos($list);
  });
  $li.append($checkbox, $span, $button);
  $list.append($li);
  saveTodos($list);
}
function saveTodos($list) {
  var todos = $list.children().map(function () {
    var $item = $(this);
    return {
      id: $item.data('id'),
      text: $item.find('.todo-item__description').text(),
      isChecked: $item.find('input[type="checkbox"]').prop('checked')
    };
  }).get();
  localStorage.setItem('todos', JSON.stringify(todos));
}
function loadTodos($list) {
  var todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.forEach(function (todo) {
    createTodoItem(todo.text, $list, todo.isChecked, todo.id);
  });
}
function syncTodos($list, newTodos) {
  var currentTodos = $list.children().map(function () {
    var $item = $(this);
    return {
      id: $item.data('id'),
      text: $item.find('.todo-item__description').text(),
      isChecked: $item.find('input[type="checkbox"]').prop('checked')
    };
  }).get();
  newTodos.forEach(function (todo) {
    if (!currentTodos.find(function (t) {
      return t.id === todo.id;
    })) createTodoItem(todo.text, $list, todo.isChecked, todo.id);
  });
  currentTodos.forEach(function (todo) {
    if (!newTodos.find(function (t) {
      return t.id === todo.id;
    })) $list.find("[data-id=\"".concat(todo.id, "\"]")).remove();
  });
  newTodos.forEach(function (todo) {
    var $existingTodo = $list.find("[data-id=\"".concat(todo.id, "\"]"));
    if ($existingTodo.length) {
      var $checkbox = $existingTodo.find('input[type="checkbox"]');
      var $description = $existingTodo.find('.todo-item__description');
      if ($checkbox.prop('checked') !== todo.isChecked) {
        $checkbox.prop('checked', todo.isChecked);
        $existingTodo.toggleClass('todo-item--checked', todo.isChecked);
      }
      if ($description.text() !== todo.text) $description.text(todo.text);
    }
  });
}
$form.on('submit', function (e) {
  e.preventDefault();
  var $input = $form.find('.js--form__input');
  if ($input.val()) {
    createTodoItem($input.val(), $list);
    $input.val('');
  }
});
loadTodos($list);
$(window).on('storage', function (e) {
  if (e.originalEvent.key === 'todos') {
    var newTodos = JSON.parse(e.originalEvent.newValue) || [];
    syncTodos($list, newTodos);
  }
});