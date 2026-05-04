import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, User, Tag, ArrowRight } from 'lucide-react';
import { getBlogPostBySlug, getPublishedPosts } from '../data/blogPosts';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);
  const allPosts = getPublishedPosts();

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!post) return (
    <div style={{paddingTop: 240, textAlign: 'center', minHeight: '60vh'}}>
      <h1 style={{fontSize: 24, fontWeight: 700, color: 'var(--text-secondary)'}}>Post Not Found</h1>
      <Link to="/blog" className="btn-primary" style={{marginTop: 20, display: 'inline-flex', padding: '12px 24px'}}>
        <ArrowLeft size={16} /> Back to Blog
      </Link>
    </div>
  );

  const relatedPosts = allPosts
    .filter(p => p.id !== post.id)
    .filter(p => p.tags.some(t => post.tags.includes(t)) || p.category === post.category)
    .slice(0, 3);

  // Article schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": `https://peptidesandyou.com${post.featuredImage}`,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": { "@type": "Organization", "name": "Peptides and You" },
    "publisher": { "@type": "Organization", "name": "Peptides and You", "logo": { "@type": "ImageObject", "url": "https://peptidesandyou.com/logo.jpg" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://peptidesandyou.com/blog/${post.slug}` },
    "keywords": post.seoKeywords.join(', '),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://peptidesandyou.com" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://peptidesandyou.com/blog" },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://peptidesandyou.com/blog/${post.slug}` },
    ]
  };

  // Convert markdown-ish content to paragraphs
  const renderContent = (content) => {
    const lines = content.split('\n');
    const elements = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i].trim();

      if (line.startsWith('## ')) {
        elements.push(<h2 key={i} style={{fontSize: 24, fontWeight: 700, color: 'var(--text)', margin: '36px 0 16px', lineHeight: 1.3}}>{line.replace('## ', '')}</h2>);
      } else if (line.startsWith('### ')) {
        elements.push(<h3 key={i} style={{fontSize: 19, fontWeight: 700, color: 'var(--text)', margin: '28px 0 12px'}}>{line.replace('### ', '')}</h3>);
      } else if (line.startsWith('| ')) {
        // Table — collect all rows
        const tableRows = [];
        let j = i;
        while (j < lines.length && lines[j].trim().startsWith('|')) {
          if (!lines[j].trim().startsWith('|---')) {
            const cells = lines[j].trim().split('|').filter(c => c.trim());
            tableRows.push(cells.map(c => c.trim()));
          }
          j++;
        }
        elements.push(
          <div key={i} style={{overflowX: 'auto', margin: '20px 0'}}>
            <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 13}}>
              <thead>
                <tr>{tableRows[0]?.map((c, ci) => <th key={ci} style={{
                  padding: '10px 14px', background: 'var(--primary-light)', color: 'var(--primary)',
                  fontWeight: 700, textAlign: 'left', borderBottom: '2px solid var(--border)', fontSize: 12,
                  textTransform: 'uppercase', letterSpacing: '0.04em',
                }}>{c}</th>)}</tr>
              </thead>
              <tbody>
                {tableRows.slice(1).map((row, ri) => (
                  <tr key={ri}>
                    {row.map((c, ci) => <td key={ci} style={{
                      padding: '10px 14px', borderBottom: '1px solid var(--border-light)',
                      color: 'var(--text-secondary)',
                    }}>{c}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        i = j - 1;
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        const items = [];
        let j = i;
        while (j < lines.length && (lines[j].trim().startsWith('- ') || lines[j].trim().startsWith('* '))) {
          items.push(lines[j].trim().replace(/^[-*] /, ''));
          j++;
        }
        elements.push(
          <ul key={i} style={{paddingLeft: 20, margin: '12px 0 16px'}}>
            {items.map((item, ii) => (
              <li key={ii} style={{fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 4}}>
                {renderInline(item)}
              </li>
            ))}
          </ul>
        );
        i = j - 1;
      } else if (line.startsWith('1. ') || /^\d+\./.test(line)) {
        const items = [];
        let j = i;
        while (j < lines.length && /^\d+\./.test(lines[j].trim())) {
          items.push(lines[j].trim().replace(/^\d+\.\s*/, ''));
          j++;
        }
        elements.push(
          <ol key={i} style={{paddingLeft: 20, margin: '12px 0 16px'}}>
            {items.map((item, ii) => (
              <li key={ii} style={{fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 4}}>
                {renderInline(item)}
              </li>
            ))}
          </ol>
        );
        i = j - 1;
      } else if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
        elements.push(<p key={i} style={{fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic', margin: '20px 0 8px'}}>{line.replace(/\*/g, '')}</p>);
      } else if (line.length > 0) {
        elements.push(<p key={i} style={{fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: 16}}>{renderInline(line)}</p>);
      }

      i++;
    }
    return elements;
  };

  const renderInline = (text) => {
    // Bold
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} style={{color: 'var(--text)', fontWeight: 600}}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div style={{paddingTop: 180, paddingBottom: 80, background: 'var(--bg)', minHeight: '100vh'}}>
      <Helmet>
        <title>{post.title} | Peptides & You Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.seoKeywords.join(', ')} />
        <link rel="canonical" href={`https://peptidesandyou.com/blog/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://peptidesandyou.com/blog/${post.slug}`} />
        <meta property="og:image" content={`https://peptidesandyou.com${post.featuredImage}`} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:section" content={post.category} />
        <meta name="geo.region" content="PH-00" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="container" style={{maxWidth: 780}}>
        <Link to="/blog" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24,
          color: 'var(--text-secondary)', fontWeight: 700, fontSize: 13,
        }}>
          <ArrowLeft size={15} /> Back to Blog
        </Link>

        <motion.article initial="hidden" animate="visible" variants={fadeUp}>
          {/* Header */}
          <div style={{marginBottom: 32}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 16}}>
              <span className="blog-category-badge">{post.category}</span>
              <span style={{fontSize: 12, color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: 4}}>
                <Clock size={12} /> {post.readTime}
              </span>
              <span style={{fontSize: 12, color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: 4}}>
                <Calendar size={12} /> {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>

            <h1 className="montserrat" style={{fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.2, marginBottom: 16}}>
              {post.title}
            </h1>

            <p style={{fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.7, fontStyle: 'italic'}}>
              {post.excerpt}
            </p>
          </div>

          {/* Content */}
          <div style={{
            background: '#fff', padding: 'clamp(24px, 4vw, 48px)', borderRadius: 16,
            border: '1px solid var(--border)',
          }}>
            {renderContent(post.content)}
          </div>

          {/* Tags */}
          <div style={{display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginTop: 24}}>
            <Tag size={14} color="var(--text-muted)" />
            {post.tags.map(tag => (
              <span key={tag} style={{
                fontSize: 11, fontWeight: 600, color: 'var(--primary)',
                background: 'var(--primary-light)', padding: '3px 10px', borderRadius: 5,
              }}>{tag}</span>
            ))}
          </div>
        </motion.article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section style={{marginTop: 56}}>
            <h2 className="montserrat" style={{fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 20}}>
              Related Articles
            </h2>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16}}>
              {relatedPosts.map(rp => (
                <Link key={rp.id} to={`/blog/${rp.slug}`} style={{textDecoration: 'none'}} className="blog-card-link">
                  <div className="blog-card">
                    <span className="blog-category-badge" style={{marginBottom: 10, display: 'inline-block'}}>{rp.category}</span>
                    <h3 style={{fontSize: 15, fontWeight: 700, color: 'var(--text)', lineHeight: 1.4, marginBottom: 8}}>{rp.title}</h3>
                    <span style={{fontSize: 12, color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: 4}}>
                      <Clock size={11} /> {rp.readTime}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default BlogPost;
