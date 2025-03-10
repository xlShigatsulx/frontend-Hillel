import { put, call, takeLatest, select } from "redux-saga/effects";
import {
  FETCH_TODOS,
  FETCH_TODOS_LOADING,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_ERROR,
  ADD_TODO,
  ADD_TODO_SUCCESS,
  ADD_TODO_ERROR,
  DELETE_TODO,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_ERROR,
  UPDATE_TODO,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_ERROR,
  CLEAR_TODOS,
  CLEAR_TODOS_SUCCESS,
  CLEAR_TODOS_ERROR,
} from "./todos.actions.js";
import {
  getAllTodos,
  createTodo,
  removeTodo,
  updateTodo,
  removeAllTodos,
} from "@api";
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

export function* addTodoSaga({ payload }) {
  try {
    const { data, signal } = payload;
    const newTodo = yield call(createTodo, data, signal);
    yield put(ADD_TODO_SUCCESS(newTodo));
  } catch (e) {
    yield put(ADD_TODO_ERROR(e.message));
  }
}

export function* deleteTodoSaga({ payload }) {
  try {
    const { id, signal } = payload;
    yield call(removeTodo, id, signal);
    yield put(DELETE_TODO_SUCCESS(payload));
  } catch (e) {
    yield put(DELETE_TODO_ERROR(e.message));
  }
}

export function* updateTodoSaga({ payload }) {
  try {
    const { id, data, signal } = payload;
    const updatedTodo = yield call(updateTodo, id, data, signal);
    yield put(UPDATE_TODO_SUCCESS(updatedTodo));
  } catch (e) {
    yield put(UPDATE_TODO_ERROR(e.message));
  }
}

export function* clearTodosSaga() {
  try {
    yield call(removeAllTodos);
    yield put(CLEAR_TODOS_SUCCESS());
  } catch (e) {
    yield put(CLEAR_TODOS_ERROR(e.message));
  }
}

export function* watchTodosSaga() {
  yield takeLatest(FETCH_TODOS.type, fetchTodosSaga);
  yield takeLatest(ADD_TODO.type, addTodoSaga);
  yield takeLatest(DELETE_TODO.type, deleteTodoSaga);
  yield takeLatest(UPDATE_TODO.type, updateTodoSaga);
  yield takeLatest(CLEAR_TODOS.type, clearTodosSaga);
}
