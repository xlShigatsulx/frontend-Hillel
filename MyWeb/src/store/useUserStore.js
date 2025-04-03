import { create } from 'zustand';
import { signupApi, loginApi } from '@api';
import { toast } from 'react-hot-toast';

export const useUserStore = create((set) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password }, signal) => {
    set({ loading: true });
    try {
      const data = await signupApi({ name, email, password }, signal);
      set({ user: data.user, loading: false });
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      set({ loading: false });
      toast.error(error?.message || 'Registration failed');
    }
  },

  login: async ({ email, password }, signal) => {
    set({ loading: true });
    try {
      const data = await loginApi({ email, password }, signal);
      set({ user: data.user, loading: false });
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      set({ loading: false });
      toast.error(error?.message || 'Login failed');
    }
  },

  logout: () => {
    try {
      localStorage.removeItem('user');
      set({ user: null });
    } catch (error) {
      toast.error('Logout error');
    }
  },

  checkAuth: () => {
    try {
      const localUser = JSON.parse(localStorage.getItem('user'));
      if (localUser) {
        set({ user: localUser.user });
      }
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
    }
    set({ checkingAuth: false });
  },
}));
