import $ from "jquery";
export function createTodoItem(_id, title, description, completed) {
  const $item = $("<li>")
    .addClass("todo-item")
    .data("id", _id)
    .toggleClass("todo-completed", completed)
    .append(
      $("<input>")
        .attr("type", "checkbox")
        .addClass("todo-checkbox")
        .prop("checked", completed),
      $("<div>")
        .addClass("todo-content collapsed")
        .append($("<div>").addClass("todo-title").text(title))
        .append($("<div>").addClass("todo-description").text(description)),
      $("<button>")
        .addClass("toggle-description")
        .append($("<i>").addClass("fas fa-chevron-down")),
      $("<button>").addClass("edit-btn").text("✏️"),
      $("<button>").addClass("delete-btn").text("🗑️")
    );
  return $item;
}
