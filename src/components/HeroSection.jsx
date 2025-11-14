// src/components/HeroSection.jsx
import React from 'react';

export default function HeroSection() {
  const styles = {
    hero: {
      background: 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 100%)',
      color: 'white',
      padding: '4rem 2rem',
      textAlign: 'center',
      borderRadius: '20px',
      margin: '2rem',
    },
    heroTitle: {
      fontSize: '2.5rem',
      marginBottom: '1rem',
    },
    heroSubtitle: {
      fontSize: '0.95rem',
      opacity: 0.95,
      marginBottom: '2rem',
      lineHeight: '1.6',
    },
    searchBar: {
      display: 'flex',
      gap: '0.5rem',
      maxWidth: '800px',
      margin: '0 auto',
      background: 'white',
      padding: '0.5rem',
      borderRadius: '8px',
    },
    searchInput: {
      flex: 1,
      padding: '0.8rem',
      border: '1px solid #e5e7eb',
      borderRadius: '6px',
      fontSize: '0.95rem',
    },
    btnSearch: {
      background: '#2563eb',
      color: 'white',
      padding: '0.8rem 2rem',
      border: 'none',
      borderRadius: '6px',
      fontWeight: '500',
      cursor: 'pointer',
    },
  };

  return (
    <section style={styles.hero}>
      <h1 style={styles.heroTitle}>Over 10,000+ jobs to apply</h1>
      <p style={styles.heroSubtitle}>
        Your Next Big Career Move Starts Right Here - Explore The Best Job Opportunities<br />
        And Take The First Step Toward Your Future
      </p>
      <div style={styles.searchBar}>
        <input type="text" placeholder="Search for jobs" style={styles.searchInput} />
        <input type="text" placeholder="Location" style={styles.searchInput} />
        <button style={styles.btnSearch}>Search</button>
        
      </div>
    </section>
  );
}
