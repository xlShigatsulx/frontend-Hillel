import { useEffect, useState } from 'react';
import { ProductCard } from '@components';
import { useProductStore } from '@store';

const categories = [
  {
    id: 'classic-croissants',
    name: 'Класичні круасани',
  },
  {
    id: 'chocolate-croissants',
    name: 'Шоколадні круасани',
  },
  {
    id: 'almond-croissants',
    name: 'Мигдальні круасани',
  },
  {
    id: 'fruit-croissants',
    name: 'Фруктові круасани',
  },
];

export function ShopSearch() {
  const { fetchAllProducts, products } = useProductStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    fetchAllProducts(controller.signal);
    return () => controller.abort();
  }, [fetchAllProducts]);

  useEffect(() => {
    let updated = products;

    if (searchQuery) {
      updated = updated.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      updated = updated.filter(
        (product) => product.category === selectedCategory
      );
    }

    setFilteredProducts(updated);
  }, [products, searchQuery, selectedCategory]);

  return (
    <div className="flex flex-row gap-20 mt-10">
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Пошук"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-[200px] bg-amber-100 border border-amber-600 text-black placeholder-black placeholder:opacity-40 focus:outline-none focus:ring-2 focus:ring-amber-700 shadow-lg rounded-md p-2"
        />

        <span className="text-xl font-bold text-amber-500 my-5">Категорії</span>

        <div className="flex flex-col gap-3">
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <button
                key={category.name}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category.id ? null : category.id
                  )
                }
                className={`p-2 rounded-md border border-amber-500 transition-all ${
                  selectedCategory === category.id
                    ? 'bg-amber-500 text-white'
                    : 'bg-amber-100 text-black hover:bg-amber-400'
                }`}
              >
                {category.name}
              </button>
            ))
          ) : (
            <p className="text-gray-500 italic">Категорії відсутні</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-gray-500 italic">Нічого не знайдено</p>
        )}
      </div>
    </div>
  );
}
