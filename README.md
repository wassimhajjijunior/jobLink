# 📌 JobLink — Full-Stack Job Portal Application

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)

A modern, full-stack job portal application designed to connect job seekers with employers. Built with a robust **Node.js** backend and a dynamic **React** frontend, JobLink offers a seamless experience for browsing jobs, managing applications, and recruiting talent.

---

## 🚀 Key Features

### 👨‍💼 For Employers
*   **Post Jobs**: Create detailed job listings with requirements, salary, and tags.
*   **Manage Listings**: Edit or remove job posts as needed.
*   **View Applications**: Review applicants for your posted jobs.
*   **Dashboard**: A dedicated area to manage recruitment efforts.

### 👨‍💻 For Job Seekers
*   **Smart Search**: Filter jobs by location, category (tags), and keywords.
*   **Easy Application**: Apply to jobs instantly with a résumé link.
*   **Application Tracking**: Monitor the status of your applications (Pending, Accepted, Rejected).
*   **Responsive Design**: Optimized for both desktop and mobile devices.

---

## 🛠 Tech Stack

### **Frontend**
*   **Framework**: React 19 (via Vite)
*   **Styling**: Tailwind CSS 4
*   **State Management**: React Context API
*   **Routing**: React Router (implied)

### **Backend**
*   **Runtime**: Node.js
*   **Framework**: Express 5
*   **Database**: MySQL
*   **ORM**: Drizzle ORM
*   **Authentication**: JWT & Bcrypt

---

## 📂 Project Structure

```
jobLink/
├── backend/                # Backend logic (Express + Drizzle)
│   ├── drizzle/            # Database migrations
│   ├── src/
│   │   ├── db/             # Database connection & schema
│   │   ├── middleware/     # Auth & error handling middleware
│   │   ├── public/         # Static assets (resumes)
│   │   ├── routes/         # API endpoints (Auth, Jobs)
│   │   ├── utils/          # Helper functions
│   │   └── index.js        # Entry point
│   ├── .env                # Backend environment variables
│   └── package.json
│
├── src/                    # Frontend logic (React)
│   ├── assets/             # Images & static files
│   ├── components/         # Reusable UI components
│   │   ├── employer/       # Employer-specific components
│   │   └── ...
│   ├── contexts/           # Global state (AuthContext)
│   ├── App.jsx             # Main application component
│   └── main.jsx            # Frontend entry point
│
├── index.html              # HTML entry point
├── package.json            # Frontend dependencies
├── vite.config.js          # Vite configuration
└── README.md               # Project documentation
```

---

## ⚙️ Getting Started

Follow these steps to set up the project locally.

### Prerequisites
*   **Node.js** (v18+ recommended)
*   **MySQL** installed and running

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/wassimhajjijunior/jobLink.git
cd jobLink
```

### 2️⃣ Database Setup
Create a MySQL database named `joblink_db`:
```sql
CREATE DATABASE joblink_db;
```

### 3️⃣ Backend Setup
Navigate to the backend folder and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
DATABASE_URL=mysql://root:YOUR_PASSWORD@localhost:3306/joblink_db
JWT_SECRET=your_super_secret_key
PORT=3001
```

Run migrations and seed the database:
```bash
npm run generate   # Generate SQL migrations
npm run migrate    # Apply migrations to DB
npm run seed       # (Optional) Seed with test data
```

Start the backend server:
```bash
npm start
```
*The backend will run on `http://localhost:3001`*

### 4️⃣ Frontend Setup
Open a new terminal in the **root** directory (`jobLink/`) and install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```
*The frontend will run on `http://localhost:5173`*

---

## 🔌 API Documentation

### Authentication
*   `POST /api/auth/register` - Register a new user (Applicant or Employer)
*   `POST /api/auth/login` - Authenticate user and get token

### Jobs
*   `GET /api/jobs` - Fetch all job listings
*   `GET /api/jobs/:id` - Get details of a specific job
*   `POST /api/jobs` - Create a new job (Employer only) *[Implied]*

### Applications
*   `POST /api/applications` - Apply for a job (Applicant only)
*   `GET /api/applications` - View my applications

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Commit your changes (`git commit -m 'Add some feature'`).
4.  Push to the branch (`git push origin feature/YourFeature`).
5.  Open a Pull Request.

---

## 👥 Authors

*   **Wassim Hajji**
*   **Mohsen Khouaja**
*   **Khalifa Bouneb**
*   **Hadil Karous**

---

Made with ❤️ for the Web Development Project.
