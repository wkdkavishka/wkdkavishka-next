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

async function checkSchema() {
	try {
		console.log("Checking schema...");
		const tables = await db.execute(
			"SELECT name FROM sqlite_master WHERE type='table'",
		);
		console.log(
			"Tables:",
			tables.rows.map((r) => r.name),
		);

		const personalDataInfo = await db.execute(
			"PRAGMA table_info(personal_data)",
		);
		console.log(
			"personal_data columns:",
			personalDataInfo.rows.map((r) => r.name),
		);

		const filesInfo = await db.execute("PRAGMA table_info(files)");
		console.log(
			"files columns:",
			filesInfo.rows.map((r) => r.name),
		);
	} catch (error) {
		console.error("Error checking schema:", error);
	}
}

checkSchema();
