"use client";

import { ExternalLink, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { deleteSocialLink } from "@/lib/actions";
import type { SocialLink } from "@/lib/schema";
import { SocialForm } from "./social-form";

export function SocialManager({
	initialLinks,
}: {
	initialLinks: SocialLink[];
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [editingLink, setEditingLink] = useState<SocialLink | undefined>(
		undefined,
	);

	const handleDelete = async (id: number) => {
		if (confirm("Are you sure you want to delete this link?")) {
			await deleteSocialLink(id);
		}
	};

	return (
		<div className="space-y-4">
			<div className="flex justify-end">
				<Dialog open={isOpen} onOpenChange={setIsOpen}>
					<DialogTrigger asChild>
						<Button onClick={() => setEditingLink(undefined)}>
							<Plus className="mr-2 h-4 w-4" /> Add Link
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								{editingLink ? "Edit Link" : "Add Link"}
							</DialogTitle>
						</DialogHeader>
						<SocialForm
							initialData={editingLink}
							onSuccess={() => setIsOpen(false)}
						/>
					</DialogContent>
				</Dialog>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{initialLinks.map((link) => (
					<Card key={link.id}>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">{link.name}</CardTitle>
							<div className="flex space-x-2">
								<Button
									variant="ghost"
									size="icon"
									onClick={() => {
										setEditingLink(link);
										setIsOpen(true);
									}}
								>
									<Pencil className="h-4 w-4" />
								</Button>
								<Button
									variant="ghost"
									size="icon"
									className="text-destructive"
									onClick={() => link.id && handleDelete(link.id)}
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
						</CardHeader>
						<CardContent>
							<Link
								href={link.url}
								target="_blank"
								className="text-xs text-primary flex items-center hover:underline truncate"
							>
								{link.url} <ExternalLink className="ml-1 h-3 w-3" />
							</Link>
							<p className="text-xs text-muted-foreground mt-2">
								Icon: {link.icon}
							</p>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
