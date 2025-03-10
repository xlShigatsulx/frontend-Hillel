import { all } from "redux-saga/effects";
import { watchTodosSaga } from "./todos/todos.sagas.js";

export function* rootSaga() {
  yield all([watchTodosSaga()]);
}
