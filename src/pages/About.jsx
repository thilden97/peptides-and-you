import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FlaskConical, FileCheck, ShieldCheck, Users, Award, Globe, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' } }),
};

const About = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const values = [
    { icon: FlaskConical, title: 'Pharmaceutical-Grade Standards', desc: 'Every product meets pharmaceutical manufacturing standards. Consistent purity, consistent results.' },
    { icon: FileCheck, title: 'Radical Transparency', desc: 'Certificate of Analysis supplied with every single batch. We never ask you to trust blindly — we give you the data.' },
    { icon: ShieldCheck, title: 'Lab Tested & Verified', desc: 'Third-party lab testing on every product. Identity and purity verified before it ever reaches you.' },
    { icon: Globe, title: 'Southeast Asia Focus', desc: 'Based in the Philippines, serving practitioners and clients across Southeast Asia with fast, discreet delivery.' },
    { icon: Heart, title: 'Client-First Approach', desc: 'Personalized guidance, honest recommendations, and support that doesn\'t disappear after the sale.' },
    { icon: Award, title: 'Evidence-Based Selection', desc: 'We only carry compounds with meaningful scientific research behind them. No hype, no filler products.' },
  ];

  const stats = [
    { value: '12+', label: 'Products' },
    { value: '100%', label: 'Lab Tested' },
    { value: 'COA', label: 'Every Batch' },
    { value: 'PH + Intl', label: 'Delivery' },
  ];

  return (
    <div style={{paddingTop: 160, background: 'var(--bg)', minHeight: '100vh'}}>
      <Helmet>
        <title>About Us | Peptides & You — Trusted Peptide Supplier in the Philippines</title>
        <meta name="description" content="Learn about Peptides & You — a trusted supplier of pharmaceutical-grade peptides in the Philippines and Southeast Asia. Lab tested, COA included, trusted by practitioners." />
        <link rel="canonical" href="https://peptidesandyou.com/about" />
        <meta property="og:title" content="About Peptides & You" />
        <meta property="og:description" content="Trusted peptide supplier in the Philippines — lab tested, COA included." />
        <meta property="og:image" content="https://peptidesandyou.com/logo.jpg" />
      </Helmet>

      {/* Hero */}
      <section style={{padding: '60px 0 80px', background: '#fff', position: 'relative', overflow: 'hidden'}}>
        <div style={{
          position: 'absolute', top: '50%', right: '5%', transform: 'translateY(-50%)',
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(31,111,178,0.06), transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{position: 'relative', zIndex: 2}}>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} style={{maxWidth: 640}}>
            <div className="coa-badge" style={{marginBottom: 20}}>
              <Users size={14} /> About Peptides & You
            </div>
            <h1 className="montserrat" style={{
              fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, color: 'var(--text)',
              lineHeight: 1.1, marginBottom: 20,
            }}>
              Science-Backed.{' '}
              <span style={{
                background: 'var(--brand-gradient)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>Transparently Sourced.</span>
            </h1>
            <p style={{fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 28}}>
              Peptides & You exists because the peptide market needed a supplier you can actually trust. We source pharmaceutical-grade compounds, lab-test every batch, and include a Certificate of Analysis with every order — because you deserve to know exactly what you're putting in your body.
            </p>
            <div style={{display: 'flex', gap: 12, flexWrap: 'wrap'}}>
              <Link to="/shop" className="btn-primary" style={{padding: '14px 28px', fontSize: 15}}>
                Browse Products
              </Link>
              <Link to="/quiz" className="btn-outline" style={{padding: '14px 28px', fontSize: 15}}>
                Take the Quiz
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section style={{padding: '40px 0', background: 'var(--bg)'}}>
        <div className="container">
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
            background: '#fff', borderRadius: 16, padding: '32px 24px',
            border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)',
          }}>
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                style={{textAlign: 'center'}}
              >
                <div className="montserrat" style={{fontSize: 28, fontWeight: 700, color: 'var(--primary)'}}>{s.value}</div>
                <div style={{fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 4}}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section style={{padding: '64px 0'}}>
        <div className="container">
          <div style={{textAlign: 'center', marginBottom: 40}}>
            <h2 className="section-heading" style={{fontSize: 28}}>What We Stand For</h2>
            <p style={{color: 'var(--text-secondary)', fontSize: 14, maxWidth: 500, margin: '0 auto', lineHeight: 1.7}}>
              The principles that guide every product we carry and every interaction we have.
            </p>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20}}>
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                style={{
                  background: '#fff', padding: '28px 24px', borderRadius: 14,
                  border: '1px solid var(--border)', transition: 'all 0.3s',
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 10, background: 'var(--primary-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
                }}>
                  <v.icon size={22} color="var(--primary)" />
                </div>
                <h3 className="montserrat" style={{fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 8}}>{v.title}</h3>
                <p style={{fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7}}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          [style*="grid-template-columns: repeat(4, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
};

export default About;
