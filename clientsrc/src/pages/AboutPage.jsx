import React from 'react';

const AboutPage = () => {
  return (
    <div className="about-page">

      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <span style={styles.eyebrow}>About Us</span>
          <h1 style={styles.h1}>Your Trusted <span style={styles.accent}>Mobile</span> Store</h1>
          <p style={styles.heroDesc}>
            We are India's most trusted online destination for the latest smartphones, accessories, and mobile tech. 
            From budget picks to flagship beasts — we've got every phone lover covered.
          </p>
          <div style={styles.btnGroup}>
            <a href="/shop" style={{...styles.btn, ...styles.btnPrimary}}>Shop Phones</a>
            <a href="/contact" style={{...styles.btn, ...styles.btnOutline}}>Contact Us</a>
          </div>
        </div>
        <div style={styles.heroImage}>
          <img 
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80" 
            alt="Mobile Store" 
            style={styles.img}
          />
        </div>
      </section>

      <section style={styles.statsSection}>
        {[
          { num: '50K+', label: 'Phones Sold' },
          { num: '200+', label: 'Mobile Models' },
          { num: '30+', label: 'Top Brands' },
          { num: '24/7', label: 'Support' },
        ].map((s, i) => (
          <div key={i} style={styles.statCard}>
            <span style={styles.statNum}>{s.num}</span>
            <span style={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </section>

      <section style={styles.section}>
        <div style={styles.storyGrid}>
          <div>
            <p style={styles.sectionLabel}>Our Story</p>
            <h2 style={styles.h2}>Started With One Phone,<br/>Now We Sell Thousands</h2>
            <p style={styles.para}>
              Founded in 2019 in Chennai, we started as a small mobile reseller with a simple goal — 
              to help people get genuine smartphones at honest prices. No fake products, no hidden costs.
            </p>
            <p style={styles.para}>
              Today we are an authorized reseller for top brands like Samsung, Apple, OnePlus, Xiaomi, Realme, 
              and more. Every device we sell is 100% original with full manufacturer warranty.
            </p>
          </div>
          <div style={styles.storyImgWrap}>
            <img 
              src="https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=80" 
              alt="Our Story" 
              style={{...styles.img, borderRadius: '12px'}}
            />
          </div>
        </div>
      </section>

      <section style={{...styles.section, background: '#f8f8f8'}}>
        <div style={styles.centerText}>
          <p style={styles.sectionLabel}>Top Brands</p>
          <h2 style={styles.h2}>Brands We Carry</h2>
        </div>
        <div style={styles.brandsGrid}>
          {['Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Realme', 'Vivo', 'OPPO', 'iQOO'].map((brand, i) => (
            <div key={i} style={styles.brandCard}>
              <span style={styles.brandName}>{brand}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.centerText}>
          <p style={styles.sectionLabel}>Why Us</p>
          <h2 style={styles.h2}>Why Buy Phones From Us?</h2>
        </div>
        <div style={styles.featuresGrid}>
          {[
            { icon: '📱', title: '100% Genuine Phones', desc: 'Every smartphone is original with official manufacturer warranty. Zero fake products.' },
            { icon: '🚚', title: 'Fast Delivery', desc: 'Order today, get your new phone delivered within 1-3 business days pan-India.' },
            { icon: '🔒', title: 'Secure Payments', desc: 'UPI, Card, EMI, Net Banking — all secured with 256-bit SSL encryption.' },
            { icon: '🔧', title: 'Free Setup Help', desc: 'Our experts help you set up your new phone, transfer data, and install apps for free.' },
            { icon: '↩️', title: '7-Day Easy Returns', desc: 'Not happy with your phone? Return it within 7 days, no questions asked.' },
            { icon: '💳', title: 'No Cost EMI', desc: 'Buy your dream phone now and pay in easy 3, 6, or 12 month EMI with 0% interest.' },
          ].map((f, i) => (
            <div key={i} style={styles.featureCard}>
              <div style={styles.featureIcon}>{f.icon}</div>
              <h3 style={styles.featureTitle}>{f.title}</h3>
              <p style={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

    <section style={styles.section}>
        <div style={styles.centerText}>
          <p style={styles.sectionLabel}>Reviews</p>
          <h2 style={styles.h2}>What Our Customers Say</h2>
        </div>
        <div style={styles.reviewGrid}>
          {[
            { name: 'Rahul M.', phone: 'Bought iPhone 15', review: 'Got my iPhone sealed box with original warranty. Delivery was super fast. Legit store da!', stars: 5 },
            { name: 'Divya S.', phone: 'Bought Samsung S24', review: 'No cost EMI was a lifesaver. Phone came perfectly packed. Will buy again for sure.', stars: 5 },
            { name: 'Vijay K.', phone: 'Bought OnePlus 12', review: 'Best price compared to all other sites. Setup help they gave was very useful. Happy customer!', stars: 5 },
          ].map((r, i) => (
            <div key={i} style={styles.reviewCard}>
              <div style={styles.stars}>{'⭐'.repeat(r.stars)}</div>
              <p style={styles.reviewText}>"{r.review}"</p>
              <p style={styles.reviewName}>{r.name}</p>
              <p style={styles.reviewPhone}>{r.phone}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.ctaBanner}>
        <h2 style={{...styles.h2, color: '#fff', marginBottom: '1rem'}}>Ready To Get Your Dream Phone?</h2>
        <p style={{color: 'rgba(255,255,255,0.8)', marginBottom: '2rem'}}>
          Browse 200+ mobile models from 30+ top brands. EMI available. Genuine warranty guaranteed.
        </p>
        <a href="/shop" style={{...styles.btn, ...styles.btnWhite, fontSize: '1rem', padding: '0.9rem 2.5rem'}}>
          Browse Phones →
        </a>
      </section>

    </div>
  );
};

const styles = {
  hero: {
    display: 'flex',
    alignItems: 'center',
    gap: '3rem',
    padding: '5rem 6rem',
    background: '#fff',
    flexWrap: 'wrap',
  },
  heroContent: { flex: 1, minWidth: '280px' },
  heroImage: { flex: 1, minWidth: '280px' },
  eyebrow: {
    fontSize: '0.75rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#e67e22',
    fontWeight: '600',
    display: 'block',
    marginBottom: '1rem',
  },
  h1: {
    fontSize: 'clamp(2rem, 4vw, 3.2rem)',
    fontWeight: '700',
    lineHeight: '1.15',
    color: '#1a1a1a',
    marginBottom: '1.2rem',
    fontFamily: 'Georgia, serif',
  },
  accent: { color: '#e67e22' },
  heroDesc: {
    color: '#666',
    fontSize: '1.05rem',
    lineHeight: '1.8',
    marginBottom: '2rem',
    maxWidth: '460px',
  },
  btnGroup: { display: 'flex', gap: '1rem', flexWrap: 'wrap' },
  btn: {
    display: 'inline-block',
    padding: '0.75rem 1.8rem',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  btnPrimary: { background: '#e67e22', color: '#fff' },
  btnOutline: { background: 'transparent', color: '#1a1a1a', border: '2px solid #ddd' },
  btnWhite: { background: '#fff', color: '#e67e22' },
  img: { width: '100%', height: '360px', objectFit: 'cover', borderRadius: '8px', display: 'block' },

  statsSection: {
    display: 'flex',
    justifyContent: 'center',
    background: '#e67e22',
    flexWrap: 'wrap',
  },
  statCard: {
    flex: 1,
    minWidth: '150px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2.5rem 1rem',
    borderRight: '1px solid rgba(255,255,255,0.2)',
  },
  statNum: { fontSize: '2.5rem', fontWeight: '700', color: '#fff', fontFamily: 'Georgia, serif' },
  statLabel: { fontSize: '0.82rem', color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.3rem' },

  section: { padding: '5rem 6rem', background: '#fff' },
  sectionLabel: {
    fontSize: '0.72rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#e67e22',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },
  h2: {
    fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '1.5rem',
    fontFamily: 'Georgia, serif',
    lineHeight: '1.25',
  },
  para: { color: '#666', lineHeight: '1.8', marginBottom: '1rem', maxWidth: '500px' },

  storyGrid: { display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' },
  storyImgWrap: { flex: 1, minWidth: '280px' },
  centerText: { textAlign: 'center', marginBottom: '3rem' },

  brandsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '1rem',
  },
  brandCard: {
    background: '#fff',
    border: '2px solid #eee',
    borderRadius: '10px',
    padding: '1.5rem',
    textAlign: 'center',
    transition: 'border-color 0.2s',
  },
  brandName: { fontSize: '1rem', fontWeight: '700', color: '#1a1a1a' },

  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1.5rem',
  },
  featureCard: {
    background: '#f8f8f8',
    border: '1px solid #eee',
    borderRadius: '10px',
    padding: '2rem',
  },
  featureIcon: { fontSize: '2rem', marginBottom: '1rem' },
  featureTitle: { fontSize: '1.05rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '0.5rem' },
  featureDesc: { color: '#777', fontSize: '0.88rem', lineHeight: '1.7' },

  teamGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '2rem',
    marginTop: '1rem',
  },
  teamCard: { textAlign: 'center' },
  teamImg: { width: '110px', height: '110px', borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem', border: '3px solid #e67e22' },
  teamName: { fontSize: '1rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '0.3rem' },
  teamRole: { fontSize: '0.83rem', color: '#999' },

  reviewGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '1.5rem',
    marginTop: '1rem',
  },
  reviewCard: {
    background: '#f8f8f8',
    borderRadius: '12px',
    padding: '2rem',
    border: '1px solid #eee',
  },
  stars: { fontSize: '1rem', marginBottom: '0.8rem' },
  reviewText: { color: '#444', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '1rem', fontStyle: 'italic' },
  reviewName: { fontWeight: '700', color: '#1a1a1a', fontSize: '0.9rem' },
  reviewPhone: { color: '#e67e22', fontSize: '0.8rem', marginTop: '0.2rem' },

  ctaBanner: {
    background: 'linear-gradient(135deg, #e67e22, #d35400)',
    padding: '5rem 3rem',
    textAlign: 'center',
  },
};

export default AboutPage;