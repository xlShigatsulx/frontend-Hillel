import {
  Footer,
  Header,
  PageLayout,
  Form,
  Counter,
  TodoList,
} from "@components";

export function HomePage() {
  return (
    <PageLayout
      renderHeader={() => <Header />}
      renderContent={() => (
        <div>
          <h1>Головна</h1>
          <Counter />
          <Form />
          <TodoList />
        </div>
      )}
      renderFooter={() => <Footer />}
    />
  );
}
