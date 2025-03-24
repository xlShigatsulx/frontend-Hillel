import { create } from 'zustand';

const getCartFromStorage = () => {
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : { items: [], total: 0 };
};

export const useCartStore = create((set, get) => ({
  cart: getCartFromStorage(),

  calculateTotal: (cart) => {
    const total = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return total.toFixed(2);
  },

  addToCart: (product) =>
    set((state) => {
      const existingProduct = state.cart.items.find(
        (item) => item.id === product.id
      );
      let updatedCart;
      if (existingProduct) {
        updatedCart = {
          ...state.cart,
          items: state.cart.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        updatedCart = {
          ...state.cart,
          items: [...state.cart.items, { ...product, quantity: 1 }],
        };
      }
      updatedCart.total = get().calculateTotal(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  updateQuantity: (productId, quantity) => {
    set((state) => {
      const updatedCart = {
        ...state.cart,
        items: state.cart.items.map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(1, quantity) }
            : item
        ),
      };
      updatedCart.total = get().calculateTotal(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { cart: updatedCart };
    });
  },

  removeFromCart: (productId) =>
    set((state) => {
      const updatedCart = {
        ...state.cart,
        items: state.cart.items.filter((item) => item.id !== productId),
      };
      updatedCart.total = get().calculateTotal(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  clearCart: () =>
    set(() => {
      const emptyCart = { items: [], total: 0 };
      localStorage.removeItem('cart');
      return { cart: emptyCart };
    }),
}));
