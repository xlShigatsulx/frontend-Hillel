import { get, save, remove, update } from "./httpClient.js";

export async function getAllTodos(signal) {
  return await get("todos", signal);
}

export async function getTodoById(id, signal) {
  return await get(`todos/${id}`, signal);
}

export async function createTodo(data, signal) {
  return await save("todos", data, signal);
}

export async function removeTodo(id, signal) {
  return await remove(`todos/${id}`, signal);
}

export async function removeAllTodos(signal) {
  return await remove("todos", signal);
}

export async function updateTodo(id, data, signal) {
  return await update(`todos/${id}`, data, signal);
}
