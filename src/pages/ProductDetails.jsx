import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { peptides } from '../data/peptides';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, CheckCircle2, ShieldCheck, FileText, Star, Database } from 'lucide-react';

const Stars = ({ rating = 5 }) => (
  <div className="stars" style={{marginBottom: 6}}>
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={15}
        fill={i < rating ? '#1F6FB2' : 'transparent'}
        color={i < rating ? '#1F6FB2' : '#D4D4D8'}
        strokeWidth={1.5} />
    ))}
  </div>
);

const formatPrice = (price) => `₱${price.toLocaleString()}`;

const ProductDetails = () => {
  const { id } = useParams();
  const product = peptides.find(p => p.id === id);
  const [selectedVariant, setSelectedVariant] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); setSelectedVariant(0); }, [id]);

  if (!product) return (
    <div style={{paddingTop: 240, textAlign: 'center', fontSize: 20, fontWeight: 700, color: 'var(--text-secondary)', minHeight: '60vh'}}>
      Product not found.
    </div>
  );

  const currentVariant = product.variants[selectedVariant];

  // Product JSON-LD
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": "https://peptidesandyou.com/peptide-vial-branded.png",
    "sku": product.id,
    "brand": { "@type": "Brand", "name": "Peptides and You" },
    "url": `https://peptidesandyou.com/product/${product.id}`,
    "offers": product.variants.map(v => ({
      "@type": "Offer",
      "priceCurrency": "PHP",
      "price": v.price,
      "availability": "https://schema.org/InStock",
      "url": `https://peptidesandyou.com/product/${product.id}`,
      "seller": { "@type": "Organization", "name": "Peptides and You" },
    })),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": 47,
      "bestRating": 5
    }
  };

  // BreadcrumbList JSON-LD
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://peptidesandyou.com" },
      { "@type": "ListItem", "position": 2, "name": "Shop", "item": "https://peptidesandyou.com/shop" },
      { "@type": "ListItem", "position": 3, "name": product.name, "item": `https://peptidesandyou.com/product/${product.id}` },
    ]
  };

  // FAQ JSON-LD per product
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is ${product.name}?`,
        "acceptedAnswer": { "@type": "Answer", "text": product.description }
      },
      {
        "@type": "Question",
        "name": `What are the benefits of ${product.name}?`,
        "acceptedAnswer": { "@type": "Answer", "text": product.benefits.join('. ') + '.' }
      },
      {
        "@type": "Question",
        "name": `How much does ${product.name} cost?`,
        "acceptedAnswer": { "@type": "Answer", "text": `${product.name} is available in ${product.variants.length} size${product.variants.length > 1 ? 's' : ''}: ${product.variants.map(v => `${v.size} at ₱${v.price.toLocaleString()}`).join(', ')}.` }
      },
      {
        "@type": "Question",
        "name": `Is ${product.name} lab tested?`,
        "acceptedAnswer": { "@type": "Answer", "text": `Yes. All Peptides & You products, including ${product.name}, are third-party lab tested and supplied with a Certificate of Analysis (COA) to verify identity and purity.` }
      }
    ]
  };

  return (
    <div style={{paddingTop: 180, paddingBottom: 60, background: 'var(--bg)', minHeight: '100vh'}}>
      <Helmet>
        <title>{product.name} | Lab Tested Peptide | Buy Online | Peptides & You</title>
        <meta name="description" content={`${product.shortDescription} Lab tested with COA included. Fast delivery.`} />
        <meta name="keywords" content={product.seoKeywords.join(', ') + ', buy peptides, lab tested peptides'} />
        <link rel="canonical" href={`https://peptidesandyou.com/product/${product.id}`} />
        <meta property="og:title" content={`${product.name} | Peptides & You`} />
        <meta property="og:description" content={product.shortDescription} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`https://peptidesandyou.com/product/${product.id}`} />
        <meta property="og:image" content="https://peptidesandyou.com/peptide-vial-branded.png" />
        <meta property="product:price:amount" content={currentVariant.price} />
        <meta property="product:price:currency" content="PHP" />
        <meta name="geo.region" content="PH-00" />
        <meta name="geo.placename" content="Manila" />
        <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="container">
        <Link to="/shop" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24,
          color: 'var(--text-secondary)', fontWeight: 700, fontSize: 13, letterSpacing: '0.04em',
        }}>
          <ArrowLeft size={15} /> Back to Catalog
        </Link>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'flex-start'}}>
          {/* Image — branded vial with logo */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{position: 'sticky', top: 200}}>
            <div style={{
              background: '#fff', aspectRatio: '1', borderRadius: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid var(--border)', position: 'relative',
              overflow: 'hidden',
            }}>
              <img src="/peptide-vial-branded.png" alt={`${product.name} peptide vial — Peptides & You`} style={{
                width: '70%', height: '70%', objectFit: 'contain',
              }} />

              {/* Logo overlay */}
              <img
                src="/logo.png"
                alt=""
                aria-hidden="true"
                style={{
                  position: 'absolute', top: 16, left: 16,
                  height: 36, width: 'auto', objectFit: 'contain',
                  opacity: 0.8,
                }}
              />

              {currentVariant && (
                <div style={{
                  position: 'absolute', top: 16, right: 16,
                  background: 'var(--primary-light)', padding: '5px 12px', borderRadius: 6,
                  fontSize: 12, fontWeight: 700, color: 'var(--primary)',
                  border: '1px solid rgba(31,111,178,0.15)',
                }}>
                  {currentVariant.size}
                </div>
              )}

              <div style={{
                position: 'absolute', bottom: 16, right: 16,
                background: '#fff', padding: '10px 14px', borderRadius: 10,
                boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <div style={{width: 32, height: 32, borderRadius: 8, background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <ShieldCheck size={17} color="#16A34A" />
                </div>
                <div>
                  <p style={{fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)'}}>Status</p>
                  <p style={{fontSize: 13, fontWeight: 700, color: 'var(--text)'}}>Lab Tested</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}>
            {/* Category */}
            <span style={{
              display: 'inline-block', padding: '4px 12px', borderRadius: 6,
              background: 'var(--primary-light)', border: '1px solid rgba(31,111,178,0.15)',
              fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
              color: 'var(--primary)', marginBottom: 12,
            }}>
              {product.category}
            </span>

            <h1 className="montserrat" style={{fontSize: 40, fontWeight: 700, color: 'var(--text)', marginBottom: 10, letterSpacing: '0.01em'}}>
              {product.name}
            </h1>

            <Stars rating={product.rating} />

            {/* Variant Selector */}
            {product.variants.length > 1 && (
              <div style={{margin: '16px 0 8px'}}>
                <p style={{fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8}}>
                  Select Size
                </p>
                <div style={{display: 'flex', gap: 8, flexWrap: 'wrap'}}>
                  {product.variants.map((v, i) => (
                    <button key={i}
                      onClick={() => setSelectedVariant(i)}
                      style={{
                        padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600,
                        cursor: 'pointer', transition: 'all 0.2s',
                        background: selectedVariant === i ? 'var(--primary)' : '#fff',
                        color: selectedVariant === i ? '#fff' : 'var(--text)',
                        border: selectedVariant === i ? '2px solid var(--primary)' : '2px solid var(--border)',
                      }}
                    >
                      {v.size} — {formatPrice(v.price)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div style={{display: 'flex', alignItems: 'center', gap: 16, margin: '16px 0 24px'}}>
              <p className="montserrat" style={{fontSize: 28, fontWeight: 700, color: 'var(--primary)'}}>
                {formatPrice(currentVariant.price)}
              </p>
              <div style={{height: 28, width: 1, background: 'var(--border)'}} />
              <p style={{display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 700, color: '#16A34A'}}>
                <CheckCircle2 size={15} /> In Stock
              </p>
            </div>

            <p style={{fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 28}}>
              {product.description}
            </p>

            {/* Benefits */}
            <div style={{background: '#fff', padding: 24, borderRadius: 12, border: '1px solid var(--border)', marginBottom: 24}}>
              <h3 className="montserrat" style={{fontSize: 15, fontWeight: 700, marginBottom: 14, color: 'var(--text)'}}>Key Benefits</h3>
              <ul style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, listStyle: 'none', padding: 0}}>
                {product.benefits.map((benefit, i) => (
                  <li key={i} style={{display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)'}}>
                    <CheckCircle2 size={15} color="var(--accent)" style={{marginTop: 2, flexShrink: 0}} />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div style={{display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 360, marginBottom: 28}}>
              <button className="btn-primary" style={{padding: '14px 28px', fontSize: 15, width: '100%'}}>
                <ShoppingCart size={18} /> Inquire Now
              </button>
              <button className="btn-outline" style={{padding: '12px 28px', fontSize: 14, width: '100%'}}>
                <FileText size={18} /> Download COA
              </button>
            </div>

            {/* Quick Specs */}
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12}}>
              {[
                { label: 'Format', value: 'Lyophilised' },
                { label: 'Lab Tested', value: '✓ Verified' },
                { label: 'COA', value: 'Included' },
              ].map(spec => (
                <div key={spec.label} style={{
                  background: '#fff', border: '1px solid var(--border)',
                  padding: '16px 12px', borderRadius: 10, textAlign: 'center',
                }}>
                  <span style={{display: 'block', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: 4}}>
                    {spec.label}
                  </span>
                  <span className="montserrat" style={{fontSize: 17, fontWeight: 700, color: 'var(--text)'}}>{spec.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scientific Section */}
        <section style={{marginTop: 64, paddingTop: 40, borderTop: '1px solid var(--border)'}}>
          <div style={{display: 'grid', gridTemplateColumns: '280px 1fr', gap: 40}}>
            <div>
              <div style={{
                width: 44, height: 44, borderRadius: 10, background: 'var(--primary-light)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14,
              }}>
                <Database size={22} color="var(--primary)" />
              </div>
              <h2 className="montserrat" style={{fontSize: 22, fontWeight: 700, marginBottom: 8, color: 'var(--text)'}}>About This Peptide</h2>
              <p style={{fontSize: 13, color: 'var(--text-muted)', fontWeight: 500}}>
                Detailed information about <strong style={{color: 'var(--text-secondary)'}}>{product.name}</strong>.
              </p>
            </div>
            <div style={{fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8}}>
              <p style={{marginBottom: 16}}>
                <strong>{product.name}</strong> is supplied as a lyophilised powder vial and is lab tested to verify identity and purity.
                Every batch comes with a Certificate of Analysis (COA) so you can verify exactly what you're getting.
              </p>
              <p>
                This product falls under the <strong>{product.category}</strong> category.
                For detailed usage information, dosing protocols, and stacking recommendations, please consult with a qualified healthcare professional.
                All products are for research and personal use only.
              </p>
            </div>
          </div>
        </section>

        {/* Responsive override */}
        <style>{`
          @media (max-width: 768px) {
            [style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
            [style*="grid-template-columns: 280px 1fr"] { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default ProductDetails;
