import { Router } from "express";
import { TodosService } from "../service/todoService.js";

export const todoController = Router();

const service = new TodosService();

todoController.get("/todos", async (req, res) => {
  try {
    const todos = await service.getTodos();
    res.json(todos);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch todos." });
  }
});

todoController.get("/todos/:id", async (req, res) => {
  try {
    const todo = await service.getTodo(req.params.id);
    if (!todo) {
      return res
        .status(404)
        .json({ error: `Todo with id '${req.params.id}' not found.` });
    }
    res.json(todo);
  } catch (e) {
    res
      .status(500)
      .json({ error: `Failed to fetch todo with id '${req.params.id}'.` });
  }
});

todoController.post("/todos", async (req, res) => {
  try {
    if (!req.body.title) {
      return res
        .status(400)
        .json({ error: "Missing required fields: 'title'." });
    }

    const resp = await service.createTodo(req.body);
    res.status(201).json(resp);
  } catch (e) {
    res.status(500).json({ error: "Failed to create the todo." });
  }
});

todoController.put("/todos/:id", async (req, res) => {
  try {
    const existingTodo = await service.getTodo(req.params.id);
    if (!existingTodo) {
      return res
        .status(404)
        .json({ error: `Todo with id '${req.params.id}' not found.` });
    }

    const updatedTodo = await service.updateTodo(req.params.id, req.body);
    res.status(200).json(updatedTodo);
  } catch (e) {
    res
      .status(500)
      .json({ error: `Failed to update todo with id '${req.params.id}'.` });
  }
});

todoController.delete("/todos/:id", async (req, res) => {
  try {
    const existingTodo = await service.getTodo(req.params.id);
    if (!existingTodo) {
      return res
        .status(404)
        .json({ error: `Todo with id '${req.params.id}' not found.` });
    }

    await service.deleteTodo(req.params.id);
    res.status(204).send("ok");
  } catch (e) {
    res
      .status(500)
      .json({ error: `Failed to delete todo with id '${req.params.id}'.` });
  }
});
