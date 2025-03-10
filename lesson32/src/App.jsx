import { RouterProvider } from "react-router-dom";
import { router } from "./router/index.js";
import { Loader } from "@components";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { selectTheme } from "@store/app/index.js";
import { useMemo } from "react";
import { getDesignTokens } from "@services/meterial-theme.js";

export function App() {
  const mode = useSelector(selectTheme);
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <RouterProvider
          router={router}
          fallbackElement={<Loader />}
          future={{ v7_startTransition: true }}
        />
      </CssBaseline>
    </ThemeProvider>
  );
}

