import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function AddJob({ onBack, onJobAdded }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Programming',
    location: 'Bangalore',
    level: 'Senior Level',
    salary: '',
  });
  const { getToken, user } = useAuth();

  const categories = ['Programming', 'Marketing', 'Design', 'Sales', 'Finance', 'HR'];
  const locations = ['Bangalore', 'New York, NY', 'San Francisco, CA', 'Austin, TX', 'Remote'];
  const levels = ['Entry Level', 'Junior Level', 'Mid Level', 'Senior Level'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = getToken();
      const response = await fetch('http://localhost:5000/api/employer/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          company: user.name, // Use employer's name as company
        }),
      });

      if (response.ok) {
        alert('Job added successfully!');
        onJobAdded();
      } else {
        alert('Failed to add job');
      }
    } catch (error) {
      console.error('Error adding job:', error);
      alert('An error occurred');
    }
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '2rem auto',
      padding: '2rem',
      background: '#fff',
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
    profileLogout: {
      display: 'flex',
      gap: '1rem',
    },
    link: {
      color: '#666',
      textDecoration: 'none',
      fontSize: '0.95rem',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    label: {
      fontSize: '0.95rem',
      fontWeight: '500',
      color: '#374151',
    },
    input: {
      padding: '0.75rem',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: '0.95rem',
    },
    textarea: {
      padding: '0.75rem',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: '0.95rem',
      minHeight: '120px',
      resize: 'vertical',
    },
    select: {
      padding: '0.75rem',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: '0.95rem',
      background: 'white',
    },
    row: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '1rem',
    },
    addButton: {
      padding: '0.75rem 2rem',
      background: '#000',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '0.95rem',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '1rem',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Add Job</h1>
        <div style={styles.profileLogout}>
          <a href="#" style={styles.link}>My Profile</a>
          <a href="#" style={styles.link}>Logout</a>
        </div>
      </div>

      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={styles.input}
            placeholder="Type here"
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Job Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={styles.textarea}
            placeholder="Type here"
            required
          />
        </div>

        <div style={styles.row}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Job Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={styles.select}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Job Location</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              style={styles.select}
            >
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Job Level</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              style={styles.select}
            >
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Salary</label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            style={styles.input}
            placeholder="0"
          />
        </div>

        <button type="submit" style={styles.addButton}>
          ADD
        </button>
      </form>
    </div>
  );
}
