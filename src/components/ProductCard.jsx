import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const Stars = ({ rating = 5 }) => (
  <div className="stars">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={13}
        fill={i < rating ? '#1F6FB2' : 'transparent'}
        color={i < rating ? '#1F6FB2' : '#D4D4D8'}
        strokeWidth={1.5} />
    ))}
  </div>
);

const formatPrice = (price) => {
  return `₱${price.toLocaleString()}`;
};

const ProductCard = ({ product }) => {
  const firstVariant = product.variants[0];
  const hasMultipleVariants = product.variants.length > 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="product-card"
    >
      <div className="product-card-image">
        {product.type === 'stack' && <div className="badge-top">Stack</div>}
        {/* Branded vial image with logo overlay */}
        <img src="/peptide-vial-branded.png" alt={`${product.name} peptide vial — Peptides & You`} style={{
          width: '100%', height: '100%', objectFit: 'cover',
        }} />
        {/* Small logo watermark */}
        <img
          src="/logo.png"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute', bottom: 8, right: 8,
            height: 24, width: 'auto', objectFit: 'contain',
            opacity: 0.7, filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.15))',
            pointerEvents: 'none',
          }}
        />
      </div>

      <div className="product-card-body">
        <div className="card-title-row">
          <Link to={`/product/${product.id}`} style={{textDecoration: 'none'}}>
            <h3 className="card-title">{product.name}</h3>
          </Link>
          {firstVariant && <span className="card-size">{firstVariant.size}</span>}
        </div>

        <span style={{
          display: 'inline-block', fontSize: 10, fontWeight: 600,
          color: 'var(--primary)', background: 'var(--primary-light)',
          padding: '2px 8px', borderRadius: 4, marginBottom: 6,
          textTransform: 'uppercase', letterSpacing: '0.04em',
        }}>{product.category}</span>

        <Stars rating={product.rating} />

        <p style={{
          fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5,
          margin: '6px 0 10px', minHeight: 36,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>{product.shortDescription}</p>

        <div className="card-price">
          {hasMultipleVariants ? (
            <span>From {formatPrice(firstVariant.price)}</span>
          ) : (
            <span>{formatPrice(firstVariant.price)}</span>
          )}
        </div>

        <Link to={`/product/${product.id}`} className="card-btn">
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
