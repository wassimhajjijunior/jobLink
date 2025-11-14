// src/App.jsx
import React, { useState, useMemo } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import SidebarFilter from "./components/SidebarFilter";
import JobCard from "./components/JobCard";
import JobDetails from "./components/JobDetails";
import MyApplicationsPage from "./components/MyApplicationsPage";
import jobsData from "./jobsData.json";

export default function App() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentView, setCurrentView] = useState("listing");
  const [appliedJobs, setAppliedJobs] = useState([]);

  const viewJobDetails = (job) => {
    setSelectedJob(job);
    setCurrentView("details");
  };

  const backToListing = () => {
    setSelectedJob(null);
    setCurrentView("listing");
  };

  const categories = useMemo(() => {
    const allTags = jobsData.flatMap((job) => job.tags);
    const uniqueTags = Array.from(new Set(allTags));
    return uniqueTags.map((tag) => ({
      name: tag,
      count: jobsData.filter((job) => job.tags.includes(tag)).length,
    }));
  }, []);

  const locations = useMemo(() => {
    const uniqueLocations = Array.from(
      new Set(jobsData.map((job) => job.location))
    );
    return uniqueLocations.map((loc) => ({
      name: loc,
      count: jobsData.filter((job) => job.location === loc).length,
    }));
  }, []);

  const filteredJobs = jobsData.filter(
    (job) =>
      (selectedCategories.length === 0 ||
        selectedCategories.some((cat) => job.tags.includes(cat))) &&
      (selectedLocations.length === 0 ||
        selectedLocations.includes(job.location))
  );

  const handleApply = (job) => {
    if (!appliedJobs.find((j) => j.id === job.id)) {
      setAppliedJobs([...appliedJobs, job]);
      alert(`You applied for ${job.title}`);
    } else {
      alert("You already applied for this job.");
    }
  };
  const applyJob = (job) => {
  // avoid duplicates
  if (!appliedJobs.some(j => j.id === job.id)) {
    setAppliedJobs([...appliedJobs, job]);
  }
  setCurrentView("applications"); // switch to MyApplicationsPage
};


  const styles = {
    container: { minHeight: "100vh", background: "#f8f9fa", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
    mainContent: { display: "grid", gridTemplateColumns: "280px 1fr", gap: "2rem", padding: "2rem" },
    jobsGrid: { display: "flex", flexWrap: "wrap", gap: "1rem" },
  };

  return (
    <div style={styles.container}>
      <Header />

      <HeroSection />

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

          <div style={styles.jobsGrid}>
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onViewDetails={viewJobDetails}
               onApply={applyJob}
              />
            ))}
            {filteredJobs.length === 0 && <p>No jobs match your filters.</p>}
          </div>
        </div>
      )}

      {currentView === "details" && (
        <JobDetails
          job={selectedJob}
          onBack={backToListing}
          jobsData={jobsData}
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
    </div>
  );
}
