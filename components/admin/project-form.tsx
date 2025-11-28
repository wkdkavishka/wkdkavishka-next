"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { updateProject } from "@/lib/actions";
import { type Project, projectSchema } from "@/lib/schema";

export function ProjectForm({
	initialData,
	onSuccess,
}: {
	initialData?: Project;
	onSuccess: () => void;
}) {
	const [loading, setLoading] = useState(false);

	const form = useForm<Project>({
		resolver: zodResolver(projectSchema),
		defaultValues: initialData || {
			id: "",
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

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="id"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ID (Unique Slug)</FormLabel>
								<FormControl>
									<Input {...field} disabled={!!initialData} />
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
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea {...field} />
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
							<FormLabel>Image URLs (One per line)</FormLabel>
							<FormControl>
								<Textarea
									value={field.value.join("\n")}
									onChange={(e) =>
										field.onChange(
											e.target.value
												.split("\n")
												.map((s) => s.trim())
												.filter((s) => s !== ""),
										)
									}
									rows={3}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" disabled={loading}>
					{loading ? "Saving..." : "Save Project"}
				</Button>
			</form>
		</Form>
	);
}
