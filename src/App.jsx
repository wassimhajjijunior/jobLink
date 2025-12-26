// src/App.jsx
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import SidebarFilter from "./components/SidebarFilter";
import JobCard from "./components/JobCard";
import JobDetails from "./components/JobDetails";
import MyApplicationsPage from "./components/MyApplicationsPage";
import ManageJobs from "./components/employer/ManageJobs";
import AddJob from "./components/employer/AddJob";
import ViewApplications from "./components/employer/ViewApplications";
import About from "./components/About";
import Contact from "./components/Contact";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Terms from "./components/Terms";
import { useAuth } from "./contexts/AuthContext";

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentView, setCurrentView] = useState("listing");
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 9; // 9 jobs per page
  const { user } = useAuth();

  // Redirect employers to their dashboard
  useEffect(() => {
    if (user && user.role === 'employer') {
      setCurrentView('manageJobs');
    } else {
      setCurrentView('listing');
    }
  }, [user]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobs");
        const data = await response.json();
        console.log("Fetched jobs:", data);
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const viewJobDetails = (job) => {
    setSelectedJob(job);
    setCurrentView("details");
  };

  const backToListing = () => {
    setSelectedJob(null);
    setCurrentView("listing");
  };

  const categories = React.useMemo(() => {
    const allTags = jobs.flatMap((job) => job.tags || []);
    const uniqueTags = Array.from(new Set(allTags));
    return uniqueTags.map((tag) => ({
      name: tag,
      count: jobs.filter((job) => (job.tags || []).includes(tag)).length,
    }));
  }, [jobs]);

  const locations = React.useMemo(() => {
    const uniqueLocations = Array.from(
      new Set(jobs.map((job) => job.location))
    );
    return uniqueLocations.map((loc) => ({
      name: loc,
      count: jobs.filter((job) => job.location === loc).length,
    }));
  }, [jobs]);

  const filteredJobs = jobs.filter(
    (job) =>
      (selectedCategories.length === 0 ||
        selectedCategories.some((cat) => (job.tags || []).includes(cat))) &&
      (selectedLocations.length === 0 ||
        selectedLocations.includes(job.location)) &&
      (searchQuery === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (searchLocation === "" ||
        job.location.toLowerCase().includes(searchLocation.toLowerCase()))
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, selectedLocations, searchQuery, searchLocation]);

  const handleApply = (job) => {
    if (!appliedJobs.find((j) => j.id === job.id)) {
      setAppliedJobs([...appliedJobs, job]);
      alert(`You applied for ${job.title}`);
    } else {
      alert("You already applied for this job.");
    }
  };
  const applyJob = (job) => {
    // Navigate to MyApplicationsPage after applying
    setCurrentView("applications");
  };


  const styles = {
    container: { 
      minHeight: "100vh", 
      background: "#f8f9fa", 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: "flex",
      flexDirection: "column",
    },
    mainContent: { display: "grid", gridTemplateColumns: "280px 1fr", gap: "2rem", padding: "2rem", alignItems: "start" },
    jobsGrid: { display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "stretch" },
    jobsContainer: { display: "flex", flexDirection: "column", gap: "2rem" },
    pagination: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "0.5rem",
      marginTop: "2rem",
      paddingBottom: "2rem",
    },
    pageButton: {
      padding: "0.5rem 1rem",
      border: "1px solid #e5e7eb",
      background: "white",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "0.9rem",
      minWidth: "40px",
      transition: "all 0.2s",
    },
    pageButtonActive: {
      padding: "0.5rem 1rem",
      border: "1px solid #2563eb",
      background: "#2563eb",
      color: "white",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "0.9rem",
      minWidth: "40px",
      fontWeight: "600",
    },
    pageButtonDisabled: {
      padding: "0.5rem 1rem",
      border: "1px solid #e5e7eb",
      background: "#f8f9fa",
      color: "#999",
      borderRadius: "6px",
      cursor: "not-allowed",
      fontSize: "0.9rem",
      minWidth: "40px",
    },
  };

  return (
    <div style={styles.container}>
      <Header 
        onManageJobs={() => setCurrentView('manageJobs')}
        onViewApplications={() => setCurrentView('viewApplications')}
        onMyApplications={() => setCurrentView('applications')}
        onJobs={() => setCurrentView('listing')}
        currentView={currentView}
        onLogoClick={backToListing}
      />

      {currentView === 'about' && <About />}
      {currentView === 'contact' && <Contact />}
      {currentView === 'privacy' && <PrivacyPolicy />}
      {currentView === 'terms' && <Terms />}

      {!['about', 'contact', 'privacy', 'terms'].includes(currentView) && (
      user && user.role === 'employer' ? (
        // Employer views
        <>
          {currentView === 'manageJobs' && (
            <ManageJobs 
              onAddJob={() => setCurrentView('addJob')}
              onViewApplications={() => setCurrentView('viewApplications')}
            />
          )}

          {currentView === 'addJob' && (
            <AddJob 
              onBack={() => setCurrentView('manageJobs')}
              onJobAdded={() => setCurrentView('manageJobs')}
            />
          )}

          {currentView === 'viewApplications' && (
            <ViewApplications 
              onBack={() => setCurrentView('manageJobs')}
            />
          )}
        </>
      ) : (
        // Applicant views
        <>
          <HeroSection onSearch={(query, location) => {
            setSearchQuery(query);
            setSearchLocation(location);
          }} />

          {currentView === "listing" && (
            <div style={styles.mainContent}>
              <SidebarFilter
                categories={categories}
                locations={locations}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedLocations={selectedLocations}
                setSelectedLocations={setSelectedLocations}
              />

              <div style={styles.jobsContainer}>
                <div style={styles.jobsGrid}>
                  {currentJobs.map((job) => (
                    <JobCard
                      key={job.job_id}
                      job={job}
                      onViewDetails={viewJobDetails}
                      onApply={applyJob}
                    />
                  ))}
                  {filteredJobs.length === 0 && <p>No jobs match your filters.</p>}
                </div>

                {filteredJobs.length > 0 && (
                  <div style={styles.pagination}>
                    <button
                      style={currentPage === 1 ? styles.pageButtonDisabled : styles.pageButton}
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      ‹
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        style={currentPage === page ? styles.pageButtonActive : styles.pageButton}
                        onClick={() => paginate(page)}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      style={currentPage === totalPages ? styles.pageButtonDisabled : styles.pageButton}
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      ›
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {currentView === "details" && (
            <JobDetails
              job={selectedJob}
              onBack={backToListing}
              jobsData={jobs}
              onViewDetails={viewJobDetails}
              onApply={applyJob} 
            />
          )}

          {currentView === "applications" && (
            <MyApplicationsPage
              appliedJobs={appliedJobs}
              onBack={backToListing}
              onViewDetails={viewJobDetails}
            />
          )}
        </>
      ))}
      
      <Footer onNavigate={setCurrentView} />
    </div>
  );
}
