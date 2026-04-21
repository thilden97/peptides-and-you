import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{paddingTop: 180, paddingBottom: 80, background: 'var(--bg)', minHeight: '100vh'}}>
      <Helmet>
        <title>Privacy Policy | Peptides & You</title>
        <meta name="description" content="Read the Peptides & You privacy policy. Learn how we collect, use, and protect your personal data in compliance with Philippine and international privacy standards." />
        <link rel="canonical" href="https://peptidesandyou.com/privacy-policy" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="container" style={{maxWidth: 780}}>
        <Link to="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 28,
          color: 'var(--text-secondary)', fontWeight: 700, fontSize: 13,
        }}>
          <ArrowLeft size={15} /> Back to Home
        </Link>

        <div style={{background: '#fff', padding: 'clamp(28px, 4vw, 56px)', borderRadius: 16, border: '1px solid var(--border)'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28}}>
            <div style={{
              width: 44, height: 44, borderRadius: 10, background: 'var(--primary-light)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <ShieldCheck size={22} color="var(--primary)" />
            </div>
            <div>
              <h1 className="montserrat" style={{fontSize: 28, fontWeight: 700, color: 'var(--text)'}}>Privacy Policy</h1>
              <p style={{fontSize: 12, color: 'var(--text-muted)', fontWeight: 600}}>Last updated: April 21, 2026</p>
            </div>
          </div>

          <div className="legal-content">
            <h2>1. Introduction</h2>
            <p>
              Peptides and You ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <strong>peptidesandyou.com</strong> (the "Site") and use our services.
            </p>
            <p>
              We comply with the <strong>Philippine Data Privacy Act of 2012 (Republic Act No. 10173)</strong> and international best practices for data protection.
            </p>

            <h2>2. Information We Collect</h2>
            <h3>2.1 Personal Information</h3>
            <p>We may collect personally identifiable information that you voluntarily provide, including:</p>
            <ul>
              <li>Name and contact information (email address, phone number)</li>
              <li>Shipping and billing address</li>
              <li>Order history and product preferences</li>
              <li>Quiz responses and product recommendations</li>
              <li>Communication records (inquiries, support requests)</li>
            </ul>

            <h3>2.2 Automatically Collected Information</h3>
            <p>When you access our Site, we automatically collect certain information:</p>
            <ul>
              <li>IP address and browser type</li>
              <li>Device information and operating system</li>
              <li>Pages visited, time spent, and navigation paths</li>
              <li>Referring website or source</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process and fulfill your orders</li>
              <li>Provide personalized product recommendations</li>
              <li>Communicate with you about orders, products, and promotions</li>
              <li>Improve our website, products, and services</li>
              <li>Analyze usage patterns and optimize user experience</li>
              <li>Comply with legal obligations</li>
              <li>Prevent fraud and ensure security</li>
            </ul>

            <h2>4. Cookies & Tracking Technologies</h2>
            <p>
              We use cookies and similar technologies to enhance your browsing experience. These include:
            </p>
            <ul>
              <li><strong>Essential cookies:</strong> Required for site functionality</li>
              <li><strong>Analytics cookies:</strong> Help us understand how visitors use the site</li>
              <li><strong>Marketing cookies:</strong> Used to deliver relevant content (with your consent)</li>
            </ul>
            <p>You can control cookie preferences through your browser settings. Disabling certain cookies may impact site functionality.</p>

            <h2>5. Third-Party Services</h2>
            <p>We may share your information with trusted third parties who assist us in:</p>
            <ul>
              <li>Payment processing (when payment integration is active)</li>
              <li>Shipping and delivery services</li>
              <li>Website analytics (e.g., Google Analytics)</li>
              <li>Email marketing platforms (with your consent)</li>
            </ul>
            <p>We do not sell your personal information to third parties.</p>

            <h2>6. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your personal information, including SSL encryption, secure servers, and access controls. However, no method of electronic transmission or storage is 100% secure.
            </p>

            <h2>7. Data Retention</h2>
            <p>
              We retain your personal data only as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements.
            </p>

            <h2>8. Your Rights</h2>
            <p>Under the Philippine Data Privacy Act and applicable laws, you have the right to:</p>
            <ul>
              <li><strong>Access</strong> your personal data that we hold</li>
              <li><strong>Correct</strong> inaccurate or incomplete information</li>
              <li><strong>Delete</strong> your personal data (subject to legal obligations)</li>
              <li><strong>Object</strong> to processing of your data</li>
              <li><strong>Withdraw consent</strong> at any time</li>
              <li><strong>Data portability</strong> — receive your data in a structured format</li>
            </ul>
            <p>To exercise any of these rights, contact us at <strong>info@peptidesandyou.com</strong>.</p>

            <h2>9. Children's Privacy</h2>
            <p>
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from minors. If we discover that we have collected data from a minor, we will delete it promptly.
            </p>

            <h2>10. International Users</h2>
            <p>
              If you are accessing our Site from outside the Philippines, please be aware that your information may be transferred to, stored, and processed in the Philippines. By using our Site, you consent to such transfer.
            </p>

            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last updated" date. We encourage you to review this policy periodically.
            </p>

            <h2>12. Contact Us</h2>
            <p>If you have questions about this Privacy Policy or our data practices, contact us:</p>
            <ul>
              <li><strong>Email:</strong> info@peptidesandyou.com</li>
              <li><strong>Website:</strong> peptidesandyou.com</li>
              <li><strong>Location:</strong> Philippines</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
