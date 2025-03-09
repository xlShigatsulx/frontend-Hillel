import { createAction } from "@reduxjs/toolkit";

export const FETCH_TODOS = createAction("todos/fetchTodos");
export const FETCH_TODOS_LOADING = createAction("todos/fetchTodos/loading");
export const FETCH_TODOS_SUCCESS = createAction("todos/fetchTodos/success");
export const FETCH_TODOS_ERROR = createAction("todos/fetchTodos/error");
