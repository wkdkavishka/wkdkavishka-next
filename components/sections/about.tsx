import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import type { PersonalData } from "@/data/site-data";

export function About({ personalData }: { personalData: PersonalData }) {
	return (
		<section
			id="about"
			className="container mx-auto py-24 sm:py-32 px-4 md:px-6"
		>
			<SectionHeading title="About Me" subtitle="Who am I?" />

			<div className="grid gap-12 lg:grid-cols-2 items-center">
				<div className="reveal relative aspect-square overflow-hidden rounded-xl bg-muted">
					<Image
						src={personalData.profileImage}
						alt={`${personalData.name}, ${personalData.headline}`}
						fill
						sizes="(min-width: 1024px) 50vw, 100vw"
						className="object-cover"
					/>
				</div>
				<div className="reveal flex flex-col gap-4">
					{personalData.about.map((paragraph, index) => (
						<p key={index} className="text-lg text-muted-foreground">
							{paragraph}
						</p>
					))}
					{personalData.personalInterestsUrl && (
						<a
							href={personalData.personalInterestsUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex min-h-11 w-fit items-center gap-2 font-medium underline underline-offset-4"
						>
							My personal interests
							<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
						</a>
					)}

					<div className="grid grid-cols-2 gap-4 mt-4">
						<Card>
							<CardContent className="p-4 flex flex-col items-center justify-center text-center">
								<span className="text-3xl font-bold">10+</span>
								<span className="text-sm text-muted-foreground">
									Projects Completed
								</span>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-4 flex flex-col items-center justify-center text-center">
								<span className="text-3xl font-bold">
									{personalData.education.shortName}
								</span>
								<span className="text-sm text-muted-foreground">
									{personalData.education.name}
								</span>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
