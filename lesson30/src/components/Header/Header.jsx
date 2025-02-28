import style from "./Header.module.scss";
import { Button } from "@ui";
import { Navigation } from "./Navigation";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme, toggleTheme } from "@/ducks/theme.duck.js";

export function Header() {
  const { header, navigation } = style;

  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const content = theme === "dark" ? "light" : "dark";

  function changeThemeHandler() {
    dispatch(toggleTheme());
  }

  return (
    <div className={header}>
      <Navigation navAttrs={{ className: navigation }} />
      <Button onClick={changeThemeHandler}>{content}</Button>
    </div>
  );
}
