import express from "express";
import cors from "cors";
import "dotenv/config";
import { db } from "./db/index.js";
import { jobs, applications, users } from "./db/schema.js";
import { eq } from "drizzle-orm";
import { authMiddleware } from "./middleware/auth.js";
import authRoutes from "./routes/auth.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static files (resumes)
app.use("/resumes", express.static(path.join(__dirname, "./public/resumes")));

// Auth routes
app.use("/api/auth", authRoutes);

// Route to get all jobs
app.get("/api/jobs", async (req, res) => {
  const allJobs = await db.select().from(jobs);
  // Parse tags JSON string to array
  const jobsWithTags = allJobs.map((job) => ({
    ...job,
    tags: job.tags ? JSON.parse(job.tags) : [],
  }));
  res.json(jobsWithTags);
});

// Protected route
app.get("/api/jobs/:id", authMiddleware, async (req, res) => {
  const jobId = req.params.id;
  const job = await db.select().from(jobs).where(eq(jobs.job_id, jobId));
  if (job.length === 0) {
    return res.status(404).json({ message: "Job not found" });
  }
  const jobWithTags = {
    ...job[0],
    tags: job[0].tags ? JSON.parse(job[0].tags) : [],
  };
  res.json(jobWithTags);
});

// Route to create a new application
app.post("/api/applications", authMiddleware, async (req, res) => {
  const { jobId, resumeUrl } = req.body;
  const applicantId = req.user.userId;

  if (!jobId || !resumeUrl) {
    return res
      .status(400)
      .json({ message: "Job ID and resume URL are required" });
  }

  try {
    const newApplication = await db.insert(applications).values({
      job_id: jobId,
      applicant_id: applicantId,
      resume_url: resumeUrl,
    });
    res.status(201).json(newApplication);
  } catch (error) {
    console.error("Error creating application:", error);
    res.status(500).json({ message: "Failed to create application" });
  }
});

// Route to get all applications for a user
app.get("/api/applications", authMiddleware, async (req, res) => {
  const applicantId = req.user.userId;

  try {
    // Get applications with job details
    const userApplications = await db
      .select({
        application_id: applications.application_id,
        job_id: applications.job_id,
        status: applications.status,
        applied_at: applications.applied_at,
        resume_url: applications.resume_url,
        job_title: jobs.title,
        company: jobs.company,
        location: jobs.location,
        salary: jobs.salary,
      })
      .from(applications)
      .leftJoin(jobs, eq(applications.job_id, jobs.job_id))
      .where(eq(applications.applicant_id, applicantId));

    res.json(userApplications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
});

// ============ EMPLOYER ROUTES ============

// Get all jobs posted by employer
app.get("/api/employer/jobs", authMiddleware, async (req, res) => {
  const employerId = req.user.userId;

  try {
    const employerJobs = await db
      .select()
      .from(jobs)
      .where(eq(jobs.employer_id, employerId));

    // Get application count for each job
    const jobsWithApplicants = await Promise.all(
      employerJobs.map(async (job) => {
        const applicantCount = await db
          .select()
          .from(applications)
          .where(eq(applications.job_id, job.job_id));

        return {
          ...job,
          tags: job.tags ? JSON.parse(job.tags) : [],
          applicants: applicantCount.length,
        };
      })
    );

    res.json(jobsWithApplicants);
  } catch (error) {
    console.error("Error fetching employer jobs:", error);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});

// Create a new job (employer only)
app.post("/api/employer/jobs", authMiddleware, async (req, res) => {
  const employerId = req.user.userId;
  const {
    title,
    description,
    company,
    location,
    salary,
    tags,
    category,
    level,
  } = req.body;

  if (!title || !description || !company || !location) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  try {
    // Combine category and level with tags
    const allTags = [...(tags || []), category, level].filter(Boolean);

    const newJob = await db.insert(jobs).values({
      title,
      description,
      company,
      location,
      salary: salary || null,
      tags: JSON.stringify(allTags),
      employer_id: employerId,
    });

    res
      .status(201)
      .json({ message: "Job created successfully", jobId: newJob.insertId });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ message: "Failed to create job" });
  }
});

// Get all applications for employer's jobs
app.get("/api/employer/applications", authMiddleware, async (req, res) => {
  const employerId = req.user.userId;

  try {
    const employerApplications = await db
      .select({
        application_id: applications.application_id,
        job_id: applications.job_id,
        applicant_id: applications.applicant_id,
        status: applications.status,
        applied_at: applications.applied_at,
        resume_url: applications.resume_url,
        job_title: jobs.title,
        location: jobs.location,
        applicant_name: users.name,
        applicant_email: users.email,
      })
      .from(applications)
      .leftJoin(jobs, eq(applications.job_id, jobs.job_id))
      .leftJoin(users, eq(applications.applicant_id, users.user_id))
      .where(eq(jobs.employer_id, employerId));

    res.json(employerApplications);
  } catch (error) {
    console.error("Error fetching employer applications:", error);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
});

// Update application status (accept/reject)
app.patch(
  "/api/employer/applications/:id",
  authMiddleware,
  async (req, res) => {
    const applicationId = req.params.id;
    const { status } = req.body;

    if (!["accepted", "rejected", "pending"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    try {
      await db
        .update(applications)
        .set({ status, updated_at: new Date() })
        .where(eq(applications.application_id, applicationId));

      res.json({ message: "Application status updated successfully" });
    } catch (error) {
      console.error("Error updating application:", error);
      res.status(500).json({ message: "Failed to update application" });
    }
  }
);

// Delete a job
app.delete("/api/employer/jobs/:id", authMiddleware, async (req, res) => {
  const jobId = req.params.id;
  const employerId = req.user.userId;

  try {
    // Verify the job belongs to the employer
    const job = await db.select().from(jobs).where(eq(jobs.job_id, jobId));

    if (job.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job[0].employer_id !== employerId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Delete applications first (foreign key constraint)
    await db.delete(applications).where(eq(applications.job_id, jobId));

    // Delete the job
    await db.delete(jobs).where(eq(jobs.job_id, jobId));

    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Failed to delete job" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
