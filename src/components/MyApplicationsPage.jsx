import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function MyApplicationsPage({ onBack, onViewDetails }) {
  const [applications, setApplications] = useState([]);
  const [resumeUrl, setResumeUrl] = useState('');
  const { getToken, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchApplications = async () => {
      try {
        const token = getToken();
        const response = await fetch("http://localhost:3001/api/applications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, [getToken, isAuthenticated]);

  const getStatusStyle = (status) => {
    switch(status) {
      case 'pending':
        return { background: '#dbeafe', color: '#1e40af' };
      case 'accepted':
        return { background: '#dcfce7', color: '#166534' };
      case 'rejected':
        return { background: '#fee2e2', color: '#991b1b' };
      default:
        return { background: '#e5e7eb', color: '#374151' };
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  const getCompanyInitial = (company) => {
    return company ? company.charAt(0).toUpperCase() : 'C';
  };

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={onBack}>← Back to all jobs</button>

      <div style={styles.resumeSection}>
        <h2 style={styles.resumeTitle}>Your Resume</h2>
        <div style={styles.resumeActions}>
          <input 
            type="text" 
            placeholder="Enter resume URL"
            value={resumeUrl}
            onChange={(e) => setResumeUrl(e.target.value)}
            style={styles.resumeInput}
          />
          <button style={styles.editButton}>Edit</button>
          <button style={styles.uploadButton}>☁️</button>
        </div>
      </div>

      <h2 style={styles.sectionTitle}>Jobs Applied</h2>

      {applications.length === 0 ? (
        <div style={styles.emptyState}>
          <p>You haven't applied to any jobs yet.</p>
        </div>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>Company</th>
                <th style={styles.th}>Job Title</th>
                <th style={styles.th}>Location</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.application_id} style={styles.tableRow}>
                  <td style={styles.td}>
                    <div style={styles.companyCell}>
                      <div style={styles.companyLogo}>
                        {getCompanyInitial(app.company)}
                      </div>
                      <span>{app.company}</span>
                    </div>
                  </td>
                  <td style={styles.td}>{app.job_title}</td>
                  <td style={styles.td}>{app.location}</td>
                  <td style={styles.td}>{formatDate(app.applied_at)}</td>
                  <td style={styles.td}>
                    <span style={{...styles.statusBadge, ...getStatusStyle(app.status)}}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "2rem auto",
    padding: "2rem",
    background: "#fff",
    minHeight: "100vh",
  },
  backButton: {
    marginBottom: "2rem",
    cursor: "pointer",
    background: "none",
    border: "none",
    color: "#2563eb",
    fontSize: "1rem",
    fontWeight: "500",
  },
  resumeSection: {
    marginBottom: "3rem",
  },
  resumeTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "1rem",
    color: "#1f2937",
  },
  resumeActions: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },
  resumeInput: {
    flex: 1,
    padding: "0.75rem 1rem",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "0.95rem",
    background: "#eff6ff",
    color: "#2563eb",
  },
  editButton: {
    padding: "0.75rem 1.5rem",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    background: "white",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: "500",
  },
  uploadButton: {
    padding: "0.75rem 1rem",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontSize: "1.2rem",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "1.5rem",
    color: "#1f2937",
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
  tableContainer: {
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    overflow: "hidden",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    background: "#f9fafb",
    borderBottom: "1px solid #e5e7eb",
  },
  th: {
    padding: "1rem 1.5rem",
    textAlign: "left",
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  tableRow: {
    borderBottom: "1px solid #e5e7eb",
    transition: "background 0.2s",
  },
  td: {
    padding: "1.25rem 1.5rem",
    fontSize: "0.95rem",
    color: "#374151",
  },
  companyCell: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  companyLogo: {
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: "1.1rem",
  },
  statusBadge: {
    padding: "0.5rem 1rem",
    borderRadius: "20px",
    fontSize: "0.875rem",
    fontWeight: "600",
    display: "inline-block",
  },
};
