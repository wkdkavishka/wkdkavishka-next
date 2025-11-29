import { z } from "zod";

export const skillSchema = z.object({
	id: z.number().optional(),
	name: z.string().min(1, "Name is required"),
	description: z.string().min(1, "Description is required"),
	icon: z.string().min(1, "Icon name is required"), // Storing icon name as string
});

export const projectSchema = z.object({
	id: z.number().optional(),
	slug: z.string().min(1, "Slug is required"),
	title: z.string().min(1, "Title is required"),
	description: z
		.string()
		.min(1, "Description is required")
		.refine(
			(val) => {
				const lines = val
					.split("\n")
					.filter((line) => line.trim() !== "").length;
				return lines === 4;
			},
			{
				message: "Description must be exactly 4 lines",
			},
		),
	tags: z.array(z.string()).min(1, "At least one tag is required"),
	link: z.string().url("Invalid URL"),
	image: z.array(z.string()).min(1, "At least one image is required"),
	github: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export const socialLinkSchema = z.object({
	id: z.number().optional(),
	name: z.string().min(1, "Name is required"),
	url: z.string().url("Invalid URL"),
	icon: z.string().min(1, "Icon name is required"),
});

export const personalDataSchema = z.object({
	id: z.number().optional(),
	name: z.string().min(1, "Name is required"),
	title: z.string().min(1, "Title is required"),
	location: z.string().min(1, "Location is required"),
	email: z.string().email("Invalid email"),
	phone: z.string().min(1, "Phone is required"),
	profileImage: z.string().min(1, "Profile image is required"),
	about: z.array(z.string()).min(1, "About section is required"),
	getInTouch: z.string().min(1, "Get in touch text is required"),
	resumeUrl: z.string().min(1, "Resume URL is required"),
	skills: z.array(z.string()).min(1, "Skills list is required"),
	description: z.string().min(1, "Description is required"),
	socialLinks: z.array(socialLinkSchema),
	startYear: z.number().int().positive("Start year must be positive"),
});

export type Skill = z.infer<typeof skillSchema>;
export type Project = z.infer<typeof projectSchema>;
export type SocialLink = z.infer<typeof socialLinkSchema>;
export type PersonalData = z.infer<typeof personalDataSchema>;
