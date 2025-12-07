"use server";

import { unstable_cache } from "next/cache";
import type { z } from "zod";
import * as repo from "@/lib/db/repo";
import {
	type PersonalData,
	type Project,
	personalDataSchema,
	projectSchema,
	type Service,
	type SocialLink,
	serviceSchema,
	socialLinkSchema,
} from "@/lib/db/zod-schema";

// --- Fetch Actions ---

export const getPersonalData = unstable_cache(
	async (): Promise<PersonalData | null> => {
		return repo.getPersonalData();
	},
	["personal-data"],
	{ tags: ["portfolio-data"], revalidate: 3600 },
);

export const getSocialLinks = unstable_cache(
	async (): Promise<SocialLink[]> => {
		return repo.getSocialLinks();
	},
	["social-links"],
	{ tags: ["portfolio-data"], revalidate: 3600 },
);

export const getServices = unstable_cache(
	async (): Promise<Service[]> => {
		return repo.getServices();
	},
	["services"],
	{ tags: ["portfolio-data"], revalidate: 3600 },
);

export const getProjects = unstable_cache(
	async (): Promise<Project[]> => {
		return repo.getProjects();
	},
	["projects"],
	{ tags: ["portfolio-data"], revalidate: 3600 },
);

// --- Update Actions ---

export async function updatePersonalData(
	data: z.infer<typeof personalDataSchema>,
) {
	const validated = personalDataSchema.parse(data);

	await repo.updatePersonalData({
		...validated,
		id: validated.id || 1,
	});

	return { success: true };
}

export async function updateService(data: z.infer<typeof serviceSchema>) {
	const validated = serviceSchema.parse(data);

	if (validated.id) {
		await repo.updateService(validated as Service);
	} else {
		await repo.createService({
			name: validated.name,
			description: validated.description,
			icon: validated.icon,
		});
	}

	return { success: true };
}

export async function deleteService(id: number) {
	await repo.deleteService(id);
	return { success: true };
}

export async function updateProject(data: z.infer<typeof projectSchema>) {
	const validated = projectSchema.parse(data);

	if (validated.id) {
		await repo.updateProject(validated as Project);
	} else {
		await repo.createProject({
			slug: validated.slug,
			title: validated.title,
			description: validated.description,
			tags: validated.tags,
			link: validated.link,
			image: validated.image,
			github: validated.github || null,
		});
	}

	return { success: true };
}

export async function deleteProject(id: number) {
	await repo.deleteProject(id);
	return { success: true };
}

export async function updateSocialLink(data: z.infer<typeof socialLinkSchema>) {
	const validated = socialLinkSchema.parse(data);

	// We need personal_data_id, assuming 1 for now as it's a single user site
	const personalDataId = 1;

	if (validated.id) {
		await repo.updateSocialLink(validated as SocialLink);
	} else {
		await repo.createSocialLink({
			personalDataId,
			name: validated.name,
			url: validated.url,
			icon: validated.icon,
		});
	}

	return { success: true };
}

export async function deleteSocialLink(id: number) {
	await repo.deleteSocialLink(id);
	return { success: true };
}

export async function uploadImage(formData: FormData) {
	const file = formData.get("file") as File;
	if (!file) {
		throw new Error("No file provided");
	}

	const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

	// Dynamic import to avoid edge runtime issues if any
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

export async function uploadResume(formData: FormData) {
	const file = formData.get("file") as File;
	if (!file) {
		throw new Error("No file provided");
	}

	const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

	// Dynamic import to avoid edge runtime issues if any
	const cloudinary = (await import("@/lib/cloudinary")).default;

	return new Promise<{ secure_url: string }>((resolve, reject) => {
		cloudinary.uploader
			.upload_stream(
				{
					folder: "wkdkavishka/resume",
					resource_type: "auto", // Auto detect type (pdf, doc, etc)
				},
				async (error, result) => {
					if (error) {
						reject(error);
						return;
					}
					if (!result) {
						reject(new Error("Upload failed"));
						return;
					}

					// Update personal_data with the new URL
					try {
						await repo.updateResumeUrl(result.secure_url);
						resolve({ secure_url: result.secure_url });
					} catch (dbError) {
						reject(dbError);
					}
				},
			)
			.end(buffer);
	});
}

export async function uploadProfileImage(formData: FormData) {
	const file = formData.get("file") as File;
	if (!file) {
		throw new Error("No file provided");
	}

	const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

	const cloudinary = (await import("@/lib/cloudinary")).default;

	return new Promise<{ secure_url: string }>((resolve, reject) => {
		cloudinary.uploader
			.upload_stream(
				{
					folder: "wkdkavishka/profile-pic",
				},
				async (error, result) => {
					if (error) {
						reject(error);
						return;
					}
					if (!result) {
						reject(new Error("Upload failed"));
						return;
					}

					// Update personal_data with the new URL
					try {
						await repo.updateProfileImage(result.secure_url);
						resolve({ secure_url: result.secure_url });
					} catch (dbError) {
						reject(dbError);
					}
				},
			)
			.end(buffer);
	});
}
