import style from './PageLayout.module.scss';

export function PageLayout({
  renderHeader,
  renderFooter,
  renderContent,
  children,
}) {
  const { container, header, content, footer } = style;

  return (
    <div className={container}>
      <header className={header}>
        {typeof renderHeader === 'function' ? renderHeader() : renderHeader}
      </header>
      <main className={content}>
        {renderContent ? renderContent() : children}
      </main>
      <footer className={footer}>
        {typeof renderFooter === 'function' ? renderFooter() : renderFooter}
      </footer>
    </div>
  );
}
