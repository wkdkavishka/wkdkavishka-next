"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Schema for just the profile image
const profileImageSchema = z.object({
	profileImage: z.string().min(1, "Profile image is required"),
});

type ProfileImageData = z.infer<typeof profileImageSchema>;

export function ProfilePicForm({ initialImage }: { initialImage: string }) {
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<{
		type: "success" | "error";
		text: string;
	} | null>(null);

	const form = useForm<ProfileImageData>({
		resolver: zodResolver(profileImageSchema),
		defaultValues: {
			profileImage: initialImage,
		},
	});

	// We don't really need a submit button if we upload on change,
	// but having a "Save" button that doesn't do much is confusing if upload is instant.
	// However, the user might want to see the preview before "committing"?
	// But our upload action updates the DB directly.
	// So let's just have the file input trigger the upload and update.
	// But to be consistent with other forms, maybe we should have a submit?
	// The requirement says "upload to cloudinary ... and add the link to personal_data table".
	// So the action does both.

	// Let's make the file input trigger the upload immediately.

	return (
		<div className="space-y-6">
			{message && (
				<div
					className={`p-3 rounded-md ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
				>
					{message.text}
				</div>
			)}

			<div className="flex flex-col items-center gap-4">
				<div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-muted">
					{form.watch("profileImage") ? (
						<Image
							src={form.watch("profileImage")}
							alt="Profile"
							fill
							className="object-cover"
						/>
					) : (
						<div className="flex items-center justify-center h-full bg-muted text-muted-foreground">
							No Image
						</div>
					)}
				</div>

				<Form {...form}>
					<form className="w-full max-w-sm">
						<FormField
							control={form.control}
							name="profileImage"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Upload New Profile Picture</FormLabel>
									<FormControl>
										<Input
											type="file"
											accept="image/*"
											onChange={async (e) => {
												const file = e.target.files?.[0];
												if (file) {
													try {
														setLoading(true);
														setMessage(null);
														const formData = new FormData();
														formData.append("file", file);

														const { uploadProfileImage } = await import(
															"@/lib/actions"
														);
														const result = await uploadProfileImage(formData);

														field.onChange(result.secure_url);
														setMessage({
															type: "success",
															text: "Profile picture updated successfully!",
														});
													} catch (error) {
														console.error("Upload failed:", error);
														setMessage({
															type: "error",
															text: "Failed to upload profile picture.",
														});
													} finally {
														setLoading(false);
													}
												}
											}}
											disabled={loading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
			</div>
		</div>
	);
}
