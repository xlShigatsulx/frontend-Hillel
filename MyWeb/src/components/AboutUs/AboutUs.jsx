import { useNavigate } from 'react-router-dom';

export function AboutUs() {
  const navigate = useNavigate();

  const handleContactUsRedirect = () => {
    navigate('/contact');
  };
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center mt-20 px-25">
        <img src="/Класичні.jpg" className="w-90 h-140 mt-20" />
        <div className="flex flex-col ml-15">
          <span className="text-amber-500 text-center w-[100px] p-2 rounded-full shadow-xl">
            ABOUT US
          </span>
          <p className="text-4xl mt-10">Ми надаємо 100% якісну випічку.</p>
          <p className="text-gray-400 my-5">TEXT</p>
          <button
            onClick={handleContactUsRedirect}
            className="self-start w-50 text-2xl text-white bg-amber-600 p-4 rounded-full hover:bg-amber-700 hover:text-gray-300 duration-300 ease-in-out"
          >
            Contact Us
          </button>
        </div>
      </div>
      <div className="flex flex-row gap-10 mt-10 mb-20">
        <div className="bg-orange-200 rounded-2xl p-5">
          <span className="text-2xl text-start">Наша мета</span>
          <p className="text-gray-400 text-start max-w-[250px] break-words">
            TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT
            TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT
          </p>
        </div>
        <div className="bg-orange-200 rounded-2xl p-5">
          <span className="text-2xl text-start">Наше бачення</span>
          <p className="text-gray-400 text-start max-w-[250px] break-words">
            TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT
            TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT
          </p>
        </div>
      </div>
    </div>
  );
}
