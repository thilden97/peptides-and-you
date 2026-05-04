import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { peptides } from '../data/peptides';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, FlaskConical, FileCheck, ShieldCheck, Sparkles, ChevronDown, HelpCircle, Truck, Brain, Dumbbell, Scale, Syringe, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' } }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i = 0) => ({ opacity: 1, scale: 1, transition: { delay: i * 0.08, duration: 0.45, ease: 'easeOut' } }),
};

/* FAQ Accordion Item */
const FAQItem = ({ question, answer, isOpen, onClick, index }) => (
  <motion.div
    initial="hidden" whileInView="visible" viewport={{ once: true }}
    variants={fadeUp} custom={index}
  >
    <button
      onClick={onClick}
      className="faq-item"
      style={{
        width: '100%', textAlign: 'left', background: isOpen ? 'var(--primary-light)' : '#fff',
        border: isOpen ? '1.5px solid rgba(184,134,11,0.2)' : '1.5px solid var(--border-light)',
        borderRadius: 12, padding: '18px 22px', cursor: 'pointer',
        transition: 'all 0.3s ease', marginBottom: 8,
      }}
    >
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16}}>
        <span className="montserrat" style={{
          fontSize: 15, fontWeight: 700, color: 'var(--text)', lineHeight: 1.4,
        }}>{question}</span>
        <ChevronDown size={18} color="var(--primary)" style={{
          flexShrink: 0, transition: 'transform 0.3s ease',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        }} />
      </div>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0, marginTop: isOpen ? 12 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ overflow: 'hidden' }}
      >
        <p style={{fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8}}>
          {answer}
        </p>
      </motion.div>
    </button>
  </motion.div>
);

const Home = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const featuredProducts = peptides.slice(0, 6);
  const [openFAQ, setOpenFAQ] = useState(0);

  const categories = [
    { icon: Dumbbell, name: 'Healing & Recovery', desc: 'BPC-157, TB-500, Wolverine Stack' },
    { icon: Scale, name: 'Weight Management', desc: 'Retatrutide, AOD-9604, HGH Fragment' },
    { icon: Sparkles, name: 'Anti-Aging & Skin', desc: 'GHK-Cu, Epithalon' },
    { icon: Brain, name: 'Cognitive Enhancement', desc: 'Semax, Selank' },
    { icon: Syringe, name: 'Growth Hormone', desc: 'CJC-1295, Ipamorelin' },
  ];

  const faqs = [
    {
      q: "What are peptides and how do they work?",
      a: "Peptides are short chains of amino acids that act as signaling molecules in your body. They regulate healing, hormone production, immune function, and cognitive performance. Supplemental peptides amplify specific biological processes — for example, BPC-157 accelerates tissue repair, while Ipamorelin stimulates natural growth hormone release."
    },
    {
      q: "Are your products lab tested?",
      a: "Yes — every single product. All Peptides & You products are third-party lab tested by independent laboratories for identity (mass spectrometry) and purity (HPLC). A Certificate of Analysis (COA) is supplied with every batch, so you can verify exactly what you're getting."
    },
    {
      q: "What format are the products sold in?",
      a: "All products are sold as lyophilised (freeze-dried) powder vials. This is the pharmaceutical-grade standard for peptide storage, ensuring maximum stability and shelf life. Products should be stored in a cool, dry place and refrigerated after reconstitution."
    },
    {
      q: "Do you ship to the Philippines and internationally?",
      a: "Yes. We offer secure and discreet shipping throughout the Philippines and internationally. All orders are packaged for privacy and shipped via tracked courier services. Delivery times vary by location."
    },
    {
      q: "How do I choose the right peptide for my goals?",
      a: "Take our free 60-second Peptide Quiz — it asks about your goals, specific concerns, experience level, and budget, then matches you to the best products. You can also browse our blog for in-depth research articles on each compound, or contact us directly for guidance."
    },
    {
      q: "What is a Certificate of Analysis (COA)?",
      a: "A COA is a document produced by an independent laboratory that verifies the identity and purity of a compound. It typically includes HPLC purity testing (≥98% for pharmaceutical grade), mass spectrometry identity confirmation, and endotoxin testing. We include a COA with every order."
    },
    {
      q: "Can I stack multiple peptides together?",
      a: "Yes — many peptides are designed to work synergistically. Our most popular stack is the Wolverine Stack (BPC-157 + TB-500) for recovery, and the CJC-1295 + Ipamorelin combo for growth hormone optimisation. Read our stacking guide on the blog for detailed protocols."
    },
    {
      q: "How do I place an order?",
      a: "Simply browse our products, select the variant you need, and click 'Order via WhatsApp'. You'll be connected directly with our team who will guide you through the order and payment process. It's fast, personal, and secure."
    }
  ];

  const features = [
    {
      icon: FileCheck,
      title: 'Lab Tested & COA Included',
      desc: 'Every product is third-party lab tested. Certificate of Analysis supplied with every batch — transparency you can verify.',
    },
    {
      icon: FlaskConical,
      title: 'Pharmaceutical-Grade Quality',
      desc: 'All products are lyophilised powder vials, manufactured to pharmaceutical standards. Consistent purity across every product.',
    },
    {
      icon: ShieldCheck,
      title: 'Trusted & Verified',
      desc: 'Trusted by practitioners and clients across the Philippines and Southeast Asia. Secure, discreet shipping on every order.',
    },
    {
      icon: Truck,
      title: 'Fast PH Shipping',
      desc: 'Orders processed within 24 hours. Nationwide delivery within 3-5 business days via tracked courier services.',
    },
  ];

  // Organization JSON-LD
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Peptides and You",
    "url": "https://peptidesandyou.com",
    "logo": "https://peptidesandyou.com/logo.jpg",
    "description": "Premium pharmaceutical-grade peptides. Lab tested with Certificate of Analysis included.",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "info@peptidesandyou.com",
      "areaServed": "PH",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://www.instagram.com/peptidesandyou",
      "https://www.facebook.com/peptidesandyou"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Peptides and You",
    "url": "https://peptidesandyou.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://peptidesandyou.com/shop?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://peptidesandyou.com" }
    ]
  };

  return (
    <div style={{background: 'var(--bg)'}}>
      <Helmet>
        <title>Peptides & You | Premium Pharmaceutical-Grade Peptides | Lab Tested | COA Included</title>
        <meta name="description" content="Premium pharmaceutical-grade peptides. BPC-157, TB-500, GHK-Cu, Epithalon, Retatrutide and more. Lab tested with Certificate of Analysis. Fast delivery Philippines." />
        <meta name="keywords" content="peptides, buy peptides, BPC-157, TB-500, GHK-Cu, peptide supplier, pharmaceutical grade peptides, COA peptides, lab tested peptides, peptides Philippines" />
        <link rel="canonical" href="https://peptidesandyou.com" />
        <meta property="og:title" content="Peptides & You | Premium Pharmaceutical-Grade Peptides" />
        <meta property="og:description" content="Lab tested peptides with COA included. BPC-157, TB-500, GHK-Cu, Retatrutide and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://peptidesandyou.com" />
        <meta property="og:site_name" content="Peptides and You" />
        <meta property="og:locale" content="en_PH" />
        <meta property="og:image" content="https://peptidesandyou.com/logo.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Peptides & You | Premium Pharmaceutical-Grade Peptides" />
        <meta name="twitter:image" content="https://peptidesandyou.com/logo.jpg" />
        <meta name="geo.region" content="PH-00" />
        <meta name="geo.placename" content="Manila" />
        <meta name="geo.position" content="14.5995;120.9842" />
        <meta name="ICBM" content="14.5995, 120.9842" />
        <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Hero />

      {/* Categories */}
      <section style={{ padding: '72px 0', background: '#FAFAF8' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="coa-badge" style={{ margin: '0 auto 16px' }}>
              <FlaskConical size={13} /> Browse by Category
            </div>
            <h2 className="montserrat" style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 700 }}>
              Find Your <span style={{
                background: 'var(--brand-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>Perfect Peptide</span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
            {categories.map((cat, i) => (
              <motion.div key={cat.name} initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}>
                <Link to="/shop" className="feature-card" style={{
                  display: 'block', background: '#fff', padding: '28px 20px',
                  borderRadius: 14, border: '1px solid var(--border-light)',
                  textAlign: 'center', textDecoration: 'none', transition: 'all 0.3s',
                }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 14, background: 'var(--primary-light)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 14px', transition: 'all 0.3s',
                  }}>
                    <cat.icon size={22} color="var(--primary)" />
                  </div>
                  <h3 className="montserrat" style={{ fontSize: 13, fontWeight: 700, marginBottom: 4, color: 'var(--text)' }}>
                    {cat.name}
                  </h3>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5 }}>{cat.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{padding: '72px 0'}}>
        <div className="container">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 32}}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="section-heading" style={{fontSize: 28}}>Featured Peptides</h2>
              <p style={{color: 'var(--text-secondary)', fontSize: 14, maxWidth: 450, lineHeight: 1.6}}>
                Our most popular lab-tested compounds, trusted by practitioners and clients.
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
              <Link to="/shop" className="btn-outline btn-hover-lift" style={{padding: '10px 22px', fontSize: 13}}>
                View All Products <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
          <div className="product-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Quiz CTA Banner */}
      <section style={{padding: '56px 0', background: 'var(--accent-light)'}}>
        <div className="container">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: 28,
            }}
          >
            <div style={{maxWidth: 500}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10}}>
                <Sparkles size={18} color="var(--accent)" />
                <span style={{fontSize: 12, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.06em'}}>
                  Personalized Recommendation
                </span>
              </div>
              <h2 className="montserrat" style={{fontSize: 26, fontWeight: 700, color: 'var(--text)', marginBottom: 8}}>
                Not sure which peptide is right for you?
              </h2>
              <p style={{fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7}}>
                Take our 60-second quiz and get personalized product recommendations based on your goals, experience level, and budget.
              </p>
            </div>
            <Link to="/quiz" className="btn-primary btn-hover-lift" style={{padding: '14px 32px', fontSize: 15}}>
              Take the Quiz <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Us */}
      <section id="about" style={{padding: '72px 0', background: '#fff'}}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{textAlign: 'center', marginBottom: 40}}>
            <h2 className="section-heading" style={{fontSize: 28}}>Why Peptides & You</h2>
            <p style={{color: 'var(--text-secondary)', fontSize: 14, maxWidth: 520, margin: '0 auto', lineHeight: 1.6}}>
              Premium quality, lab-verified purity, and transparent sourcing — everything you need to trust what you're using.
            </p>
          </motion.div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20}}>
            {features.map((f, i) => (
              <motion.div key={f.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={scaleIn} custom={i}
                className="feature-card"
                style={{
                  background: 'var(--bg)', padding: '32px 28px', borderRadius: 14,
                  border: '1px solid var(--border)', transition: 'all 0.3s ease',
                  textAlign: 'center',
                }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: 'var(--primary-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 18px', transition: 'all 0.3s',
                }}>
                  <f.icon size={24} color="var(--primary)" />
                </div>
                <h3 className="montserrat" style={{fontSize: 16, fontWeight: 700, marginBottom: 8, color: 'var(--text)'}}>
                  {f.title}
                </h3>
                <p style={{fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7}}>
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ / Q&A Section ===== */}
      <section style={{padding: '72px 0', background: 'var(--bg)'}}>
        <div className="container" style={{maxWidth: 800}}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{textAlign: 'center', marginBottom: 40}}>
            <div className="coa-badge" style={{marginBottom: 16}}>
              <HelpCircle size={14} /> Frequently Asked Questions
            </div>
            <h2 className="montserrat" style={{fontSize: 28, fontWeight: 700, color: 'var(--text)', marginBottom: 10}}>
              Got Questions? We've Got <span style={{
                background: 'var(--brand-gradient)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>Answers.</span>
            </h2>
            <p style={{fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 520, margin: '0 auto'}}>
              Everything you need to know about our products, quality standards, and ordering process.
            </p>
          </motion.div>

          <div>
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                index={i}
                question={faq.q}
                answer={faq.a}
                isOpen={openFAQ === i}
                onClick={() => setOpenFAQ(openFAQ === i ? -1 : i)}
              />
            ))}
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{textAlign: 'center', marginTop: 32}}>
            <p style={{fontSize: 14, color: 'var(--text-muted)', marginBottom: 14}}>
              Still have questions?
            </p>
            <Link to="/contact" className="btn-outline btn-hover-lift" style={{padding: '12px 28px', fontSize: 14}}>
              Contact Us <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{padding: '80px 0', background: '#0F1B2D', position: 'relative', overflow: 'hidden'}}>
        <div style={{
          position: 'absolute', top: '50%', right: '10%', transform: 'translateY(-50%)',
          width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(212,168,67,0.12), transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '30%', left: '5%',
          width: 300, height: 300,
          background: 'radial-gradient(circle, rgba(184,134,11,0.1), transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{position: 'relative', zIndex: 2}}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{maxWidth: 600, margin: '0 auto', textAlign: 'center'}}>
            <h2 className="montserrat" style={{
              fontSize: 'clamp(24px, 4vw, 42px)', fontWeight: 700,
              color: '#fff', marginBottom: 16, lineHeight: 1.2,
            }}>
              Your Body Deserves{' '}
              <span style={{
                background: 'var(--brand-gradient)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>Premium Grade.</span>
            </h2>
            <p style={{fontSize: 15, color: 'rgba(255,255,255,0.55)', marginBottom: 28, lineHeight: 1.7}}>
              Every product lab tested. COA included. Trusted by practitioners across Southeast Asia.
            </p>
            <Link to="/shop" className="btn-primary btn-hover-lift" style={{padding: '14px 32px', fontSize: 15}}>
              Browse the Catalog <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          [style*="grid-template-columns: repeat(5"] { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 560px) {
          [style*="grid-template-columns: repeat(5"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
};

export default Home;
