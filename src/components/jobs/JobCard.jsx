// src/components/JobCard.jsx
import React from 'react';

export default function JobCard({ job, onViewDetails, onApply }) {
  console.log("JobCard received job:", job);
  const [isHovered, setIsHovered] = React.useState(false);

  // Calculate time ago
  const getTimeAgo = (date) => {
    const now = new Date();
    const created = new Date(date);
    const diffInMinutes = Math.floor((now - created) / (1000 * 60));
    
    if (diffInMinutes < 60) return `Posted ${diffInMinutes} mins ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `Posted ${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `Posted ${diffInDays} days ago`;
  };
  
  const styles = {
    jobCard: {
      flex: '1 1 280px', // grow, shrink, base width
      maxWidth: '350px',
      minWidth: '280px',
      minHeight: '420px', // Set consistent minimum height
      height: '420px', // Fixed height for consistency
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '1.5rem',
      transition: 'all 0.3s',
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      cursor: 'pointer',
      overflow: 'hidden',
    },
    jobCardHover: {
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
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
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: 2, // Limit title to 2 lines
      WebkitBoxOrient: 'vertical',
      lineHeight: '1.4',
    },
    jobTags: {
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '0.8rem',
      flexWrap: 'wrap',
      minHeight: '32px', // Reserve space for tags
    },
    jobTag: {
      background: '#eff6ff',
      color: '#2563eb',
      padding: '0.3rem 0.8rem',
      borderRadius: '20px',
      fontSize: '0.8rem',
    },
    timePosted: {
      fontSize: '0.75rem',
      color: '#999',
      marginTop: '0.5rem',
      textAlign: 'right',
    },
    jobDescription: {
      color: '#666',
      fontSize: '0.9rem',
      lineHeight: '1.5',
      marginBottom: '1rem',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: 3, // Limit to 3 lines
      WebkitBoxOrient: 'vertical',
    },
    jobMeta: {
      color: '#666',
      fontSize: '0.85rem',
      marginBottom: '0.8rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.3rem',
      minHeight: '60px', // Reserve space for meta info
    },
    metaRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    jobActions: {
      display: 'flex',
      gap: '0.5rem',
      marginTop: 'auto', // Push buttons to bottom
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
    <div 
      style={{
        ...styles.jobCard,
        ...(isHovered ? styles.jobCardHover : {})
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onViewDetails(job)}
    >
      <div style={styles.companyIcon}>
        <div style={styles.iconGrid}>
          <div style={{ ...styles.iconCell, background: '#ef4444' }}></div>
          <div style={{ ...styles.iconCell, background: '#3b82f6' }}></div>
          <div style={{ ...styles.iconCell, background: '#10b981' }}></div>
          <div style={{ ...styles.iconCell, background: '#f59e0b' }}></div>
        </div>
      </div>

      <h3 style={styles.jobTitle}>{job.title}</h3>

      {job.tags && job.tags.length > 0 && (
        <div style={styles.jobTags}>
          {job.tags.map((tag, index) => (
            <span key={index} style={styles.jobTag}>{tag}</span>
          ))}
        </div>
      )}

      <p style={styles.jobDescription}>{job.description}</p>

      <div style={styles.jobMeta}>
        {job.company && (
          <div style={styles.metaRow}>
            <span>🏢 {job.company}</span>
          </div>
        )}
        {job.location && (
          <div style={styles.metaRow}>
            <span>📍 {job.location}</span>
          </div>
        )}
        {job.salary && (
          <div style={styles.metaRow}>
            <span>💰 {job.salary}</span>
          </div>
        )}
      </div>

      <div style={styles.jobActions}>
        <button 
          style={styles.btnApply} 
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click
            onViewDetails(job); // Show details page where user can apply
          }}
        >
          Apply now
        </button>
        <button 
          style={styles.btnLearn} 
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click
            onViewDetails(job);
          }}
        >
          Learn more
        </button>
      </div>

      {job.created_at && (
        <div style={styles.timePosted}>{getTimeAgo(job.created_at)}</div>
      )}
    </div>
  );
}
