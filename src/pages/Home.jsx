import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { peptides } from '../data/peptides';
import {
  ShieldCheck, FlaskConical, Award, Truck, ChevronRight,
  ArrowRight, Brain, Dumbbell, Sparkles, Scale, Syringe,
  FileCheck, Star, HelpCircle, ChevronDown
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' } }),
};

const Home = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const featuredProducts = peptides.slice(0, 6);
  const categories = [
    { icon: Dumbbell, name: 'Healing & Recovery', desc: 'BPC-157, TB-500, Wolverine Stack', color: '#B8860B' },
    { icon: Scale, name: 'Weight Management', desc: 'Retatrutide, AOD-9604, HGH Fragment', color: '#D4A843' },
    { icon: Sparkles, name: 'Anti-Aging & Skin', desc: 'GHK-Cu, Epithalon', color: '#9A7209' },
    { icon: Brain, name: 'Cognitive Enhancement', desc: 'Semax, Selank', color: '#B8860B' },
    { icon: Syringe, name: 'Growth Hormone', desc: 'CJC-1295, Ipamorelin', color: '#D4A843' },
  ];

  const faqs = [
    { q: 'Are your peptides lab tested?', a: 'Yes. Every product undergoes third-party laboratory testing for identity (mass spectrometry) and purity (HPLC). We include a Certificate of Analysis with every order.' },
    { q: 'What is a Certificate of Analysis (COA)?', a: 'A COA is a document produced by an independent lab that verifies the identity and purity of a compound. It typically includes HPLC purity results, mass spectrometry data, endotoxin testing, and batch identification.' },
    { q: 'How do you ship within the Philippines?', a: 'We ship nationwide via reliable courier services. Orders are processed within 24 hours and typically arrive within 3-5 business days, depending on location.' },
    { q: 'Which peptide should I start with?', a: 'It depends on your goals. Take our Peptide Quiz for a personalised recommendation. For general recovery, BPC-157 is the most popular starting point. For weight management, Retatrutide is the most powerful option available.' },
    { q: 'Do you offer international shipping?', a: 'Currently, we primarily serve the Philippines and Southeast Asia. Contact us at info@peptidesandyou.com for international shipping inquiries.' },
  ];

  // Schema
  const orgSchema = {
    "@context": "https://schema.org", "@type": "Organization",
    name: "Peptides and You", url: "https://peptidesandyou.com",
    logo: "https://peptidesandyou.com/logo.png",
    contactPoint: { "@type": "ContactPoint", email: "info@peptidesandyou.com", contactType: "customer service" },
    sameAs: [],
  };
  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqs.map(f => ({
      "@type": "Question", name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div style={{ background: '#fff' }}>
      <Helmet>
        <title>Peptides & You — Lab Tested Peptides | Philippines</title>
        <meta name="description" content="Pharmaceutical-grade peptides for healing, weight management, anti-aging, and cognitive performance. Lab tested, COA included. Serving the Philippines & Southeast Asia." />
        <link rel="canonical" href="https://peptidesandyou.com" />
        <meta property="og:title" content="Peptides & You — Lab Tested Peptides | Philippines" />
        <meta property="og:description" content="Pharmaceutical-grade peptides with Certificate of Analysis. Lab tested, fast PH shipping." />
        <meta property="og:image" content="https://peptidesandyou.com/logo.png" />
        <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
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
                  textAlign: 'center', textDecoration: 'none',
                  transition: 'all 0.3s',
                }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 14,
                    background: 'var(--primary-light)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 14px', transition: 'all 0.3s',
                  }}>
                    <cat.icon size={22} color={cat.color} />
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
      <section style={{ padding: '72px 0' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h2 className="section-heading">Featured Products</h2>
              <p className="section-desc" style={{ marginBottom: 0 }}>
                All products are lyophilised powder vials, lab tested with Certificate of Analysis included.
              </p>
            </div>
            <Link to="/shop" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 14, fontWeight: 700, color: 'var(--primary)',
            }}>
              View All <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div className="product-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Peptides & You */}
      <section style={{ padding: '72px 0', background: '#FAFAF8' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 className="montserrat" style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 700 }}>
              Why <span style={{
                background: 'var(--brand-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>Peptides & You</span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {[
              { icon: ShieldCheck, title: 'Pharmaceutical Grade', desc: 'Every product meets pharmaceutical-grade standards with ≥98% purity verified by independent labs.' },
              { icon: FileCheck, title: 'COA Every Batch', desc: 'Certificate of Analysis included with every order. Identity and purity verified by third-party labs.' },
              { icon: Award, title: 'Trusted by Practitioners', desc: 'Used by sports medicine professionals and anti-aging practitioners across the Philippines.' },
              { icon: Truck, title: 'Fast PH Shipping', desc: 'Orders processed within 24 hours. Nationwide delivery within 3-5 business days.' },
            ].map((item, i) => (
              <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i} className="feature-card" style={{
                  background: '#fff', padding: 28, borderRadius: 16,
                  border: '1px solid var(--border-light)', textAlign: 'center',
                }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 14,
                  background: 'var(--primary-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 16px', transition: 'all 0.3s',
                }}>
                  <item.icon size={24} color="var(--primary)" />
                </div>
                <h3 className="montserrat" style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz CTA */}
      <section style={{
        padding: '72px 0',
        background: 'var(--brand-gradient)',
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="montserrat" style={{
              fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 700, color: '#fff', marginBottom: 12,
            }}>
              Not Sure Where to Start?
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', marginBottom: 28, maxWidth: 520, margin: '0 auto 28px' }}>
              Take our 60-second Peptide Quiz and get a personalised recommendation based on your goals, experience, and budget.
            </p>
            <Link to="/quiz" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#fff', color: 'var(--primary)', padding: '15px 36px',
              borderRadius: 10, fontWeight: 700, fontSize: 15,
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)', transition: 'all 0.25s',
            }}>
              Take the Quiz <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '72px 0' }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="coa-badge" style={{ margin: '0 auto 16px' }}>
              <HelpCircle size={13} /> Frequently Asked
            </div>
            <h2 className="montserrat" style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 700 }}>
              Common Questions
            </h2>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {faqs.map((faq, i) => (
              <motion.details key={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i} className="faq-item" style={{
                  background: '#fff', borderRadius: 14,
                  border: '1px solid var(--border-light)',
                  overflow: 'hidden',
                }}>
                <summary style={{
                  padding: '18px 24px', cursor: 'pointer',
                  fontSize: 15, fontWeight: 700, color: 'var(--text)',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  listStyle: 'none',
                }}>
                  {faq.q}
                  <ChevronDown size={18} color="var(--text-muted)" />
                </summary>
                <div style={{
                  padding: '0 24px 18px', fontSize: 14,
                  color: 'var(--text-secondary)', lineHeight: 1.8,
                }}>
                  {faq.a}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{
        padding: '64px 0', background: '#1A1A1A',
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="montserrat" style={{
            fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, color: '#fff', marginBottom: 12,
          }}>
            Ready to Optimise Your Health?
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>
            Lab tested. COA included. Pharmaceutical-grade peptides delivered to your door.
          </p>
          <Link to="/shop" className="btn-primary" style={{ padding: '15px 36px', fontSize: 15 }}>
            Shop All Peptides <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          [style*="grid-template-columns: repeat(5"] { grid-template-columns: repeat(3, 1fr) !important; }
          [style*="grid-template-columns: repeat(4"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          [style*="grid-template-columns: repeat(5"] { grid-template-columns: repeat(2, 1fr) !important; }
          [style*="grid-template-columns: repeat(4"] { grid-template-columns: 1fr !important; }
        }
        details summary::-webkit-details-marker { display: none; }
        details[open] summary svg { transform: rotate(180deg); }
        details summary svg { transition: transform 0.3s ease; }
      `}</style>
    </div>
  );
};

export default Home;
