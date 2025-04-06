import { Footer, Header, PageLayout, ContactForm } from '@components';

export function ContactPage() {
  return (
    <PageLayout
      renderHeader={() => <Header />}
      renderContent={() => (
        <div className="mb-10">
          <div className='w-full h-130 bg-[url("/bg.jpg")] bg-repeat bg-center'>
            <span className="flex text-7xl text-amber-800 justify-center pt-50">
              Contact Us
            </span>
          </div>
          <div className="flex justify-center mt-10 px-25">
            <img src="/testgeolockimg.png" className="w-90 h-140 mt-20" />
            <div className="flex flex-col ml-15">
              <span className="text-amber-500 text-center w-[150px] p-2 rounded-full shadow-xl">
                CONTACT US
              </span>
              <p className="text-4xl mt-10">Як ми можемо допомгти?</p>

              <ContactForm />
            </div>
          </div>
        </div>
      )}
      renderFooter={() => <Footer />}
    />
  );
}
