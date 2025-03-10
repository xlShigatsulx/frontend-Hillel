import { Logger } from "../../libs/logger.js";
import { todoModel } from "../schemas/todoScheme.js";
import mongoose from "mongoose";

export class TodosService {
  async getTodos() {
    try {
      return await todoModel.find({});
    } catch (error) {
      Logger.error(
        "Error fetching todos:",
        JSON.stringify({
          message: error.message,
          stack: error.stack,
        })
      );
      throw new Error("Failed to retrieve todos.");
    }
  }

  async getTodo(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      Logger.warn(`Invalid ID format: ${id}`);
      throw new Error("Invalid todo ID.");
    }

    try {
      const todo = await todoModel.findById(id);
      if (!todo) {
        Logger.warn(`Todo not found: ${id}`);
        throw new Error("Todo not found.");
      }
      return todo;
    } catch (error) {
      Logger.error(
        "Error fetching todo:",
        JSON.stringify({
          message: error.message,
          stack: error.stack,
        })
      );
      throw new Error("Failed to retrieve the todo.");
    }
  }

  async createTodo(todoData) {
    try {
      const todo = new todoModel({
        //_id: new mongoose.Types.ObjectId(),
        ...todoData,
      });
      return await todo.save();
    } catch (error) {
      Logger.error(
        "Error creating todo:",
        JSON.stringify({
          message: error.message,
          stack: error.stack,
        })
      );
      throw new Error("Failed to create the todo.");
    }
  }

  async updateTodo(id, data) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      Logger.warn(`Invalid ID format: ${id}`);
      throw new Error("Invalid todo ID.");
    }

    try {
      const todo = await todoModel.findByIdAndUpdate(id, data, { new: true });
      if (!todo) {
        Logger.warn(`Todo not found for update: ${id}`);
        throw new Error("Todo not found for update.");
      }
      return todo;
    } catch (error) {
      Logger.error(
        "Error updating todo:",
        JSON.stringify({
          message: error.message,
          stack: error.stack,
        })
      );
      throw new Error("Failed to update the todo.");
    }
  }

  async deleteTodo(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      Logger.warn(`Invalid ID format: ${id}`);
      throw new Error("Invalid todo ID.");
    }

    try {
      const todo = await todoModel.findByIdAndDelete(id);
      if (!todo) {
        Logger.warn(`Todo not found for deletion: ${id}`);
        throw new Error("Todo not found for deletion.");
      }
      return todo;
    } catch (error) {
      Logger.error("Error deleting todo:", {
        message: error.message,
        stack: error.stack,
      });
      throw new Error("Failed to delete the todo.");
    }
  }

  async deleteAllTodos() {
    try {
      const result = await todoModel.deleteMany({});
      if (result.deletedCount === 0) {
        Logger.warn("No todos found for deletion.");
        throw new Error("No todos found for deletion.");
      }
      return result;
    } catch (error) {
      Logger.error("Error deleting all todos:", {
        message: error.message,
        stack: error.stack,
      });
      throw new Error("Failed to delete all todos.");
    }
  }
}
