import { db } from "./src/db/index.js";
import { users, jobs, applications } from "./src/db/schema.js";
import { eq } from "drizzle-orm";

async function testEmployer() {
  console.log("Testing employer@gmail.com...\n");

  // Find the employer
  const employer = await db
    .select()
    .from(users)
    .where(eq(users.email, "employer@gmail.com"));

  if (employer.length === 0) {
    console.log("❌ Employer not found!");
    process.exit(1);
  }

  console.log("✅ Employer found:");
  console.log(employer[0]);
  console.log();

  const employerId = employer[0].user_id;

  // Find their jobs
  const employerJobs = await db
    .select()
    .from(jobs)
    .where(eq(jobs.employer_id, employerId));

  console.log(`✅ Found ${employerJobs.length} job(s):`);
  employerJobs.forEach((job) => {
    console.log(`  - ${job.title} (ID: ${job.job_id})`);
  });
  console.log();

  // Find applications for their jobs
  if (employerJobs.length > 0) {
    const jobIds = employerJobs.map((j) => j.job_id);

    for (const jobId of jobIds) {
      const jobApps = await db
        .select()
        .from(applications)
        .where(eq(applications.job_id, jobId));

      console.log(`📋 Job ID ${jobId} has ${jobApps.length} application(s)`);

      for (const app of jobApps) {
        const applicant = await db
          .select()
          .from(users)
          .where(eq(users.user_id, app.applicant_id));

        console.log(`   - ${applicant[0]?.name} (${app.status})`);
      }
    }
  }

  process.exit(0);
}

testEmployer().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
