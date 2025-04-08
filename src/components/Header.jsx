// src/components/Header.jsx
import { ShoppingCart } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">React E-Commerce</h1>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search products..."
            className="border px-3 py-1 rounded-md text-sm"
          />
          <div className="relative">
            <ShoppingCart />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1">
              0
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
