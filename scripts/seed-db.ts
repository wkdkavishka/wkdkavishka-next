import { createClient } from "@libsql/client";
import * as dotenv from "dotenv";
import siteData from "../data/site-data";

dotenv.config({ path: ".env" });

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
	console.error("Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN");
	process.exit(1);
}

const db = createClient({
	url,
	authToken,
});

async function seed() {
	console.log("🌱 Seeding database...");

	try {
		// 1. Create Tables
		console.log("Creating tables...");

		await db.execute(`
      CREATE TABLE IF NOT EXISTS personal_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        title TEXT NOT NULL,
        location TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        profile_image TEXT NOT NULL,
        about TEXT NOT NULL, -- JSON array
        get_in_touch TEXT NOT NULL,
        resume_url TEXT NOT NULL,
        skills TEXT NOT NULL, -- JSON array (simple list)
        description TEXT NOT NULL,
        start_year INTEGER NOT NULL
      );
    `);

		await db.execute(`
      CREATE TABLE IF NOT EXISTS social_links (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        personal_data_id INTEGER,
        name TEXT NOT NULL,
        url TEXT NOT NULL,
        icon TEXT NOT NULL,
        FOREIGN KEY (personal_data_id) REFERENCES personal_data(id)
      );
    `);

		await db.execute(`
      CREATE TABLE IF NOT EXISTS services ( -- Mapping to 'Skill' interface in site-data
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        icon TEXT NOT NULL
      );
    `);

		await db.execute(`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        tags TEXT NOT NULL, -- JSON array
        link TEXT NOT NULL,
        image TEXT NOT NULL, -- JSON array
        github TEXT
      );
    `);

		// 2. Insert Data
		console.log("Inserting data...");

		// Personal Data
		const personal = siteData.personal;
		const personalResult = await db.execute({
			sql: `INSERT INTO personal_data (name, title, location, email, phone, profile_image, about, get_in_touch, resume_url, skills, description, start_year)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`,
			args: [
				personal.name,
				personal.title,
				personal.location,
				personal.email,
				personal.phone,
				personal.profileImage,
				JSON.stringify(personal.about),
				personal.getInTouch,
				personal.resumeUrl,
				JSON.stringify(personal.skills),
				personal.description,
				personal.startYear,
			],
		});

		const personalId = personalResult.rows[0].id;

		// Social Links
		for (const link of personal.socialLinks) {
			// Extract icon name from function/component (e.g., "FaGithub")
			// Since siteData imports icons, we need to handle this carefully.
			// For now, we'll assume we can get the name or map it manually if needed.
			// In site-data.ts, icons are passed as components. We need to store string names.
			// We will use a simple mapping or just store the name if we can infer it.
			// Since we can't easily get the name from the function at runtime in this script without complex parsing,
			// we will map based on the known icons in site-data.ts for this seed.

			let iconName = "FaLink"; // Default
			if (link.name === "GitHub") iconName = "FaGithub";
			if (link.name === "LinkedIn") iconName = "FaLinkedin";
			if (link.name === "Facebook") iconName = "FaFacebook";
			if (link.name === "WhatsApp") iconName = "FaWhatsapp";

			await db.execute({
				sql: `INSERT INTO social_links (personal_data_id, name, url, icon) VALUES (?, ?, ?, ?)`,
				args: [personalId, link.name, link.url, iconName],
			});
		}

		// Services (Skills)
		for (const service of siteData.services) {
			let iconName = "FaCode";
			if (service.name.includes("React")) iconName = "FaReact";
			if (service.name.includes("Custom")) iconName = "FaCode";
			if (service.name.includes("Mobile")) iconName = "FaMobileAlt";
			if (service.name.includes("Cloud")) iconName = "FaCloud";
			if (service.name.includes("UI/UX")) iconName = "FaPalette";

			await db.execute({
				sql: `INSERT INTO services (name, description, icon) VALUES (?, ?, ?)`,
				args: [service.name, service.description, iconName],
			});
		}

		// Projects
		for (const project of siteData.projects) {
			await db.execute({
				sql: `INSERT INTO projects (id, title, description, tags, link, image, github) VALUES (?, ?, ?, ?, ?, ?, ?)`,
				args: [
					project.id,
					project.title,
					project.description,
					JSON.stringify(project.tags),
					project.link,
					JSON.stringify(project.image),
					project.github || null,
				],
			});
		}

		console.log("✅ Seeding completed successfully!");
	} catch (error) {
		console.error("❌ Seeding failed:", error);
		process.exit(1);
	}
}

seed();
