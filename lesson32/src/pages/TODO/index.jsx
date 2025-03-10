import { Footer, Header, PageLayout, TodoForm } from "@components";

export function TodoPage() {
  return (
    <PageLayout
      renderHeader={() => <Header />}
      renderContent={() => <TodoForm />}
      renderFooter={() => <Footer />}
    />
  );
}
