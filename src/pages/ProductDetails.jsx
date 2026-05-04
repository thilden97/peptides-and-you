import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { peptides, getProductById } from '../data/peptides';
import { useCart } from '../context/CartContext';
import {
  ShieldCheck, FileCheck, Star, Check, Download, ShoppingBag,
  ArrowLeft, ChevronRight, FlaskConical, Award, Package
} from 'lucide-react';
import ProductCard from '../components/ProductCard';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' } }),
};

const ProductDetails = () => {
  const { id } = useParams();
  const product = getProductById(id);
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); setSelectedVariant(0); setAddedFeedback(false); }, [id]);

  if (!product) {
    return (
      <div style={{ paddingTop: 200, textAlign: 'center', minHeight: '60vh' }}>
        <h2 className="montserrat" style={{ fontSize: 24, marginBottom: 12 }}>Product Not Found</h2>
        <Link to="/shop" className="btn-primary">Browse All Peptides</Link>
      </div>
    );
  }

  const variant = product.variants[selectedVariant];
  const relatedProducts = peptides.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);
  const reviewCount = Math.floor(product.rating * 14 + 23);

  const handleAddToCart = () => {
    addItem(product, variant);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  // JSON-LD
  const productSchema = {
    "@context": "https://schema.org", "@type": "Product",
    name: product.name, description: product.shortDescription,
    image: `https://peptidesandyou.com${product.image}`,
    url: `https://peptidesandyou.com/product/${product.id}`,
    brand: { "@type": "Brand", name: "Peptides and You" },
    offers: {
      "@type": "AggregateOffer", priceCurrency: "PHP",
      lowPrice: Math.min(...product.variants.map(v => v.price)),
      highPrice: Math.max(...product.variants.map(v => v.price)),
      offerCount: product.variants.length,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount, bestRating: 5 },
  };

  return (
    <div style={{ paddingTop: 180, paddingBottom: 80, background: '#fff', minHeight: '100vh' }}>
      <Helmet>
        <title>{product.name} | Lab Tested | Peptides & You</title>
        <meta name="description" content={product.shortDescription} />
        <link rel="canonical" href={`https://peptidesandyou.com/product/${product.id}`} />
        <meta property="og:title" content={`${product.name} | Peptides & You`} />
        <meta property="og:description" content={product.shortDescription} />
        <meta property="og:image" content={`https://peptidesandyou.com${product.image}`} />
        <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
      </Helmet>

      <div className="container" style={{ maxWidth: 1080 }}>
        {/* Breadcrumb */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp}
          style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 32, fontSize: 13, color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}>Home</Link>
          <ChevronRight size={14} />
          <Link to="/shop" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}>Shop</Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{product.name}</span>
        </motion.div>

        {/* Product Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
          {/* Left — Image */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div style={{
              background: '#FAFAF8', borderRadius: 20, padding: 32,
              border: '1px solid var(--border-light)', position: 'relative',
            }}>
              {/* Category Badge */}
              <div style={{
                position: 'absolute', top: 16, left: 16,
                background: 'var(--brand-gradient)', color: '#fff',
                padding: '4px 12px', borderRadius: 8,
                fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
              }}>
                {product.category}
              </div>
              <img src={product.image} alt={product.name} style={{
                width: '100%', maxHeight: 480, objectFit: 'contain',
              }} />
            </div>
          </motion.div>

          {/* Right — Details */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1}>
            {/* Trust Badges */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
              <div className="coa-badge"><ShieldCheck size={13} /> Lab Tested</div>
              <div className="coa-badge"><FileCheck size={13} /> COA Included</div>
              <div className="coa-badge"><Package size={13} /> Lyophilised Powder</div>
            </div>

            {/* Title */}
            <h1 className="montserrat" style={{
              fontSize: 'clamp(28px, 3.5vw, 38px)', fontWeight: 800,
              marginBottom: 8, lineHeight: 1.15,
            }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(product.rating) ? '#B8860B' : 'none'}
                    color={i < Math.floor(product.rating) ? '#B8860B' : '#D4D4D8'} />
                ))}
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>
                {product.rating} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({reviewCount} reviews)</span>
              </span>
            </div>

            {/* Description */}
            <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 24 }}>
              {product.shortDescription}
            </p>

            {/* Variant Selector */}
            <div style={{ marginBottom: 24 }}>
              <label style={{
                display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)',
                textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10,
              }}>
                Select Size
              </label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {product.variants.map((v, i) => (
                  <button key={i} onClick={() => setSelectedVariant(i)} style={{
                    padding: '12px 24px', borderRadius: 10,
                    border: selectedVariant === i ? '2px solid var(--primary)' : '2px solid var(--border)',
                    background: selectedVariant === i ? 'var(--primary-light)' : '#fff',
                    fontSize: 14, fontWeight: 700,
                    color: selectedVariant === i ? 'var(--primary)' : 'var(--text-secondary)',
                    transition: 'all 0.2s', cursor: 'pointer',
                  }}>
                    {v.label} — ₱{v.price.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="montserrat" style={{
              fontSize: 32, fontWeight: 800, color: 'var(--primary)', marginBottom: 24,
            }}>
              ₱{variant.price.toLocaleString()}
            </div>

            {/* Add to Cart */}
            <button onClick={handleAddToCart} className="btn-primary" style={{
              width: '100%', padding: '16px 32px', fontSize: 16, marginBottom: 12,
              background: addedFeedback ? '#16A34A' : undefined,
            }}>
              {addedFeedback ? (
                <><Check size={18} /> Added to Cart!</>
              ) : (
                <><ShoppingBag size={18} /> Add to Cart</>
              )}
            </button>

            {/* COA Download */}
            <button style={{
              width: '100%', padding: '14px 28px', borderRadius: 10,
              border: '2px solid var(--primary)', background: 'transparent',
              color: 'var(--primary)', fontSize: 14, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'all 0.2s', cursor: 'pointer', marginBottom: 32,
            }}>
              <Download size={16} /> Download Certificate of Analysis (COA)
            </button>

            {/* Benefits */}
            <div style={{
              background: '#FAFAF8', padding: 24, borderRadius: 14,
              border: '1px solid var(--border-light)',
            }}>
              <h3 className="montserrat" style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>
                Key Benefits
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {product.benefits.map((benefit, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--text-secondary)' }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                      background: 'var(--primary-light)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Check size={12} color="var(--primary)" />
                    </div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Detailed Description */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          style={{
            marginTop: 56, padding: 32, background: '#FAFAF8',
            borderRadius: 16, border: '1px solid var(--border-light)',
          }}>
          <h2 className="montserrat" style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>
            About {product.name}
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.9, maxWidth: 800 }}>
            {product.description}
          </p>
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: 64 }}>
            <h2 className="section-heading">Related Products</h2>
            <p className="section-desc">More from {product.category}</p>
            <div className="product-grid">
              {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}

        {/* Back to Shop */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Link to="/shop" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 14, fontWeight: 700, color: 'var(--primary)',
          }}>
            <ArrowLeft size={16} /> Back to All Products
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          [style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </div>
  );
};

export default ProductDetails;
