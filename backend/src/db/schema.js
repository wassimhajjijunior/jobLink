import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  int,
  mysqlEnum,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  user_id: int("user_id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: mysqlEnum("role", ["applicant", "employer"]).notNull(),
});

export const jobs = mysqlTable("jobs", {
  job_id: int("job_id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  salary: varchar("salary", { length: 100 }),
  tags: text("tags"), // JSON string of tags/categories
  employer_id: int("employer_id")
    .notNull()
    .references(() => users.user_id),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const applications = mysqlTable("applications", {
  application_id: int("application_id").autoincrement().primaryKey(),
  job_id: int("job_id")
    .notNull()
    .references(() => jobs.job_id),
  applicant_id: int("applicant_id")
    .notNull()
    .references(() => users.user_id),
  resume_url: varchar("resume_url", { length: 255 }).notNull(),
  status: mysqlEnum("status", ["pending", "accepted", "rejected"])
    .default("pending")
    .notNull(),
  applied_at: timestamp("applied_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
