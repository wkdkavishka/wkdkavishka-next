import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import {
	getPersonalData,
	getProjects,
	getServices,
	getSocialLinks,
} from "@/lib/actions";

export default async function Home() {
	const personalData = await getPersonalData();
	const services = await getServices();
	const projects = await getProjects();
	const socialLinks = await getSocialLinks();

	if (!personalData) {
		return <div>Loading... or No Data Found.</div>;
	}

	// Combine social links into personal data if needed, or pass separately
	// personalData.socialLinks = socialLinks; // Types might mismatch if I don't cast or map
	// Let's pass them separately or construct the full object if components expect it.
	// The components expect `siteData` structure usually. I should update components to accept specific props.

	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex-1">
				<Hero personalData={personalData} socialLinks={socialLinks} />
				<About personalData={personalData} />
				<Projects projects={projects} />
				<Skills skills={services} />
				<Contact personalData={personalData} socialLinks={socialLinks} />
			</main>
			<Footer personalData={personalData} socialLinks={socialLinks} />
		</div>
	);
}
