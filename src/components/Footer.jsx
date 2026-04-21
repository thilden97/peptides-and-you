import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, FlaskConical, Instagram, Facebook, MessageCircle, ShieldCheck } from 'lucide-react';

const Footer = () => {
  return (
    <footer>
      {/* Main Footer */}
      <div style={{background: '#0F1B2D', color: '#fff', paddingTop: 56, paddingBottom: 40}}>
        <div className="container">
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 40, marginBottom: 40}}>
            {/* Brand — Real logo */}
            <div>
              <div style={{marginBottom: 16}}>
                <img
                  src="/logo.png"
                  alt="Peptides & You"
                  style={{height: 52, width: 'auto', objectFit: 'contain', filter: 'brightness(1.3)'}}
                />
              </div>
              <p style={{color: 'rgba(255,255,255,0.55)', fontSize: 13, lineHeight: 1.7, marginBottom: 20}}>
                Premium pharmaceutical-grade peptides. All products are lyophilised powder vials supplied with Certificate of Analysis. Lab tested and verified pure.
              </p>
              <div style={{display: 'flex', gap: 8}}>
                {[Instagram, Facebook, MessageCircle].map((Icon, i) => (
                  <a key={i} href="#" style={{
                    padding: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 6,
                    border: '1px solid rgba(255,255,255,0.08)', display: 'flex',
                    transition: 'all 0.2s',
                  }}
                  className="footer-social-hover">
                    <Icon size={15} color="rgba(255,255,255,0.6)" />
                  </a>
                ))}
              </div>
            </div>

            {/* Catalog */}
            <div>
              <h4 className="montserrat" style={{fontSize: 14, fontWeight: 700, marginBottom: 18, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.06em'}}>
                Catalog
              </h4>
              <ul className="space-y-4">
                {['All Peptides', 'Healing & Recovery', 'Anti-Aging & Skin', 'Weight Management', 'Growth Hormone', 'Cognitive & Neuro'].map(item => (
                  <li key={item}><Link to="/shop" style={{color: 'rgba(255,255,255,0.5)', fontSize: 13, transition: 'color 0.2s'}}>{item}</Link></li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="montserrat" style={{fontSize: 14, fontWeight: 700, marginBottom: 18, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.06em'}}>
                Support
              </h4>
              <ul className="space-y-4">
                <li><Link to="/quiz" style={{color: 'rgba(255,255,255,0.5)', fontSize: 13}}>Peptide Quiz</Link></li>
                <li><Link to="/blog" style={{color: 'rgba(255,255,255,0.5)', fontSize: 13}}>Blog & Research</Link></li>
                <li><Link to="/about" style={{color: 'rgba(255,255,255,0.5)', fontSize: 13}}>About Us</Link></li>
                <li><a href="#" style={{color: 'rgba(255,255,255,0.5)', fontSize: 13}}>Lab Testing & COA</a></li>
                <li><a href="#" style={{color: 'rgba(255,255,255,0.5)', fontSize: 13}}>Shipping Info</a></li>
                <li><a href="#" style={{color: 'rgba(255,255,255,0.5)', fontSize: 13}}>FAQs</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="montserrat" style={{fontSize: 14, fontWeight: 700, marginBottom: 18, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.06em'}}>
                Contact
              </h4>
              <ul className="space-y-5">
                <li style={{display: 'flex', alignItems: 'flex-start', gap: 10, color: 'rgba(255,255,255,0.5)', fontSize: 13}}>
                  <Mail size={16} color="#4FBF9F" style={{marginTop: 2, flexShrink: 0}} /> info@peptidesandyou.com
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start', gap: 10, color: 'rgba(255,255,255,0.5)', fontSize: 13}}>
                  <MessageCircle size={16} color="#4FBF9F" style={{marginTop: 2, flexShrink: 0}} /> WhatsApp Available
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start', gap: 10, color: 'rgba(255,255,255,0.5)', fontSize: 13}}>
                  <MapPin size={16} color="#4FBF9F" style={{marginTop: 2, flexShrink: 0}} />
                  Philippines
                </li>
              </ul>
              <Link to="/contact" className="btn-outline" style={{
                marginTop: 16, padding: '8px 18px', fontSize: 12, display: 'inline-flex',
                color: '#fff', borderColor: 'rgba(255,255,255,0.2)',
              }}>Contact Us</Link>
            </div>
          </div>

          {/* Disclaimer */}
          <div style={{
            padding: '14px 20px', background: 'rgba(255,255,255,0.03)',
            borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)', marginBottom: 0,
          }}>
            <p style={{fontSize: 11, color: 'rgba(255,255,255,0.35)', lineHeight: 1.7, textAlign: 'center'}}>
              <strong style={{color: 'rgba(255,255,255,0.5)'}}>Disclaimer.</strong> All products are sold as lyophilised powder vials for research purposes. Certificate of Analysis supplied with every order. Consult a healthcare professional before use.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{background: '#0A1220', padding: '14px 0'}}>
        <div className="container" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em'}}>
            <ShieldCheck size={13} color="#4FBF9F" /> © 2026 Peptides and You
          </div>
          <div style={{display: 'flex', gap: 20, fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)'}}>
            <Link to="/privacy-policy" style={{color: 'inherit'}}>Privacy Policy</Link>
            <a href="#" style={{color: 'inherit'}}>Terms of Service</a>
            <a href="#" style={{color: 'inherit'}}>Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
