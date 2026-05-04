import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageCircle, MapPin, ShieldCheck, Instagram } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: '#1A1A1A', color: '#fff', padding: '64px 0 0',
    }}>
      <div className="container">
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40,
          paddingBottom: 48, borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          {/* Brand */}
          <div>
            <img src="/logo.jpg" alt="Peptides & You" style={{
              height: 64, marginBottom: 16,
              filter: 'brightness(2) contrast(0.9)',
            }} />
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 16 }}>
              Pharmaceutical-grade peptides, lab tested with Certificate of Analysis. Serving the Philippines and Southeast Asia.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {[Instagram, MessageCircle, Mail].map((Icon, i) => (
                <a key={i} href="#" className="footer-social-hover" style={{
                  width: 36, height: 36, borderRadius: 10,
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                }}>
                  <Icon size={16} color="rgba(255,255,255,0.6)" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="montserrat" style={{ fontSize: 13, fontWeight: 700, marginBottom: 16, color: 'var(--accent)' }}>
              Shop
            </h4>
            {[
              { to: '/shop', label: 'All Peptides' },
              { to: '/product/bpc-157', label: 'BPC-157' },
              { to: '/product/retatrutide', label: 'Retatrutide' },
              { to: '/product/wolverine-stack', label: 'Wolverine Stack' },
              { to: '/product/ghk-cu', label: 'GHK-Cu' },
            ].map(link => (
              <Link key={link.to} to={link.to} style={{
                display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.5)',
                marginBottom: 8, transition: 'color 0.2s',
              }}>{link.label}</Link>
            ))}
          </div>

          {/* Resources */}
          <div>
            <h4 className="montserrat" style={{ fontSize: 13, fontWeight: 700, marginBottom: 16, color: 'var(--accent)' }}>
              Resources
            </h4>
            {[
              { to: '/blog', label: 'Research Blog' },
              { to: '/quiz', label: 'Peptide Quiz' },
              { to: '/about', label: 'About Us' },
              { to: '/contact', label: 'Contact' },
              { to: '/privacy-policy', label: 'Privacy Policy' },
            ].map(link => (
              <Link key={link.to} to={link.to} style={{
                display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.5)',
                marginBottom: 8, transition: 'color 0.2s',
              }}>{link.label}</Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 className="montserrat" style={{ fontSize: 13, fontWeight: 700, marginBottom: 16, color: 'var(--accent)' }}>
              Contact
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Mail size={14} color="var(--accent)" />
              <a href="mailto:info@peptidesandyou.com" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                info@peptidesandyou.com
              </a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <MessageCircle size={14} color="var(--accent)" />
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>WhatsApp Available</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <MapPin size={14} color="var(--accent)" />
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Philippines</span>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 12px', borderRadius: 8,
              background: 'rgba(184,134,11,0.1)', border: '1px solid rgba(184,134,11,0.15)',
            }}>
              <ShieldCheck size={13} color="var(--accent)" />
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent)' }}>
                Lab Tested · COA Included
              </span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '20px 0', flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
            © {year} Peptides & You. All rights reserved.
          </p>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', maxWidth: 400, lineHeight: 1.6 }}>
            All products are for research purposes only. This website does not provide medical advice. Consult a healthcare professional before use.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer [style*="grid-template-columns: repeat(4"] { grid-template-columns: repeat(2, 1fr) !important; gap: 32px !important; }
        }
        @media (max-width: 480px) {
          footer [style*="grid-template-columns: repeat(4"] { grid-template-columns: 1fr !important; }
        }
        footer a:hover { color: var(--accent) !important; }
      `}</style>
    </footer>
  );
};

export default Footer;
