import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { db } from "../index.js";
import { users, jobs, applications } from "../schema.js";
import { sql } from "drizzle-orm";

// Job descriptions templates
const jobDescriptions = [
  "We are seeking a talented professional to join our dynamic team. The ideal candidate will have excellent communication skills and a passion for innovation.",
  "Join our growing company and make an impact. We offer competitive compensation and great benefits.",
  "Looking for an experienced professional to lead projects and collaborate with cross-functional teams.",
  "Exciting opportunity to work with cutting-edge technology in a fast-paced environment.",
  "We're hiring! If you're passionate about your work and want to grow your career, apply now.",
];

const locations = [
  "New York, NY",
  "San Francisco, CA",
  "Austin, TX",
  "Seattle, WA",
  "Boston, MA",
  "Chicago, IL",
  "Los Angeles, CA",
  "Denver, CO",
  "Remote",
  "Miami, FL",
];

const salaries = [
  "$60,000 - $80,000",
  "$80,000 - $100,000",
  "$100,000 - $120,000",
  "$120,000 - $150,000",
  "$150,000 - $180,000",
];

const jobTags = [
  ["California", "Senior level"],
  ["bangalore", "Senior level"],
  ["Full-time", "Remote", "Tech"],
  ["Part-time", "On-site", "Marketing"],
  ["Full-time", "Hybrid", "Sales"],
  ["Contract", "Remote", "Design"],
  ["Full-time", "On-site", "Engineering"],
  ["Internship", "On-site", "Finance"],
  ["Full-time", "Remote", "Customer Service"],
  ["Part-time", "Hybrid", "HR"],
  ["Senior level", "Tech"],
  ["Junior level", "Marketing"],
  ["Mid level", "Sales"],
  ["Entry level", "Support"],
];

async function seed() {
  console.log("Seeding database...");

  // Clear existing data
  console.log("Clearing existing data...");
  await db.delete(applications);
  await db.delete(jobs);
  await db.delete(users);
  console.log("Existing data cleared.");

  // Create 5 employers
  const employers = [];
  const hashedPassword = await bcrypt.hash("password123", 10);

  for (let i = 0; i < 5; i++) {
    const user = {
      name: faker.company.name(),
      email: faker.internet.email(),
      password: hashedPassword,
      role: "employer",
    };
    const [newUser] = await db.insert(users).values(user);
    employers.push({ ...user, user_id: newUser.insertId });
    console.log(`Created employer: ${user.name}`);
  }

  // Create 15 applicants
  const applicants = [];
  for (let i = 0; i < 15; i++) {
    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: hashedPassword,
      role: "applicant",
    };
    const [newUser] = await db.insert(users).values(user);
    applicants.push({ ...user, user_id: newUser.insertId });
    console.log(`Created applicant: ${user.name}`);
  }

  // Create 20 jobs
  const createdJobs = [];
  for (let i = 0; i < 20; i++) {
    const randomEmployer =
      employers[Math.floor(Math.random() * employers.length)];
    const randomTags = jobTags[Math.floor(Math.random() * jobTags.length)];
    const job = {
      title: faker.person.jobTitle(),
      description:
        jobDescriptions[Math.floor(Math.random() * jobDescriptions.length)],
      company: randomEmployer.name,
      location: locations[Math.floor(Math.random() * locations.length)],
      salary: salaries[Math.floor(Math.random() * salaries.length)],
      tags: JSON.stringify(randomTags),
      employer_id: randomEmployer.user_id,
    };
    const [newJob] = await db.insert(jobs).values(job);
    createdJobs.push({ ...job, job_id: newJob.insertId });
    console.log(`Created job: ${job.title}`);
  }

  // Create a specific job for the test employer and add applicants
  const testEmployer = {
    name: "My Test Company",
    email: "employer@gmail.com",
    password: hashedPassword,
    role: "employer",
  };
  const [newTestEmployer] = await db.insert(users).values(testEmployer);
  const testEmployerId = newTestEmployer.insertId;
  console.log(`Created test employer: ${testEmployer.name}`);

  const testJob = {
    title: "Senior React Developer (Test)",
    description: "This is a test job for employer@gmail.com.",
    company: testEmployer.name,
    location: "Remote",
    salary: "$150,000",
    tags: JSON.stringify(["React", "Remote", "Senior"]),
    employer_id: testEmployerId,
  };
  const [newTestJob] = await db.insert(jobs).values(testJob);
  const testJobId = newTestJob.insertId;
  console.log(`Created test job: ${testJob.title}`);

  // Make 5 random applicants apply to the test job
  const numTestApplications = 5;
  const shuffledTestApplicants = [...applicants].sort(
    () => Math.random() - 0.5
  );
  const selectedTestApplicants = shuffledTestApplicants.slice(
    0,
    numTestApplications
  );

  for (let i = 0; i < selectedTestApplicants.length; i++) {
    const applicant = selectedTestApplicants[i];
    const application = {
      applicant_id: applicant.user_id,
      job_id: testJobId,
      resume_url: `http://localhost:3001/resumes/resume_${i + 1}.pdf`,
      status: "pending",
    };
    await db.insert(applications).values(application);
  }
  console.log(`Created ${numTestApplications} applications for the test job.`);

  // Create applications (random applicants applying to random jobs)
  const applicationStatuses = ["pending", "accepted", "rejected"];
  let applicationCount = 0;
  applicationCount += numTestApplications;

  for (const job of createdJobs) {
    // Each job gets 0-5 random applications
    const numApplications = Math.floor(Math.random() * 6);

    const shuffledApplicants = [...applicants].sort(() => Math.random() - 0.5);
    const selectedApplicants = shuffledApplicants.slice(0, numApplications);

    for (let i = 0; i < selectedApplicants.length; i++) {
      const applicant = selectedApplicants[i];
      const resumeIndex = Math.floor(Math.random() * 15) + 1;
      const application = {
        applicant_id: applicant.user_id,
        job_id: job.job_id,
        resume_url: `http://localhost:3001/resumes/resume_${resumeIndex}.pdf`,
        status:
          applicationStatuses[
            Math.floor(Math.random() * applicationStatuses.length)
          ],
      };
      await db.insert(applications).values(application);
      applicationCount++;
    }
  }

  console.log(`Created ${applicationCount} applications`);
  console.log("Database seeded successfully!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});
