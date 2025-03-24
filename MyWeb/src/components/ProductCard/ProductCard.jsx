import toast from 'react-hot-toast';
import { ShoppingCart } from 'lucide-react';
import { useUserStore, useCartStore } from '@store';

export function ProductCard({ product }) {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please login to add products to cart', { id: 'login' });
      return;
    }
    addToCart(product);
    toast.success(`${product.name} додано до кошику успішно!`);
  };

  return (
    <div className="flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg">
      <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
        <img
          className="object-cover w-full"
          src={product.image}
          alt={product.name}
        />
        <div className="absolute inset-0 bg-black bg-opacity-20" />
      </div>

      <div className="mt-4 px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-amber-900">
          {product.name}
        </h5>
        <span className="text-xs text-amber-500">{product.description}</span>

        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-emerald-400">
              ${product.price}
            </span>
          </p>
        </div>
        <button
          className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg"
          onClick={handleAddToCart}
        >
          <ShoppingCart size={22} />
          <span>Add to cart</span>
        </button>
      </div>
    </div>
  );
}
