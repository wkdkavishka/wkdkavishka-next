import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { PersonalData } from "@/data/site-data";

export function About({ personalData }: { personalData: PersonalData }) {
	return (
		<section
			id="about"
			className="container mx-auto py-24 sm:py-32 px-4 md:px-6"
		>
			<div className="reveal flex flex-col items-center gap-4 text-center md:gap-8">
				<div className="space-y-2">
					<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
						About Me
					</h2>
					<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
						Full-stack web applications and Flutter mobile apps.
					</p>
				</div>
			</div>

			<div className="grid gap-12 lg:grid-cols-2 mt-16 items-center">
				<div className="reveal relative aspect-square overflow-hidden rounded-xl bg-muted">
					<Image
						src={personalData.profileImage}
						alt={`${personalData.name}, ${personalData.headline}`}
						fill
						className="object-cover"
					/>
				</div>
				<div className="reveal flex flex-col gap-4">
					{personalData.about.map((paragraph, index) => (
						<p key={index} className="text-lg text-muted-foreground">
							{paragraph}
						</p>
					))}

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
