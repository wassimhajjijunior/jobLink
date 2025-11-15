import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function ManageJobs({ onAddJob, onViewApplications }) {
  const [jobs, setJobs] = useState([]);
  const { getToken } = useAuth();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = getToken();
      const response = await fetch('http://localhost:5000/api/employer/jobs', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        console.error('Failed to fetch jobs:', response.status);
        setJobs([]);
        return;
      }
      
      const data = await response.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) {
      return;
    }

    try {
      const token = getToken();
      const response = await fetch(`http://localhost:5000/api/employer/jobs/${jobId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('Job deleted successfully');
        fetchJobs();
      } else {
        alert('Failed to delete job');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('An error occurred');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
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
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
    },
    title: {
      fontSize: '1.8rem',
      fontWeight: '600',
      color: '#1f2937',
    },
    addButton: {
      padding: '0.75rem 1.5rem',
      background: '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '0.95rem',
      fontWeight: '600',
      cursor: 'pointer',
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
    visibleCheckbox: {
      width: '20px',
      height: '20px',
      cursor: 'pointer',
    },
    actionButtons: {
      display: 'flex',
      gap: '0.5rem',
    },
    deleteButton: {
      padding: '0.5rem 1rem',
      background: '#ef4444',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '0.875rem',
      cursor: 'pointer',
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
        <h1 style={styles.title}>Manage Jobs</h1>
        <button style={styles.addButton} onClick={onAddJob}>
          Add new job
        </button>
      </div>

      {jobs.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No jobs posted yet. Click "Add new job" to create your first job posting.</p>
        </div>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>#</th>
                <th style={styles.th}>Job Title</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Location</th>
                <th style={styles.th}>Applicants</th>
                <th style={styles.th}>Visible</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr key={job.job_id}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>{job.title}</td>
                  <td style={styles.td}>{formatDate(job.created_at)}</td>
                  <td style={styles.td}>{job.location}</td>
                  <td style={styles.td}>{job.applicants}</td>
                  <td style={styles.td}>
                    <input
                      type="checkbox"
                      checked={true}
                      readOnly
                      style={styles.visibleCheckbox}
                    />
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actionButtons}>
                      <button
                        style={styles.deleteButton}
                        onClick={() => handleDelete(job.job_id)}
                      >
                        Delete
                      </button>
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
