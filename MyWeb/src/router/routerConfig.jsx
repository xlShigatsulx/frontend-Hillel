import { createBrowserRouter, Navigate } from 'react-router-dom';
import {
  ErrorPage,
  HomePage,
  SignUpPage,
  LoginPage,
  AdminPage,
  CartPage,
  CategoryPage,
} from '@pages';

const ProtectedRoute = ({ user, element }) => {
  return user ? element : <Navigate to="/login" />;
};

const AdminRoute = ({ user, element }) => {
  return user?.role === 'admin' ? element : <Navigate to="/login" />;
};

export const router = (user) =>
  createBrowserRouter([
    {
      path: '/',
      errorElement: <ErrorPage />,
      id: 'root',
      children: [
        { index: true, element: <HomePage /> },
        {
          path: 'signup',
          element: !user ? <SignUpPage /> : <Navigate to="/" />,
        },
        { path: 'login', element: !user ? <LoginPage /> : <Navigate to="/" /> },
        {
          path: 'secret-dashboard',
          element: <AdminRoute user={user} element={<AdminPage />} />,
        },
        {
          path: ':category',
          element: <CategoryPage />,
        },
        {
          path: 'cart',
          element: <ProtectedRoute user={user} element={<CartPage />} />,
        },
      ],
    },
  ]);
