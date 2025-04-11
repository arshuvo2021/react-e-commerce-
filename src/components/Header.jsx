// src/components/Header.jsx
import React, { useState } from 'react';
import { ShoppingCart, Home, Package, Plus, User, Search, LogOut, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/products', label: 'Products', icon: Package },
    ...(isAdmin ? [{ path: '/add-product', label: 'Add Product', icon: Plus }] : []),
    { path: '/cart', label: 'Cart', icon: ShoppingCart },
    { path: '/profile', label: 'Profile', icon: User },
    { 
      path: isAdmin ? '/logout' : '/login', 
      label: isAdmin ? 'Logout' : 'Login', 
      icon: isAdmin ? LogOut : User,
      onClick: handleAuthClick
    },
  ];

  return (
    <header className="bg-blue-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="relative flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white">ReactShop</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-1.5 text-blue-200 hover:text-white"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 ml-2 text-blue-200 hover:text-white"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={item.onClick}
                  className={`flex items-center px-2.5 py-1.5 rounded text-xs sm:text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-blue-800 text-white shadow-sm'
                      : 'text-blue-100 hover:text-white hover:bg-blue-800'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-1.5" />
                  <span>{item.label}</span>
                  {item.path === '/cart' && cart.length > 0 && (
                    <span className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-white text-xs">
                      {cart.length}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Search */}
          <div className="hidden lg:flex items-center ml-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-40 xl:w-60 px-3 py-1.5 text-xs rounded bg-blue-800 text-white placeholder-blue-200 border border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-200 hover:text-white">
                <Search className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="lg:hidden px-2 pb-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-3 py-1.5 text-sm rounded bg-blue-800 text-white placeholder-blue-200 border border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-200 hover:text-white">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-blue-800">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={(e) => {
                      if (item.onClick) item.onClick(e);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center px-3 py-2 rounded text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-blue-800 text-white'
                        : 'text-blue-100 hover:text-white hover:bg-blue-800'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    <span>{item.label}</span>
                    {item.path === '/cart' && cart.length > 0 && (
                      <span className="ml-auto inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-white text-xs">
                        {cart.length}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
