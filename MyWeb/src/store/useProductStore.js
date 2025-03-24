import { create } from 'zustand';
import toast from 'react-hot-toast';
import {
  getProducts,
  getProductsByCategory,
  createProductApi,
  deleteProductApi,
} from '@api';

export const useProductStore = create((set) => ({
  products: [],
  loading: false,

  setProducts: (products) => set({ products }),

  fetchAllProducts: async (signal) => {
    set({ loading: true });
    try {
      const data = await getProducts(signal);
      set({ products: data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch products', loading: false });
      toast.error(error?.message || 'Failed to fetch products');
    }
  },

  fetchProductsByCategory: async (category, signal) => {
    set({ loading: true });
    try {
      const data = await getProductsByCategory(category, signal);
      set({ products: data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch products', loading: false });
      toast.error(error?.message || 'Failed to fetch products');
    }
  },

  createProduct: async (productData, signal) => {
    set({ loading: true });
    try {
      const data = await createProductApi(productData, signal);
      set((prevState) => ({
        products: [...prevState.products, data],
        loading: false,
      }));
    } catch (error) {
      toast.error(error?.message || 'Failed to create product');
      set({ loading: false });
    }
  },

  deleteProduct: async (productId, signal) => {
    set({ loading: true });
    try {
      await deleteProductApi(productId, signal);
      set((prevState) => ({
        products: prevState.products.filter(
          (product) => product._id !== productId
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(error?.message || 'Failed to delete product');
    }
  },
}));
