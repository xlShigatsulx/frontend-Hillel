import { Footer, Header, PageLayout, CategoryItem } from '@components';

const categories = [
  {
    href: '/classic-croissants',
    name: 'Класичні круасани',
    imageUrl: '/public/Класичні.jpg',
  },
  {
    href: '/chocolate-croissants',
    name: 'Шоколадні круасани',
    imageUrl: '/public/Шоколадні.jpg',
  },
  {
    href: '/almond-croissants',
    name: 'Мигдальні круасани',
    imageUrl: '/public/Мигдальні.jpg',
  },
  {
    href: '/fruit-croissants',
    name: 'Фруктові круасани',
    imageUrl: '/public/Фруктові.jpg',
  },
  {
    href: '/mini-croissants',
    name: 'Міні-круасани',
    imageUrl: '/public/mini.jpg',
  },
  {
    href: '/savory-croissants',
    name: 'Солоні круасани',
    imageUrl: '/public/Солоні.jpg',
  },
  {
    href: '/special-croissants',
    name: 'Особливі круасани',
    imageUrl: '/public/Особливі.jpg',
  },
];

export function HomePage() {
  return (
    <PageLayout
      renderHeader={() => <Header />}
      renderContent={() => (
        <div className="relative min-h-screen text-white overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-center text-5xl sm:text-6xl font-bold text-amber-900 mb-4">
              Світ круасанів
            </h1>
            <p className="text-center text-xl text-amber-500 mb-12">
              Насолоджуйтесь ароматними та хрусткими круасанами, як у справжній
              французькій пекарні! 🍪🥐
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <CategoryItem category={category} key={category.name} />
              ))}
            </div>
          </div>
        </div>
      )}
      renderFooter={() => <Footer />}
    />
  );
}
