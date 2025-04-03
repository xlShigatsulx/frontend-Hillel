import { createBrowserRouter, Navigate } from 'react-router-dom';
import {
  ErrorPage,
  HomePage,
  SignUpPage,
  LoginPage,
  AdminPage,
  CartPage,
  CategoryPage,
  AboutPage,
  ShopPage,
  BlogsPage,
  ContactPage,
} from '@pages';

export const router = (user) =>
  createBrowserRouter([
    {
      path: '/',
      errorElement: <ErrorPage />,
      id: 'root',
      children: [
        { index: true, element: <HomePage /> },
        { path: 'about', element: <AboutPage /> },
        { path: 'shop', element: <ShopPage /> },
        { path: 'blogs', element: <BlogsPage /> },
        { path: 'contact', element: <ContactPage /> },
        {
          path: 'secret-dashboard',
          element:
            user && user?.role === 'admin' ? (
              <AdminPage />
            ) : (
              <Navigate to="/login" />
            ),
        },
        {
          path: 'signup',
          element: !user ? <SignUpPage /> : <Navigate to="/" />,
        },
        {
          path: 'login',
          element: !user ? <LoginPage /> : <Navigate to="/" />,
        },
        {
          path: 'cart',
          element: user ? <CartPage /> : <Navigate to="/" />,
        },
        {
          path: ':category',
          element: <CategoryPage />,
        },
      ],
    },
  ]);
