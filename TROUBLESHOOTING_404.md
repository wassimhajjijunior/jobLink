# Troubleshooting: 404 Error on Employer Routes

## Problem

You're seeing this error in the browser console:

```
Failed to load resource: the server responded with a status of 404 (Not Found)
:3001/api/employer/jobs:1
Error fetching jobs: SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
```

## Root Cause

The backend server was not running, so Express returned a 404 HTML error page instead of JSON.

## Solution

### ✅ FIXED - Steps Taken:

1. **Started the Backend Server**

   ```bash
   cd /home/mohsen/Desktop/joblink/jobLink/backend
   node src/index.js
   ```

   ✅ Server is now running on port 3001

2. **Started the Frontend Server**

   ```bash
   cd /home/mohsen/Desktop/joblink/jobLink
   npm run dev
   ```

   ✅ Frontend is now running on port 3002

3. **Verified Backend Routes**
   - All employer routes are properly defined in `/backend/src/index.js`
   - Routes tested:
     - `GET /api/employer/jobs` ✅
     - `POST /api/employer/jobs` ✅
     - `GET /api/employer/applications` ✅
     - `PATCH /api/employer/applications/:id` ✅
     - `DELETE /api/employer/jobs/:id` ✅

## How to Verify It's Working

1. **Check Backend is Running**

   ```bash
   curl http://localhost:3001/api/jobs
   ```

   Should return JSON array of jobs (not HTML)

2. **Open the Application**

   - Navigate to: http://localhost:3002
   - Register as employer
   - Login
   - You should see the Manage Jobs dashboard (no 404 errors)

3. **Check Browser Console**
   - Open DevTools (F12)
   - No red 404 errors for `/api/employer/*` endpoints
   - API calls should return JSON data

## If Problem Persists

### Check 1: Is Backend Running?

```bash
# Check if process is listening on port 3001
lsof -i :3001
```

Expected output: `node` process on port 3001

### Check 2: Test Backend Directly

```bash
curl -s http://localhost:3001/api/jobs | head -c 100
```

Expected: JSON output starting with `[{"job_id":`

### Check 3: Check Backend Logs

Look at the terminal where you ran `node src/index.js`:

- Should show: `Server is running on port 3001`
- No error messages

### Check 4: Verify Routes are Loaded

In the backend `src/index.js`, ensure:

- All `app.get()`, `app.post()`, etc. are BEFORE `app.listen()`
- No syntax errors in the file
- All imports are correct

### Check 5: JWT Token

If you're logged in but still getting 404:

- Check if you're actually logged in (see user name in header)
- Open DevTools → Application → Local Storage
- Check if `token` exists
- If not, logout and login again

## Current Status: ✅ RESOLVED

Both servers are now running:

- **Backend**: http://localhost:3001 ✅
- **Frontend**: http://localhost:3002 ✅
- **Employer routes**: All working ✅

## Testing the Employer Features

Now you can test:

1. **Register as Employer**

   - Click "Register"
   - Select "Employer" role
   - Complete registration

2. **Login**

   - Use employer credentials
   - Should auto-redirect to "Manage Jobs"

3. **Add a Job**

   - Click "Add new job"
   - Fill in the form
   - Click "ADD"
   - Job should appear in Manage Jobs table

4. **View Applications**
   - Click "View Applications" in header
   - Should see empty state or existing applications

All features should now work without 404 errors! 🎉

## Prevention

To avoid this in the future:

1. **Always start backend first**

   ```bash
   cd backend && node src/index.js
   ```

2. **Then start frontend**

   ```bash
   npm run dev
   ```

3. **Use npm scripts** (optional - add to package.json):

   ```json
   "scripts": {
     "dev": "node src/index.js",
     "dev:watch": "node --watch src/index.js"
   }
   ```

4. **Or use a process manager like PM2 or concurrently to run both servers together**
