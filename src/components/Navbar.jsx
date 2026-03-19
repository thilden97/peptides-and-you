import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Droplets, ShieldCheck } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/#about' },
    { name: 'Contact', path: '/#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-sm py-2' : 'bg-white/80 backdrop-blur-md py-4'}`}>
      <div className="container flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-1.5 bg-primary-10 rounded-lg group-hover:bg-primary-20 transition-all">
            <Droplets className="text-primary" size={20} />
          </div>
          <span className="text-lg font-extrabold tracking-tight outfit-font">
            Peptides<span className="text-primary italic">andYou</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-semibold transition-colors hover:text-primary ${location.pathname === link.path ? 'text-primary' : 'text-text-muted'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/shop" className="btn-primary text-sm px-6 py-2.5">
            Order Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-text" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-border py-6 px-6 flex flex-col gap-4 animate-fade-in shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-base font-bold text-text"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/shop" className="btn-primary text-center mt-4" onClick={() => setIsOpen(false)}>
            Order Now
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
