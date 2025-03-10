import { createAction } from "@reduxjs/toolkit";

export const FETCH_TODOS = createAction("todos/fetchTodos");
export const FETCH_TODOS_LOADING = createAction("todos/fetchTodos/loading");
export const FETCH_TODOS_SUCCESS = createAction("todos/fetchTodos/success");
export const FETCH_TODOS_ERROR = createAction("todos/fetchTodos/error");

export const ADD_TODO = createAction("todos/addTodo");
export const ADD_TODO_SUCCESS = createAction("todos/addTodo/success");
export const ADD_TODO_ERROR = createAction("todos/addTodo/error");

export const DELETE_TODO = createAction("todos/deleteTodo");
export const DELETE_TODO_SUCCESS = createAction("todos/deleteTodo/success");
export const DELETE_TODO_ERROR = createAction("todos/deleteTodo/error");

export const UPDATE_TODO = createAction("todos/updateTodo");
export const UPDATE_TODO_SUCCESS = createAction("todos/updateTodo/success");
export const UPDATE_TODO_ERROR = createAction("todos/updateTodo/error");

export const CLEAR_TODOS = createAction("todos/clearTodos");
export const CLEAR_TODOS_SUCCESS = createAction("todos/clearTodos/success");
export const CLEAR_TODOS_ERROR = createAction("todos/clearTodos/error");
