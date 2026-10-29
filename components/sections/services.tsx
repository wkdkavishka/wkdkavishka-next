import { MotionDiv } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import type { Service } from "@/data/site-data";

export function Services({ services }: { services: Service[] }) {
	return (
		<section
			id="services"
			className="container mx-auto py-24 sm:py-32 px-4 md:px-6 flex flex-col items-center"
		>
			<SectionHeading title="Services" subtitle="What can I build for you?" />

			<div className="grid gap-6 sm:grid-cols-2 max-w-4xl">
				{services.map((service, index) => {
					const Icon = service.icon;
					return (
						<MotionDiv
							key={service.name}
							data-motion-reveal
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.9 }}
							viewport={{ once: false, amount: 0.3 }}
							transition={{ duration: 0.3, delay: index * 0.05 }}
						>
							<Card className="h-full border-muted-foreground/20 hover:border-primary/50 transition-colors">
								<CardContent className="p-6 flex flex-col gap-3">
									<Icon className="h-8 w-8 text-primary" />
									<h3 className="font-semibold text-lg">{service.name}</h3>
									<p className="text-sm text-muted-foreground">
										{service.description}
									</p>
								</CardContent>
							</Card>
						</MotionDiv>
					);
				})}
			</div>
		</section>
	);
}
