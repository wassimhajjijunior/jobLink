import React from 'react';
import JobCard from './JobCard';
import jobsData from '../jobsData.json';

export default function JobDetails({ job, onBack , onViewDetails}) {
  if (!job) return null;

  const relatedJobs = jobsData.filter(j => j.company === job.company && j.id !== job.id);

  const recommendedJobs = jobsData
    .filter(j => j.id !== job.id)
    .slice(0, 3);

  return (
    <div style={styles.container}>
      <button onClick={onBack} style={styles.backButton}>← Back to jobs</button>

      <div style={styles.contentWrapper}>
        <div style={styles.main}>
          <div style={styles.jobHeader}>
            <h1 style={styles.jobTitle}>{job.title}</h1>
            <p style={styles.jobMeta}>
              💼 {job.company} | 📍 {job.location} | 👤 {job.level} {job.salary && `| 💰 ${job.salary}`}
            </p>
          </div>

          <p style={styles.jobDescription}>{job.fullDescription}</p>

          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>Responsibilities</h3>
            <ul style={styles.list}>
              {job.responsibilities.map((r, idx) => (
                <li key={idx} style={styles.listItem}>• {r}</li>
              ))}
            </ul>
          </section>

          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>Skills Required</h3>
            <ul style={styles.list}>
              {job.skills.map((s, idx) => (
                <li key={idx} style={styles.listItem}>• {s}</li>
              ))}
            </ul>
          </section>

          <button style={styles.applyButton} onClick={() => alert('Applied!')}>Apply Now</button>

          <section style={{ marginTop: '2rem' }}>
            <h3 style={styles.sectionTitle}>More jobs from {job.company}</h3>
            {relatedJobs.length === 0 ? (
              <p style={{ color: '#555', marginTop: '0.5rem' }}>No other jobs from this company.</p>
            ) : (
              <div style={styles.relatedJobsContainer}>
                {relatedJobs.map(j => (
                  <JobCard key={j.id} job={j}  onViewDetails={onViewDetails}  />
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Recommended jobs on the right */}
        <aside style={styles.sidebar}>
          <h3 style={styles.sectionTitle}>Recommended Jobs</h3>
          <div style={styles.relatedJobsContainer}>
            {recommendedJobs.map(j => (
              <JobCard key={j.id} job={j}  onViewDetails={onViewDetails} />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '2rem auto',
    padding: '1.5rem',
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
    fontFamily: 'sans-serif',
    color: '#333',
  },
  backButton: {
    marginBottom: '1rem',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    color: '#2563eb',
    fontSize: '1rem',
    fontWeight: '500',
  },
  contentWrapper: {
    display: 'flex',
    gap: '2rem',
  },
  main: {
    flex: 2,
  },
  sidebar: {
    flex: 1,
    borderLeft: '1px solid #e0e0e0',
    paddingLeft: '1.5rem',
  },
  jobHeader: {
    marginBottom: '1rem',
  },
  jobTitle: {
    fontSize: '2rem',
    marginBottom: '0.3rem',
    color: '#111',
  },
  jobMeta: {
    color: '#666',
    fontSize: '0.95rem',
  },
  jobDescription: {
    marginBottom: '2rem',
    lineHeight: 1.6,
    fontSize: '1rem',
    color: '#444',
  },
  section: {
    marginBottom: '1.8rem',
  },
  sectionTitle: {
    fontSize: '1.2rem',
    marginBottom: '0.8rem',
    color: '#222',
  },
  list: {
    paddingLeft: '1.2rem',
    margin: 0,
  },
  listItem: {
    marginBottom: '0.5rem',
    lineHeight: 1.5,
  },
  applyButton: {
    background: '#2563eb',
    color: '#fff',
    padding: '0.7rem 1.5rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
  },
  relatedJobsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '0.5rem',
  },
};
 