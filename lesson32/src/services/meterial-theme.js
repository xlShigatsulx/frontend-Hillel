import { DARK_THEME } from "@services/constants.js";

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === DARK_THEME
      ? {
          primary: {
            main: "#009cd8",
          },
          secondary: {
            main: "#f54100",
          },
          background: {
            default: "#333333",
            paper: "#111111",
          },
          text: {
            primary: "rgba(255,255,255,0.87)",
            secondary: "rgba(239,239,239,0.6)",
          },
          divider: "rgba(26,26,26,0.12)",
        }
      : {
          primary: {
            main: "#009cd8",
          },
          secondary: {
            main: "#f50057",
          },
          background: {
            default: "#ffffff",
            paper: "#e4e4e4",
          },
          text: {
            primary: "rgba(18,18,18,0.87)",
            secondary: "rgba(26,26,26,0.6)",
          },
          divider: "rgba(236,236,236,0.29)",
        }),
  },
  spacing: 4,
  typography: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: 14,
    body1: {
      fontWeight: 500,
    },
    button: {
      fontStyle: "bold",
    },
  },
});
