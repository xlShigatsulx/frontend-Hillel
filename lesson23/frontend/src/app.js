import $ from "jquery";
import { TodosManager } from "./scripts/todos.js";
import { TodoAPI } from "./api/todos.js";
import { createTodoItem } from "./scripts/utils.js";

import "./styles/main.scss";

const $form = $("form");
const $contentContainer = $("[data-content]");
const baseServUrl = process.env.BASE_SERVICE_URL;

const view = new TodosManager($contentContainer);

$(document).ready(fetchTodos);

$form.on("submit", handleFormSubmit);
$contentContainer.on("change", ".todo-checkbox", handleCheckboxChange);
$contentContainer.on("click", ".toggle-description", handleDescriptionToggle);
$contentContainer.on("click", ".delete-btn", handleTodoDelete);
$contentContainer.on("click", ".edit-btn", handleTodoEdit);

async function handleFormSubmit(e) {
  e.preventDefault();
  const title = e.currentTarget.elements.todo.value.trim();
  const description = e.currentTarget.elements.description.value.trim();

  if (!title) return;

  const data = { title, description };

  try {
    await TodoAPI.save(baseServUrl, data);
    await fetchTodos();
  } catch (e) {
    fetchErrorHandler(e);
  }
  e.target.reset();
}

async function handleCheckboxChange(e) {
  const $item = $(e.target).closest(".todo-item");
  const todoId = $item.data("id");
  const isCompleted = $(e.target).is(":checked");

  $item.toggleClass("todo-completed", isCompleted);

  try {
    await TodoAPI.update(baseServUrl, todoId, {
      completed: isCompleted,
    });
  } catch (e) {
    $item.toggleClass("todo-completed", !isCompleted);
    fetchErrorHandler(e);
  }
}

function handleDescriptionToggle(e) {
  const $item = $(e.target).closest(".todo-item");
  const $content = $item.find(".todo-content");
  const $icon = $item.find("i");
  const isCollapsed = $content.hasClass("collapsed");

  $content.toggleClass("collapsed", !isCollapsed);
  $icon.toggleClass("fa-chevron-down fa-chevron-up");
}

async function handleTodoDelete(e) {
  const $item = $(e.target).closest(".todo-item");
  const todoId = $item.data("id");

  await handleApiRequest(() => TodoAPI.delete(baseServUrl, todoId));
  $item.fadeOut(300, function () {
    $(this).remove();
  });
  await fetchTodos();
}

async function handleTodoEdit(e) {
  const $item = $(e.target).closest(".todo-item");
  const todoId = $item.data("id");
  const isCompleted = $item.find(".todo-checkbox").is(":checked");
  const currentTitle = $item.find(".todo-title").text();
  const currentDescription = $item.find(".todo-description").text();

  const $editForm = createEditForm(currentTitle, currentDescription);
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
    await handleApiRequest(() =>
      TodoAPI.update(baseServUrl, todoId, updatedData)
    );

    const todo = await TodoAPI.getById(baseServUrl, todoId);
    const $updatedItem = createTodoItem(
      todo._id,
      todo.title,
      todo.description,
      todo.completed
    );

    $item.replaceWith($updatedItem);
  });

  $editForm.find(".cancel-btn").on("click", () => {
    const $beforeUpdateItem = createTodoItem(
      todoId,
      currentTitle,
      currentDescription,
      isCompleted
    );
    $item.replaceWith($beforeUpdateItem);
  });
}

async function handleApiRequest(apiCall) {
  try {
    await apiCall();
  } catch (e) {
    fetchErrorHandler(e);
  }
}

async function fetchTodos() {
  view.renderLoader("loading");

  try {
    const todos = await TodoAPI.getAll(baseServUrl);
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

function createEditForm(title, description) {
  return $("<div>")
    .addClass("edit-form")
    .append(
      $("<label>").text("Task title:"),
      $("<input>").attr("type", "text").val(title).addClass("edit-input"),
      $("<label>").text("Task description:"),
      $("<input>").attr("type", "text").val(description).addClass("edit-input"),
      $("<div>")
        .addClass("button-container")
        .append(
          $("<button>")
            .addClass("save-btn")
            .append($("<i>").addClass("fas fa-cloud-upload-alt").text(" Save")),
          $("<button>")
            .addClass("cancel-btn")
            .append($("<i>").addClass("fas fa-arrow-left").text(" Cancel"))
        )
    );
}
