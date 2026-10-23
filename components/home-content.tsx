import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { Skills } from "@/components/sections/skills";
import siteData from "@/data/site-data";

export function HomeContent() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header name={siteData.personal.name} />
			<main className="flex-1">
				<Hero
					personalData={siteData.personal}
					socialLinks={siteData.socialLinks.filter((link) =>
						link.placements.includes("hero"),
					)}
				/>
				<About personalData={siteData.personal} />
				<Projects projects={siteData.projects} />
				<Experience experience={siteData.experience} />
				<Skills skills={siteData.skills} />
				<Services services={siteData.services} />
				<Contact
					personalData={siteData.personal}
					socialLinks={siteData.socialLinks.filter((link) =>
						link.placements.includes("contact"),
					)}
				/>
			</main>
			<Footer />
		</div>
	);
}
