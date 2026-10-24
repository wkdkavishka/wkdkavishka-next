import { Briefcase } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import type { Experience as ExperienceItem } from "@/data/site-data";

export function Experience({ experience }: { experience: ExperienceItem[] }) {
	return (
		<section
			id="experience"
			className="container mx-auto py-24 sm:py-32 px-4 md:px-6 flex flex-col items-center"
		>
			<SectionHeading title="Experience" subtitle="Where have I worked?" />

			<div className="flex flex-col gap-6 w-full max-w-3xl">
				{experience.map((job) => (
					<div key={`${job.company}-${job.role}`} className="reveal">
						<Card className="border-muted-foreground/20">
							<CardContent className="p-6 flex gap-4">
								<Briefcase className="h-6 w-6 shrink-0 text-primary mt-1" />
								<div className="flex flex-col gap-1">
									<h3 className="font-semibold text-lg">{job.role}</h3>
									<p className="font-medium">{job.company}</p>
									<p className="text-sm text-muted-foreground">
										{job.start} – {job.end ?? "Present"}
									</p>
									<p className="text-muted-foreground mt-2">{job.summary}</p>
								</div>
							</CardContent>
						</Card>
					</div>
				))}
			</div>
		</section>
	);
}
