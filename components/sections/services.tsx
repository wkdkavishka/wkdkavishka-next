import { Card, CardContent } from "@/components/ui/card";
import type { Service } from "@/data/site-data";

export function Services({ services }: { services: Service[] }) {
	return (
		<section
			id="services"
			className="container mx-auto py-24 sm:py-32 px-4 md:px-6 flex flex-col items-center"
		>
			<div className="reveal flex flex-col items-center gap-4 text-center md:gap-8 mb-16">
				<div className="space-y-2">
					<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
						Services
					</h2>
					<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
						What I can build for you.
					</p>
				</div>
			</div>

			<div className="grid gap-6 sm:grid-cols-2 max-w-4xl">
				{services.map((service) => {
					const Icon = service.icon;
					return (
						<div key={service.name} className="reveal">
							<Card className="h-full border-muted-foreground/20 hover:border-primary/50 transition-colors">
								<CardContent className="p-6 flex flex-col gap-3">
									<Icon className="h-8 w-8 text-primary" />
									<h3 className="font-semibold text-lg">{service.name}</h3>
									<p className="text-sm text-muted-foreground">
										{service.description}
									</p>
								</CardContent>
							</Card>
						</div>
					);
				})}
			</div>
		</section>
	);
}
