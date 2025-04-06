import { useRef, useState } from 'react';
import Slider from 'react-slick';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { CategoryItem } from '@components';
import 'slick-carousel/slick/slick.css';

const categories = [
  {
    href: '/classic-croissants',
    name: 'Класичні круасани',
    imageUrl: '/Класичні.jpg',
  },
  {
    href: '/chocolate-croissants',
    name: 'Шоколадні круасани',
    imageUrl: '/Шоколадні.jpg',
  },
  {
    href: '/almond-croissants',
    name: 'Мигдальні круасани',
    imageUrl: '/Мигдальні.jpg',
  },
  {
    href: '/fruit-croissants',
    name: 'Фруктові круасани',
    imageUrl: '/Фруктові.jpg',
  },
  {
    href: '/classic-croissants',
    name: '1',
    imageUrl: '/Класичні.jpg',
  },
  {
    href: '/classic-croissants',
    name: '1',
    imageUrl: '/Класичні.jpg',
  },
];

const settings = {
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: false,
  infinite: false,
  afterChange: (index) => {},
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 3 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 480,
      settings: { slidesToShow: 1 },
    },
  ],
};

export function CategorySlider() {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = categories.length - settings.slidesToShow;

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      sliderRef.current.slickPrev();
    }
  };

  const handleNext = () => {
    if (currentSlide < totalSlides) {
      setCurrentSlide(currentSlide + 1);
      sliderRef.current.slickNext();
    }
  };

  return (
    <div className="mb-4">
      <Slider
        ref={sliderRef}
        {...settings}
        afterChange={(index) => setCurrentSlide(index)}
        className="px-25 pt-20 pb-10"
      >
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <div key={category.name} className="text-center px-10">
              <CategoryItem category={category} />
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">Категорії відсутні</p>
        )}
      </Slider>
      <div className="flex gap-10 justify-center mb-10">
        <button
          onClick={handlePrev}
          className={`p-5 bg-amber-500 rounded-full shadow-lg hover:bg-amber-600 focus:outline-none ${
            currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={currentSlide === 0}
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={handleNext}
          className={`p-5 bg-amber-500 rounded-full shadow-lg hover:bg-amber-600 focus:outline-none ${
            currentSlide >= totalSlides ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={currentSlide >= totalSlides}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
