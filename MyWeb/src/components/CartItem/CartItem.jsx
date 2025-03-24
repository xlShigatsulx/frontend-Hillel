import { Minus, Plus, Trash } from 'lucide-react';
import { useCartStore } from '@store';

export function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCartStore();

  const handleUpdateQuantity = (newQuantity) => {
    updateQuantity(item.id, newQuantity);
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
    toast.success(`${item.name} видалено з кошику успішно!`);
  };

  return (
    <div className="rounded-lg border p-4 shadow-sm border-gray-700 bg-gray-800 md:p-6">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <div className="shrink-0 md:order-1">
          <img
            className="max-w-[140px] max-h-[140px] h-20 md:h-32 rounded object-cover"
            src={item.image}
          />
        </div>
        <label className="sr-only">Choose quantity:</label>

        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center gap-2">
            <button onClick={() => handleUpdateQuantity(item.quantity + 1)}>
              <Plus className="text-white" />
            </button>
            <p className="text-white">{item.quantity}</p>
            <button onClick={() => handleUpdateQuantity(item.quantity - 1)}>
              <Minus className="text-white" />
            </button>
          </div>
          <div className="md:order-4 md:w-32">
            <p className=" font-bold text-emerald-400 ml-15">${item.price}</p>
          </div>
        </div>

        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <p className="text-base font-medium text-white hover:text-emerald-400">
            {item.name}
          </p>
          <p className="text-sm text-gray-400">{item.description}</p>

          <div className="flex items-center gap-4">
            <button onClick={() => handleRemoveFromCart(item.id)}>
              <Trash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
