import React, { useState } from 'react';

export default function ApplicationModal({ isOpen, onClose, onSubmit, jobTitle, onDone }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        setFile(null);
      } else {
        setError('');
        setFile(selectedFile);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a resume file');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(file);
      setIsSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.6)',
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
      width: '500px',
      maxWidth: '90%',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      position: 'relative',
      animation: 'slideIn 0.3s ease-out',
    },
    header: {
      marginBottom: '1.5rem',
      textAlign: 'center',
    },
    title: {
      fontSize: '1.75rem',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '0.5rem',
    },
    subtitle: {
      color: '#6b7280',
      fontSize: '1rem',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    },
    fileInputWrapper: {
      border: '2px dashed #e5e7eb',
      borderRadius: '8px',
      padding: '2rem',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'border-color 0.2s',
      background: '#f9fafb',
    },
    fileInput: {
      display: 'none',
    },
    fileLabel: {
      display: 'block',
      cursor: 'pointer',
      color: '#4b5563',
    },
    selectedFile: {
      marginTop: '1rem',
      padding: '0.75rem',
      background: '#eff6ff',
      borderRadius: '6px',
      color: '#1e40af',
      fontSize: '0.9rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    buttonGroup: {
      display: 'flex',
      gap: '1rem',
      marginTop: '1rem',
    },
    submitButton: {
      flex: 1,
      padding: '0.875rem',
      background: '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background 0.2s',
      opacity: isSubmitting ? 0.7 : 1,
    },
    cancelButton: {
      flex: 1,
      padding: '0.875rem',
      background: 'white',
      color: '#374151',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background 0.2s',
    },
    error: {
      color: '#ef4444',
      fontSize: '0.875rem',
      textAlign: 'center',
      marginTop: '0.5rem',
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
            <h2 style={styles.successTitle}>Application Submitted!</h2>
            <p style={styles.successMessage}>
              Your application for <strong>{jobTitle}</strong> has been sent successfully. Good luck!
            </p>
            <button 
              style={styles.submitButton}
              onClick={() => {
                if (onDone) onDone();
                else onClose();
              }}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>Apply for Job</h2>
          <p style={styles.subtitle}>Applying for: <strong>{jobTitle}</strong></p>
        </div>

        <form style={styles.form} onSubmit={handleSubmit}>
          <div 
            style={styles.fileInputWrapper}
            onDragOver={(e) => {
              e.preventDefault();
              e.currentTarget.style.borderColor = '#2563eb';
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.currentTarget.style.borderColor = '#e5e7eb';
              const droppedFile = e.dataTransfer.files[0];
              if (droppedFile) handleFileChange({ target: { files: [droppedFile] } });
            }}
          >
            <input
              type="file"
              id="resume-upload"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              style={styles.fileInput}
            />
            <label htmlFor="resume-upload" style={styles.fileLabel}>
              {file ? (
                <div style={styles.selectedFile}>
                  <span>📄 {file.name}</span>
                  <span 
                    style={{cursor: 'pointer', color: '#ef4444'}}
                    onClick={(e) => {
                      e.preventDefault();
                      setFile(null);
                    }}
                  >
                    ✕
                  </span>
                </div>
              ) : (
                <div>
                  <div style={{fontSize: '2rem', marginBottom: '1rem'}}>cloud_upload</div>
                  <p>Click to upload or drag and drop</p>
                  <p style={{fontSize: '0.8rem', color: '#9ca3af', marginTop: '0.5rem'}}>
                    PDF, DOC, DOCX (Max 5MB)
                  </p>
                </div>
              )}
            </label>
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <div style={styles.buttonGroup}>
            <button 
              type="button" 
              onClick={onClose}
              style={styles.cancelButton}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              style={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
