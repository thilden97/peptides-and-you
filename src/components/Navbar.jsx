import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, ShieldCheck, Truck, Award, FlaskConical } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/blog', label: 'Research' },
    { to: '/quiz', label: 'Quiz' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <span>🔬 All Products Lab Tested — COA Included</span>
        <span style={{ opacity: 0.5 }}>|</span>
        <span>🇵🇭 Serving Philippines & Southeast Asia</span>
      </div>

      {/* Trust Bar */}
      <div className="trust-bar" style={{
        background: scrolled ? 'rgba(255,255,255,0.95)' : '#fff',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}>
        <div className="trust-item"><ShieldCheck size={13} color="var(--primary)" /> Pharmaceutical Grade</div>
        <div className="trust-item"><FlaskConical size={13} color="var(--primary)" /> 3rd Party Lab Tested</div>
        <div className="trust-item"><Award size={13} color="var(--primary)" /> COA Every Batch</div>
        <div className="trust-item"><Truck size={13} color="var(--primary)" /> Fast PH Shipping</div>
      </div>

      {/* Main Nav */}
      <nav style={{
        background: scrolled ? 'rgba(255,255,255,0.97)' : '#fff',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: '1px solid var(--border-light)',
        padding: '0 20px',
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,0.04)' : 'none',
      }}>
        <div style={{
          maxWidth: 1180, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 64,
        }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/logo.png" alt="Peptides & You" style={{ height: 36 }} />
          </Link>

          {/* Desktop Nav */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
          }} className="desktop-nav">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to}
                className={`nav-link-animated ${location.pathname === link.to ? 'nav-active' : ''}`}
                style={{
                  fontSize: 13, fontWeight: 600, padding: '8px 14px',
                  color: location.pathname === link.to ? 'var(--primary)' : 'var(--text-secondary)',
                  transition: 'color 0.2s',
                }}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Cart */}
            <button onClick={() => setIsCartOpen(true)} style={{
              position: 'relative', width: 40, height: 40, borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--primary-light)', transition: 'all 0.2s',
            }}>
              <ShoppingBag size={18} color="var(--primary)" />
              {totalItems > 0 && (
                <span style={{
                  position: 'absolute', top: -4, right: -4,
                  width: 18, height: 18, borderRadius: '50%',
                  background: 'var(--brand-gradient)', color: '#fff',
                  fontSize: 10, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {totalItems}
                </span>
              )}
            </button>

            {/* Shop CTA */}
            <Link to="/shop" className="btn-primary desktop-nav" style={{ padding: '9px 20px', fontSize: 12 }}>
              Shop Now
            </Link>

            {/* Mobile Hamburger */}
            <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} style={{
              display: 'none', width: 40, height: 40, borderRadius: 10,
              alignItems: 'center', justifyContent: 'center',
              background: 'var(--primary-light)',
            }}>
              {mobileOpen ? <X size={20} color="var(--primary)" /> : <Menu size={20} color="var(--primary)" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu-slide" style={{
          background: '#fff', borderBottom: '1px solid var(--border)',
          padding: '16px 20px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        }}>
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} style={{
              display: 'block', padding: '12px 0', fontSize: 15, fontWeight: 600,
              color: location.pathname === link.to ? 'var(--primary)' : 'var(--text)',
              borderBottom: '1px solid var(--border-light)',
            }}>
              {link.label}
            </Link>
          ))}
          <Link to="/shop" className="btn-primary" style={{
            display: 'block', textAlign: 'center', marginTop: 16, padding: '13px 28px',
          }}>
            Shop All Peptides
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
          .trust-bar { display: none !important; }
        }
        @media (min-width: 901px) {
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
