import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' } }),
};

const Contact = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactMethods = [
    { icon: Mail, label: 'Email', value: 'info@peptidesandyou.com', desc: 'We respond within 24 hours', href: 'mailto:info@peptidesandyou.com' },
    { icon: MessageCircle, label: 'WhatsApp', value: 'Available', desc: 'Quick replies during business hours', href: '#' },
    { icon: MapPin, label: 'Location', value: 'Philippines', desc: 'Serving PH and Southeast Asia', href: '#' },
  ];

  return (
    <div style={{paddingTop: 180, paddingBottom: 80, background: 'var(--bg)', minHeight: '100vh'}}>
      <Helmet>
        <title>Contact Us | Peptides & You — Get in Touch</title>
        <meta name="description" content="Contact Peptides & You for inquiries about our pharmaceutical-grade peptides, orders, or any questions. Email, WhatsApp, or use our contact form." />
        <link rel="canonical" href="https://peptidesandyou.com/contact" />
        <meta property="og:title" content="Contact Us | Peptides & You" />
        <meta property="og:description" content="Get in touch with Peptides & You for peptide inquiries and orders." />
        <meta property="og:image" content="https://peptidesandyou.com/logo.png" />
      </Helmet>

      <div className="container" style={{maxWidth: 960}}>
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} style={{textAlign: 'center', marginBottom: 48}}>
          <div className="coa-badge" style={{marginBottom: 16}}>
            <Mail size={14} /> Get in Touch
          </div>
          <h1 className="montserrat" style={{
            fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: 'var(--text)', marginBottom: 12,
          }}>
            How Can We <span style={{
              background: 'linear-gradient(135deg, #1F6FB2, #4FBF9F)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Help You?</span>
          </h1>
          <p style={{fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 520, margin: '0 auto'}}>
            Whether you have questions about our products, need dosing guidance, or want to place an order — we're here to help.
          </p>
        </motion.div>

        {/* Contact Methods */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 48}}>
          {contactMethods.map((m, i) => (
            <motion.a
              key={m.label}
              href={m.href}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} custom={i}
              style={{
                background: '#fff', padding: '28px 24px', borderRadius: 14,
                border: '1px solid var(--border)', textAlign: 'center',
                transition: 'all 0.3s', textDecoration: 'none',
              }}
              className="contact-card-hover"
            >
              <div style={{
                width: 52, height: 52, borderRadius: 12, background: 'var(--primary-light)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 14px',
              }}>
                <m.icon size={24} color="var(--primary)" />
              </div>
              <h3 className="montserrat" style={{fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 4}}>{m.label}</h3>
              <p style={{fontSize: 14, fontWeight: 600, color: 'var(--primary)', marginBottom: 4}}>{m.value}</p>
              <p style={{fontSize: 12, color: 'var(--text-muted)'}}>{m.desc}</p>
            </motion.a>
          ))}
        </div>

        {/* Contact Form */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          style={{
            background: '#fff', padding: 'clamp(28px, 4vw, 48px)', borderRadius: 16,
            border: '1px solid var(--border)', maxWidth: 640, margin: '0 auto',
          }}
        >
          {!submitted ? (
            <>
              <h2 className="montserrat" style={{fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 6}}>
                Send Us a Message
              </h2>
              <p style={{fontSize: 14, color: 'var(--text-muted)', marginBottom: 28}}>
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit}>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16}}>
                  <div>
                    <label style={{display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6}}>Name</label>
                    <input type="text" required placeholder="Your name" className="form-input" />
                  </div>
                  <div>
                    <label style={{display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6}}>Email</label>
                    <input type="email" required placeholder="you@email.com" className="form-input" />
                  </div>
                </div>

                <div style={{marginBottom: 16}}>
                  <label style={{display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6}}>Subject</label>
                  <select className="form-input" required>
                    <option value="">Select a topic</option>
                    <option value="order">Product Inquiry / Order</option>
                    <option value="dosing">Dosing & Protocol Questions</option>
                    <option value="shipping">Shipping Information</option>
                    <option value="coa">COA / Lab Testing</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div style={{marginBottom: 24}}>
                  <label style={{display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6}}>Message</label>
                  <textarea required placeholder="Tell us how we can help..." className="form-input" rows={5} style={{resize: 'vertical'}} />
                </div>

                <button type="submit" className="btn-primary" style={{width: '100%', padding: '14px 28px', fontSize: 15}}>
                  <Send size={16} /> Send Message
                </button>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{textAlign: 'center', padding: '24px 0'}}
            >
              <div style={{
                width: 64, height: 64, borderRadius: '50%', background: '#ECFDF5',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px',
              }}>
                <CheckCircle2 size={32} color="#16A34A" />
              </div>
              <h3 className="montserrat" style={{fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 8}}>Message Sent!</h3>
              <p style={{fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7}}>
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          [style*="grid-template-columns: repeat(3, 1fr)"] { grid-template-columns: 1fr !important; }
          [style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default Contact;
