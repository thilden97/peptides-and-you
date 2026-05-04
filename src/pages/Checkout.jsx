import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useCart } from '../context/CartContext';
import { ShieldCheck, CreditCard, Smartphone, Building, ChevronDown } from 'lucide-react';

const Checkout = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const { items, totalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('');

  const formatPrice = (p) => `₱${p.toLocaleString()}`;

  const paymentMethods = [
    { id: 'gcash', label: 'GCash', desc: 'Pay with GCash e-wallet', icon: Smartphone },
    { id: 'maya', label: 'Maya', desc: 'Pay with Maya e-wallet', icon: Smartphone },
    { id: 'card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, JCB', icon: CreditCard },
    { id: 'bank', label: 'Bank Transfer', desc: 'BDO, BPI, UnionBank, and more', icon: Building },
  ];

  return (
    <div style={{ paddingTop: 180, paddingBottom: 80, background: 'var(--bg)', minHeight: '100vh' }}>
      <Helmet>
        <title>Checkout | Peptides & You</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="container" style={{ maxWidth: 960 }}>
        <h1 className="montserrat" style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Checkout</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 36 }}>
          Complete your order — all products are lab tested with COA included.
        </p>

        {items.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '64px 24px', background: '#fff',
            borderRadius: 16, border: '1px solid var(--border)',
          }}>
            <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8 }}>
              Your cart is empty
            </p>
            <a href="/shop" className="btn-primary" style={{ marginTop: 16 }}>Browse Products</a>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 32 }}>
            {/* Left — Form */}
            <div>
              {/* Contact Info */}
              <div style={{
                background: '#fff', padding: 28, borderRadius: 16,
                border: '1px solid var(--border)', marginBottom: 24,
              }}>
                <h2 className="montserrat" style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>
                  Contact Information
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={labelStyle}>First Name</label>
                    <input type="text" className="form-input" placeholder="Juan" />
                  </div>
                  <div>
                    <label style={labelStyle}>Last Name</label>
                    <input type="text" className="form-input" placeholder="Dela Cruz" />
                  </div>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>Email</label>
                  <input type="email" className="form-input" placeholder="juan@email.com" />
                </div>
                <div>
                  <label style={labelStyle}>Phone (WhatsApp preferred)</label>
                  <input type="tel" className="form-input" placeholder="+63 9XX XXX XXXX" />
                </div>
              </div>

              {/* Shipping */}
              <div style={{
                background: '#fff', padding: 28, borderRadius: 16,
                border: '1px solid var(--border)', marginBottom: 24,
              }}>
                <h2 className="montserrat" style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>
                  Shipping Address
                </h2>
                <div style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>Address</label>
                  <input type="text" className="form-input" placeholder="Street address" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={labelStyle}>City</label>
                    <input type="text" className="form-input" placeholder="Manila" />
                  </div>
                  <div>
                    <label style={labelStyle}>Province / Region</label>
                    <input type="text" className="form-input" placeholder="Metro Manila" />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label style={labelStyle}>Postal Code</label>
                    <input type="text" className="form-input" placeholder="1000" />
                  </div>
                  <div>
                    <label style={labelStyle}>Country</label>
                    <input type="text" className="form-input" value="Philippines" readOnly style={{ background: '#F5F2EC' }} />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div style={{
                background: '#fff', padding: 28, borderRadius: 16,
                border: '1px solid var(--border)',
              }}>
                <h2 className="montserrat" style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>
                  Payment Method
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {paymentMethods.map(m => (
                    <button key={m.id} onClick={() => setPaymentMethod(m.id)} style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '14px 18px', borderRadius: 12, textAlign: 'left',
                      border: paymentMethod === m.id ? '2px solid var(--primary)' : '2px solid var(--border-light)',
                      background: paymentMethod === m.id ? 'var(--primary-light)' : '#fff',
                      transition: 'all 0.2s', width: '100%',
                    }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: 10,
                        background: paymentMethod === m.id ? 'var(--primary)' : 'var(--primary-light)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <m.icon size={18} color={paymentMethod === m.id ? '#fff' : 'var(--primary)'} />
                      </div>
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{m.label}</p>
                        <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{m.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Order Summary */}
            <div>
              <div style={{
                background: '#fff', padding: 28, borderRadius: 16,
                border: '1px solid var(--border)', position: 'sticky', top: 200,
              }}>
                <h2 className="montserrat" style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>
                  Order Summary
                </h2>

                {items.map(item => (
                  <div key={item.key} style={{
                    display: 'flex', gap: 12, marginBottom: 14,
                    paddingBottom: 14, borderBottom: '1px solid var(--border-light)',
                  }}>
                    <img src={item.image} alt={item.name} style={{
                      width: 52, height: 52, borderRadius: 8, objectFit: 'cover',
                      background: 'var(--primary-light)',
                    }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{item.name}</p>
                      <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.variantLabel} × {item.quantity}</p>
                    </div>
                    <span className="montserrat" style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary)' }}>
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, paddingTop: 8 }}>
                  <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Subtotal</span>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{formatPrice(totalPrice)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Shipping</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary)' }}>Calculated next</span>
                </div>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  paddingTop: 14, borderTop: '2px solid var(--border)',
                  marginTop: 14,
                }}>
                  <span className="montserrat" style={{ fontSize: 16, fontWeight: 700 }}>Total</span>
                  <span className="montserrat" style={{ fontSize: 20, fontWeight: 700, color: 'var(--primary)' }}>
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                <button className="btn-primary" disabled={!paymentMethod} style={{
                  width: '100%', padding: '14px 28px', fontSize: 15, marginTop: 20,
                  opacity: paymentMethod ? 1 : 0.5, cursor: paymentMethod ? 'pointer' : 'not-allowed',
                }}>
                  {paymentMethod ? `Pay with ${paymentMethods.find(m => m.id === paymentMethod)?.label}` : 'Select Payment Method'}
                </button>

                {/* Trust */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: 6, marginTop: 16, fontSize: 11, color: 'var(--text-muted)',
                }}>
                  <ShieldCheck size={13} color="var(--primary)" />
                  Secure checkout · All payments encrypted
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          [style*="grid-template-columns: 1fr 380px"] { grid-template-columns: 1fr !important; }
          [style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

const labelStyle = {
  display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)',
  textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6,
};

export default Checkout;
