import React from 'react';

export default function Footer({ onNavigate }) {
  const styles = {
    footer: {
      background: '#1f2937',
      color: 'white',
      padding: '2rem',
      marginTop: 'auto',
      textAlign: 'center',
    },
    content: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem',
    },
    copyright: {
      fontSize: '0.9rem',
      color: '#d1d5db',
    },
    links: {
      display: 'flex',
      gap: '2rem',
      flexWrap: 'wrap',
    },
    link: {
      color: '#d1d5db',
      textDecoration: 'none',
      fontSize: '0.9rem',
      cursor: 'pointer',
      transition: 'color 0.2s',
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.content}>
        <div style={styles.copyright}>
          © 2025 JobLink. All rights reserved.
        </div>
        <div style={styles.links}>
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); onNavigate('about'); }}
            style={styles.link}
            onMouseEnter={(e) => e.target.style.color = 'white'}
            onMouseLeave={(e) => e.target.style.color = '#d1d5db'}
          >
            About
          </a>
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}
            style={styles.link}
            onMouseEnter={(e) => e.target.style.color = 'white'}
            onMouseLeave={(e) => e.target.style.color = '#d1d5db'}
          >
            Contact
          </a>
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); onNavigate('privacy'); }}
            style={styles.link}
            onMouseEnter={(e) => e.target.style.color = 'white'}
            onMouseLeave={(e) => e.target.style.color = '#d1d5db'}
          >
            Privacy Policy
          </a>
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); onNavigate('terms'); }}
            style={styles.link}
            onMouseEnter={(e) => e.target.style.color = 'white'}
            onMouseLeave={(e) => e.target.style.color = '#d1d5db'}
          >
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
