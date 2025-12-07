import { eq, sql } from "drizzle-orm";
import { db } from "../db";
import {
	cacheFlags,
	personalData,
	projects,
	services,
	socialLinks,
} from "./schema";
import type { PersonalData, Project, Service, SocialLink } from "./zod-schema";

// --- Cache Flags ---

export async function getCacheFlag(): Promise<string> {
	const result = await db.query.cacheFlags.findFirst({
		where: (table, { eq }) => eq(table.id, 1),
		columns: { lastModified: true },
	});
	return result?.lastModified || new Date().toISOString();
}

export async function updateCacheFlag(): Promise<void> {
	// Ensure the row exists first (upsert logic)
	// SQLite doesn't have a simple UPSERT in Drizzle without some tricks,
	// but since we init the DB with id=1, we can try update first.
	// Actually, let's just do an insert or ignore then update, or just update if we trust init.
	// To be safe and robust:

	// Try to update
	const result = await db
		.update(cacheFlags)
		.set({ lastModified: sql`(datetime('now'))` })
		.where(eq(cacheFlags.id, 1))
		.returning();

	if (result.length === 0) {
		// If no row updated, insert it
		await db
			.insert(cacheFlags)
			.values({ id: 1, lastModified: sql`(datetime('now'))` });
	}
}

// --- Personal Data ---

export async function getPersonalData(): Promise<PersonalData | null> {
	const result = await db.query.personalData.findFirst();
	if (!result) return null;

	return {
		id: result.id,
		name: result.name,
		title: result.title,
		location: result.location,
		email: result.email,
		phone: result.phone,
		profileImage: result.profileImage,
		about: JSON.parse(result.about),
		getInTouch: result.getInTouch,
		resumeUrl: result.resumeUrl,
		skills: JSON.parse(result.skills),
		description: result.description,
		socialLinks: [], // Fetched separately usually, or we could join
		startYear: result.startYear,
	};
}

export async function updatePersonalData(
	data: Partial<PersonalData> & { id: number },
) {
	await db
		.update(personalData)
		.set({
			name: data.name,
			title: data.title,
			location: data.location,
			email: data.email,
			phone: data.phone,
			profileImage: data.profileImage,
			about: JSON.stringify(data.about),
			getInTouch: data.getInTouch,
			resumeUrl: data.resumeUrl,
			skills: JSON.stringify(data.skills),
			description: data.description,
			startYear: data.startYear,
		})
		.where(eq(personalData.id, data.id));

	await updateCacheFlag();
}

export async function updateResumeUrl(url: string) {
	await db
		.update(personalData)
		.set({ resumeUrl: url })
		.where(eq(personalData.id, 1));
	await updateCacheFlag();
}

export async function updateProfileImage(url: string) {
	await db
		.update(personalData)
		.set({ profileImage: url })
		.where(eq(personalData.id, 1));
	await updateCacheFlag();
}

// --- Social Links ---

export async function getSocialLinks(): Promise<SocialLink[]> {
	const result = await db.query.socialLinks.findMany();
	return result.map((row) => ({
		id: row.id,
		name: row.name,
		url: row.url,
		icon: row.icon,
	}));
}

export async function createSocialLink(
	data: Omit<SocialLink, "id"> & { personalDataId: number },
) {
	await db.insert(socialLinks).values({
		personalDataId: data.personalDataId,
		name: data.name,
		url: data.url,
		icon: data.icon,
	});
	await updateCacheFlag();
}

export async function updateSocialLink(data: SocialLink) {
	await db
		.update(socialLinks)
		.set({
			name: data.name,
			url: data.url,
			icon: data.icon,
		})
		.where(eq(socialLinks.id, data.id));
	await updateCacheFlag();
}

export async function deleteSocialLink(id: number) {
	await db.delete(socialLinks).where(eq(socialLinks.id, id));
	await updateCacheFlag();
}

// --- Services ---

export async function getServices(): Promise<Service[]> {
	const result = await db.query.services.findMany();
	return result.map((row) => ({
		id: row.id,
		name: row.name,
		description: row.description,
		icon: row.icon,
	}));
}

export async function createService(data: Omit<Service, "id">) {
	await db.insert(services).values({
		name: data.name,
		description: data.description,
		icon: data.icon,
	});
	await updateCacheFlag();
}

export async function updateService(data: Service) {
	await db
		.update(services)
		.set({
			name: data.name,
			description: data.description,
			icon: data.icon,
		})
		.where(eq(services.id, data.id));
	await updateCacheFlag();
}

export async function deleteService(id: number) {
	await db.delete(services).where(eq(services.id, id));
	await updateCacheFlag();
}

// --- Projects ---

export async function getProjects(): Promise<Project[]> {
	const result = await db.query.projects.findMany();
	return result.map((row) => ({
		id: row.id,
		slug: row.slug,
		title: row.title,
		description: row.description,
		tags: JSON.parse(row.tags),
		link: row.link,
		image: JSON.parse(row.image),
		github: row.github || undefined,
	}));
}

export async function createProject(data: Omit<Project, "id">) {
	await db.insert(projects).values({
		slug: data.slug,
		title: data.title,
		description: data.description,
		tags: JSON.stringify(data.tags),
		link: data.link,
		image: JSON.stringify(data.image),
		github: data.github || null,
	});
	await updateCacheFlag();
}

export async function updateProject(data: Project) {
	await db
		.update(projects)
		.set({
			slug: data.slug,
			title: data.title,
			description: data.description,
			tags: JSON.stringify(data.tags),
			link: data.link,
			image: JSON.stringify(data.image),
			github: data.github || null,
		})
		.where(eq(projects.id, data.id));
	await updateCacheFlag();
}

export async function deleteProject(id: number) {
	await db.delete(projects).where(eq(projects.id, id));
	await updateCacheFlag();
}
