import { Footer, Header, PageLayout, Home } from "@components";

export function HomePage() {
  return (
    <PageLayout
      renderHeader={() => <Header />}
      renderContent={() => <Home />}
      renderFooter={() => <Footer />}
    />
  );
}
