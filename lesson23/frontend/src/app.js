import $ from "jquery";
import { TodosManager } from "./scripts/todos.js";
import { TodoAPI } from "./api/todos.js";
import { createTodoItem } from "./scripts/utils.js";

import "./styles/main.scss";

const $form = $("form");
const $contentContainer = $("[data-content]");

const view = new TodosManager($contentContainer);

$(document).ready(fetchTodos);

$form.on("submit", handleFormSubmit);

$(document).on("change", ".todo-checkbox", async (e) => {
  const $item = $(e.target).closest(".todo-item");
  const todoId = $item.data("id");
  const isCompleted = $(e.target).is(":checked");

  $item.toggleClass("todo-completed", isCompleted);

  try {
    await TodoAPI.update(process.env.BASE_SERVICE_URL, todoId, {
      completed: isCompleted,
    });
  } catch (e) {
    fetchErrorHandler(e);
    $item.toggleClass("todo-completed", !isCompleted);
  }
});

$(document).on("click", ".toggle-description", (e) => {
  const $item = $(e.target).closest(".todo-item");
  const $content = $item.find(".todo-content");
  const $icon = $item.find("i");
  const isCollapsed = $content.hasClass("collapsed");

  $content.toggleClass("collapsed", !isCollapsed);
  $icon.toggleClass("fa-chevron-down fa-chevron-up");
});

$(document).on("click", ".delete-btn", async (e) => {
  const $item = $(e.target).closest(".todo-item");
  const todoId = $item.data("id");

  try {
    await TodoAPI.delete(process.env.BASE_SERVICE_URL, todoId);

    $item.fadeOut(300, function () {
      $(this).remove();
    });
    await fetchTodos();
  } catch (e) {
    fetchErrorHandler(e);
  }
});

$(document).on("click", ".edit-btn", (e) => {
  const $item = $(e.target).closest(".todo-item");
  const todoId = $item.data("id");
  const isCompleted = $item.find(".todo-checkbox").is(":checked");
  const currentTitle = $item.find(".todo-title").text();
  const currentDescription = $item.find(".todo-description").text();

  const $editForm = $("<div>")
    .addClass("edit-form")
    .append(
      $("<label>").text("Task title:"),
      $("<input>")
        .attr("type", "text")
        .val(currentTitle)
        .addClass("edit-input"),
      $("<label>").text("Task description:"),
      $("<input>")
        .attr("type", "text")
        .val(currentDescription)
        .addClass("edit-input"),
      $("<div>")
        .addClass("button-container")
        .append(
          $("<button>")
            .addClass("save-btn")
            .html("<i class='fas fa-cloud-upload-alt'></i> Save"),
          $("<button>")
            .addClass("cancel-btn")
            .html("<i class='fas fa-arrow-left'></i> Cancel")
        )
    );

  $item.empty().append($editForm);

  $editForm.find(".save-btn").on("click", async () => {
    const updatedTitle = $editForm.find(".edit-input").eq(0).val();
    const updatedDescription = $editForm.find(".edit-input").eq(1).val();

    if (!updatedTitle) return;

    const updatedData = {
      title: updatedTitle,
      description: updatedDescription,
      completed: isCompleted,
    };

    try {
      await TodoAPI.update(process.env.BASE_SERVICE_URL, todoId, updatedData);
      const todo = await TodoAPI.getById(process.env.BASE_SERVICE_URL, todoId);

      const $updatedItem = createTodoItem(
        todo._id,
        todo.title,
        todo.description,
        todo.completed
      );

      $item.replaceWith($updatedItem);
    } catch (e) {
      fetchErrorHandler(e);
    }
  });

  $editForm.find(".cancel-btn").on("click", () => {
    console.log("cancel btn");
    const $beforeUpdateItem = createTodoItem(
      todoId,
      currentTitle,
      currentDescription,
      isCompleted
    );
    $item.replaceWith($beforeUpdateItem);
  });
});

async function handleFormSubmit(e) {
  e.preventDefault();
  const title = e.currentTarget.elements.todo.value.trim();
  const description = e.currentTarget.elements.description.value.trim();

  if (!title) return;

  const data = { title, description };

  try {
    await TodoAPI.save(process.env.BASE_SERVICE_URL, data);
    await fetchTodos();
  } catch (e) {
    fetchErrorHandler(e);
  }
  e.target.reset();
}

async function fetchTodos() {
  view.renderLoader("loading");

  try {
    const todos = await TodoAPI.getAll(process.env.BASE_SERVICE_URL);
    view.renderData(todos);
  } catch (e) {
    fetchErrorHandler(e);
  }
}

function fetchErrorHandler(e) {
  setTimeout(() => {
    view.clearRoot();
    view.renderError(e.message);
  }, 1000);
}
