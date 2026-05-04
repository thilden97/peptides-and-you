import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Star, FileCheck } from 'lucide-react';

const ProductCard = ({ product }) => {
  const minPrice = Math.min(...product.variants.map(v => v.price));
  const hasMultipleVariants = product.variants.length > 1;

  return (
    <Link to={`/product/${product.id}`} className="product-card" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Image Section */}
      <div className="product-card-image" style={{ background: '#FAFAF8' }}>
        <div className="badge-top">{product.category}</div>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', padding: 16 }}
          loading="lazy"
        />
      </div>

      {/* Body */}
      <div className="product-card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Title Row */}
        <div className="card-title-row">
          <span className="card-title">{product.name}</span>
          {product.variants.length > 0 && (
            <span className="card-size">{product.variants[0].label}</span>
          )}
        </div>

        {/* Description */}
        <p style={{
          fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6,
          marginBottom: 10, flex: 1,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {product.shortDescription}
        </p>

        {/* Trust Badges */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 600, color: 'var(--primary)' }}>
            <ShieldCheck size={12} /> Lab Tested
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 600, color: 'var(--primary)' }}>
            <FileCheck size={12} /> COA Included
          </div>
        </div>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} fill={i < Math.floor(product.rating) ? '#B8860B' : 'none'}
                color={i < Math.floor(product.rating) ? '#B8860B' : '#D4D4D8'} />
            ))}
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)' }}>
            {product.rating}
          </span>
        </div>

        {/* Price */}
        <div className="card-price">
          {hasMultipleVariants ? `From ₱${minPrice.toLocaleString()}` : `₱${minPrice.toLocaleString()}`}
        </div>

        {/* CTA */}
        <span className="card-btn">View Details</span>
      </div>
    </Link>
  );
};

export default ProductCard;
