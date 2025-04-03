import { Footer, Header, PageLayout, CategorySlider } from '@components';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const navigate = useNavigate();

  const handleShopRedirect = () => {
    navigate('/shop');
  };

  return (
    <PageLayout
      renderHeader={() => <Header />}
      renderContent={() => (
        <>
          <div className='w-full h-170 bg-[url("/banner.jpg")] bg-cover bg-center'>
            <div className="pl-50 pt-40">
              <p className="text-2xl text-orange-600 ">Отримай знижку 30%</p>
              <p className="text-7xl text-white mb-20">
                На свіжі
                <br /> хлібобулочні
                <br /> вироби
              </p>

              <button
                onClick={handleShopRedirect}
                className="text-white bg-amber-600 p-2 rounded-2xl hover:bg-amber-700 hover:text-gray-300 duration-300 ease-in-out"
              >
                Перейти до покупки
              </button>
            </div>
          </div>

          <CategorySlider />

          <div className="flex flex-col md:flex-row items-center justify-center gap-50 text-center md:text-left bg-amber-500 px-32 py-32">
            <div className="flex items-center md:items-start mb-12 md:mb-0">
              <div className="w-20 h-20 flex items-center justify-center rounded-full border-2 border-white mr-6">
                🚚
              </div>
              <div>
                <h3 className="font-bold text-2xl">Безкоштовна доставка</h3>
                <p className="text-lg">TEXT</p>
              </div>
            </div>

            <div className="flex items-center md:items-start mb-12 md:mb-0">
              <div className="w-20 h-20 flex items-center justify-center rounded-full border-2 border-white mr-6">
                📞
              </div>
              <div>
                <h3 className="font-bold text-2xl">Допомога 24/7</h3>
                <p className="text-lg">TEXT</p>
              </div>
            </div>

            <div className="flex items-center md:items-start">
              <div className="w-20 h-20 flex items-center justify-center rounded-full border-2 border-white mr-6">
                💳
              </div>
              <div>
                <h3 className="font-bold text-2xl">Безпечна оплата</h3>
                <p className="text-lg">TEXT</p>
              </div>
            </div>
          </div>
        </>
      )}
      renderFooter={() => <Footer />}
    />
  );
}
