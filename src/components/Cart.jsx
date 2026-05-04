import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const formatPrice = (p) => `₱${p.toLocaleString()}`;

  return (
    <>
      <div className="cart-overlay" onClick={() => setIsCartOpen(false)} />
      <div className="cart-drawer">
        {/* Header */}
        <div style={{
          padding: '20px 24px', borderBottom: '1px solid var(--border-light)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ShoppingBag size={20} color="var(--primary)" />
            <h3 className="montserrat" style={{ fontSize: 16, fontWeight: 700 }}>
              Your Cart <span style={{ color: 'var(--text-muted)', fontWeight: 500, fontSize: 13 }}>({totalItems})</span>
            </h3>
          </div>
          <button onClick={() => setIsCartOpen(false)} style={{
            width: 36, height: 36, borderRadius: 8, display: 'flex',
            alignItems: 'center', justifyContent: 'center', background: 'var(--primary-light)',
            transition: 'all 0.2s',
          }}>
            <X size={18} color="var(--text-muted)" />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflow: 'auto', padding: '16px 24px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 24px' }}>
              <ShoppingBag size={48} style={{ opacity: 0.1, margin: '0 auto 16px' }} />
              <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8 }}>
                Your cart is empty
              </p>
              <p style={{ fontSize: 13, color: 'var(--text-light)' }}>
                Browse our catalog to add products
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {items.map(item => (
                <div key={item.key} style={{
                  display: 'flex', gap: 14, padding: 14, borderRadius: 12,
                  border: '1px solid var(--border-light)', background: '#FAFAF8',
                }}>
                  <img src={item.image} alt={item.name} style={{
                    width: 64, height: 64, borderRadius: 8, objectFit: 'cover',
                    background: 'var(--primary-light)',
                  }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 className="montserrat" style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>
                      {item.name}
                    </h4>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>
                      {item.variantLabel}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <button onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          style={{
                            width: 26, height: 26, borderRadius: 6, display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            background: '#fff', border: '1px solid var(--border)',
                          }}>
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: 13, fontWeight: 700, minWidth: 20, textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          style={{
                            width: 26, height: 26, borderRadius: 6, display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            background: '#fff', border: '1px solid var(--border)',
                          }}>
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="montserrat" style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary)' }}>
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.key)} style={{
                    alignSelf: 'flex-start', padding: 4, background: 'none',
                    color: 'var(--text-light)', transition: 'color 0.2s',
                  }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{
            padding: '20px 24px', borderTop: '1px solid var(--border-light)',
            background: '#FAFAF8',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>Subtotal</span>
              <span className="montserrat" style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>
                {formatPrice(totalPrice)}
              </span>
            </div>
            <button onClick={() => { setIsCartOpen(false); navigate('/checkout'); }}
              className="btn-primary" style={{ width: '100%', padding: '14px 28px', fontSize: 15 }}>
              Proceed to Checkout
            </button>
            <p style={{ fontSize: 11, color: 'var(--text-light)', textAlign: 'center', marginTop: 10 }}>
              Shipping calculated at checkout
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
