import $ from "jquery";
import { createTodoItem } from "./utils.js";
export class TodosManager {
  constructor(root) {
    this.root = root;
  }

  clearRoot() {
    this.root.empty();
  }

  renderData(data) {
    if (!data || !data.length) {
      this.clearRoot();
      this.root.append($("<p>").addClass("empty-message").text("No tasks yet"));
      return;
    }

    this.clearRoot();

    this.root.append($("<h3>").addClass("todo-header").text("Your tasks:"));

    const $list = $("<ul>").addClass("todo-list");

    data.forEach(({ _id, title, description, completed }) => {
      const $item = createTodoItem(_id, title, description, completed);
      $list.append($item);
    });

    this.root.append($list);
  }

  renderError(message) {
    this.clearRoot();
    const errorMessage = $("<h2>")
      .text(`Ups... ${message}`)
      .css("color", "coral");
    this.root.append(errorMessage);
  }

  renderLoader(status) {
    this.clearRoot();

    if (status === "loading") {
      const loader = $("<div>").addClass("lds-roller");
      for (let i = 0; i < 8; i++) {
        loader.append($("<div>"));
      }
      this.root.append(loader);
    } else {
      this.clearRoot();
    }
  }
}
