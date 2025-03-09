import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "@ducks/theme.duck.js";
//import todosReducer from "@ducks/todos.duck.js";
import createSagaMiddleware from "redux-saga";
import todosSagaReducer from "./todos/todos.slice.js";
import { rootSaga } from "@store/root.saga.js";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    todosSaga: todosSagaReducer,
    //todos: todosReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ thunk: false, serializableCheck: false }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);
