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
        .html("<i class='fas fa-chevron-down'></i>"),
      $("<button>").addClass("edit-btn").html("✏️"),
      $("<button>").addClass("delete-btn").html("🗑️")
    );
  return $item;
}
