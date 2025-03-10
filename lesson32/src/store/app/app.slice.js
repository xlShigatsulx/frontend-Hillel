import { createSlice } from "@reduxjs/toolkit";
import { DARK_THEME } from "@services/constants.js";

const initialState = {
  theme: DARK_THEME,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTheme: (state, { payload }) => {
      state.theme = payload;
    },
  },
  selectors: {
    selectTheme: (state) => state.theme,
  },
});

export const { setTheme } = appSlice.actions;
export const { selectTheme } = appSlice.selectors;
export default appSlice.reducer;
