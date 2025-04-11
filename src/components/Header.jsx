// src/components/Header.jsx
import { ShoppingCart, Home, Package, Plus, User, Search, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  const handleAuthClick = (e) => {
    e.preventDefault();
    if (isAdmin) {
      handleLogout();
    } else {
      navigate('/');
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-3xl font-bold text-white">ReactShop</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={item.onClick}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-blue-800 text-white shadow-md'
                      : 'text-white hover:text-white hover:bg-blue-800'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {item.label}
                  {item.path === '/cart' && cart.length > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-white text-xs font-bold">
                      {cart.length}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Search and Auth */}
          <div className="flex items-center space-x-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-72 px-4 py-2 rounded-lg bg-blue-800 text-white placeholder-blue-200 border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-200 hover:text-white">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
