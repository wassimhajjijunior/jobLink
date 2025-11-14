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
  const createdUsers = [];
  const hashedPassword = await bcrypt.hash("password123", 10);

  for (let i = 0; i < 5; i++) {
    const user = {
      name: faker.company.name(),
      email: faker.internet.email(),
      password: hashedPassword,
      role: "employer",
    };
    const [newUser] = await db.insert(users).values(user);
    createdUsers.push({ ...user, user_id: newUser.insertId });
    console.log(`Created employer: ${user.name}`);
  }

  // Create 20 jobs
  for (let i = 0; i < 20; i++) {
    const randomEmployer =
      createdUsers[Math.floor(Math.random() * createdUsers.length)];
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
    await db.insert(jobs).values(job);
    console.log(`Created job: ${job.title}`);
  }

  console.log("Database seeded successfully!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});
