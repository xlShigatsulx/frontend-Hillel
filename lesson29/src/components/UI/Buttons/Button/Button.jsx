import style from "./Button.module.scss";

export function Button({
  onClick,
  type = "button",
  className,
  children,
  ...rest
}) {
  const { button } = style;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${button} ${className ? className : ""}`}
      {...rest}
    >
      {children}
    </button>
  );
}
