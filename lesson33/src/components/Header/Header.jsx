import { ButtonGroup } from "./ButtonGroup";
import style from "./Header.module.scss";
import { Navigation } from "./Navigation";

export function Header() {
  const { header, navigation } = style;
  return (
    <div className={header}>
      <Navigation navAttrs={{ className: navigation }} />
      <ButtonGroup />
    </div>
  );
}
