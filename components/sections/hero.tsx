import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import { PWAInstallButton } from "@/components/pwa-install-button";
import { Button } from "@/components/ui/button";
import type { PersonalData, SocialLink } from "@/data/site-data";

export function Hero({
	personalData,
	socialLinks,
}: {
	personalData: PersonalData;
	socialLinks: SocialLink[];
}) {
	return (
		<section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background pt-16 md:pt-0">
			{/* Background Elements */}
			<div className="absolute inset-0 -z-10 overflow-hidden">
				<div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
				<div className="absolute left-0 top-0 -z-10 h-[310px] w-[310px] rounded-full bg-primary/20 blur-[50px] md:blur-[100px]"></div>
				<div className="absolute right-0 bottom-0 -z-10 h-[310px] w-[310px] rounded-full bg-secondary/20 blur-[50px] md:blur-[100px]"></div>
			</div>

			<div className="container mx-auto px-4 md:px-6">
				<div className="flex flex-col items-center gap-4 text-center">
					{/* Badge, name and intro are plain markup on purpose: they are the first thing people and
					    crawlers see, so they must not start hidden (opacity 0) waiting for an animation. */}
					<div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
						Available for new projects
					</div>
					<h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent pb-2 bg-gradient-to-r from-foreground to-foreground/70">
						{personalData.name}
					</h1>
					<p className="text-xl font-semibold text-primary sm:text-2xl md:text-3xl">
						{personalData.headline}
					</p>
					<p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed pb-3 xl:text-xl/relaxed">
						{personalData.intro}
					</p>
					<div className="flex flex-col gap-2 min-[400px]:flex-row">
						<Button size="lg" className="gap-2" asChild>
							<Link href="#contact">
								Hire Me <ArrowRight className="h-4 w-4" />
							</Link>
						</Button>
						<Button size="lg" variant="outline" className="gap-2" asChild>
							{/* Plain <a>: next/link would prefetch the PDF as if it were a page and log a 404 */}
							<a
								href={
									personalData.resumeUrl.includes("cloudinary")
										? personalData.resumeUrl.replace(
												"/upload/",
												"/upload/fl_attachment/",
											)
										: personalData.resumeUrl
								}
								target="_blank"
								rel="noopener"
							>
								Download CV <Download className="h-4 w-4" />
							</a>
						</Button>
						<PWAInstallButton />
					</div>

					<div className="flex items-center gap-4 mt-8">
						{socialLinks.map((link) => {
							const Icon = link.icon;
							return (
								<Link
									key={link.name}
									href={link.url}
									target="_blank"
									className="text-muted-foreground hover:text-primary transition-colors"
								>
									<Icon className="h-6 w-6" />
									<span className="sr-only">{link.name}</span>
								</Link>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
