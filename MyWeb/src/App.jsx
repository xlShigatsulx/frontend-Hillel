import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/index.js';
import { LoadingSpinner } from '@ui';
import { useUserStore } from '@store';
import { Toaster } from 'react-hot-toast';

export function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) return <LoadingSpinner />;
  return (
    <>
      <RouterProvider
        router={router(user)}
        fallbackElement={<LoadingSpinner />}
      />
      <Toaster />
    </>
  );
}
