import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { COMPANY_NAME } from '../constants';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  const isHomePage = location.pathname === '/';
  const isDarkHero = isHomePage && !scrolled;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur border-b border-slate-200 py-4 shadow-sm' : 'bg-slate-900/30 backdrop-blur py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-11 h-11 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <span className={`font-display font-bold text-2xl tracking-tight transition-colors ${isDarkHero ? 'text-white' : 'text-slate-900'}`}>
              {COMPANY_NAME}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-base font-semibold transition-colors hover:text-blue-500 ${
                  location.pathname === link.path 
                    ? 'text-blue-500' 
                    : isDarkHero ? 'text-slate-200' : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all shadow-md ${
                scrolled ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`transition-colors ${isDarkHero ? 'text-white' : 'text-slate-600'}`}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-4 text-base font-medium border-b border-slate-50 ${
                  location.pathname === link.path ? 'text-blue-600' : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 px-3">
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-primary text-white py-3 rounded-xl font-medium"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <span className="text-primary font-bold">D</span>
              </div>
              <span className="font-display font-bold text-lg tracking-tight">
                {COMPANY_NAME}
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Diyar Power Link LLP and Diyar Computers: Your "One Shop for All IT Needs". Providing high-quality IT hardware, specialized paper products, medical supplies, and industrial packaging solutions across India.
            </p>
            <div className="flex space-x-4">
              {/* Social icons could go here */}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Our Products</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Our Divisions</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li>IT Hardware & Software</li>
              <li>Thermal Paper Rolls</li>
              <li>Medical ID Wristbands</li>
              <li>Packaging Solutions</li>
              <li>Technical Services</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start space-x-3">
                <span className="mt-1">📍</span>
                <span>Building 10-6-87/2, Street Rural Police Station, Srinivasa Colony, Mahabubnagar – 509001, Telangana, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} />
                <span>+91 8688050498</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} />
                <span>info@diyarpowerlink.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
