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
import { deleteProject } from "@/lib/actions";
import type { Project } from "@/lib/db/zod-schema";
import { ProjectForm } from "./project-form";

export function ProjectsManager({
	initialProjects,
}: {
	initialProjects: Project[];
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [editingProject, setEditingProject] = useState<Project | undefined>(
		undefined,
	);

	const handleDelete = async (id: number) => {
		if (confirm("Are you sure you want to delete this project?")) {
			await deleteProject(id);
		}
	};

	return (
		<div className="space-y-4">
			<div className="flex justify-end">
				<Dialog open={isOpen} onOpenChange={setIsOpen}>
					<DialogTrigger asChild>
						<Button onClick={() => setEditingProject(undefined)}>
							<Plus className="mr-2 h-4 w-4" /> Add Project
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-2xl">
						<DialogHeader>
							<DialogTitle>
								{editingProject ? "Edit Project" : "Add Project"}
							</DialogTitle>
						</DialogHeader>
						<ProjectForm
							initialData={editingProject}
							onSuccess={() => setIsOpen(false)}
						/>
					</DialogContent>
				</Dialog>
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				{initialProjects.map((project) => (
					<Card key={project.id}>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-base font-medium truncate max-w-[200px]">
								{project.title}
							</CardTitle>
							<div className="flex space-x-2">
								<Button
									variant="ghost"
									size="icon"
									onClick={() => {
										setEditingProject(project);
										setIsOpen(true);
									}}
								>
									<Pencil className="h-4 w-4" />
								</Button>
								<Button
									variant="ghost"
									size="icon"
									className="text-destructive"
									onClick={() => project.id && handleDelete(project.id)}
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
						</CardHeader>
						<CardContent>
							<p className="text-xs text-muted-foreground line-clamp-2 mb-2">
								{project.description}
							</p>
							<div className="flex flex-wrap gap-1 mb-2">
								{project.tags.map((tag) => (
									<span
										key={tag}
										className="text-[10px] bg-secondary px-1 py-0.5 rounded"
									>
										{tag}
									</span>
								))}
							</div>
							<Link
								href={project.link}
								target="_blank"
								className="text-xs text-primary flex items-center hover:underline"
							>
								View Demo <ExternalLink className="ml-1 h-3 w-3" />
							</Link>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
