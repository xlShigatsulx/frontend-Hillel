import style from "./PageLayout.module.scss";
import { useSelector } from "react-redux";
import { selectTheme } from "@ducks/theme.duck.js";

export function PageLayout({
  renderHeader,
  renderFooter,
  renderContent,
  children,
}) {
  const { container, header, content, footer } = style;
  const theme = useSelector(selectTheme);

  return (
    <div className={`${theme}  ${container}`}>
      <header className={header}>
        {typeof renderHeader === "function" ? renderHeader() : renderHeader}
      </header>
      <main className={content}>
        {renderContent ? renderContent() : children}
      </main>
      <footer className={footer}>
        {typeof renderFooter === "function" ? renderFooter() : renderFooter}
      </footer>
    </div>
  );
}
