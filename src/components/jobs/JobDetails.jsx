import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import JobCard from './JobCard';
import ApplicationModal from '../modals/ApplicationModal';

export default function JobDetails({ job, onBack, jobsData, onViewDetails, onApply }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getToken, isAuthenticated } = useAuth();

  if (!job) return null;

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

  // Get related jobs from the same company or location
  const relatedJobs = jobsData
    .filter(j => 
      j.job_id !== job.job_id && 
      (j.company === job.company || j.location === job.location)
    )
    .slice(0, 3);

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      alert('Please login to apply for jobs.');
      return;
    }
    setIsModalOpen(true);
  };

  const handleApplicationSubmit = async (file) => {
    try {
      const token = getToken();
      const formData = new FormData();
      formData.append('jobId', job.job_id);
      formData.append('resume', file);

      const response = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        // Success handled by modal
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit application.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      throw error;
    }
  };

  const keyResponsibilities = [
    "Lead and deploy highly-opinionated web applications.",
    "Design and develop responsive, scalable web applications using HTML, CSS, JavaScript (React, Angular, or Vue.js).",
    "Develop and maintain databases using technologies such as Node.js, Ruby, or Java.",
    "Design and maintain databases (SQL, NoSQL) for efficiency and reliability.",
    "Write automated unit tests, integration tests, and end-to-end testing.",
    "Work closely with designers, product managers and engineers to understand requirements and implement features.",
  ];

  const skillsRequired = [
    "Knowledge of HTML, CSS, and JavaScript, plus experience with frameworks like React, Angular, or Vue.js.",
    "Experience working with server-side languages such as Node.js, Python, Ruby, or Java.",
    "Familiarity with both relational databases (e.g., MySQL, PostgreSQL) and non-relational databases (e.g., MongoDB).",
    "Experience using Git for tracking changes and collaborating on code.",
    "Good communication and collaboration skills, able to work effectively with others.",
  ];

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <div style={styles.main}>
          <button onClick={onBack} style={styles.backButton}>← Back</button>
          
          <div style={styles.jobHeader}>
            <div style={styles.headerTop}>
              <div>
                <div style={styles.companyIcon}>
                  <div style={styles.iconGrid}>
                    <div style={{ ...styles.iconCell, background: '#ef4444' }}></div>
                    <div style={{ ...styles.iconCell, background: '#3b82f6' }}></div>
                    <div style={{ ...styles.iconCell, background: '#10b981' }}></div>
                    <div style={{ ...styles.iconCell, background: '#f59e0b' }}></div>
                  </div>
                </div>
                
                <h1 style={styles.jobTitle}>{job.title}</h1>
                
                <div style={styles.jobMeta}>
                  {job.company && <span style={styles.metaItem}>📍 {job.company}</span>}
                  {job.location && <span style={styles.metaItem}>🏢 {job.location}</span>}
                  {job.tags && job.tags.length > 0 && (
                    <>
                      {job.tags.map((tag, index) => (
                        <span key={index} style={styles.metaItem}>👤 {tag}</span>
                      ))}
                    </>
                  )}
                  {job.salary && <span style={styles.metaItem}>💰 {job.salary}</span>}
                </div>
              </div>
              
              <div style={styles.headerRight}>
                <button style={styles.applyButtonTop} onClick={handleApplyClick}>
                  Apply now
                </button>
                {job.created_at && (
                  <span style={styles.timePosted}>{getTimeAgo(job.created_at)}</span>
                )}
              </div>
            </div>
          </div>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Job description</h2>
            <p style={styles.description}>{job.description}</p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Key responsibility</h2>
            <ol style={styles.list}>
              {keyResponsibilities.map((item, index) => (
                <li key={index} style={styles.listItem}>{item}</li>
              ))}
            </ol>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Skills required</h2>
            <ol style={styles.list}>
              {skillsRequired.map((item, index) => (
                <li key={index} style={styles.listItem}>{item}</li>
              ))}
            </ol>
          </section>
        </div>

        <aside style={styles.sidebar}>
          <h3 style={styles.sidebarTitle}>More jobs from {job.company || 'Stock'}</h3>
          <div style={styles.relatedJobs}>
            {relatedJobs.map((relatedJob) => (
              <JobCard
                key={relatedJob.job_id}
                job={relatedJob}
                onViewDetails={onViewDetails}
                onApply={onApply}
              />
            ))}
          </div>
        </aside>
      </div>
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleApplicationSubmit}
        jobTitle={job.title}
        onDone={() => {
          setIsModalOpen(false);
          if (onApply) onApply(job);
        }}
      />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '2rem',
    background: '#f8f9fa',
    minHeight: '100vh',
  },
  contentWrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 400px',
    gap: '2rem',
    '@media (max-width: 1024px)': {
      gridTemplateColumns: '1fr',
    },
  },
  main: {
    background: 'white',
    padding: '2.5rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  backButton: {
    marginBottom: '1.5rem',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    color: '#2563eb',
    fontSize: '1rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  jobHeader: {
    marginBottom: '2rem',
    paddingBottom: '1.5rem',
    borderBottom: '1px solid #e5e7eb',
  },
  headerTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '2rem',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '0.5rem',
  },
  companyIcon: {
    width: '60px',
    height: '60px',
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
    borderRadius: '6px',
  },
  jobTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#1f2937',
  },
  jobMeta: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    fontSize: '0.9rem',
    color: '#666',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
  },
  timePosted: {
    fontSize: '0.85rem',
    color: '#999',
  },
  applyButtonTop: {
    padding: '0.8rem 2rem',
    background: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.2s',
    whiteSpace: 'nowrap',
  },
  jobTags: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  tag: {
    background: '#eff6ff',
    color: '#2563eb',
    padding: '0.4rem 1rem',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '500',
  },
  salaryTag: {
    background: '#ecfdf5',
    color: '#059669',
    padding: '0.4rem 1rem',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '500',
  },
  section: {
    marginBottom: '2rem',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#1f2937',
  },
  description: {
    fontSize: '1rem',
    lineHeight: '1.8',
    color: '#4b5563',
  },
  list: {
    paddingLeft: '1.5rem',
    lineHeight: '2',
  },
  listItem: {
    fontSize: '1rem',
    color: '#4b5563',
    marginBottom: '0.75rem',
  },
  applyButton: {
    width: '100%',
    padding: '1rem 2rem',
    background: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '2rem',
    transition: 'background 0.2s',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  sidebarTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.5rem',
    background: 'white',
    padding: '1rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  relatedJobs: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
};
