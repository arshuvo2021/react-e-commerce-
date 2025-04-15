import React, { useState } from 'react';
import {
  ShoppingCart,
  Home,
  Package,
  Plus,
  User,
  LogOut,
  Search,
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  const handleAuthClick = (e) => {
    e.preventDefault();
    if (isAdmin) {
      handleLogout();
    } else {
      navigate('/login');
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/products', label: 'Products', icon: Package },
    ...(isAdmin
      ? [{ path: '/add-product', label: 'Add Product', icon: Plus }]
      : []),
    { path: '/cart', label: 'Cart', icon: ShoppingCart, count: cart.length },
    {
      path: isAdmin ? '/logout' : '/login',
      label: isAdmin ? 'Logout' : 'Login',
      icon: isAdmin ? LogOut : User,
      onClick: handleAuthClick,
    },
  ];

  return (
    <header className="bg-[#a5a5b0] shadow-lg sticky top-0 z-50 py-6">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 no-underline">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 5L19 19M5 19L19 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold text-white">ReactShop</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-12">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={item.onClick}
                  className={`no-underline flex items-center space-x-2 text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-blue-500'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                  {item.count > 0 && (
                    <span className="flex items-center justify-center h-5 w-5 rounded-full bg-blue-600 text-white text-xs">
                      {item.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center bg-white rounded-lg px-3 py-1 shadow-md w-64"
          >
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
            />
            <button type="submit">
              <Search className="w-5 h-5 text-gray-500" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
