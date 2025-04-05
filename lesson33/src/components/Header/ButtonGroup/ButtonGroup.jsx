import style from "./ButtonGroup.module.scss";
import { ThemeButton } from "@ui";

export function ButtonGroup() {
  const { container } = style;

  return (
    <div className={container}>
      <ThemeButton />
    </div>
  );
}
