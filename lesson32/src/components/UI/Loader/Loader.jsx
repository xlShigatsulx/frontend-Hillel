import style from "./Loader.module.scss";

export function Loader() {
  const { spinner, container } = style;
  return (
    <div className={container}>
      <div className={spinner}>
        <div className={style["dark"]}></div>
        <div className={style["dark"]}></div>
      </div>
    </div>
  );
}
