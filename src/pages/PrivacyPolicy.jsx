import React from 'react';

export default function PrivacyPolicy() {
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '4rem auto',
      padding: '2rem',
      background: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    heading: {
      fontSize: '2.5rem',
      color: '#1f2937',
      marginBottom: '1.5rem',
      textAlign: 'center',
    },
    content: {
      color: '#4b5563',
      lineHeight: '1.8',
    },
    sectionTitle: {
      fontSize: '1.25rem',
      color: '#111827',
      marginTop: '2rem',
      marginBottom: '1rem',
      fontWeight: '600',
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Privacy Policy</h1>
      <div style={styles.content}>
        <p>Last updated: December 26, 2025</p>
        
        <h2 style={styles.sectionTitle}>1. Introduction</h2>
        <p>
          At JobLink, we respect your privacy and are committed to protecting your personal data. 
          This privacy policy will inform you as to how we look after your personal data when you visit our website 
          and tell you about your privacy rights and how the law protects you.
        </p>

        <h2 style={styles.sectionTitle}>2. Data We Collect</h2>
        <p>
          We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
        </p>
        <ul>
          <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
          <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
          <li><strong>Profile Data:</strong> includes your username and password, your interests, preferences, feedback and survey responses.</li>
          <li><strong>Usage Data:</strong> includes information about how you use our website and services.</li>
        </ul>

        <h2 style={styles.sectionTitle}>3. How We Use Your Data</h2>
        <p>
          We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
        </p>
        <ul>
          <li>To register you as a new customer.</li>
          <li>To process and deliver your job applications.</li>
          <li>To manage our relationship with you.</li>
          <li>To improve our website, products/services, marketing or customer relationships.</li>
        </ul>

        <h2 style={styles.sectionTitle}>4. Data Security</h2>
        <p>
          We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
        </p>
      </div>
    </div>
  );
}
