import { configureStore } from "@reduxjs/toolkit";
import swapiDataReducer from "@ducks/data.duck.js";
import appReducer from "./app/app.slice.js";
import todosReducer from "@ducks/todos.duck.js";

export const store = configureStore({
  reducer: {
    app: appReducer,
    data: swapiDataReducer,
    todos: todosReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: true }),
});
