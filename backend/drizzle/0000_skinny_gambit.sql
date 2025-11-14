CREATE TABLE `applications` (
	`application_id` int AUTO_INCREMENT NOT NULL,
	`job_id` int NOT NULL,
	`applicant_id` int NOT NULL,
	`resume_url` varchar(255) NOT NULL,
	`status` enum('pending','accepted','rejected') NOT NULL DEFAULT 'pending',
	`applied_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `applications_application_id` PRIMARY KEY(`application_id`)
);
--> statement-breakpoint
CREATE TABLE `jobs` (
	`job_id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`company` varchar(255) NOT NULL,
	`location` varchar(255) NOT NULL,
	`salary` varchar(100),
	`employer_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `jobs_job_id` PRIMARY KEY(`job_id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`user_id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`role` enum('applicant','employer') NOT NULL,
	CONSTRAINT `users_user_id` PRIMARY KEY(`user_id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `applications` ADD CONSTRAINT `applications_job_id_jobs_job_id_fk` FOREIGN KEY (`job_id`) REFERENCES `jobs`(`job_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `applications` ADD CONSTRAINT `applications_applicant_id_users_user_id_fk` FOREIGN KEY (`applicant_id`) REFERENCES `users`(`user_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `jobs` ADD CONSTRAINT `jobs_employer_id_users_user_id_fk` FOREIGN KEY (`employer_id`) REFERENCES `users`(`user_id`) ON DELETE no action ON UPDATE no action;