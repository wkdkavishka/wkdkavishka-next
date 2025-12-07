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
import { updateSocialLink } from "@/lib/actions";
import { type SocialLink, socialLinkSchema } from "@/lib/db/zod-schema";

export function SocialForm({
	initialData,
	onSuccess,
}: {
	initialData?: SocialLink;
	onSuccess: () => void;
}) {
	const [loading, setLoading] = useState(false);

	const form = useForm<SocialLink>({
		resolver: zodResolver(socialLinkSchema),
		defaultValues: initialData || {
			name: "",
			url: "",
			icon: "FaLink",
		},
	});

	async function onSubmit(data: SocialLink) {
		setLoading(true);
		try {
			await updateSocialLink(data);
			onSuccess();
		} catch (error) {
			console.error(error);
			alert("Failed to save social link");
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
					name="url"
					render={({ field }) => (
						<FormItem>
							<FormLabel>URL</FormLabel>
							<FormControl>
								<Input {...field} />
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
							<FormLabel>Icon Name (e.g. FaGithub)</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={loading}>
					{loading ? "Saving..." : "Save Link"}
				</Button>
			</form>
		</Form>
	);
}
