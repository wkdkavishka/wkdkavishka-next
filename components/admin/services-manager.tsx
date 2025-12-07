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
import type { Service } from "@/lib/db/zod-schema";
import { ServiceForm } from "./service-form";

export function ServicesManager({
	initialServices,
}: {
	initialServices: Service[];
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [editingService, setEditingService] = useState<Service | undefined>(
		undefined,
	);

	const handleDelete = async (id: number) => {
		if (confirm("Are you sure you want to delete this service?")) {
			await deleteService(id);
		}
	};

	return (
		<div className="space-y-4">
			<div className="flex justify-end">
				<Dialog open={isOpen} onOpenChange={setIsOpen}>
					<DialogTrigger asChild>
						<Button onClick={() => setEditingService(undefined)}>
							<Plus className="mr-2 h-4 w-4" /> Add Service
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								{editingService ? "Edit Service" : "Add Service"}
							</DialogTitle>
						</DialogHeader>
						<ServiceForm
							initialData={editingService}
							onSuccess={() => setIsOpen(false)}
						/>
					</DialogContent>
				</Dialog>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{initialServices.map((service) => (
					<Card key={service.id}>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								{service.name}
							</CardTitle>
							<div className="flex space-x-2">
								<Button
									variant="ghost"
									size="icon"
									onClick={() => {
										setEditingService(service);
										setIsOpen(true);
									}}
								>
									<Pencil className="h-4 w-4" />
								</Button>
								<Button
									variant="ghost"
									size="icon"
									className="text-destructive"
									onClick={() => service.id && handleDelete(service.id)}
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
						</CardHeader>
						<CardContent>
							<p className="text-xs text-muted-foreground">
								{service.description}
							</p>
							<p className="text-xs text-muted-foreground mt-2">
								Icon: {service.icon}
							</p>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
