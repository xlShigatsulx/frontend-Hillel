import { createContext } from "react";

export const THEME_DARK = "dark";
export const THEME_LIGHT = "light";

export const themeContext = createContext({
  theme: THEME_DARK,
  setTheme: () => {},
});

export const ThemeContextProvider = themeContext.Provider;
