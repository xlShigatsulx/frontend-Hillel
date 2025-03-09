import { createSlice } from "@reduxjs/toolkit";
import {
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_LOADING,
  FETCH_TODOS_ERROR,
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
  reducers: {
    addTodo: (state, { payload }) => {
      state.todos.push(payload);
    },

    removeTodo: (state, { payload }) => {
      state.todos = [...state.todos].filter(({ _id }) => _id !== payload);
    },

    clearTodos: (state) => {
      state.todos = initialState.todos;
      state.error = initialState.error;
      state.status = initialState.status;
    },
  },
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
      });
  },
  selectors: {
    selectTodos: (state) => state.todos,
    selectStatus: (state) => state.status,
  },
});

export const { addTodo, removeTodo, clearTodos } = todosSlice.actions;
export const { selectTodos, selectStatus } = todosSlice.selectors;

export default todosSlice.reducer;
