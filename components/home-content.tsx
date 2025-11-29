"use client";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { usePortfolioData } from "@/lib/use-portfolio-data";

export function HomeContent() {
	const { data, loading, error } = usePortfolioData();

	if (loading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-center">
					<div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
					<p className="text-muted-foreground">Loading portfolio data...</p>
				</div>
			</div>
		);
	}

	if (error || !data || !data.personalData) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-center">
					<p className="text-destructive mb-2">Failed to load portfolio data</p>
					<p className="text-sm text-muted-foreground">{error || "No data found"}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex-1">
				<Hero personalData={data.personalData} socialLinks={data.socialLinks} />
				<About personalData={data.personalData} />
				<Projects projects={data.projects} imageBlobs={data.imageBlobs} />
				<Skills skills={data.services} />
				<Contact personalData={data.personalData} socialLinks={data.socialLinks} />
			</main>
			<Footer personalData={data.personalData} socialLinks={data.socialLinks} />
		</div>
	);
}
