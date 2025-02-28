import { THEME_DARK, THEME_LIGHT } from "../constants/theme.js";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: THEME_DARK,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
    },
  },
  selectors: {
    selectTheme: (state) => state.theme,
  },
});

export const { toggleTheme } = themeSlice.actions;
export const { selectTheme } = themeSlice.selectors;

export default themeSlice.reducer;
