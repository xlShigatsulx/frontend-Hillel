import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore, useCartStore } from '@store';

export function Navbar() {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === 'admin';
  const { cart, clearCart } = useCartStore();
  const cartItems = cart?.items || [];
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    clearCart();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-orange-300 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300">
      <div className="container mx-auto px-4 py-1">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <img src="/logo.png" className="max-w-[80px]" />
          </Link>

          <nav className="flex gap-14">
            <Link
              to="/"
              className="text-black hover:text-amber-600 hover:underline hover:decoration-wavy transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-black hover:text-amber-600 hover:underline hover:decoration-wavy transition duration-300"
            >
              About
            </Link>
            <Link
              to="/shop"
              className="text-black hover:text-amber-600 hover:underline hover:decoration-wavy transition duration-300"
            >
              Shop
            </Link>
            <Link
              to="/blogs"
              className="text-black hover:text-amber-600 hover:underline hover:decoration-wavy transition duration-300"
            >
              Blogs
            </Link>
            <Link
              to="/contact"
              className="text-black hover:text-amber-600 hover:underline hover:decoration-wavy transition duration-300"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {isAdmin && (
              <Link
                className="bg-black text-green-700 px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
                to="/secret-dashboard"
              >
                <Lock className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}

            {user && (
              <Link
                to="/cart"
                className="relative group text-black hover:text-amber-900"
              >
                <ShoppingCart
                  className="inline-block mr-1 group-hover:text-amber-900"
                  size={20}
                />
                <span className="hidden sm:inline">Cart</span>
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -left-2 bg-amber-600 text-white rounded-full px-2 py-0.5 text-xs">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            )}

            {user ? (
              <button
                className="bg-amber-600 hover:bg-amber-500 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                onClick={handleLogOut}
              >
                <LogOut size={18} />
                <span className="hidden sm:inline ml-2">Log Out</span>
              </button>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="bg-amber-600 hover:bg-amber-500 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <UserPlus className="mr-2" size={18} />
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="bg-amber-600 hover:bg-amber-500 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <LogIn className="mr-2" size={18} />
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
