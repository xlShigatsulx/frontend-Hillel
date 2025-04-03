export function PageLayout({
  renderHeader,
  renderFooter,
  renderContent,
  children,
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex-none w-full h-[57.22px]">
        {typeof renderHeader === 'function' ? renderHeader() : renderHeader}
      </header>
      <main className="flex-1">
        {renderContent ? renderContent() : children}
      </main>
      <footer className="flex-none w-full bg-[#382200] text-white py-3">
        {typeof renderFooter === 'function' ? renderFooter() : renderFooter}
      </footer>
    </div>
  );
}
