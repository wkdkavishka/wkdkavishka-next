import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const cacheFlags = sqliteTable("cache_flags", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	lastModified: text("last_modified").notNull().default(sql`(datetime('now'))`),
});

export const personalData = sqliteTable("personal_data", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	title: text("title").notNull(),
	location: text("location").notNull(),
	email: text("email").notNull(),
	phone: text("phone").notNull(),
	profileImage: text("profile_image").notNull(),
	about: text("about").notNull(), // JSON array
	getInTouch: text("get_in_touch").notNull(),
	resumeUrl: text("resume_url").notNull().default(""),
	skills: text("skills").notNull(), // JSON array
	description: text("description").notNull(),
	startYear: integer("start_year").notNull(),
});

export const socialLinks = sqliteTable("social_links", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	personalDataId: integer("personal_data_id").references(() => personalData.id),
	name: text("name").notNull(),
	url: text("url").notNull(),
	icon: text("icon").notNull(),
});

export const services = sqliteTable("services", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	description: text("description").notNull(),
	icon: text("icon").notNull(),
});

export const projects = sqliteTable("projects", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	slug: text("slug").notNull().default(""),
	title: text("title").notNull(),
	description: text("description").notNull(),
	tags: text("tags").notNull(), // JSON array
	link: text("link").notNull(),
	image: text("image").notNull(), // JSON array
	github: text("github"),
});
