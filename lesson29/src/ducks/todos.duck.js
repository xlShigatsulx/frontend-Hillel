import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  status: null,
  error: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, { payload }) => {
      state.todos.push(payload);
    },
  },
  selectors: {
    selectTodos: (state) => state.todos,
  },
});

export const { addTodo } = todosSlice.actions;
export const { selectTodos } = todosSlice.selectors;

export default todosSlice.reducer;
