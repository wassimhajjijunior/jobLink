# Employer Functionality Testing Guide

## Overview

The JobLink application now supports two user roles:

1. **Applicant** - Job seekers who can browse and apply for jobs
2. **Employer** - Companies who can post jobs and manage applications

## Testing the Employer Features

### Step 1: Register as an Employer

1. Start the application (both frontend and backend)
2. Click "Register" in the header
3. Fill in the registration form:
   - Name: Your company name (e.g., "Tech Corp")
   - Email: test@employer.com
   - Password: password123
   - **Role: Select "Employer"** (Important!)
4. Click "Register"

### Step 2: Login as Employer

1. Click "Login" in the header
2. Enter your employer credentials
3. After login, you'll be automatically redirected to the "Manage Jobs" dashboard

### Step 3: Employer Dashboard Features

#### A. Manage Jobs Page

- View all jobs posted by your company
- See the number of applicants for each job
- Delete jobs you no longer need
- Click "Add new job" to post a new position

Features:

- Table shows: #, Job Title, Date, Location, Applicants count, Visible toggle, Action
- Delete functionality with confirmation dialog
- Automatic applicant counting

#### B. Add Job Page

Click "Add new job" button to access the job posting form:

Required fields:

- Job Title (e.g., "Senior Software Engineer")
- Job Description (detailed job responsibilities)
- Job Category (dropdown: Programming, Marketing, Design, Sales, Finance, HR)
- Job Location (dropdown: Bangalore, New York, San Francisco, Austin, Remote)
- Job Level (dropdown: Entry Level, Junior Level, Mid Level, Senior Level)
- Salary (e.g., "$100,000 - $120,000")

After clicking "ADD":

- Job is created in the database
- You're redirected back to Manage Jobs page
- New job appears in the table

#### C. View Applications Page

Click "View Applications" in the header to see all applications for your jobs:

Table columns:

- # (Number)
- User name (with avatar initial)
- Job Title (the position applied for)
- Location
- Resume (clickable download link)
- Action (Accept/Reject dropdown menu)

Features:

- View all applicants across all your job postings
- Click the "⋯" button to open action menu
- **Accept** - Marks application as accepted (green status)
- **Reject** - Marks application as rejected (red status)
- Resume links open in new tab

### Step 4: Header Navigation (Employer View)

When logged in as employer, the header shows:

- **Manage Jobs** button (with active state highlighting)
- **View Applications** button (with active state highlighting)
- User name display
- **Logout** button

## Testing Workflow

### Complete Employer Workflow:

1. Register/Login as employer
2. Post a new job using "Add new job"
3. Wait for applicants to apply (or have a test applicant apply)
4. View applications in "View Applications"
5. Accept or reject applications
6. Check the status updates
7. Delete old jobs from "Manage Jobs"

### Testing with Both Roles:

1. Open two browser windows/profiles
2. Window 1: Login as employer
3. Window 2: Login as applicant
4. Employer posts a job
5. Applicant applies for the job
6. Employer sees the application
7. Employer accepts/rejects

## Backend API Endpoints Used

Employer-specific endpoints:

- `GET /api/employer/jobs` - Fetch employer's jobs with applicant counts
- `POST /api/employer/jobs` - Create new job posting
- `GET /api/employer/applications` - Get all applications for employer's jobs
- `PATCH /api/employer/applications/:id` - Accept/reject application
- `DELETE /api/employer/jobs/:id` - Delete job posting

## Database Schema Support

The database already supports employer functionality:

- `users` table has `role` enum with values: "applicant", "employer"
- `jobs` table has `employer_id` foreign key linking to users
- `applications` table tracks which user applied to which job

## Troubleshooting

### Issue: Not seeing employer dashboard after login

**Solution**: Check that you registered with role "employer", not "applicant"

### Issue: No applications showing

**Solution**: Make sure applicants have applied to your jobs first

### Issue: Can't delete jobs

**Solution**: Only the employer who created the job can delete it

### Issue: Jobs not showing after creation

**Solution**: Check browser console for errors, ensure backend is running

## Features Summary

### Manage Jobs

✅ View all posted jobs
✅ See applicant counts
✅ Delete jobs
✅ Add new jobs button

### Add Job

✅ Complete job posting form
✅ Category/location/level dropdowns
✅ Validation
✅ Success redirect

### View Applications

✅ See all applicants
✅ User avatars with initials
✅ Resume download links
✅ Accept/Reject actions
✅ Status updates

## Next Steps for Enhancement

Potential future improvements:

- Edit existing jobs
- Job visibility toggle (publish/unpublish)
- Advanced filtering in applications view
- Email notifications for new applications
- Applicant messaging system
- Interview scheduling
- Application notes/comments
- Analytics dashboard (views, apply rate)
