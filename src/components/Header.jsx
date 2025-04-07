import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">React E-Commerce</Link>
        <nav>
          <Link to="/" className="px-4">Home</Link>
          <Link to="/cart" className="px-4">Cart</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
