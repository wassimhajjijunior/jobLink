import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function RegisterModal({ onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('applicant');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await register(name, email, password, role);
    if (result.success) {
      setIsSuccess(true);
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
      background: 'rgba(0,0,0,0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(4px)',
    },
    modal: {
      background: 'white',
      padding: '2.5rem',
      borderRadius: '16px',
      width: '400px',
      maxWidth: '90%',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      animation: 'slideIn 0.3s ease-out',
    },
    title: {
      fontSize: '1.75rem',
      marginBottom: '0.5rem',
      color: '#1f2937',
      textAlign: 'center',
      fontWeight: '700',
    },
    subtitle: {
      color: '#6b7280',
      textAlign: 'center',
      marginBottom: '2rem',
      fontSize: '0.95rem',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    label: {
      fontSize: '0.9rem',
      fontWeight: '500',
      color: '#374151',
    },
    input: {
      padding: '0.875rem',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '1rem',
      transition: 'border-color 0.2s, box-shadow 0.2s',
      outline: 'none',
    },
    select: {
      padding: '0.875rem',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '1rem',
      background: 'white',
      cursor: 'pointer',
    },
    button: {
      background: '#2563eb',
      color: 'white',
      padding: '0.875rem',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '0.5rem',
      transition: 'background 0.2s',
    },
    error: {
      color: '#ef4444',
      fontSize: '0.875rem',
      textAlign: 'center',
      background: '#fee2e2',
      padding: '0.75rem',
      borderRadius: '6px',
    },
    successContainer: {
      textAlign: 'center',
      padding: '1rem',
    },
    successIcon: {
      fontSize: '4rem',
      color: '#10b981',
      marginBottom: '1rem',
    },
    successTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '0.5rem',
    },
    successMessage: {
      color: '#6b7280',
      marginBottom: '2rem',
    },
  };

  if (isSuccess) {
    return (
      <div style={styles.overlay} onClick={onClose}>
        <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div style={styles.successContainer}>
            <div style={styles.successIcon}>✓</div>
            <h2 style={styles.successTitle}>Registration Successful!</h2>
            <p style={styles.successMessage}>
              Your account has been created successfully. You can now log in to access your dashboard.
            </p>
            <button 
              style={styles.button}
              onClick={onClose}
            >
              Continue to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Join us to find your dream job</p>
        
        {error && <div style={styles.error}>{error}</div>}

        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              style={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>I am a...</label>
            <select
              style={styles.select}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="applicant">Job Seeker</option>
              <option value="employer">Employer</option>
            </select>
          </div>

          <button 
            type="submit" 
            style={styles.button}
            onMouseEnter={(e) => e.target.style.background = '#1d4ed8'}
            onMouseLeave={(e) => e.target.style.background = '#2563eb'}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
