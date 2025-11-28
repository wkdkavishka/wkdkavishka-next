"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { updatePersonalData } from "@/lib/actions";
import { type PersonalData, personalDataSchema } from "@/lib/schema";
// Wait, I should check if toast is available. The user mentioned "useGlobalAlert" in previous convos, but that might be a different project.
// I'll stick to standard UI components. I'll use a simple state for success/error if no toast.
// Actually, I'll use `alert` or just console for now, or install `sonner` if I want to be fancy.
// Let's check package.json for toast.

import { useState } from "react";

export function PersonalForm({ initialData }: { initialData: PersonalData }) {
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<{
		type: "success" | "error";
		text: string;
	} | null>(null);

	const form = useForm<PersonalData>({
		resolver: zodResolver(personalDataSchema),
		defaultValues: initialData,
	});

	async function onSubmit(data: PersonalData) {
		setLoading(true);
		setMessage(null);
		try {
			await updatePersonalData(data);
			setMessage({
				type: "success",
				text: "Personal data updated successfully!",
			});
		} catch (error) {
			console.error(error);
			setMessage({ type: "error", text: "Failed to update personal data." });
		} finally {
			setLoading(false);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				{message && (
					<div
						className={`p-3 rounded-md ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
					>
						{message.text}
					</div>
				)}

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
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
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="phone"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Phone</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="location"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Location</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="startYear"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Start Year</FormLabel>
								<FormControl>
									<Input
										type="number"
										{...field}
										onChange={(e) =>
											field.onChange(parseInt(e.target.value, 10))
										}
									/>
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
							<FormLabel>Short Description</FormLabel>
							<FormControl>
								<Textarea {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="getInTouch"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Get In Touch Text</FormLabel>
							<FormControl>
								<Textarea {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Handling arrays like 'about' and 'skills' as comma-separated strings for simplicity in this form, 
            or better, dynamic fields. For now, let's use a simple text area for 'about' paragraphs separated by newlines? 
            Actually, the schema expects an array. I should handle that. 
            For 'about', let's join with newlines for editing and split on submit. 
            Wait, react-hook-form with zod expects array. 
            I'll create a custom field logic here or just simplify to text area that splits on newline.
        */}

				<FormField
					control={form.control}
					name="about"
					render={({ field }) => (
						<FormItem>
							<FormLabel>About (One paragraph per line)</FormLabel>
							<FormControl>
								<Textarea
									value={field.value.join("\n")}
									onChange={(e) =>
										field.onChange(
											e.target.value
												.split("\n")
												.filter((line) => line.trim() !== ""),
										)
									}
									rows={5}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="skills"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Skills List (One skill per line)</FormLabel>
							<FormControl>
								<Textarea
									value={field.value.join("\n")}
									onChange={(e) =>
										field.onChange(
											e.target.value
												.split("\n")
												.filter((line) => line.trim() !== ""),
										)
									}
									rows={5}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" disabled={loading}>
					{loading ? "Saving..." : "Save Changes"}
				</Button>
			</form>
		</Form>
	);
}
