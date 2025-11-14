// src/components/Header.jsx
import React from 'react';

export default function Header() {
  const styles = {
    header: {
      background: 'white',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#2563eb',
      border: '3px solid #2563eb',
      padding: '0.5rem 1rem',
      borderRadius: '8px',
    },
    logoIcon: {
      width: '24px',
      height: '24px',
      background: '#2563eb',
      borderRadius: '4px',
    },
    headerActions: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center',
    },
    recruiterLogin: {
      color: '#666',
      textDecoration: 'none',
      fontSize: '0.95rem',
    },
    btnRegister: {
      background: '#2563eb',
      color: 'white',
      padding: '0.6rem 1.5rem',
      borderRadius: '25px',
      textDecoration: 'none',
      fontWeight: '500',
    },
  };

  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <div style={styles.logoIcon}></div>
        <span>JobLink</span>
      </div>
      <div style={styles.headerActions}>
        <a href="#" style={styles.recruiterLogin}>Recruiter Login</a>
        <a href="#" style={styles.btnRegister}>Register</a>
        
      </div>
    </header>
  );
}
