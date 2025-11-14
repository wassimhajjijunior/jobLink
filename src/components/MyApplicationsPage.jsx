import React from "react";

export default function MyApplicationsPage({ appliedJobs, onBack, onViewDetails }) {
  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={onBack}>← Back to all jobs</button>

      <h1 style={styles.title}>My Applications</h1>
      <p style={styles.subtitle}>Track your job applications and their status</p>

      {appliedJobs.length === 0 ? (
        <div style={styles.emptyState}>
          <p>You haven't applied to any jobs yet.</p>
        </div>
      ) : (
        <ul style={styles.list}>
          {appliedJobs.map((job) => (
            <li key={job.id} style={styles.listItem}>
              <div style={styles.jobInfo}>
                <h3 style={styles.jobTitle}>{job.title}</h3>
                <p style={styles.jobMeta}>
                  💼 {job.company} | 📍 {job.location} | 👤 {job.level}
                </p>
              </div>
              <div style={styles.actions}>
                <button 
                  style={styles.viewButton} 
                  onClick={() => onViewDetails(job)}
                >
                  View Details
                </button>
                <span style={styles.appliedTag}>Applied</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "2rem auto",
    padding: "2rem",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
    fontFamily: "sans-serif",
    color: "#333",
  },
  backButton: {
    marginBottom: "1rem",
    cursor: "pointer",
    background: "none",
    border: "none",
    color: "#2563eb",
    fontSize: "1rem",
    fontWeight: "500",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "0.3rem",
    color: "#111",
  },
  subtitle: {
    fontSize: "1rem",
    marginBottom: "2rem",
    color: "#555",
  },
  emptyState: {
    textAlign: "center",
    padding: "3rem",
    color: "#666",
    fontSize: "1rem",
    border: "1px dashed #e0e0e0",
    borderRadius: "8px",
    background: "#fafafa",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 1.5rem",
    marginBottom: "1rem",
    borderRadius: "8px",
    background: "#f9f9f9",
    border: "1px solid #e0e0e0",
    transition: "background 0.2s",
  },
  listItemHover: {
    background: "#f1f5f9",
  },
  jobInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
  },
  jobTitle: {
    margin: 0,
    fontSize: "1.2rem",
    fontWeight: "500",
    color: "#111",
  },
  jobMeta: {
    margin: 0,
    fontSize: "0.9rem",
    color: "#555",
  },
  actions: {
    display: "flex",
    gap: "0.5rem",
    alignItems: "center",
  },
  viewButton: {
    background: "#2563eb",
    color: "#fff",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "500",
  },
  appliedTag: {
    background: "#d1fae5",
    color: "#065f46",
    padding: "0.3rem 0.8rem",
    borderRadius: "6px",
    fontSize: "0.8rem",
    fontWeight: "500",
  },
};
