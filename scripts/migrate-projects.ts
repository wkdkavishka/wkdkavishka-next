import { createClient } from "@libsql/client";
import * as dotenv from "dotenv";

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

async function migrate() {
	console.log("🚀 Starting migration...");

	try {
		// 1. Rename existing table
		console.log("Renaming existing projects table...");
		await db.execute("ALTER TABLE projects RENAME TO projects_old");

		// 2. Create new table
		console.log("Creating new projects table...");
		await db.execute(`
            CREATE TABLE projects (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                slug TEXT UNIQUE NOT NULL,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                tags TEXT NOT NULL,
                link TEXT NOT NULL,
                image TEXT NOT NULL,
                github TEXT
            )
        `);

		// 3. Copy data
		console.log("Copying data...");
		const oldData = await db.execute("SELECT * FROM projects_old");

		for (const row of oldData.rows) {
			await db.execute({
				sql: `INSERT INTO projects (slug, title, description, tags, link, image, github) 
                      VALUES (?, ?, ?, ?, ?, ?, ?)`,
				args: [
					row.id, // Use old ID as slug
					row.title,
					row.description,
					row.tags,
					row.link,
					row.image,
					row.github,
				],
			});
		}

		// 4. Verify data
		console.log("Verifying data...");
		const newData = await db.execute("SELECT * FROM projects");
		console.log(`Migrated ${newData.rows.length} projects.`);

		if (newData.rows.length !== oldData.rows.length) {
			throw new Error("Data count mismatch!");
		}

		// 5. Drop old table
		console.log("Dropping old table...");
		await db.execute("DROP TABLE projects_old");

		console.log("✅ Migration completed successfully!");
	} catch (error) {
		console.error("❌ Migration failed:", error);
		// Attempt rollback if possible (manual intervention might be needed)
		process.exit(1);
	}
}

migrate();
