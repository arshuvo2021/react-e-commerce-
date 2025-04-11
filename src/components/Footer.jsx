// src/components/Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-blue-900 text-center py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-white">© 2025 React E-Commerce. All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="#" className="text-blue-200 hover:text-white transition-colors duration-300">
            Terms of Service
          </a>
          <a href="#" className="text-blue-200 hover:text-white transition-colors duration-300">
            Privacy Policy
          </a>
          <a href="#" className="text-blue-200 hover:text-white transition-colors duration-300">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
