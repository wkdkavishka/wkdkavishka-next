import { ogImagePath, siteName, siteUrl } from "@/data/metadata";
import siteData, { type Project } from "@/data/site-data";

// Every page carries the Person (from the root layout); other pages point back to it by this id.
export const personId = `${siteUrl}/#person`;

const { personal } = siteData;

export const personJsonLd = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "Person",
			"@id": personId,
			name: personal.name,
			alternateName: personal.alternateNames,
			url: siteUrl,
			image: `${siteUrl}${personal.profileImage}`,
			jobTitle: personal.jobTitle,
			description: personal.description,
			// Education names the institution only; alumniOf would imply an unspecified status.
			email: personal.email,
			address: {
				"@type": "PostalAddress",
				addressLocality: "Colombo",
				addressCountry: "LK",
			},
			worksFor: siteData.experience
				.filter((job) => !job.end)
				.map((job) => ({ "@type": "Organization", name: job.company })),
			knowsAbout: siteData.skills.flatMap((group) => group.skills),
			// Profiles only — a wa.me chat link is not a page about the person
			sameAs: siteData.socialLinks
				.map((link) => link.url)
				.filter((url) => !url.startsWith("https://wa.me/")),
		},
		{
			"@type": "WebSite",
			"@id": `${siteUrl}/#website`,
			url: siteUrl,
			name: siteName,
			inLanguage: "en",
			publisher: { "@id": personId },
		},
	],
};

export function projectJsonLd(project: Project) {
	const url = `${siteUrl}/projects/${project.slug}`;
	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "CreativeWork",
				"@id": `${url}#work`,
				name: project.title,
				description: project.summary,
				url,
				image: `${siteUrl}${ogImagePath(project.slug)}`,
				keywords: project.tags.join(", "),
				dateModified: project.updated,
				author: { "@id": personId },
			},
			{
				"@type": "BreadcrumbList",
				itemListElement: [
					{ "@type": "ListItem", position: 1, name: siteName, item: siteUrl },
					{ "@type": "ListItem", position: 2, name: project.title, item: url },
				],
			},
		],
	};
}
