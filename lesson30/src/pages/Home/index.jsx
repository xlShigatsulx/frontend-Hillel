import { Footer, Header, PageLayout, Swapi } from "@components";

export function HomePage() {
  return (
    <PageLayout
      renderHeader={() => <Header />}
      renderContent={() => (
        <>
          <div>
            <h1>Головна</h1>
          </div>
          <Swapi />
        </>
      )}
      renderFooter={() => <Footer />}
    />
  );
}
