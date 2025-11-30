import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
	throw new Error("TURSO_DATABASE_URL is not defined");
}

if (!authToken) {
	throw new Error("TURSO_AUTH_TOKEN is not defined");
}

export const db = createClient({
	url,
	authToken,
});

// Initialize site_metadata table on first import
async function initMetadataTable() {
	try {
		await db.execute(`
			CREATE TABLE IF NOT EXISTS site_metadata (
				id INTEGER PRIMARY KEY DEFAULT 1,
				last_modified TEXT NOT NULL DEFAULT (datetime('now')),
				CHECK (id = 1)
			)
		`);
		// Insert initial row if it doesn't exist
		await db.execute(`
			INSERT OR IGNORE INTO site_metadata (id, last_modified) 
			VALUES (1, datetime('now'))
		`);
	} catch (error) {
		console.error("Failed to initialize site_metadata table:", error);
	}
}

// Initialize on module load
initMetadataTable();
// Cleanup files table if it exists (reverting previous change)
cleanupFilesTable();

async function cleanupFilesTable() {
	try {
		await db.execute("DROP TABLE IF EXISTS files");
	} catch (error) {
		console.error("Failed to cleanup files table:", error);
	}
}

/**
 * Get the last modified timestamp for site data
 * Used for cache invalidation
 */
export async function getLastModified(): Promise<string> {
	const result = await db.execute("SELECT last_modified FROM site_metadata WHERE id = 1");
	return (result.rows[0]?.last_modified as string) || new Date().toISOString();
}

/**
 * Update the last modified timestamp
 * Should be called after any create/update/delete operation
 */
export async function updateLastModified(): Promise<void> {
	await db.execute({
		sql: "UPDATE site_metadata SET last_modified = datetime('now') WHERE id = 1",
		args: [],
	});
}
