import { all } from "redux-saga/effects";
import { watchFetchTodosSaga } from "./todos/todos.sagas.js";

export function* rootSaga() {
  yield all([watchFetchTodosSaga()]);
}
