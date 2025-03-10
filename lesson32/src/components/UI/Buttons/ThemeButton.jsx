import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme, setTheme } from "@store/app";
import { DARK_THEME, LIGHT_THEME } from "@services/constants.js";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import ModeNightRoundedIcon from "@mui/icons-material/ModeNightRounded";

export function ThemeButton() {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();

  function toggleThemeHandler() {
    const newTheme = theme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    dispatch(setTheme(newTheme));
  }

  return (
    <Box
      sx={{
        maxWidth: "32px",
      }}
    >
      <Button
        varian="text"
        onClick={toggleThemeHandler}
        size="smaill"
        aria-label="butoon to toggle theme"
        sx={{ mixWidth: "34px", height: "32px", p: "4px" }}
      >
        {" "}
        {theme === DARK_THEME ? (
          <WbSunnyRoundedIcon fontSize="small" />
        ) : (
          <ModeNightRoundedIcon fontSize="small" />
        )}
      </Button>
    </Box>
  );
}
