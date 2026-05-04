import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, FlaskConical, Award, Truck } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' } }),
};

const Hero = () => {
  return (
    <section style={{
      background: '#fff', paddingTop: 200, paddingBottom: 80,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Subtle gold gradient orb */}
      <div style={{
        position: 'absolute', top: -200, right: -200,
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(31,111,178,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -100, left: -100,
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(79,191,159,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          {/* Badge */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="coa-badge" style={{ margin: '0 auto 20px' }}>
              <FlaskConical size={13} /> Pharmaceutical-Grade Peptides
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="montserrat" style={{
              fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800,
              lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 20,
              color: 'var(--text)',
            }}>
            Science-Backed{' '}
            <span style={{
              background: 'var(--brand-gradient)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Peptides</span>
            <br />for Optimal Health
          </motion.h1>

          {/* Subheadline */}
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            style={{
              fontSize: 'clamp(15px, 2vw, 18px)', color: 'var(--text-secondary)',
              lineHeight: 1.7, marginBottom: 32, maxWidth: 560, margin: '0 auto 32px',
            }}>
            Lab-tested, COA-verified peptides for healing, weight management, anti-aging, and cognitive performance. Trusted by practitioners across the Philippines.
          </motion.p>

          {/* CTAs */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3}
            style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
            <Link to="/shop" className="btn-primary" style={{ padding: '15px 36px', fontSize: 15 }}>
              Shop All Peptides <ArrowRight size={16} />
            </Link>
            <Link to="/quiz" className="btn-outline" style={{ padding: '15px 36px', fontSize: 15 }}>
              Find Your Peptide
            </Link>
          </motion.div>

          {/* Trust Row */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4}
            style={{
              display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap',
            }}>
            {[
              { icon: ShieldCheck, label: 'Lab Tested' },
              { icon: FlaskConical, label: '≥98% Purity' },
              { icon: Award, label: 'COA Every Batch' },
              { icon: Truck, label: 'Fast PH Shipping' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                fontSize: 13, fontWeight: 600, color: 'var(--text-muted)',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'var(--primary-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <item.icon size={16} color="var(--primary)" />
                </div>
                {item.label}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
