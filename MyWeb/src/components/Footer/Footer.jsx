import style from "./Footer.module.scss";

export function Footer() {
  const { footer } = style;
  return (
    <div>
      <p className={footer}>&copy; Shigatsu</p>
    </div>
  );
}
