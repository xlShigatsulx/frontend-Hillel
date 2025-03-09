import { put, call, takeLatest, select } from "redux-saga/effects";
import {
  FETCH_TODOS,
  FETCH_TODOS_LOADING,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_ERROR,
} from "./todos.actions.js";
import { getAllTodos } from "@api";
import { selectStatus } from "./todos.slice.js";

export function* fetchTodosSaga({ payload }) {
  yield put(FETCH_TODOS_LOADING());
  const status = select(selectStatus);

  try {
    if (status === "loading") return;
    const data = yield call(getAllTodos, payload);

    const preparedData = data.map(({ _id, title, completed }) => ({
      _id,
      title,
      completed,
    }));

    yield put(FETCH_TODOS_SUCCESS(preparedData));
  } catch (e) {
    yield put(FETCH_TODOS_ERROR(e.message));
  }
}

export function* watchFetchTodosSaga() {
  yield takeLatest(FETCH_TODOS.type, fetchTodosSaga);
}
