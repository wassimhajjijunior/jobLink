import express from "express";
import cors from "cors";
import "dotenv/config";
import { db } from "./db/index.js";
import { jobs, applications } from "./db/schema.js";
import { eq } from "drizzle-orm";
import { authMiddleware } from "./middleware/auth.js";
import authRoutes from "./routes/auth.js";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
