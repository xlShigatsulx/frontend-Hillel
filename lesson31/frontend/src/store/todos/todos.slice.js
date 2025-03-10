import { createSlice } from "@reduxjs/toolkit";
import {
  FETCH_TODOS_LOADING,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_ERROR,
  ADD_TODO_SUCCESS,
  ADD_TODO_ERROR,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_ERROR,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_ERROR,
  CLEAR_TODOS_SUCCESS,
  CLEAR_TODOS_ERROR,
} from "@store";

const initialState = {
  todos: [],
  status: null,
  error: null,
};

const todosSlice = createSlice({
  name: "todos",
  reducerPath: "todosSaga",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FETCH_TODOS_LOADING, (state) => {
        state.status = "loading";
      })
      .addCase(FETCH_TODOS_SUCCESS, (state, { payload }) => {
        state.status = "success";
        state.todos = payload;
      })
      .addCase(FETCH_TODOS_ERROR, (state, { payload }) => {
        state.status = "error";
        state.error = payload;
      })
      .addCase(ADD_TODO_SUCCESS, (state, { payload }) => {
        state.todos.push(payload);
      })
      .addCase(ADD_TODO_ERROR, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(DELETE_TODO_SUCCESS, (state, { payload }) => {
        state.todos = state.todos.filter((todo) => todo._id !== payload.id);
      })
      .addCase(DELETE_TODO_ERROR, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(UPDATE_TODO_SUCCESS, (state, { payload }) => {
        const index = state.todos.findIndex((todo) => todo._id === payload._id);
        if (index !== -1) {
          state.todos[index] = payload;
        }
      })
      .addCase(UPDATE_TODO_ERROR, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(CLEAR_TODOS_SUCCESS, (state) => {
        state.todos = [];
      })
      .addCase(CLEAR_TODOS_ERROR, (state, { payload }) => {
        state.error = payload;
      });
  },
  selectors: {
    selectTodos: (state) => state.todos,
    selectStatus: (state) => state.status,
  },
});

export const {} = todosSlice.actions;
export const { selectTodos, selectStatus } = todosSlice.selectors;

export default todosSlice.reducer;
