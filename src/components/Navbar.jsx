import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ShieldCheck, Truck, FlaskConical, User, ShoppingCart, CheckCircle, FileCheck, Sparkles } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'SHOP', path: '/shop' },
    { name: 'QUIZ', path: '/quiz', highlight: true },
    { name: 'BLOG', path: '/blog' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <header style={{position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100}}>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <span><ShieldCheck size={13} style={{verticalAlign: '-2px'}} /> Secure & discreet shipping</span>
        <span><FileCheck size={13} style={{verticalAlign: '-2px'}} /> Lab Tested · COA Included</span>
        <span><Truck size={13} style={{verticalAlign: '-2px'}} /> Fast delivery Philippines & Intl</span>
      </div>

      {/* Trust Bar */}
      <div className="trust-bar">
        <div className="trust-item">
          <FileCheck size={14} color="var(--primary)" />
          <span>Certificate of Analysis</span>
        </div>
        <div className="trust-item">
          <CheckCircle size={14} color="#16A34A" />
          <span>Lab Tested & Verified</span>
        </div>
        <div className="trust-item">
          <Truck size={14} color="var(--accent)" />
          <span>PH & International Delivery</span>
        </div>
      </div>

      {/* Main Nav */}
      <nav style={{
        background: '#fff',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.06)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        <div className="container" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72}}>
          {/* Logo — MUCH BIGGER */}
          <Link to="/" style={{display: 'flex', alignItems: 'center', padding: '6px 0'}}>
            <img
              src="/logo.png"
              alt="Peptides & You — Premium Pharmaceutical-Grade Peptides"
              style={{height: 85, width: 'auto', objectFit: 'contain', transform: 'translateY(2px)'}}
            />
          </Link>

          {/* Desktop Nav Links */}
          <div style={{display: 'flex', alignItems: 'center', gap: 28}} className="desktop-nav">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path}
                className={`nav-link-animated ${location.pathname === link.path ? 'nav-active' : ''}`}
                style={{
                  fontSize: 12, fontWeight: 700, letterSpacing: '0.06em',
                  color: link.highlight ? 'var(--primary)' : (location.pathname === link.path ? 'var(--primary)' : 'var(--text-secondary)'),
                  transition: 'all 0.25s ease',
                  position: 'relative',
                  ...(link.highlight ? {
                    background: 'var(--primary-light)',
                    padding: '7px 16px',
                    borderRadius: 7,
                    border: '1px solid rgba(31,111,178,0.15)',
                  } : {}),
                }}>
                {link.highlight && <Sparkles size={12} style={{marginRight: 4, verticalAlign: '-1px'}} />}
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right: Search + Icons */}
          <div style={{display: 'flex', alignItems: 'center', gap: 12}} className="desktop-nav">
            <div style={{position: 'relative'}}>
              <input type="text" placeholder="Search peptides..." style={{
                width: 180, padding: '8px 12px 8px 32px', border: '1.5px solid var(--border)',
                borderRadius: 7, fontSize: 12, outline: 'none', fontFamily: 'inherit',
                background: 'var(--bg)', color: 'var(--text)', transition: 'border-color 0.2s',
              }} />
              <Search size={14} style={{position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)'}} />
            </div>
            <button style={{
              background: 'var(--brand-gradient)', color: '#fff', padding: '8px 16px',
              borderRadius: 7, fontWeight: 700, fontSize: 12, transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            className="btn-hover-lift">Search</button>
            <User size={20} style={{color: 'var(--text-secondary)', cursor: 'pointer', transition: 'color 0.2s'}}
              className="icon-hover" />
            <div style={{position: 'relative', cursor: 'pointer'}} className="icon-hover">
              <ShoppingCart size={20} style={{color: 'var(--text-secondary)', transition: 'color 0.2s'}} />
              <span style={{
                position: 'absolute', top: -5, right: -7,
                background: 'var(--accent)', color: '#fff',
                fontSize: 9, fontWeight: 800, width: 16, height: 16,
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>0</span>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)}
            className="mobile-toggle"
            style={{display: 'none', background: 'none', padding: 4}}>
            {isOpen ? <X size={24} color="var(--text)" /> : <Menu size={24} color="var(--text)" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mobile-menu-slide" style={{
            background: '#fff', borderTop: '1px solid var(--border)',
            padding: 20, display: 'flex', flexDirection: 'column', gap: 14,
          }}>
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path}
                style={{fontSize: 14, fontWeight: 700, color: link.highlight ? 'var(--primary)' : 'var(--text)'}}
                onClick={() => setIsOpen(false)}>
                {link.highlight && <Sparkles size={12} style={{marginRight: 6}} />}
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
          .announcement-bar span { margin: 0 8px; font-size: 10px; }
          .trust-bar { gap: 16px; padding: 8px 12px; }
          .trust-item { font-size: 10px; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
