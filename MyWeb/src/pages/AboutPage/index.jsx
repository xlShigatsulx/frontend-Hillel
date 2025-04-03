import { Footer, Header, PageLayout } from '@components';
import { Link } from 'react-router-dom';

export function AboutPage() {
  return (
    <PageLayout
      renderHeader={() => <Header />}
      renderContent={() => <div>About Page</div>}
      renderFooter={() => <Footer />}
    />
  );
}
