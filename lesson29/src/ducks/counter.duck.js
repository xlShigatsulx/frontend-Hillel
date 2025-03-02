import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increaseCount: (state) => {
      state.count += 1;
    },
    decreaseCount: (state) => {
      state.count = state.count === 0 ? 0 : state.count - 1;
    },
  },
  selectors: {
    selectCounter: (state) => state.count,
  },
});

export const { increaseCount, decreaseCount } = counterSlice.actions;
export const { selectCounter } = counterSlice.selectors;

export default counterSlice.reducer;
