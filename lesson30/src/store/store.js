import { configureStore } from "@reduxjs/toolkit";
import peopleReducer from "../ducks/data.duck.js";
import themeReducer from "../ducks/theme.duck.js";

export const store = configureStore({
  reducer: {
    people: peopleReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
});
