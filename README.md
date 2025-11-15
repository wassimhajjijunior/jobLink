# 📌 JobLink — Full-Stack Job Portal Application

A modern job-portal web application built with **React**, **Express.js**, and **MySQL**.
Users can browse job listings, filter results, view job details, apply online, and track their applications.

---

## 🚀 Why This Tech Stack?

### **Frontend – React + Vite + Tailwind**

* React provides a component-based architecture and fast re-rendering for dynamic UI.
* Vite ensures extremely fast development and optimized builds.
* Tailwind CSS offers a utility-first styling approach for rapid design and consistent layout.

### **Backend – Node.js + Express**

* Lightweight, flexible, and widely used in industry.
* Perfect for building REST APIs quickly.
* Easy integration with authentication and middleware.

### **Database – MySQL + Drizzle ORM**

* MySQL is reliable, performant, and widely supported.
* Drizzle ORM provides a type-safe schema, clean migrations, and developer-friendly queries.

This stack was chosen to build a **simple, fast, scalable** job marketplace with clean code and reliable authentication.

---

# 🌟 Features

### 🔎 Job Browsing & Search

* Filter jobs by **location** and **tags** (category).
* Search by title or location with instant results.
* Pagination (9 jobs per page).
* Responsive job cards with hover animations.

### 📄 Job Details Page

* Full description (responsibilities, requirements).
* Display of **similar jobs** based on company or location.

### 📝 Job Application System

* "Apply Now" button available on each job page.
* User submits résumé URL.
* Application stored in database and linked to user/job.

### ⭐ My Applications Page

* Users can track their submissions.
* Displays job title, company, location, date applied.
* Color-coded status: **Pending**, **Accepted**, **Rejected**.

### 🔐 User Authentication

* JWT-based login and registration.
* Two user roles:

  * **Applicant**
  * **Employer**
* Password hashing with bcrypt.
* Protected routes for authenticated functionality.

### 🧱 API & Data Layer

* CRUD endpoints for jobs, users, and applications.
* Drizzle ORM for typed database schema & migrations.

---

# 🛠 Tech Stack

### **Frontend**

* React 19
* Vite
* Tailwind CSS 4
* React Context API

### **Backend**

* Node.js
* Express 5
* MySQL2
* Drizzle ORM
* JWT Authentication
* Bcrypt
* CORS

### **Dev Tools**

* ESLint
* Drizzle Kit (migrations)
* Faker.js (test data seeding)

---

# 📁 Project Structure

```
jobLink/
├── backend/
│   ├── src/
│   │   ├── db/ (schema, connection, seed)
│   │   ├── routes/ (auth, jobs, applications)
│   │   ├── middleware/auth.js
│   │   └── index.js
│   ├── drizzle/ (migrations)
│   ├── .env
│   └── package.json
│
└── src/ (frontend React)
    ├── components/
    ├── contexts/AuthContext.jsx
    ├── App.jsx
    ├── main.jsx
    └── index.css
```

---

# ⚙️ Setup & Installation

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/wassimhajjijunior/jobLink.git
cd jobLink
```

---

## 2️⃣ Create the MySQL Database

Open MySQL:

```sql
CREATE DATABASE joblink_db;
```

---

## 3️⃣ Create Backend Environment File

Inside `/backend/.env`:

```
DATABASE_URL=mysql://root:YOUR_PASSWORD@localhost:3306/joblink_db
JWT_SECRET=some_super_secret_key
PORT=3001
```

---

## 4️⃣ Install Backend Dependencies

```bash
cd backend
npm install
npm run generate   # generate schema
npm run migrate    # run DB migrations
npm run seed       # insert test data
npm start          # start backend
```

---

## 5️⃣ Install Frontend Dependencies

Open another terminal:

```bash
cd frontend-or-project-root
npm install
npm run dev
```

Frontend will run at:
👉 `http://localhost:5173`

---

# ▶️ How to Use

* Browse all job offers on homepage.
* Apply filters or search by keywords.
* Click on a job card for detailed information.
* Register / Login to apply.
* Submit your résumé URL.
* Track all your applications in the **My Applications** page.

---

# 🔌 API Endpoints

### **Auth**

* `POST /api/auth/register`
* `POST /api/auth/login`

### **Jobs**

* `GET /api/jobs`
* `GET /api/jobs/:id`

### **Applications** (Protected)

* `POST /api/applications`
* `GET /api/applications`

---

# 🗄 Database Schema

### **Users**

* user_id
* name
* email
* password (hashed)
* role

### **Jobs**

* job_id
* title
* description
* company
* location
* salary
* tags (JSON array)
* employer_id
* created_at

### **Applications**

* application_id
* job_id
* applicant_id
* resume_url
* status
* applied_at
* updated_at

---



# 🛠 Useful Commands

### Backend

* `npm start`
* `npm run dev`
* `npm run migrate`
* `npm run seed`

### Frontend

* `npm run dev`
* `npm run build`
* `npm run preview`

---

# 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push your branch
5. Create a pull request

---

# 🙌 Author

**Wassim Hajji**  
**MOHSEN KHOUAJA** 
**KHALIFA BOUNEB** 
**HADIL KAROUS**


