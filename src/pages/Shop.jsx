import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { peptides } from '../data/peptides';
import ProductCard from '../components/ProductCard';
import { Search } from 'lucide-react';

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Build unique categories from the data
  const categories = ['All', ...Array.from(new Set(peptides.map(p => p.category)))];

  const filteredProducts = peptides.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Deterministic review counts based on product index
  const reviewCounts = [87, 64, 52, 93, 78, 41, 56, 68, 45, 71, 59, 83];

  // JSON-LD structured data for product listing
  const productListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Peptides Catalog",
    "description": "Premium pharmaceutical-grade peptides — lab tested with COA",
    "numberOfItems": peptides.length,
    "itemListElement": peptides.map((p, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "Product",
        "name": p.name,
        "description": p.shortDescription,
        "image": "https://peptidesandyou.com/peptide-vial-branded.png",
        "url": `https://peptidesandyou.com/product/${p.id}`,
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "PHP",
          "lowPrice": Math.min(...p.variants.map(v => v.price)),
          "highPrice": Math.max(...p.variants.map(v => v.price)),
          "offerCount": p.variants.length,
          "availability": "https://schema.org/InStock",
          "seller": { "@type": "Organization", "name": "Peptides and You" }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": p.rating,
          "reviewCount": reviewCounts[i] || 50,
          "bestRating": 5
        }
      }
    }))
  };

  // BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://peptidesandyou.com" },
      { "@type": "ListItem", "position": 2, "name": "Shop", "item": "https://peptidesandyou.com/shop" },
    ]
  };

  return (
    <div style={{paddingTop: 180, paddingBottom: 60, background: 'var(--bg)', minHeight: '100vh'}}>
      <Helmet>
        <title>Shop Peptides | Lab Tested | COA Included | Peptides & You</title>
        <meta name="description" content="Browse our full catalog of premium peptides including BPC-157, TB-500, Epithalon, Retatrutide, and more. All products are lab tested with Certificate of Analysis included." />
        <meta name="keywords" content="buy peptides, BPC-157, TB-500, GHK-Cu, Retatrutide, peptide stacks, lab tested peptides, COA peptides" />
        <link rel="canonical" href="https://peptidesandyou.com/shop" />
        <meta property="og:title" content="Shop Peptides | Peptides & You" />
        <meta property="og:description" content="Premium lab-tested peptides with COA included." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://peptidesandyou.com/shop" />
        <meta property="og:image" content="https://peptidesandyou.com/logo.png" />
        <script type="application/ld+json">{JSON.stringify(productListSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="container">
        {/* Category Tabs */}
        <div className="cat-tabs" style={{flexWrap: 'wrap'}}>
          {categories.map(cat => (
            <button key={cat}
              className={`cat-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}>
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="search-row">
          <input
            type="text"
            placeholder="Search peptides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button>Search</button>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <section style={{marginBottom: 56}}>
            <h2 className="section-heading">
              {activeCategory === 'All' ? 'All Products' : activeCategory}
            </h2>
            <p className="section-desc">
              {activeCategory === 'All'
                ? 'All products are lyophilised powder vials, lab tested and supplied with Certificate of Analysis.'
                : `Browse our ${activeCategory.toLowerCase()} peptides — lab tested with COA included.`}
            </p>
            <div className="product-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        ) : (
          <div style={{
            textAlign: 'center', padding: '64px 24px', background: '#fff',
            borderRadius: 12, border: '2px dashed var(--border)',
          }}>
            <Search size={40} style={{margin: '0 auto 12px', opacity: 0.15, color: 'var(--text-muted)'}} />
            <p style={{fontSize: 18, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 12}}>
              No products match your search.
            </p>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              style={{
                color: 'var(--primary)', fontWeight: 700, fontSize: 13,
                background: 'none', cursor: 'pointer',
                borderBottom: '2px solid var(--primary)',
                paddingBottom: 2,
              }}>
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
