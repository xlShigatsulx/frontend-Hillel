import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "@ducks/theme.duck.js";
import todosReducer from "@ducks/todos.duck.js";
import counterReducer from "@ducks/counter.duck.js";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    counter: counterReducer,
    todos: todosReducer,
  },
  preloadedState: {
    todos: { todos: [], error: null, status: null },
  },
});
