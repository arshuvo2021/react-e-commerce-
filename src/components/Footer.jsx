const Footer = () => {
  const footerLinks = [
    { label: 'Terms of Service', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'About Us', href: '#' },
    { label: 'FAQ', href: '#' },
    { label: 'Shipping', href: '#' }
  ];

  return (
    <footer className="bg-[#a5a5b0] text-white py-10 mt-10 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-6">

          {/* Brand */}
          <h3 className="text-2xl font-bold tracking-wider">ReactShop</h3>
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} React E-Commerce. All rights reserved.
          </p>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-slate-300 hover:text-white transition-colors duration-300 no-underline"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social Icons (You can replace SVGs or use react-icons) */}
          <div className="flex space-x-6 pt-4">
            <a href="#" className="hover:text-blue-400 transition duration-300">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M..." />
              </svg>
            </a>
            <a href="#" className="hover:text-blue-400 transition duration-300">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M..." />
              </svg>
            </a>
            <a href="#" className="hover:text-blue-400 transition duration-300">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M..." />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
