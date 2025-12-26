import React from 'react';

export default function About() {
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
    paragraph: {
      fontSize: '1.1rem',
      lineHeight: '1.8',
      color: '#4b5563',
      marginBottom: '1.5rem',
    },
    section: {
      marginBottom: '2rem',
    },
    subheading: {
      fontSize: '1.5rem',
      color: '#374151',
      marginBottom: '1rem',
      borderBottom: '2px solid #e5e7eb',
      paddingBottom: '0.5rem',
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About JobLink</h1>
      
      <div style={styles.section}>
        <p style={styles.paragraph}>
          Welcome to <strong>JobLink</strong>, your premier destination for connecting talent with opportunity. 
          Founded in 2025, our mission is to simplify the recruitment process for both employers and job seekers, 
          making it easier than ever to find the perfect match.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subheading}>Our Mission</h2>
        <p style={styles.paragraph}>
          We believe that everyone deserves a job they love. We strive to create a platform that is transparent, 
          efficient, and accessible to all. Whether you are a recent graduate looking for your first role or 
          an experienced professional seeking a career change, JobLink is here to support your journey.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subheading}>For Employers</h2>
        <p style={styles.paragraph}>
          We provide powerful tools to help you find the best candidates quickly. From posting jobs to managing 
          applications, our dashboard is designed to streamline your hiring workflow.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subheading}>For Job Seekers</h2>
        <p style={styles.paragraph}>
          Search through thousands of job listings, filter by your preferences, and apply with just a few clicks. 
          Track your applications and stay organized in your job search.
        </p>
      </div>
    </div>
  );
}
