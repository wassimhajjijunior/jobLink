import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function ViewApplications({ onBack }) {
  const [applications, setApplications] = useState([]);
  const [actionMenuOpen, setActionMenuOpen] = useState(null);
  const { getToken } = useAuth();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = getToken();
      const response = await fetch('http://localhost:5000/api/employer/applications', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const handleStatusChange = async (applicationId, status) => {
    try {
      const token = getToken();
      const response = await fetch(`http://localhost:5000/api/employer/applications/${applicationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        alert(`Application ${status}!`);
        fetchApplications();
        setActionMenuOpen(null);
      } else {
        alert('Failed to update application');
      }
    } catch (error) {
      console.error('Error updating application:', error);
      alert('An error occurred');
    }
  };

  const getUserInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '2rem auto',
      padding: '2rem',
      background: '#fff',
      minHeight: '100vh',
    },
    header: {
      marginBottom: '2rem',
    },
    title: {
      fontSize: '1.8rem',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '0.5rem',
    },
    tableContainer: {
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      overflow: 'hidden',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      padding: '1rem 1.5rem',
      textAlign: 'left',
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#6b7280',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      background: '#f9fafb',
      borderBottom: '1px solid #e5e7eb',
    },
    td: {
      padding: '1.25rem 1.5rem',
      fontSize: '0.95rem',
      color: '#374151',
      borderBottom: '1px solid #e5e7eb',
    },
    userCell: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    },
    avatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '1rem',
    },
    resumeLink: {
      color: '#2563eb',
      textDecoration: 'none',
      cursor: 'pointer',
    },
    actionCell: {
      position: 'relative',
    },
    menuButton: {
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: '#666',
    },
    actionMenu: {
      position: 'absolute',
      right: '0',
      top: '100%',
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      zIndex: 10,
      minWidth: '120px',
    },
    menuItem: {
      padding: '0.75rem 1rem',
      border: 'none',
      background: 'none',
      width: '100%',
      textAlign: 'left',
      cursor: 'pointer',
      fontSize: '0.9rem',
    },
    acceptItem: {
      color: '#059669',
    },
    rejectItem: {
      color: '#dc2626',
    },
    emptyState: {
      textAlign: 'center',
      padding: '3rem',
      color: '#666',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>View Applications</h1>
      </div>

      {applications.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No applications received yet.</p>
        </div>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>#</th>
                <th style={styles.th}>User name</th>
                <th style={styles.th}>Job Title</th>
                <th style={styles.th}>Location</th>
                <th style={styles.th}>Resume</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr key={app.application_id}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>
                    <div style={styles.userCell}>
                      <div style={styles.avatar}>
                        {getUserInitial(app.applicant_name)}
                      </div>
                      <span>{app.applicant_name}</span>
                    </div>
                  </td>
                  <td style={styles.td}>{app.job_title}</td>
                  <td style={styles.td}>{app.location}</td>
                  <td style={styles.td}>
                    <a
                      href={app.resume_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.resumeLink}
                    >
                      Resume ↓
                    </a>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actionCell}>
                      <button
                        style={styles.menuButton}
                        onClick={() => setActionMenuOpen(
                          actionMenuOpen === app.application_id ? null : app.application_id
                        )}
                      >
                        ⋯
                      </button>
                      {actionMenuOpen === app.application_id && (
                        <div style={styles.actionMenu}>
                          <button
                            style={{ ...styles.menuItem, ...styles.acceptItem }}
                            onClick={() => handleStatusChange(app.application_id, 'accepted')}
                          >
                            Accept
                          </button>
                          <button
                            style={{ ...styles.menuItem, ...styles.rejectItem }}
                            onClick={() => handleStatusChange(app.application_id, 'rejected')}
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
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
