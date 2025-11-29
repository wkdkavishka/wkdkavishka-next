"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateProject, uploadImage } from "@/lib/actions";
import { type Project, projectSchema } from "@/lib/schema";

export function ProjectForm({
	initialData,
	onSuccess,
}: {
	initialData?: Project;
	onSuccess: () => void;
}) {
	const [loading, setLoading] = useState(false);
	const [uploading, setUploading] = useState(false);

	const form = useForm<Project>({
		resolver: zodResolver(projectSchema),
		defaultValues: initialData || {
			slug: "",
			title: "",
			description: "",
			tags: [],
			link: "",
			image: [],
			github: "",
		},
	});

	async function onSubmit(data: Project) {
		setLoading(true);
		try {
			await updateProject(data);
			onSuccess();
		} catch (error) {
			console.error(error);
			alert("Failed to save project");
		} finally {
			setLoading(false);
		}
	}

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setUploading(true);
		const formData = new FormData();
		formData.append("file", file);

		try {
			const result = await uploadImage(formData);
			const currentImages = form.getValues("image");
			form.setValue("image", [...currentImages, result.secure_url]);
		} catch (error) {
			console.error("Upload failed:", error);
			alert("Failed to upload image");
		} finally {
			setUploading(false);
			// Reset input
			e.target.value = "";
		}
	};

	const removeImage = (index: number) => {
		const currentImages = form.getValues("image");
		form.setValue(
			"image",
			currentImages.filter((_, i) => i !== index),
		);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="slug"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Slug (Unique ID)</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description (Exactly 4 lines)</FormLabel>
							<FormControl>
								<Textarea {...field} rows={5} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="link"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Demo Link</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="github"
						render={({ field }) => (
							<FormItem>
								<FormLabel>GitHub Link</FormLabel>
								<FormControl>
									<Input {...field} value={field.value || ""} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="tags"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tags (Comma separated)</FormLabel>
							<FormControl>
								<Input
									value={field.value.join(", ")}
									onChange={(e) =>
										field.onChange(
											e.target.value
												.split(",")
												.map((s) => s.trim())
												.filter((s) => s !== ""),
										)
									}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="image"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Images</FormLabel>
							<div className="space-y-4">
								<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
									{field.value.map((url, index) => (
										<div key={index} className="relative aspect-video group">
											<Image
												src={url}
												alt={`Project image ${index + 1}`}
												fill
												className="object-cover rounded-md border"
											/>
											<button
												type="button"
												onClick={() => removeImage(index)}
												className="absolute top-1 right-1 bg-destructive text-destructive-foreground p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
											>
												<X className="h-3 w-3" />
											</button>
										</div>
									))}
								</div>
								<div className="flex items-center gap-2">
									<Button
										type="button"
										variant="outline"
										disabled={uploading}
										onClick={() =>
											document.getElementById("image-upload")?.click()
										}
									>
										{uploading ? (
											<Loader2 className="h-4 w-4 animate-spin mr-2" />
										) : (
											<Upload className="h-4 w-4 mr-2" />
										)}
										Upload Image
									</Button>
									<Input
										id="image-upload"
										type="file"
										accept="image/*"
										className="hidden"
										onChange={handleImageUpload}
										disabled={uploading}
									/>
								</div>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" disabled={loading || uploading}>
					{loading ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
						</>
					) : (
						"Save Project"
					)}
				</Button>
			</form>
		</Form>
	);
}
