import { useEffect } from 'react';
import { Footer, Header, PageLayout, ProductCard } from '@components';
import { useProductStore } from '@store';

export function ShopPage() {
  const { fetchAllProducts, products } = useProductStore();

  useEffect(() => {
    const controller = new AbortController();
    fetchAllProducts(controller.signal);
    return () => controller.abort();
  }, [fetchAllProducts]);

  return (
    <PageLayout
      renderHeader={() => <Header />}
      renderContent={() => (
        <div className="relative min-h-screen text-white overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-15">
            <h1 className="text-center text-5xl sm:text-6xl font-bold text-amber-900 mb-4">
              Світ круасанів
            </h1>
            <p className="text-center text-xl text-amber-500 mb-5">
              Насолоджуйтесь ароматними та хрусткими круасанами, як у справжній
              французькій пекарні! 🍪🥐
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}
      renderFooter={() => <Footer />}
    />
  );
}
