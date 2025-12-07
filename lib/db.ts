import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./db/schema";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
	throw new Error("TURSO_DATABASE_URL is not defined");
}

if (!authToken) {
	throw new Error("TURSO_AUTH_TOKEN is not defined");
}

const client = createClient({
	url,
	authToken,
});

export const db = drizzle(client, { schema });

// Initialize cache_flags table on first import
async function initCacheFlags() {
	try {
		await client.execute(`
			CREATE TABLE IF NOT EXISTS cache_flags (
				id INTEGER PRIMARY KEY DEFAULT 1,
				last_modified TEXT NOT NULL DEFAULT (datetime('now')),
				CHECK (id = 1)
			)
		`);
		await client.execute(`
			INSERT OR IGNORE INTO cache_flags (id, last_modified)
			VALUES (1, datetime('now'))
		`);
	} catch (error) {
		console.error("Failed to initialize cache_flags table:", error);
	}
}

initCacheFlags();
