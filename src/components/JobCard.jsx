// src/components/JobCard.jsx
import React from 'react';

export default function JobCard({ job, onViewDetails, onApply }) {
  const styles = {
    jobCard: {
      flex: '1 1 280px', // grow, shrink, base width
      maxWidth: '350px',
      minWidth: '280px',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '1.5rem',
      transition: 'box-shadow 0.3s',
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    companyIcon: {
      width: '50px',
      height: '50px',
      marginBottom: '1rem',
    },
    iconGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '4px',
      width: '100%',
      height: '100%',
    },
    iconCell: {
      borderRadius: '4px',
    },
    jobTitle: {
      fontSize: '1.1rem',
      marginBottom: '0.8rem',
      color: '#333',
    },
    jobTags: {
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '0.8rem',
      flexWrap: 'wrap',
    },
    jobTag: {
      background: '#eff6ff',
      color: '#2563eb',
      padding: '0.3rem 0.8rem',
      borderRadius: '20px',
      fontSize: '0.8rem',
    },
    jobDescription: {
      color: '#666',
      fontSize: '0.9rem',
      lineHeight: '1.5',
      marginBottom: '1rem',
      flexGrow: 1,
    },
    jobActions: {
      display: 'flex',
      gap: '0.5rem',
      marginTop: '1rem',
    },
    btnApply: {
      background: '#2563eb',
      color: 'white',
      padding: '0.6rem 1.2rem',
      border: 'none',
      borderRadius: '6px',
      fontWeight: '500',
      cursor: 'pointer',
      fontSize: '0.9rem',
      flex: 1,
    },
    btnLearn: {
      background: 'transparent',
      color: '#666',
      padding: '0.6rem 1.2rem',
      border: '1px solid #e5e7eb',
      borderRadius: '6px',
      fontWeight: '500',
      cursor: 'pointer',
      fontSize: '0.9rem',
      flex: 1,
    },
  };

  return (
    <div style={styles.jobCard}>
      <div style={styles.companyIcon}>
        <div style={styles.iconGrid}>
          <div style={{ ...styles.iconCell, background: '#ef4444' }}></div>
          <div style={{ ...styles.iconCell, background: '#3b82f6' }}></div>
          <div style={{ ...styles.iconCell, background: '#10b981' }}></div>
          <div style={{ ...styles.iconCell, background: '#f59e0b' }}></div>
        </div>
      </div>

      <h3 style={styles.jobTitle}>{job.title}</h3>

      <div style={styles.jobTags}>
        {job.tags.map((tag, idx) => (
          <span key={idx} style={styles.jobTag}>{tag}</span>
        ))}
      </div>

      <p style={styles.jobDescription}>{job.description}</p>

      <div style={styles.jobActions}>
        <button style={styles.btnApply} onClick={() => onApply && onApply(job)}>Apply now</button>
        <button style={styles.btnLearn} onClick={() => onViewDetails(job)}>Learn more</button>
      </div>
    </div>
  );
}
