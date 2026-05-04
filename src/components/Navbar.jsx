import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShieldCheck, Truck, Award, FlaskConical, MessageCircle } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

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

  // WhatsApp placeholder — replace with client's number
  const whatsappUrl = 'https://wa.me/639XXXXXXXXX?text=Hi!%20I%27d%20like%20to%20learn%20more%20about%20your%20peptides.';

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
          height: 68,
        }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/logo.jpg" alt="Peptides & You" style={{ height: 64, width: 'auto', objectFit: 'contain' }} />
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
            {/* WhatsApp CTA */}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
              className="btn-primary desktop-nav" style={{ padding: '9px 20px', fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <MessageCircle size={14} /> Order Now
            </a>

            {/* Shop CTA */}
            <Link to="/shop" className="btn-outline desktop-nav" style={{ padding: '9px 20px', fontSize: 12 }}>
              Shop All
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
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
            className="btn-primary" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              marginTop: 16, padding: '13px 28px',
            }}>
            <MessageCircle size={16} /> Order via WhatsApp
          </a>
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
