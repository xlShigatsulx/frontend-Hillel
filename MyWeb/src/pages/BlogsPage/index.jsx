import { Footer, Header, PageLayout } from '@components';

export function BlogsPage() {
  return (
    <PageLayout
      renderHeader={() => <Header />}
      renderContent={() => <div>Hello Blogs page</div>}
      renderFooter={() => <Footer />}
    />
  );
}
