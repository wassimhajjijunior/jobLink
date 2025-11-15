# Quick Start Guide - Testing Employer Features

## 🚀 Start the Application

### Terminal 1 - Backend

```bash
cd /home/mohsen/Desktop/joblink/jobLink/backend
npm run dev
```

✅ Should see: "Server running on port 3001"

### Terminal 2 - Frontend

```bash
cd /home/mohsen/Desktop/joblink/jobLink
npm run dev
```

✅ Should see: "Local: http://localhost:5173/"

---

## 👤 Test as Employer

### 1. Register as Employer

1. Open http://localhost:5173
2. Click **"Register"** button
3. Fill in:
   - Name: `Test Employer`
   - Email: `employer@test.com`
   - Password: `password123`
   - **Role: Select "Employer"** ⚠️ Important!
4. Click "Register"
5. You'll see success message

### 2. Login as Employer

1. Click **"Login"** button
2. Enter:
   - Email: `employer@test.com`
   - Password: `password123`
3. Click "Login"
4. 🎉 You should automatically land on **"Manage Jobs"** page

### 3. Add Your First Job

1. Click **"Add new job"** button (blue button at top-right)
2. Fill in the form:
   ```
   Job Title: Senior Frontend Developer
   Job Description: We are looking for an experienced React developer...
   Job Category: Programming (dropdown)
   Job Location: San Francisco, CA (dropdown)
   Job Level: Senior Level (dropdown)
   Salary: $120,000 - $150,000
   ```
3. Click **"ADD"** button
4. ✅ Success alert appears
5. ✅ You're back at Manage Jobs page
6. ✅ Your new job appears in the table

### 4. View the Job in Manage Jobs

You should see a table with:

- # (1)
- Job Title: Senior Frontend Developer
- Date: Today's date
- Location: San Francisco, CA
- Applicants: 0 (no applicants yet)
- Visible: ✓ (checkbox checked)
- Action: Delete button (red)

---

## 🔄 Test Complete Flow (Both Roles)

### Window 1: Employer Setup

1. Open http://localhost:5173 in **Chrome**
2. Register as employer (if not already)
3. Login as employer
4. Post a job (as above)
5. Stay on this page

### Window 2: Applicant Setup

1. Open http://localhost:5173 in **Firefox** (or incognito)
2. Click **"Register"**
3. Fill in:
   - Name: `John Applicant`
   - Email: `applicant@test.com`
   - Password: `password123`
   - **Role: Select "Job Seeker"** (applicant)
4. Register and login
5. You should see the **job listing page** with filters

### Apply for the Job (Window 2 - Applicant)

1. Find the job you posted (should be visible)
2. Click on the **job card**
3. You'll see the job details page
4. Click **"Apply Now"** button
5. Enter a resume URL (or paste: `https://example.com/resume.pdf`)
6. Click OK
7. ✅ Success alert appears

### View Application (Window 1 - Employer)

1. Switch back to employer window
2. Click **"View Applications"** in the header
3. 🎉 You should see the application in the table:
   - # (1)
   - User name: J (avatar) John Applicant
   - Job Title: Senior Frontend Developer
   - Location: San Francisco, CA
   - Resume: Resume ↓ (clickable link)
   - Action: ⋯ (menu button)

### Accept/Reject (Window 1 - Employer)

1. Click the **"⋯"** button
2. You'll see dropdown menu:
   - Accept (green)
   - Reject (red)
3. Click **"Accept"**
4. ✅ Success alert: "Application accepted!"
5. Application updates immediately

### Check Status (Window 2 - Applicant)

1. Switch to applicant window
2. Click "My Applications" or navigate to applications
3. You should see status: **"Accepted"** (green badge)

---

## 🗑️ Test Delete Job

### In Employer Window

1. Click **"Manage Jobs"** in header
2. Find your job in the table
3. Click the **"Delete"** button (red)
4. Confirm deletion dialog appears
5. Click "OK"
6. ✅ Job is removed from table
7. ✅ All applications for that job are also deleted

---

## 🎯 Navigation Testing

### Employer Navigation (Window 1)

Test these buttons work correctly:

1. **"Manage Jobs"** button

   - Should show jobs table
   - Button should highlight (blue background)

2. **"View Applications"** button

   - Should show applications table
   - Button should highlight (blue background)

3. **"Add new job"** button (from Manage Jobs)

   - Should show Add Job form
   - Manage Jobs button stays highlighted

4. **Logout** button
   - Should log you out
   - Return to homepage
   - Shows Login/Register buttons again

---

## ✅ What to Verify

### Manage Jobs Page

- [ ] Jobs table displays correctly
- [ ] Applicant count is accurate
- [ ] Date formatted properly (e.g., "23 Jan, 2025")
- [ ] Delete button works with confirmation
- [ ] "Add new job" button navigates correctly
- [ ] Empty state shows when no jobs

### Add Job Page

- [ ] All dropdowns work
- [ ] Can type in text fields
- [ ] Form validates (try submitting empty)
- [ ] Success message appears after submit
- [ ] Redirects back to Manage Jobs
- [ ] New job appears immediately

### View Applications Page

- [ ] Applications list displays
- [ ] Avatar shows correct initial
- [ ] Resume link opens in new tab
- [ ] Action menu opens/closes
- [ ] Accept changes status to "accepted"
- [ ] Reject changes status to "rejected"
- [ ] Page updates without refresh
- [ ] Empty state shows when no applications

### Header

- [ ] Shows "Manage Jobs" and "View Applications" for employers
- [ ] Shows only user name and logout for applicants
- [ ] Active button highlights correctly
- [ ] User name displays
- [ ] Logout works

---

## 🐛 Common Issues & Fixes

### Issue: "Can't see Manage Jobs after login"

**Fix**: Make sure you selected **"Employer"** role during registration

### Issue: "Applications not showing"

**Fix**: Make sure an applicant has applied to your job first

### Issue: "Delete button not working"

**Check**: Browser console for errors. Ensure backend is running.

### Issue: "Job not appearing after creation"

**Fix**: Refresh the page. Check backend terminal for errors.

### Issue: "Can't login"

**Fix**: Make sure backend is running on port 3001

---

## 🎨 What the UI Should Look Like

### Manage Jobs

```
┌─────────────────────────────────────────────────────────┐
│  Manage Jobs                          [Add new job]     │
├─────────────────────────────────────────────────────────┤
│  #  │ Job Title        │ Date     │ Location │ Applicants │
├─────────────────────────────────────────────────────────┤
│  1  │ Senior Frontend  │ 23 Jan   │ SF, CA   │ 3         │
│     │  Developer       │  2025    │          │           │
└─────────────────────────────────────────────────────────┘
```

### Add Job

```
┌─────────────────────────────────────┐
│  Add Job                  My Profile  Logout  │
├─────────────────────────────────────┤
│  Job Title                          │
│  [________________________]         │
│                                     │
│  Job Description                    │
│  [________________________]         │
│  [________________________]         │
│                                     │
│  Category  │  Location  │  Level   │
│  [Program] │ [SF, CA]   │ [Senior] │
│                                     │
│  Salary                             │
│  [________________________]         │
│                                     │
│  [       ADD       ]                │
└─────────────────────────────────────┘
```

### View Applications

```
┌──────────────────────────────────────────────────────────┐
│  View Applications                                       │
├──────────────────────────────────────────────────────────┤
│  #  │ User        │ Job Title    │ Location │ Resume  │ Action │
├──────────────────────────────────────────────────────────┤
│  1  │ [J] John    │ Frontend Dev │ SF, CA   │ Resume↓ │  ⋯    │
│     │  Applicant  │              │          │         │       │
└──────────────────────────────────────────────────────────┘
                                                    ┌─────────┐
                                                    │ Accept  │
                                                    │ Reject  │
                                                    └─────────┘
```

---

## 📊 Expected Data Flow

```
Register (Employer)
    ↓
Login
    ↓
Auto-redirect to Manage Jobs
    ↓
Click "Add new job"
    ↓
Fill form → Click ADD
    ↓
POST /api/employer/jobs → Database
    ↓
Redirect to Manage Jobs
    ↓
GET /api/employer/jobs → Display in table
    ↓
(Applicant applies in another window)
    ↓
Click "View Applications"
    ↓
GET /api/employer/applications → Display in table
    ↓
Click ⋯ → Select "Accept"
    ↓
PATCH /api/employer/applications/:id → Database
    ↓
Status updates → Applicant sees "Accepted"
```

---

## 🎉 Success!

If all the above works, you have successfully:

- ✅ Created employer role system
- ✅ Built 3 employer management interfaces
- ✅ Implemented job posting functionality
- ✅ Added application management with accept/reject
- ✅ Created role-based navigation
- ✅ Built complete employer-applicant workflow

**The employer functionality is fully working! 🚀**

---

## 📚 Next Steps

Once testing is complete:

1. Review the code for any improvements
2. Add more test data
3. Test edge cases (empty states, errors)
4. Consider adding features from EMPLOYER_SUMMARY.md
5. Deploy to production

## 📝 Documentation

- See `EMPLOYER_GUIDE.md` for detailed feature documentation
- See `EMPLOYER_SUMMARY.md` for technical implementation details
- See `README.md` for general project setup

---

**Happy Testing! 🎊**
