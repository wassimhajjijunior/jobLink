# Job Portal React Application

A clean and interactive **Job Portal** web application built with React. Users can browse jobs, view detailed job descriptions, apply to jobs, and track their applications.

---

## Features

- Job listing with **filters by category and location**.
- Job details page with responsibilities, skills, and related/recommended jobs.
- Apply to jobs and track your applications on the **My Applications page**.
- Clean and responsive UI with vertical list layout for applied jobs.
- Reusable `JobCard` component for listing jobs.

---

## Folder Structure

job-portal/
│

├── public/ # Public static files
│ └── index.html
│

├── src/
│ ├── components/ # React components
│ │ ├── Header.jsx
│ │ ├── HeroSection.jsx
│ │ ├── SidebarFilter.jsx
│ │ ├── JobCard.jsx
│ │ ├── JobDetails.jsx
│ │ └── MyApplicationsPage.jsx
│ │

│ ├── jobsData.json # Sample job data
│ ├── App.jsx # Main App component
│ └── main.jsx # Entry point
│

├── package.json # Project dependencies and scripts
├── package-lock.json
└── README.md

## Installation

1. **Clone the repository**

https://github.com/wassimhajjijunior/jobLink.git
cd job-portal

2. Install dependencies
 npm install 
3. Run the project locally
   npm run dev


### Usage

Browse jobs on the main page.

Click “Learn more” to see job details.

Click “Apply now” to add the job to your applications.

Go to My Applications page to see all applied jobs.

##Notes
All job data is loaded from jobsData.json.
