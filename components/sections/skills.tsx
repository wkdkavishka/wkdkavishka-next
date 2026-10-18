import { Card, CardContent } from "@/components/ui/card";
import type { SkillGroup } from "@/data/site-data";

export function Skills({ skills }: { skills: SkillGroup[] }) {
	return (
		<section
			id="skills"
			className="container mx-auto py-24 sm:py-32 px-4 md:px-6 flex flex-col items-center"
		>
			<div className="reveal flex flex-col items-center gap-4 text-center md:gap-8 mb-16">
				<div className="space-y-2">
					<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
						Skills
					</h2>
					<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
						Tools I have shipped work with.
					</p>
				</div>
			</div>

			<div className="grid gap-6 md:grid-cols-2 w-full max-w-5xl">
				{skills.map((group) => (
					<div key={group.name} className="reveal">
						<Card className="h-full border-muted-foreground/20">
							<CardContent className="p-6 flex flex-col gap-4">
								<h3 className="font-semibold text-lg">{group.name}</h3>
								<ul className="flex flex-wrap gap-2">
									{group.skills.map((skill) => (
										<li
											key={skill}
											className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground"
										>
											{skill}
										</li>
									))}
								</ul>
							</CardContent>
						</Card>
					</div>
				))}
			</div>
		</section>
	);
}
