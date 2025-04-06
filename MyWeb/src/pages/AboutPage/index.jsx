import {
  Footer,
  Header,
  PageLayout,
  AboutUs,
  TeamMembers,
  CustomersFeedBack,
} from '@components';

export function AboutPage() {
  return (
    <PageLayout
      renderHeader={() => <Header />}
      renderContent={() => (
        <>
          <div className='w-full h-130 bg-[url("/bg.jpg")] bg-repeat bg-center'>
            <span className="flex text-7xl text-amber-800 justify-center pt-50">
              About Us
            </span>
          </div>
          <AboutUs />
          <TeamMembers />
          <CustomersFeedBack />
        </>
      )}
      renderFooter={() => <Footer />}
    />
  );
}
