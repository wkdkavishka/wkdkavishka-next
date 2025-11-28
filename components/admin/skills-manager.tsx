"use client";

import { Pencil, Plus, Trash2 } from "lucide-react";
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
import { deleteService } from "@/lib/actions";
import type { Skill } from "@/lib/schema";
import { SkillForm } from "./skill-form";

export function SkillsManager({ initialSkills }: { initialSkills: Skill[] }) {
	const [isOpen, setIsOpen] = useState(false);
	const [editingSkill, setEditingSkill] = useState<Skill | undefined>(
		undefined,
	);

	const handleDelete = async (id: number) => {
		if (confirm("Are you sure you want to delete this skill?")) {
			await deleteService(id);
		}
	};

	return (
		<div className="space-y-4">
			<div className="flex justify-end">
				<Dialog open={isOpen} onOpenChange={setIsOpen}>
					<DialogTrigger asChild>
						<Button onClick={() => setEditingSkill(undefined)}>
							<Plus className="mr-2 h-4 w-4" /> Add Skill
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								{editingSkill ? "Edit Skill" : "Add Skill"}
							</DialogTitle>
						</DialogHeader>
						<SkillForm
							initialData={editingSkill}
							onSuccess={() => setIsOpen(false)}
						/>
					</DialogContent>
				</Dialog>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{initialSkills.map((skill) => (
					<Card key={skill.id}>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								{skill.name}
							</CardTitle>
							<div className="flex space-x-2">
								<Button
									variant="ghost"
									size="icon"
									onClick={() => {
										setEditingSkill(skill);
										setIsOpen(true);
									}}
								>
									<Pencil className="h-4 w-4" />
								</Button>
								<Button
									variant="ghost"
									size="icon"
									className="text-destructive"
									onClick={() => skill.id && handleDelete(skill.id)}
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
						</CardHeader>
						<CardContent>
							<p className="text-xs text-muted-foreground">
								{skill.description}
							</p>
							<p className="text-xs text-muted-foreground mt-2">
								Icon: {skill.icon}
							</p>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
