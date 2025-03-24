import { useEffect, useRef } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/index.js';
import { LoadingSpinner } from '@ui';
import { useUserStore } from '@store';
import { Toaster } from 'react-hot-toast';

export function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const controllerRef = useRef(new AbortController());

  useEffect(() => {
    checkAuth(controllerRef.current.signal);
  }, [checkAuth]);

  if (checkingAuth) return <LoadingSpinner />;
  return (
    <>
      <RouterProvider
        router={router(user?.user)}
        fallbackElement={<LoadingSpinner />}
      />
      <Toaster />
    </>
  );
}
