import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, { payload }) => {
      state.todos.push(payload);
    },

    editTodo: (state, { payload }) => {
      const { id, updatedTitle } = payload;
      const todoIndex = state.todos.findIndex((todo) => todo.id === id);

      if (todoIndex !== -1) {
        state.todos[todoIndex].title = updatedTitle;
      }
    },

    removeTodo: (state, { payload }) => {
      state.todos = [...state.todos].filter(({ id }) => id !== payload);
    },

    clearTodos: (state) => {
      state.todos = initialState.todos;
    },
  },
  selectors: {
    selectTodos: (state) => state.todos,
  },
});

export const { addTodo, removeTodo, clearTodos, editTodo } = todosSlice.actions;
export const { selectTodos } = todosSlice.selectors;

export default todosSlice.reducer;
