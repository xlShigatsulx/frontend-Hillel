import style from "./Loader.module.scss";
import { selectTheme } from "@ducks/theme.duck.js";

export function Loader() {
  const theme = useSelector(selectTheme);
  const { spinner, container } = style;
  return (
    <div className={container}>
      <div className={spinner}>
        <div className={style[theme]}></div>
        <div className={style[theme]}></div>
      </div>
    </div>
  );
}
