import { Footer, Header, PageLayout, SwapiForm } from "@components";

export function SwapiPage() {
  return (
    <PageLayout
      renderHeader={() => <Header />}
      renderContent={() => <SwapiForm />}
      renderFooter={() => <Footer />}
    />
  );
}
