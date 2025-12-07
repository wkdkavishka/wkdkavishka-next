import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config({ path: ".env" });

if (!process.env.TURSO_DATABASE_URL) {
	throw new Error("TURSO_DATABASE_URL is not defined");
}

if (!process.env.TURSO_AUTH_TOKEN) {
	throw new Error("TURSO_AUTH_TOKEN is not defined");
}

export default {
	schema: "./lib/db/schema.ts",
	out: "./drizzle",
	dialect: "turso",
	dbCredentials: {
		url: process.env.TURSO_DATABASE_URL,
		authToken: process.env.TURSO_AUTH_TOKEN,
	},
} satisfies Config;
