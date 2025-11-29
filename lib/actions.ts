"use server";

import { revalidatePath } from "next/cache";
import type { z } from "zod";
import { db, updateLastModified } from "@/lib/db";
import {
    type PersonalData,
    type Project,
    personalDataSchema,
    projectSchema,
    type Skill,
    type SocialLink,
    skillSchema,
    socialLinkSchema,
} from "@/lib/schema";

// --- Fetch Actions ---

export async function getPersonalData(): Promise<PersonalData | null> {
	const result = await db.execute("SELECT * FROM personal_data LIMIT 1");
	if (result.rows.length === 0) return null;

	const row = result.rows[0];
	return {
		id: row.id as number,
		name: row.name as string,
		title: row.title as string,
		location: row.location as string,
		email: row.email as string,
		phone: row.phone as string,
		profileImage: row.profile_image as string,
		about: JSON.parse(row.about as string),
		getInTouch: row.get_in_touch as string,
		resumeUrl: row.resume_url as string,
		skills: JSON.parse(row.skills as string),
		description: row.description as string,
		socialLinks: [], // We'll fetch this separately or join, but for now let's just return empty and handle in component or fetch separately
		startYear: row.start_year as number,
	};
}

export async function getSocialLinks(): Promise<SocialLink[]> {
	const result = await db.execute("SELECT * FROM social_links");
	return result.rows.map((row) => ({
		id: row.id as number,
		name: row.name as string,
		url: row.url as string,
		icon: row.icon as string,
	}));
}

export async function getServices(): Promise<Skill[]> {
	const result = await db.execute("SELECT * FROM services");
	return result.rows.map((row) => ({
		id: row.id as number,
		name: row.name as string,
		description: row.description as string,
		icon: row.icon as string,
	}));
}

export async function getProjects(): Promise<Project[]> {
	const result = await db.execute("SELECT * FROM projects");
	return result.rows.map((row) => ({
		id: row.id as number,
		slug: row.slug as string,
		title: row.title as string,
		description: row.description as string,
		tags: JSON.parse(row.tags as string),
		link: row.link as string,
		image: JSON.parse(row.image as string),
		github: (row.github as string) || undefined,
	}));
}

// --- Update Actions ---

export async function updatePersonalData(
	data: z.infer<typeof personalDataSchema>,
) {
	const validated = personalDataSchema.parse(data);

	await db.execute({
		sql: `UPDATE personal_data SET 
      name = ?, title = ?, location = ?, email = ?, phone = ?, 
      profile_image = ?, about = ?, get_in_touch = ?, resume_url = ?, 
      skills = ?, description = ?, start_year = ? 
      WHERE id = ?`,
		args: [
			validated.name,
			validated.title,
			validated.location,
			validated.email,
			validated.phone,
			validated.profileImage,
			JSON.stringify(validated.about),
			validated.getInTouch,
			validated.resumeUrl,
			JSON.stringify(validated.skills),
			validated.description,
			validated.startYear,
			validated.id || 1, // Default to 1 if not provided, though it should be
		],
	});

	await updateLastModified();
	revalidatePath("/");
	revalidatePath("/admin");
	return { success: true };
}

export async function updateService(data: z.infer<typeof skillSchema>) {
	const validated = skillSchema.parse(data);

	if (validated.id) {
		await db.execute({
			sql: `UPDATE services SET name = ?, description = ?, icon = ? WHERE id = ?`,
			args: [
				validated.name,
				validated.description,
				validated.icon,
				validated.id,
			],
		});
	} else {
		await db.execute({
			sql: `INSERT INTO services (name, description, icon) VALUES (?, ?, ?)`,
			args: [validated.name, validated.description, validated.icon],
		});
	}

	await updateLastModified();
	revalidatePath("/");
	revalidatePath("/admin");
	return { success: true };
}

export async function deleteService(id: number) {
	await db.execute({
		sql: `DELETE FROM services WHERE id = ?`,
		args: [id],
	});
	await updateLastModified();
	revalidatePath("/");
	revalidatePath("/admin");
	return { success: true };
}

export async function updateProject(data: z.infer<typeof projectSchema>) {
	const validated = projectSchema.parse(data);

	if (validated.id) {
		// Update existing project
		await db.execute({
			sql: `UPDATE projects SET 
        slug = ?, title = ?, description = ?, tags = ?, link = ?, image = ?, github = ? 
        WHERE id = ?`,
			args: [
				validated.slug,
				validated.title,
				validated.description,
				JSON.stringify(validated.tags),
				validated.link,
				JSON.stringify(validated.image),
				validated.github || null,
				validated.id,
			],
		});
	} else {
		// Insert new project
		await db.execute({
			sql: `INSERT INTO projects (slug, title, description, tags, link, image, github) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
			args: [
				validated.slug,
				validated.title,
				validated.description,
				JSON.stringify(validated.tags),
				validated.link,
				JSON.stringify(validated.image),
				validated.github || null,
			],
		});
	}

	await updateLastModified();
	revalidatePath("/");
	revalidatePath("/admin");
	return { success: true };
}

export async function deleteProject(id: number) {
	await db.execute({
		sql: `DELETE FROM projects WHERE id = ?`,
		args: [id],
	});
	await updateLastModified();
	revalidatePath("/");
	revalidatePath("/admin");
	return { success: true };
}

export async function updateSocialLink(data: z.infer<typeof socialLinkSchema>) {
	const validated = socialLinkSchema.parse(data);

	// We need personal_data_id, assuming 1 for now as it's a single user site
	const personalDataId = 1;

	if (validated.id) {
		await db.execute({
			sql: `UPDATE social_links SET name = ?, url = ?, icon = ? WHERE id = ?`,
			args: [validated.name, validated.url, validated.icon, validated.id],
		});
	} else {
		await db.execute({
			sql: `INSERT INTO social_links (personal_data_id, name, url, icon) VALUES (?, ?, ?, ?)`,
			args: [personalDataId, validated.name, validated.url, validated.icon],
		});
	}

	await updateLastModified();
	revalidatePath("/");
	revalidatePath("/admin");
	return { success: true };
}

export async function deleteSocialLink(id: number) {
	await db.execute({
		sql: `DELETE FROM social_links WHERE id = ?`,
		args: [id],
	});
	await updateLastModified();
	revalidatePath("/");
	revalidatePath("/admin");
	return { success: true };
}

export async function uploadImage(formData: FormData) {
	const file = formData.get("file") as File;
	if (!file) {
		throw new Error("No file provided");
	}

	const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

	// Dynamic import to avoid edge runtime issues if any, though we are in node runtime here
	const cloudinary = (await import("@/lib/cloudinary")).default;

	return new Promise<{ secure_url: string }>((resolve, reject) => {
		cloudinary.uploader
			.upload_stream(
				{
					folder: "wkdkavishka/projects",
				},
				(error, result) => {
					if (error) {
						reject(error);
						return;
					}
					if (!result) {
						reject(new Error("Upload failed"));
						return;
					}
					resolve({ secure_url: result.secure_url });
				},
			)
			.end(buffer);
	});
}
