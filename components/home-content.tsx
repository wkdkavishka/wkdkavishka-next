"use client";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import siteData from "@/data/site-data";

export function HomeContent() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex-1">
				<Hero
					personalData={siteData.personal}
					socialLinks={siteData.socialLinks}
				/>
				<About personalData={siteData.personal} />
				<Projects projects={siteData.projects} />
				<Services services={siteData.services} />
				<Contact
					personalData={siteData.personal}
					socialLinks={siteData.socialLinks}
				/>
			</main>
			<Footer
				personalData={siteData.personal}
				socialLinks={siteData.socialLinks}
			/>
		</div>
	);
}
