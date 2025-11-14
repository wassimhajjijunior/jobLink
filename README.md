# JobLink - Full Stack Job Portal Application# Job Portal React Application

A modern, full-stack **Job Portal** web application built with React, Express.js, and MySQL. Users can browse jobs with advanced filtering, view detailed job descriptions, apply to positions, and track their applications with real-time status updates.A clean and interactive **Job Portal** web application built with React. Users can browse jobs, view detailed job descriptions, apply to jobs, and track their applications.

---

## 🚀 Features## Features

### Job Browsing & Search- Job listing with **filters by category and location**.

- **Advanced Filtering**: Filter jobs by categories (tags) and locations- Job details page with responsibilities, skills, and related/recommended jobs.

- **Live Search**: Real-time search by job title and location- Apply to jobs and track your applications on the **My Applications page**.

- **Pagination**: Browse through jobs with 9 items per page- Clean and responsive UI with vertical list layout for applied jobs.

- **Responsive Cards**: Consistent height job cards with hover effects- Reusable `JobCard` component for listing jobs.

### Job Details---

- **Comprehensive View**: Full job descriptions with responsibilities and required skills

- **Related Jobs**: Sidebar showing similar positions from the same company or location## Installation

- **Apply Feature**: One-click application submission with resume URL

- **Posted Time**: Display how long ago each job was posted1. **Clone the repository** (open cmd)

cd desktop

### User Managementgit clone https://github.com/wassimhajjijunior/jobLink.git

- **Authentication**: Secure JWT-based login and registration"open the project in VsCode"

- **User Roles**: Support for applicants and employers"open the terminal"

- **Protected Routes**: Authentication required for certain features npm install

npm run dev

### Application Tracking

- **My Applications Page**: Professional table view of all submitted applications

- **Status Tracking**: Monitor application status (Pending/Accepted/Rejected)### Usage

- **Color-Coded Status**: Visual indicators for each application status

- **Resume Management**: Store and manage resume URLsBrowse jobs on the main page.

---Click “Learn more” to see job details.

## 🛠️ Tech StackClick “Apply now” to add the job to your applications.

### FrontendGo to My Applications page to see all applied jobs.

- **React** 19.2.0 - UI library

- **Vite** - Build tool and dev server##Notes

- **Tailwind CSS** 4.1.17 - Utility-first CSS frameworkAll job data is loaded from jobsData.json.

- **Context API** - State management for authentication

### Backend

- **Node.js** with ES Modules
- **Express.js** 5.1.0 - Web framework
- **MySQL2** - Database driver
- **Drizzle ORM** - Type-safe database toolkit
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### Development Tools

- **ESLint** - Code linting
- **Drizzle Kit** - Database migrations
- **Faker.js** - Test data generation

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **MySQL** (v8 or higher)
- **Git**

---

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
cd ~/Desktop
git clone https://github.com/wassimhajjijunior/jobLink.git
cd jobLink
```

### 2. Database Setup

#### Create MySQL Database

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE joblink_db;
EXIT;
```

#### Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cd backend
touch .env
```

Add the following to `.env`:

```env
DATABASE_URL=mysql://root:your_password@localhost:3306/joblink_db
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=3001
```

**Important**: Replace `your_password` with your MySQL root password and `your_super_secret_jwt_key_change_this_in_production` with a secure random string.

### 3. Backend Setup

```bash
# Navigate to backend directory (if not already there)
cd backend

# Install dependencies
npm install

# Generate database schema
npm run generate

# Run migrations
npm run migrate

# Seed the database with sample data
npm run seed

# Start the backend server
npm start
```

The backend server will start on `http://localhost:3001`

### 4. Frontend Setup

Open a **new terminal** window/tab:

```bash
# Navigate to project root
cd ~/Desktop/jobLink

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will start on `http://localhost:5173` (or another port if 5173 is busy)

---

## 🎯 Usage

### Browsing Jobs

1. Open your browser and navigate to `http://localhost:5173`
2. Browse through the job listings on the main page
3. Use filters to narrow down jobs by category or location
4. Use the search bar for live searching by job title or location
5. Navigate through pages using pagination controls

### Viewing Job Details

1. Click on any job card or "Learn more" button
2. View full job description, responsibilities, and required skills
3. Check related jobs in the sidebar
4. See when the job was posted

### Applying for Jobs

1. **Register/Login**: Click "Register" or "Login" in the header
2. **View Job Details**: Navigate to any job details page
3. **Click Apply Now**: Button at the top right of the job details
4. **Enter Resume URL**: Provide your resume URL when prompted
5. **Submit**: Application is saved to the database

### Tracking Applications

1. After applying, you'll be redirected to "My Applications" page
2. View all your applications in a professional table format
3. See application status (Pending/Accepted/Rejected)
4. View company name, job title, location, and application date

---

## 📁 Project Structure

```
jobLink/
├── backend/                 # Backend server
│   ├── src/
│   │   ├── db/
│   │   │   ├── index.js            # Database connection
│   │   │   ├── schema.js           # Database schema (users, jobs, applications)
│   │   │   └── seeders/
│   │   │       └── seed.js         # Database seeding script
│   │   ├── middleware/
│   │   │   └── auth.js             # JWT authentication middleware
│   │   ├── routes/
│   │   │   └── auth.js             # Authentication routes
│   │   └── index.js                # Main server file
│   ├── drizzle/                    # Migration files
│   ├── drizzle.config.js           # Drizzle ORM configuration
│   ├── package.json
│   └── .env                        # Environment variables (create this)
│
├── src/                     # Frontend application
│   ├── components/
│   │   ├── Header.jsx              # Navigation header
│   │   ├── HeroSection.jsx         # Search bar section
│   │   ├── SidebarFilter.jsx       # Filter sidebar
│   │   ├── JobCard.jsx             # Job listing card
│   │   ├── JobDetails.jsx          # Job details page
│   │   ├── MyApplicationsPage.jsx  # Applications tracking page
│   │   ├── LoginModal.jsx          # Login modal
│   │   └── RegisterModal.jsx       # Registration modal
│   ├── contexts/
│   │   └── AuthContext.jsx         # Authentication context
│   ├── App.jsx                     # Main application component
│   ├── main.jsx                    # Application entry point
│   └── index.css                   # Global styles
│
├── public/                  # Static assets
├── package.json             # Frontend dependencies
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── README.md                # This file
```

---

## 🔐 API Endpoints

### Public Endpoints

- `GET /api/jobs` - Get all jobs with tags
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Protected Endpoints (Require JWT Token)

- `GET /api/jobs/:id` - Get specific job details
- `POST /api/applications` - Submit job application
- `GET /api/applications` - Get user's applications with job details

---

## 🗃️ Database Schema

### Users Table

- `user_id` (Primary Key)
- `name`
- `email` (Unique)
- `password` (Hashed)
- `role` (applicant/employer)

### Jobs Table

- `job_id` (Primary Key)
- `title`
- `description`
- `company`
- `location`
- `salary`
- `tags` (JSON array)
- `employer_id` (Foreign Key)
- `created_at`

### Applications Table

- `application_id` (Primary Key)
- `job_id` (Foreign Key)
- `applicant_id` (Foreign Key)
- `resume_url`
- `status` (pending/accepted/rejected)
- `applied_at`
- `updated_at`

---

## 🧪 Testing Credentials

After running the seed script, you can create a test account:

- Register a new account through the UI
- Or create one manually in the database

Default employer password (for seeded data): `password123`

---

## 🚀 Deployment

### Backend Deployment

1. Set up a MySQL database on your hosting provider
2. Update `.env` with production database credentials
3. Run migrations: `npm run migrate`
4. Start server: `npm start`

### Frontend Deployment

1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting provider (Vercel, Netlify, etc.)
3. Update API base URLs to point to your production backend

---

## 🐛 Troubleshooting

### Backend won't start

- Ensure MySQL is running
- Check database credentials in `.env`
- Verify port 3001 is not in use

### Frontend can't connect to backend

- Ensure backend is running on port 3001
- Check CORS configuration in backend
- Verify API URLs in frontend components

### Database errors

- Run migrations: `npm run migrate`
- Check MySQL user permissions
- Ensure database exists

### Authentication issues

- Clear browser localStorage
- Check JWT_SECRET is set in `.env`
- Verify token expiration (default: 7 days)

---

## 📝 Scripts

### Backend Scripts

```bash
npm start          # Start the server
npm run dev        # Start with auto-reload
npm run generate   # Generate migrations
npm run migrate    # Run migrations
npm run seed       # Seed database with sample data
```

### Frontend Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👥 Authors

- **Wassim Hajji Junior** - [GitHub](https://github.com/wassimhajjijunior)

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Drizzle ORM for type-safe database operations
- Tailwind CSS for utility-first styling
- All contributors and users of this project

---

## 📞 Support

For support, email your-email@example.com or open an issue on GitHub.
