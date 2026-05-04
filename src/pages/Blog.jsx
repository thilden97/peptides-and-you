import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, BookOpen, Calendar, Search } from 'lucide-react';
import { getPublishedPosts, blogCategories } from '../data/blogPosts';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.45, ease: 'easeOut' } }),
};

const Blog = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const posts = getPublishedPosts();
  const categories = ['All', ...blogCategories];

  const filteredPosts = posts.filter(p => {
    const matchesCat = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);

  // Blog listing schema
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Peptides & You Blog",
    "description": "Expert articles on peptide science, research protocols, and product guides.",
    "url": "https://peptidesandyou.com/blog",
    "publisher": { "@type": "Organization", "name": "Peptides and You" },
    "blogPost": posts.map(p => ({
      "@type": "BlogPosting",
      "headline": p.title,
      "description": p.excerpt,
      "datePublished": p.date,
      "url": `https://peptidesandyou.com/blog/${p.slug}`,
      "author": { "@type": "Organization", "name": "Peptides and You" },
    })),
  };

  return (
    <div style={{paddingTop: 180, paddingBottom: 80, background: 'var(--bg)', minHeight: '100vh'}}>
      <Helmet>
        <title>Blog & Research | Peptide Science, Protocols & Guides | Peptides & You</title>
        <meta name="description" content="Expert articles on peptide science, research protocols, dosing guides, and product comparisons. BPC-157, Retatrutide, GHK-Cu, CJC-1295 and more." />
        <link rel="canonical" href="https://peptidesandyou.com/blog" />
        <meta property="og:title" content="Blog & Research | Peptides & You" />
        <meta property="og:description" content="Expert peptide research articles, protocols, and guides." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://peptidesandyou.com/blog" />
        <meta property="og:image" content="https://peptidesandyou.com/logo.png" />
        <meta name="geo.region" content="PH-00" />
        <script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
      </Helmet>

      <div className="container" style={{maxWidth: 1000}}>
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} style={{textAlign: 'center', marginBottom: 40}}>
          <div className="coa-badge" style={{marginBottom: 16}}>
            <BookOpen size={14} /> Blog & Research
          </div>
          <h1 className="montserrat" style={{fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: 'var(--text)', marginBottom: 12}}>
            Science-Backed <span style={{
              background: 'var(--brand-gradient)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Peptide Research</span>
          </h1>
          <p style={{fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 560, margin: '0 auto'}}>
            In-depth articles, dosing protocols, and research breakdowns — written for practitioners and clients who want to understand what they're using.
          </p>
        </motion.div>

        {/* Categories + Search */}
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 28}}>
          <div className="cat-tabs" style={{flexWrap: 'wrap'}}>
            {categories.map(cat => (
              <button key={cat}
                className={`cat-tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
                style={{fontSize: 11, padding: '6px 14px'}}>
                {cat}
              </button>
            ))}
          </div>
          <div style={{position: 'relative'}}>
            <input type="text" placeholder="Search articles..." value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: 200, padding: '8px 12px 8px 32px', border: '1.5px solid var(--border)',
                borderRadius: 7, fontSize: 12, outline: 'none', fontFamily: 'inherit', background: '#fff',
              }} />
            <Search size={13} style={{position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)'}} />
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div style={{textAlign: 'center', padding: 60, background: '#fff', borderRadius: 12, border: '2px dashed var(--border)'}}>
            <p style={{fontSize: 16, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 12}}>No articles match your search.</p>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              style={{color: 'var(--primary)', fontWeight: 700, fontSize: 13, background: 'none', cursor: 'pointer'}}>
              Reset filters
            </button>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Link to={`/blog/${featuredPost.slug}`} style={{textDecoration: 'none'}} className="blog-card-link">
                  <div className="blog-featured-card">
                    <div style={{display: 'flex', gap: 28, alignItems: 'flex-start'}}>
                      <img src={featuredPost.featuredImage} alt={featuredPost.title} style={{
                        width: 180, height: 180, objectFit: 'contain', borderRadius: 12,
                        background: 'var(--primary-light)', padding: 16, flexShrink: 0,
                      }} />
                      <div style={{flex: 1}}>
                        <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12}}>
                          <span className="blog-category-badge">{featuredPost.category}</span>
                          <span style={{fontSize: 12, color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: 4}}>
                            <Clock size={12} /> {featuredPost.readTime}
                          </span>
                          <span style={{fontSize: 12, color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: 4}}>
                            <Calendar size={12} /> {new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                        <h2 className="montserrat" style={{fontSize: 24, fontWeight: 700, color: 'var(--text)', lineHeight: 1.3, marginBottom: 10}}>
                          {featuredPost.title}
                        </h2>
                        <p style={{fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 14}}>
                          {featuredPost.excerpt}
                        </p>
                        <span className="blog-read-more">
                          Read Article <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Post Grid */}
            {otherPosts.length > 0 && (
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20, marginTop: 24}}>
                {otherPosts.map((post, i) => (
                  <motion.div key={post.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                    <Link to={`/blog/${post.slug}`} style={{textDecoration: 'none'}} className="blog-card-link">
                      <div className="blog-card">
                        <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12}}>
                          <span className="blog-category-badge">{post.category}</span>
                          <span style={{fontSize: 11, color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: 4}}>
                            <Clock size={11} /> {post.readTime}
                          </span>
                        </div>
                        <h3 style={{fontSize: 17, fontWeight: 700, color: 'var(--text)', lineHeight: 1.35, marginBottom: 8}}>
                          {post.title}
                        </h3>
                        <p style={{
                          fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6,
                          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                          marginBottom: 14,
                        }}>
                          {post.excerpt}
                        </p>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                          <span style={{fontSize: 12, color: 'var(--text-light)'}}>
                            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                          <span className="blog-read-more">
                            Read <ArrowRight size={12} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Blog;
