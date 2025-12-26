import React from 'react';

export default function Terms() {
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
      <h1 style={styles.heading}>Terms of Service</h1>
      <div style={styles.content}>
        <p>Last updated: December 26, 2025</p>
        
        <h2 style={styles.sectionTitle}>1. Agreement to Terms</h2>
        <p>
          By accessing our website, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations. 
          If you do not agree with these terms, you are prohibited from using or accessing this site.
        </p>

        <h2 style={styles.sectionTitle}>2. Use License</h2>
        <p>
          Permission is granted to temporarily download one copy of the materials (information or software) on JobLink's website for personal, 
          non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
        </p>

        <h2 style={styles.sectionTitle}>3. User Accounts</h2>
        <p>
          When you create an account with us, you must provide us information that is accurate, complete, and current at all times. 
          Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
        </p>

        <h2 style={styles.sectionTitle}>4. Job Postings</h2>
        <p>
          Employers are solely responsible for their job postings on JobLink. JobLink is not to be considered to be an employer with respect 
          to your use of any JobLink service and JobLink shall not be responsible for any employment decisions, for whatever reason, made by 
          any entity posting jobs on any JobLink site.
        </p>

        <h2 style={styles.sectionTitle}>5. Termination</h2>
        <p>
          We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, 
          including without limitation if you breach the Terms.
        </p>
      </div>
    </div>
  );
}
