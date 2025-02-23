import { useContext } from "react";
import style from "./ThemeButton.module.scss";
import { THEME_DARK, THEME_LIGHT, themeContext } from "@context";

export function ThemeButton() {
  const { switcher, slider, container } = style;
  const themeData = useContext(themeContext);

  const { theme, setTheme } = themeData;
  const isDarkMode = theme === THEME_DARK;
  const content = theme === THEME_DARK ? THEME_DARK : THEME_LIGHT;

  const clickHandler = () => {
    setTheme(isDarkMode ? THEME_LIGHT : THEME_DARK);
  };

  return (
    <div className={container}>
      <label className={switcher}>
        <input type="checkbox" checked={isDarkMode} onChange={clickHandler} />
        <span className={slider}></span>
      </label>
      {content}
    </div>
  );
}
