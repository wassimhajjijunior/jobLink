// src/components/Header.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

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
    },
    logoIcon: {
      width: '28px',
      height: '28px',
      background: '#2563eb',
      borderRadius: '6px',
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
      cursor: 'pointer',
      background: 'none',
      border: 'none',
    },
    btnRegister: {
      background: '#2563eb',
      color: 'white',
      padding: '0.6rem 1.5rem',
      borderRadius: '25px',
      textDecoration: 'none',
      fontWeight: '500',
      border: 'none',
      cursor: 'pointer',
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    userName: {
      color: '#333',
      fontWeight: '500',
    },
  };

  return (
    <>
      <header style={styles.header}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}></div>
          <span>JobLink</span>
        </div>
        <div style={styles.headerActions}>
          {isAuthenticated ? (
            <div style={styles.userInfo}>
              <span style={styles.userName}>{user.name}</span>
              <button style={styles.btnRegister} onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <button style={styles.recruiterLogin} onClick={() => setShowLogin(true)}>
                Login
              </button>
              <button style={styles.btnRegister} onClick={() => setShowRegister(true)}>
                Register
              </button>
            </>
          )}
        </div>
      </header>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </>
  );
}
