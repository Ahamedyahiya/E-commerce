import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleWhatsApp = () => {
    window.open(
      'https://wa.me/919876543210?text=Hi%2C%20I%20have%20a%20query%20about%20a%20phone',
      '_blank',
      'noreferrer'
    );
  };

  return (
    <>
      <style>{`
        .contact-main-section {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          padding: 2.5rem 1.2rem;
          background: #fff;
          align-items: flex-start;
        }
        .contact-form-box { width: 100%; }
        .contact-right-side { width: 100%; display: flex; flex-direction: column; gap: 1.2rem; }
        .contact-info-section {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          background: #1a1a1a;
        }
        .contact-faq-section { padding: 2.5rem 1.2rem; background: #f8f8f8; }
        .contact-faq-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        .contact-hero-banner {
          background: linear-gradient(135deg, #e67e22, #d35400);
          padding: 3rem 1.5rem;
          text-align: center;
        }
        .contact-row { display: flex; gap: 1rem; flex-wrap: wrap; }
        .contact-input-group { display: flex; flex-direction: column; margin-bottom: 1rem; flex: 1; min-width: 140px; }
        .contact-map-box iframe { height: 220px !important; }

        @media (min-width: 540px) {
          .contact-faq-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 768px) {
          .contact-main-section {
            flex-direction: row;
            padding: 5rem 4rem;
          }
          .contact-form-box { flex: 1.2; }
          .contact-right-side { flex: 1; }
          .contact-info-section { grid-template-columns: repeat(4, 1fr); }
          .contact-faq-section { padding: 5rem 4rem; }
          .contact-faq-grid { grid-template-columns: repeat(3, 1fr); }
          .contact-hero-banner { padding: 5rem 3rem; }
          .contact-map-box iframe { height: 280px !important; }
        }
      `}</style>

      {/* HERO BANNER */}
      <section className="contact-hero-banner">
        <p style={styles.eyebrow}>Get In Touch</p>
        <h1 style={styles.heroTitle}>Contact <span style={styles.accent}>Us</span></h1>
        <p style={styles.heroSub}>Have a question about a phone? Need help with your order? We're here for you!</p>
      </section>

      {/* INFO CARDS */}
      <section className="contact-info-section">
        {[
          { icon: '📍', title: 'Visit Us', lines: ['123 Mobile Street', 'Chennai, Tamil Nadu 600001'] },
          { icon: '📞', title: 'Call Us', lines: ['+91 98765 43210', 'Mon–Sat: 9AM – 8PM'] },
          { icon: '✉️', title: 'Email Us', lines: ['support@mobileshop.in', 'sales@mobileshop.in'] },
          { icon: '💬', title: 'WhatsApp', lines: ['+91 98765 43210', 'Quick replies guaranteed'] },
        ].map((c, i) => (
          <div key={i} style={styles.infoCard}>
            <div style={styles.infoIcon}>{c.icon}</div>
            <h3 style={styles.infoTitle}>{c.title}</h3>
            {c.lines.map((l, j) => <p key={j} style={styles.infoLine}>{l}</p>)}
          </div>
        ))}
      </section>

      {/* FORM + MAP */}
      <section className="contact-main-section">

        {/* FORM */}
        <div className="contact-form-box">
          <p style={styles.sectionLabel}>Send A Message</p>
          <h2 style={styles.h2}>We'll Reply Within 24 Hours</h2>

          {submitted && (
            <div style={styles.successMsg}>
              ✅ Message sent! We'll get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="contact-row">
              <div className="contact-input-group">
                <label style={styles.label}>Your Name *</label>
                <input style={styles.input} type="text" name="name" placeholder="Eg: Arun Kumar" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="contact-input-group">
                <label style={styles.label}>Phone Number *</label>
                <input style={styles.input} type="tel" name="phone" placeholder="Eg: +91 98765 43210" value={formData.phone} onChange={handleChange} required />
              </div>
            </div>

            <div className="contact-input-group">
              <label style={styles.label}>Email Address *</label>
              <input style={styles.input} type="email" name="email" placeholder="Eg: arun@gmail.com" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="contact-input-group">
              <label style={styles.label}>Subject *</label>
              <select style={styles.input} name="subject" value={formData.subject} onChange={handleChange} required>
                <option value="">Select a topic</option>
                <option value="order">Order Status / Tracking</option>
                <option value="product">Product Enquiry</option>
                <option value="return">Return / Exchange</option>
                <option value="warranty">Warranty Claim</option>
                <option value="payment">Payment Issue</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="contact-input-group">
              <label style={styles.label}>Message *</label>
              <textarea style={{ ...styles.input, height: '140px', resize: 'vertical' }} name="message" placeholder="Tell us how we can help you..." value={formData.message} onChange={handleChange} required />
            </div>

            <button type="submit" style={styles.submitBtn}>Send Message 📨</button>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="contact-right-side">
          <div className="contact-map-box" style={styles.mapBox}>
            <iframe
              title="Store Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.823!2d80.2707!3d13.0827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA0JzU3LjciTiA4MMKwMTYnMTQuNiJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="280"
              style={{ border: 0, borderRadius: '10px', display: 'block' }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>

          <div style={styles.hoursBox}>
            <h3 style={styles.hoursTitle}>🕐 Store Hours</h3>
            {[
              { day: 'Monday – Friday', time: '9:00 AM – 8:00 PM' },
              { day: 'Saturday', time: '10:00 AM – 7:00 PM' },
              { day: 'Sunday', time: '11:00 AM – 5:00 PM' },
            ].map((h, i) => (
              <div key={i} style={styles.hoursRow}>
                <span style={styles.hoursDay}>{h.day}</span>
                <span style={styles.hoursTime}>{h.time}</span>
              </div>
            ))}
          </div>

          <button onClick={handleWhatsApp} style={styles.waBtn}>
            <span style={{ fontSize: '1.4rem' }}>💬</span>
            Chat With Us On WhatsApp
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section className="contact-faq-section">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p style={styles.sectionLabel}>FAQ</p>
          <h2 style={styles.h2}>Common Questions</h2>
        </div>
        <div className="contact-faq-grid">
          {[
            { q: 'Are all phones 100% original?', a: 'Yes! Every phone we sell is 100% genuine with official manufacturer warranty. We are authorized resellers.' },
            { q: 'Do you offer EMI options?', a: 'Yes, we offer No Cost EMI for 3, 6, and 12 months on all major credit/debit cards and UPI apps.' },
            { q: "What is your return policy?", a: "We offer a 7-day easy return policy. If you're not satisfied, just contact us and we'll process your return." },
            { q: 'How fast is delivery?', a: 'We deliver within 1-3 business days across India. Same-day delivery available in Chennai.' },
            { q: 'How do I track my order?', a: "Once your order is shipped, you'll receive a tracking link via SMS and email." },
            { q: 'Do you buy old phones?', a: 'Yes! We accept old phones as exchange. Contact us or visit our store for the best exchange value.' },
          ].map((f, i) => (
            <div key={i} style={styles.faqCard}>
              <h4 style={styles.faqQ}>❓ {f.q}</h4>
              <p style={styles.faqA}>{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

const styles = {
  eyebrow: { fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', marginBottom: '0.8rem' },
  heroTitle: { fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 7vw, 4rem)', color: '#fff', fontWeight: '700', marginBottom: '1rem' },
  accent: { color: '#fff3e0' },
  heroSub: { color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto', lineHeight: '1.7' },
  infoCard: { padding: '1.8rem 1rem', textAlign: 'center', borderRight: '1px solid #2a2a2a', borderBottom: '1px solid #2a2a2a' },
  infoIcon: { fontSize: '1.6rem', marginBottom: '0.6rem' },
  infoTitle: { color: '#e67e22', fontSize: '0.88rem', fontWeight: '700', marginBottom: '0.4rem' },
  infoLine: { color: '#aaa', fontSize: '0.78rem', lineHeight: '1.6' },
  sectionLabel: { fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#e67e22', fontWeight: '600', marginBottom: '0.4rem' },
  h2: { fontFamily: 'Georgia, serif', fontSize: 'clamp(1.4rem, 4vw, 2.2rem)', fontWeight: '700', color: '#1a1a1a', marginBottom: '1.5rem', lineHeight: '1.25' },
  successMsg: { background: '#e8f5e9', color: '#2e7d32', border: '1px solid #a5d6a7', borderRadius: '8px', padding: '1rem 1.5rem', marginBottom: '1.5rem', fontSize: '0.95rem' },
  label: { fontSize: '0.82rem', fontWeight: '600', color: '#444', marginBottom: '0.4rem' },
  input: { padding: '0.75rem 1rem', border: '1.5px solid #ddd', borderRadius: '8px', fontSize: '0.93rem', color: '#1a1a1a', outline: 'none', background: '#fafafa', fontFamily: 'inherit', width: '100%', boxSizing: 'border-box' },
  submitBtn: { background: '#e67e22', color: '#fff', border: 'none', padding: '0.9rem 2.5rem', borderRadius: '8px', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', marginTop: '0.5rem', width: '100%' },
  mapBox: { borderRadius: '10px', overflow: 'hidden', border: '1px solid #eee' },
  hoursBox: { background: '#f8f8f8', borderRadius: '10px', padding: '1.5rem', border: '1px solid #eee' },
  hoursTitle: { fontSize: '1rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '1rem' },
  hoursRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', flexWrap: 'wrap', gap: '0.2rem' },
  hoursDay: { color: '#555', fontSize: '0.88rem' },
  hoursTime: { color: '#e67e22', fontWeight: '600', fontSize: '0.88rem' },
  waBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.7rem', background: '#25D366', color: '#fff', padding: '1rem', borderRadius: '10px', border: 'none', fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer', fontFamily: 'inherit', width: '100%' },
  faqCard: { background: '#fff', border: '1px solid #eee', borderRadius: '10px', padding: '1.8rem' },
  faqQ: { fontSize: '0.98rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '0.7rem' },
  faqA: { color: '#666', fontSize: '0.88rem', lineHeight: '1.75' },
};

export default ContactPage;