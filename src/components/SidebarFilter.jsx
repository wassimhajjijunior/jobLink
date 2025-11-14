import React from 'react';

export default function SidebarFilter({
  categories,
  locations,
  selectedCategories,
  setSelectedCategories,
  selectedLocations,
  setSelectedLocations
}) {
  const toggleCategory = (categoryName) => {
    setSelectedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const toggleLocation = (locationName) => {
    setSelectedLocations(prev =>
      prev.includes(locationName)
        ? prev.filter(l => l !== locationName)
        : [...prev, locationName]
    );
  };

  const styles = {
    sidebar: {
      background: 'white',
      padding: '1.5rem',
      borderRadius: '12px',
      height: 'fit-content',
    },
    filterSection: {
      marginBottom: '2rem',
    },
    filterTitle: {
      fontSize: '1rem',
      marginBottom: '1rem',
      color: '#333',
      fontWeight: '600',
    },
    filterItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '0.8rem',
      fontSize: '0.9rem',
      color: '#666',
    },
    filterCount: {
      marginLeft: 'auto',
      fontSize: '0.85rem',
      color: '#999',
    }
  };

  return (
    <aside style={styles.sidebar}>
      <div style={styles.filterSection}>
        <h3 style={styles.filterTitle}>Categories</h3>
        {categories.map((category, idx) => (
          <div key={idx} style={styles.filterItem}>
            <input
              type="checkbox"
              id={`cat-${idx}`}
              checked={selectedCategories.includes(category.name)}
              onChange={() => toggleCategory(category.name)}
            />
            <label htmlFor={`cat-${idx}`}>{category.name}</label>
            <span style={styles.filterCount}>({category.count})</span>
          </div>
        ))}
      </div>

      <div style={styles.filterSection}>
        <h3 style={styles.filterTitle}>Locations</h3>
        {locations.map((location, idx) => (
          <div key={idx} style={styles.filterItem}>
            <input
              type="checkbox"
              id={`loc-${idx}`}
              checked={selectedLocations.includes(location.name)}
              onChange={() => toggleLocation(location.name)}
            />
            <label htmlFor={`loc-${idx}`}>{location.name}</label>
            <span style={styles.filterCount}>({location.count})</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
