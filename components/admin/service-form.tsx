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
import { updateService } from "@/lib/actions";
import { type Service, serviceSchema } from "@/lib/db/zod-schema";

export function ServiceForm({
	initialData,
	onSuccess,
}: {
	initialData?: Service;
	onSuccess: () => void;
}) {
	const [loading, setLoading] = useState(false);

	const form = useForm<Service>({
		resolver: zodResolver(serviceSchema),
		defaultValues: initialData || {
			name: "",
			description: "",
			icon: "FaCode", // Default icon
		},
	});

	async function onSubmit(data: Service) {
		setLoading(true);
		try {
			await updateService(data);
			onSuccess();
		} catch (error) {
			console.error(error);
			alert("Failed to save service");
		} finally {
			setLoading(false);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
				<FormField
					control={form.control}
					name="icon"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Icon Name (e.g. FaReact)</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={loading}>
					{loading ? "Saving..." : "Save Service"}
				</Button>
			</form>
		</Form>
	);
}
