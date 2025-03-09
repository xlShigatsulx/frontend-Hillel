import { Footer, Header, PageLayout, TodoForm } from "@components";

export function HomePage() {
  return (
    <PageLayout
      renderHeader={() => <Header />}
      renderContent={() => (
        <div>
          <h1>Головна</h1>
          <TodoForm />
        </div>
      )}
      renderFooter={() => <Footer />}
    />
  );
}
