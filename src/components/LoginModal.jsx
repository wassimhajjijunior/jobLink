import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function LoginModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await login(email, password);
    if (result.success) {
      onClose();
    } else {
      setError(result.error);
    }
  };

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modal: {
      background: 'white',
      padding: '2rem',
      borderRadius: '12px',
      width: '400px',
      maxWidth: '90%',
    },
    title: {
      fontSize: '1.5rem',
      marginBottom: '1.5rem',
      color: '#333',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    input: {
      padding: '0.8rem',
      border: '1px solid #e5e7eb',
      borderRadius: '6px',
      fontSize: '1rem',
    },
    button: {
      background: '#2563eb',
      color: 'white',
      padding: '0.8rem',
      border: 'none',
      borderRadius: '6px',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
    },
    error: {
      color: '#ef4444',
      fontSize: '0.9rem',
    },
    closeButton: {
      background: '#e5e7eb',
      color: '#333',
      padding: '0.8rem',
      border: 'none',
      borderRadius: '6px',
      fontSize: '1rem',
      cursor: 'pointer',
      marginTop: '0.5rem',
    },
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 style={styles.title}>Login</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <div style={styles.error}>{error}</div>}
          <button type="submit" style={styles.button}>
            Login
          </button>
          <button type="button" style={styles.closeButton} onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
