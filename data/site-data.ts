import type { IconType } from "react-icons";
import {
	FaBluetoothB,
	FaCode,
	FaFacebook,
	FaGithub,
	FaInstagram,
	FaLinkedin,
	FaLock,
	FaMobileAlt,
	FaPuzzlePiece,
	FaRobot,
	FaServer,
	FaTerminal,
	FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export interface Service {
	name: string;
	description: string;
	icon: IconType;
}

export interface ProjectLink {
	label: string;
	url: string;
	type: "demo" | "code" | "package";
}

export const projectSections = {
	featured: {
		id: "projects",
		title: "Featured Projects",
		subtitle: "What have I built?",
	},
	"open-source": {
		id: "open-source",
		title: "Open Source",
		subtitle: "What have I shared?",
	},
} as const;

export type ProjectSection = keyof typeof projectSections;

export interface Project {
	// URL segment of the project page (/projects/<slug>) and of its share image (/og/<slug>.png)
	slug: string;
	title: string;
	// Curated placement, not inferred from whether a project has a public repository.
	section: ProjectSection;
	// Adds search/share context without changing the project's display name or published URL.
	seoTitle?: string;
	// One line, shown on the card and used as the page's meta description
	summary: string;
	description: string;
	highlights: string[];
	// Solo refers to the work described here, not authorship of upstream projects in a fork.
	contributionType: "solo" | "team";
	tags: string[];
	// Where it was built, for work done for an employer
	org?: string;
	engagement?: "Employment" | "Freelance" | "Personal";
	role?: string;
	years?: string;
	links: ProjectLink[];
	image: string[];
	imageDetails?: Record<string, { alt: string; caption?: string }>;
	// Date the page content last changed (sitemap lastmod); bump it when editing the entry
	updated: string;
}

export interface SocialLink {
	name: string;
	url: string;
	icon: IconType;
	// Display locations do not limit the profile identity links used by structured data.
	placements: ("hero" | "contact" | "footer")[];
}

export interface Experience {
	role: string;
	company: string;
	start: string;
	// Unset means the role is current
	end?: string;
	summary: string;
}

// export interface TeamMember {
// 	id: string;
// 	name: string;
// 	role: string;
// 	company: string;
// 	image: string;
// 	testimonial: string;
// 	social: {
// 		linkedin: string;
// 		twitter: string;
// 		github: string;
// 	};
// }

// personel
export interface PersonalData {
	// The brand: shown largest everywhere. Other spellings go in alternateNames so search engines tie them together.
	name: string;
	alternateNames: string[];
	// Real job title, used in structured data
	jobTitle: string;
	// What people search for; shown under the name
	headline: string;
	// One line under the headline in the hero
	intro: string;
	location: string;
	email: string;
	phone: string;
	profileImage: string;
	// Where you studied — the user asked for the place only, no degree or status
	education: { name: string; shortName: string };
	about: string[];
	// Only show the external link once the separate personal site is ready.
	personalInterestsUrl?: string;
	getInTouch: string;
	portfolioUrl: string;
	description: string;
}

export interface SiteData {
	personal: PersonalData;
	experience: Experience[];
	services: Service[];
	projects: Project[];
	socialLinks: SocialLink[];
	siteUrl: string;
	// Date the home page content last changed (sitemap lastmod); bump it when editing
	updated: string;
}

// Create the site data with proper typing
const siteData: SiteData = {
	siteUrl: "https://wkdkavishka.github.io",
	updated: "2026-10-28T21:22:36Z",
	personal: {
		name: "W.K.D. Kavishka",
		alternateNames: ["Dumindu Kavishka", "W.K.D.Kavishka", "wkdkavishka"],
		jobTitle: "Associate Software Engineer",
		headline: "Software Engineer · Web & Flutter Apps",
		intro:
			"I build full-stack web applications and Flutter mobile apps—from interfaces and APIs to databases. Based in Colombo, Sri Lanka.",
		location: "Colombo, Sri Lanka",
		email: "w.k.d.kavishka@gmail.com",
		phone: "+94757676968",
		profileImage: "/images/profile/profile.webp",
		education: {
			name: "University of Colombo School of Computing",
			shortName: "UCSC",
		},
		about: [
			"I'm W.K.D. Kavishka, a software engineer based in Colombo, Sri Lanka. I build software, but that is only part of who I am.",
			"I'm drawn to philosophy, literature and poetry—to questions that don't always have clear answers, and words that help us understand ourselves a little better.",
			"I write poems too. This site is where I share what I build; my writing and personal interests will have a space of their own.",
		],
		getInTouch:
			"Need a web application or Flutter mobile app? I'm open to freelance work and collaborations. Send me a message and I'll get back to you soon.",
		portfolioUrl: "/portfolio.pdf",
		description:
			"W.K.D. Kavishka (Dumindu Kavishka) is a software engineer in Colombo, Sri Lanka, specialising in full-stack web applications, Flutter mobile apps, APIs and databases.",
	},
	experience: [
		{
			role: "Associate Software Engineer",
			company: "Ceylon Business Appliances (Pvt) Ltd",
			start: "2025",
			summary:
				"Main developer of CBA Trackable, a Flutter field-service app with background GPS tracking. Android kiosk provisioning, Bluetooth links for payment terminals, and a full-stack inventory system (Next.js, Spring Boot, PostgreSQL) built solo.",
		},
		{
			role: "Full-stack Developer",
			company: "Globevik",
			start: "2024",
			summary:
				"Backends for client web platforms, including SG Life: Express APIs on PostgreSQL, PayHere payments and Docker deployments.",
		},
	],
	services: [
		{
			name: "Full-Stack Web Development",
			description:
				"Web applications from interface to database, with Next.js, React, Spring Boot, Node.js and PostgreSQL.",
			icon: FaCode,
		},
		{
			name: "Flutter Mobile Development",
			description:
				"Flutter mobile apps with offline workflows, API integration and native Android features, including reliable background GPS tracking.",
			icon: FaMobileAlt,
		},
		{
			name: "Android Kiosk & Device Management",
			description:
				"Locked-down single-purpose devices with Android Enterprise device owner, lock task mode and scripted provisioning.",
			icon: FaLock,
		},
		{
			name: "Device Connectivity",
			description:
				"Bluetooth, USB and TCP links between Android devices, payment terminals, cash registers and receipt printers (ESC/POS).",
			icon: FaBluetoothB,
		},
		{
			name: "Browser Extension Development",
			description:
				"Custom Chrome extensions for productivity, tab management and browser workflows, built with Manifest V3 and JavaScript.",
			icon: FaPuzzlePiece,
		},
		{
			name: "Automation & Scripting",
			description:
				"Python, Bash and JavaScript tools that automate repetitive tasks, scheduled jobs and file workflows, with custom command-line utilities.",
			icon: FaTerminal,
		},
		{
			name: "Backend & API Development",
			description:
				"REST APIs, databases, authentication and third-party integrations with Node.js, Fastify, Express, Spring Boot and PostgreSQL.",
			icon: FaServer,
		},
		{
			name: "AI API Integration",
			description:
				"OpenAI-powered chat and image-generation features integrated into applications and command-line tools.",
			icon: FaRobot,
		},
	],
	projects: [
		{
			slug: "inventory-management-system",
			title: "CBA Grabit Inventory Management System",
			section: "featured",
			seoTitle: "CBA Grabit Inventory Management System — Next.js & Spring Boot",
			summary:
				"CBA Grabit inventory management system, built solo with Next.js, Spring Boot and PostgreSQL, covering purchasing, stock movements, approvals and reports.",
			description:
				"A system that tracks stock from purchase to machine for a vending-machine business: purchase requests through two approval stages to purchase orders and goods receipt, plus transfers, returns, write-offs, stock counts and reports. I designed and built it alone in about seven weeks, with 49 data models, about 150 API endpoints and 46 screens.",
			highlights: [
				"Stock lives in an append-only ledger, the only code allowed to change stock, so every balance can be traced back to its movements.",
				"Documents lock all their stock rows in one call, in a fixed order, with optimistic locking on every record, so two people can't book the same stock. Picking is first-expiry-first-out.",
				"Started as a browser-only Next.js prototype so the client could try the workflow early, then moved to Spring Boot and PostgreSQL screen by screen, deleting the prototype's duplicate logic.",
				"Sign-in lockout after repeated wrong passwords, role-based desks and an audit trail on every write.",
				"Spreadsheet imports for suppliers, items, machines and warehouses that catch mixed-up codes; a dashboard and eight reports.",
				"CI on Bitbucket Pipelines (lint, type check, formula tests, build and backend verify in parallel), plus one-command dev and prod scripts.",
			],
			contributionType: "solo",
			tags: [
				"Next.js",
				"React",
				"TypeScript",
				"TanStack Table",
				"Spring Boot",
				"Java",
				"PostgreSQL",
				"Flyway",
				"Docker",
				"Bitbucket Pipelines",
			],
			org: "Ceylon Business Appliances",
			engagement: "Employment",
			role: "Solo full-stack developer",
			years: "2026",
			links: [],
			image: [],
			updated: "2026-10-28T21:22:36Z",
		},
		{
			// This published slug stays stable even when the project title changes.
			slug: "field-service-gps-tracking-app",
			title: "CBA Trackable",
			section: "featured",
			seoTitle: "CBA Trackable — Flutter GPS Tracking App",
			summary:
				"Main developer of CBA Trackable, a Flutter field-service app with offline job management, service requests and reliable background GPS tracking.",
			description:
				"Ceylon Business Appliances' field-service app: staff handle service requests, jobs and claims, and the app records their route while they are on duty. I'm the main developer on the current version, working in Flutter with native Kotlin where Flutter can't reach.",
			highlights: [
				"Silent kills: one test user's phone killed the tracking service 7 times in a day, without a trace. I wrote a native plugin that asks Android why the app died, added a \"black box\" heartbeat log and a 15-minute watchdog that restarts tracking.",
				"Gaps while driving: phones in deep sleep (Doze) dropped up to 40 minutes of GPS, even with a foreground service, battery exemption and wake lock. Android skips deep Doze while an alarm-clock alarm is due within the hour, so tracking now keeps a rolling alarm 30 minutes ahead.",
				"Parked mode: a parked phone used to send up to 120 points an hour. It now parks after 3 minutes still, sends one anchor point every 15 minutes, and wakes on real movement from GPS distance checks plus Android's activity recognition.",
				"Honest accuracy: averaged readings no longer claim better accuracy than they have, and stale or frozen GPS fixes are detected instead of being sent again.",
				"Road snapping: the public OSRM servers take only 10 points per call and their bike and foot profiles leave out Sri Lanka's A-roads, so I self-host OSRM for the whole country with those roads added back, at 1,000 points per call.",
				"Offline-first: service requests, comments and ownership changes work without signal and sync safely later.",
				"Also: app-wide dark mode, Crashlytics in the background isolate, fewer UI rebuilds, image decoding off the UI thread, and an upgrade to Gradle 9, AGP 9 and Kotlin 2.3.",
			],
			contributionType: "team",
			tags: [
				"Flutter",
				"Dart",
				"Kotlin",
				"Android",
				"Riverpod",
				"Isar",
				"Firebase",
				"WorkManager",
				"Google Maps",
				"OSRM",
			],
			org: "Ceylon Business Appliances",
			engagement: "Employment",
			role: "Main developer",
			years: "2026",
			links: [],
			image: [],
			updated: "2026-10-28T21:22:36Z",
		},
		{
			slug: "korean-class",
			title: "Sanduni Korean Class",
			section: "featured",
			seoTitle: "Sanduni Korean Class — EPS-TOPIK-Style Exam Platform",
			summary:
				"Sanduni Korean Class, a full-stack exam platform built with Next.js and Fastify, with EPS-TOPIK-style listening exams, autosaved answers and instant results.",
			description:
				"A full-stack exam platform for a Korean language academy. Teachers build papers with text, audio and image questions; students sit them in the browser and get their results straight away.",
			highlights: [
				"Exam flow built like the real test: fullscreen mode, listening clips limited to two plays (still counted after a page reload), answers saved as you go, a colour-vision check, and results as a PDF.",
				"Student, teacher and admin roles with Clerk; teachers write papers in the same screens students see, switched into an editing mode.",
				"Fastify API on Vercel serverless with Drizzle ORM on Turso (libSQL); database indexes allow only one active paper at a time.",
				"Clients check a small cache flag to know when to refresh, instead of reloading settings on every visit; media stored on Cloudinary.",
			],
			contributionType: "solo",
			tags: [
				"Next.js",
				"React",
				"TypeScript",
				"Tailwind CSS",
				"Clerk",
				"Fastify",
				"Drizzle ORM",
				"Turso",
				"Vercel",
			],
			years: "2025 – 2026",
			links: [
				{
					label: "Live site",
					url: "https://www.sanduni-sonsenim-korean-academy.online/",
					type: "demo",
				},
			],
			image: [
				"/images/projects/korean-class/1.webp",
				"/images/projects/korean-class/2.webp",
				"/images/projects/korean-class/3.webp",
				"/images/projects/korean-class/4.webp",
				"/images/projects/korean-class/5.webp",
				"/images/projects/korean-class/6.webp",
			],
			updated: "2026-10-28T21:22:36Z",
		},
		{
			slug: "sg-life",
			title: "SG Life",
			section: "featured",
			seoTitle: "SG Life — Learning Platform Backend",
			summary:
				"Learning platform built with the Globevik team. I developed the Express and PostgreSQL backend, PayHere payments and Docker deployment.",
			description:
				"A learning platform by Surangith Godagama with financial education and professional development courses for insurance professionals. Built by the Globevik team.",
			highlights: [
				"My part: the backend API with Express and PostgreSQL.",
				"PayHere payment integration.",
				"Docker deployment.",
			],
			contributionType: "team",
			tags: [
				"Next.js",
				"Express",
				"PostgreSQL",
				"Firebase",
				"Docker",
				"PayHere",
			],
			org: "Globevik",
			engagement: "Employment",
			role: "Backend developer",
			links: [{ label: "Live site", url: "https://sglife.net/", type: "demo" }],
			image: [
				"/images/projects/sg-life/1.webp",
				"/images/projects/sg-life/2.webp",
				"/images/projects/sg-life/3.webp",
				"/images/projects/sg-life/4.webp",
			],
			updated: "2026-10-28T21:22:36Z",
		},
		{
			slug: "android-kiosk-device-owner",
			title: "Android Kiosk Device Controller",
			section: "featured",
			seoTitle: "Android Kiosk Controller — TestDPC Fork",
			summary:
				"Fork of Google's TestDPC that locks Android phones down to a few apps, with one-run provisioning scripts for Samsung and Xiaomi phones.",
			description:
				"A fork of Google's TestDPC sample app, set up as device owner to lock research phones down to a few approved apps. I maintain the fork and its provisioning scripts.",
			highlights: [
				"One script sets up a replacement phone end to end over adb: device owner, kiosk apps, network policy. It plans, applies, then checks for drift.",
				"Samsung and Xiaomi phones behave differently; I measured each on the real phone and handled them separately in the scripts.",
				"Kiosk (lock task) mode with a password-protected exit that restores the phone's policies.",
				"A device options screen inside the kiosk: brightness, screen timeout, rotation, PIN and ten status readouts.",
				"Unwanted apps are disabled, or hidden when the phone refuses to disable them.",
			],
			contributionType: "solo",
			tags: [
				"Android",
				"Java",
				"Kotlin",
				"Android Enterprise",
				"Device Policy Manager",
				"Kiosk mode",
				"adb",
				"Bash",
			],
			org: "Ceylon Business Appliances",
			engagement: "Employment",
			role: "Solo TestDPC customization and provisioning developer",
			years: "2026",
			links: [
				{
					label: "Code",
					url: "https://github.com/wkdkavishka/android-testdpc",
					type: "code",
				},
			],
			image: [],
			updated: "2026-10-28T21:22:36Z",
		},
		{
			slug: "irs-self-assessment",
			title: "IRS Self-Assessment Tool",
			section: "open-source",
			engagement: "Personal",
			seoTitle: "IRS Tool — Internal Restlessness Self-Assessment",
			summary:
				"Internal Restlessness Scale (IRS) self-assessment for ADHD-related inner restlessness, scored privately in the browser.",
			description:
				"An interactive version of the 24-question Internal Restlessness Scale. It scores answers in the browser, so nothing leaves the device.",
			highlights: [
				"Questionnaire with instant scoring, explanations and print/save of results; installable as a PWA.",
				"SEO fix: a one-question-at-a-time quiz gave search engines only 185 words to read, so I added a visible guide to the scale, taking the page to about 1,500 words.",
				"Found and fixed a results table whose bands didn't match the real scoring.",
			],
			contributionType: "solo",
			tags: ["Next.js", "TypeScript", "Tailwind CSS", "PWA", "GitHub Pages"],
			years: "2025 – 2026",
			links: [
				{
					label: "Live site",
					url: "https://wkdkavishka.github.io/IRS-Calculate_Inner_restlessnes_score/",
					type: "demo",
				},
				{
					label: "Code",
					url: "https://github.com/wkdkavishka/IRS-Next-ts",
					type: "code",
				},
			],
			image: [
				"/images/projects/irs-calculator/1.webp",
				"/images/projects/irs-calculator/2.webp",
				"/images/projects/irs-calculator/3.webp",
			],
			updated: "2026-10-28T21:22:36Z",
		},
		{
			slug: "chrome-tab-extensions",
			title: "Tab Sleep Timer & Tab Block",
			section: "open-source",
			engagement: "Personal",
			seoTitle: "Tab Sleep Timer & Tab Block — Chrome Extensions",
			summary:
				"Two dependency-free Chrome extensions: one puts idle tabs to sleep to save memory, the other closes tabs on blocked sites.",
			description:
				"Small Manifest V3 Chrome extensions written in plain JavaScript.",
			highlights: [
				"Tab Sleep Timer: sleeps idle tabs on a timer or on demand, with a never-sleep list and a live count on the icon.",
				"Fixed popup buttons that did nothing: the popup closed before Chrome's background service worker had started. Chrome also won't sleep a window's active tab, so a blank tab is placed in front of it first.",
				"Tab Block: closes tabs on blocked domains, from your own synced list plus a shared list hosted on GitHub, with import and export.",
			],
			contributionType: "solo",
			tags: ["JavaScript", "Chrome Extensions", "Manifest V3"],
			years: "2026",
			links: [
				{
					label: "Tab Sleep Timer code",
					url: "https://github.com/wkdkavishka/tab-sleep-timer",
					type: "code",
				},
				{
					label: "Tab Block code",
					url: "https://github.com/wkdkavishka/tab-block-chrome-extention",
					type: "code",
				},
			],
			image: [],
			updated: "2026-10-28T21:22:36Z",
		},
		{
			slug: "payment-terminal-launcher",
			title: "Payment Terminal Connectivity (R&D)",
			section: "featured",
			seoTitle: "Android Payment Terminal Connectivity",
			summary:
				"Android payment-terminal R&D: Bluetooth, USB and TCP connectivity with cash registers and receipt printers, using Kotlin and Python.",
			description:
				"Research and development work on Android payment terminals at Ceylon Business Appliances: connecting a shop's cash register to the terminal, and understanding what POS apps send to their printers.",
			highlights: [
				"Added a Bluetooth connection to an existing Android launcher's cash-register bridge, with a settings screen to manage it.",
				"Wrote Python test clients that drive the bridge over Bluetooth, USB and TCP.",
				"Built a proof of concept that pretends to be a Bluetooth receipt printer (an SPP server) and decodes the ESC/POS print data a POS app sends, with unit tests.",
			],
			contributionType: "team",
			tags: [
				"Kotlin",
				"Jetpack Compose",
				"Android",
				"Bluetooth SPP",
				"USB serial",
				"TCP sockets",
				"ESC/POS",
				"Python",
			],
			org: "Ceylon Business Appliances",
			engagement: "Employment",
			years: "2026",
			links: [],
			image: [],
			updated: "2026-10-28T21:22:36Z",
		},
		{
			slug: "linux-desktop-tools",
			title: "Linux Desktop Tools",
			section: "open-source",
			engagement: "Personal",
			seoTitle: "Linux Desktop Tools — KDE & Chrome PWA Fixes",
			summary:
				"Small tools for the Linux desktop: a fixer for broken Chrome app icons, and a native KDE front end for Xtreme Download Manager.",
			description:
				"Tools I built for my own KDE Plasma desktop and shared.",
			highlights: [
				"Chrome PWA icon fixer: repairs app icons on KDE and GNOME, installs without sudo, and watches for changes with a systemd path unit (cron as fallback). Fixed a loop where the watcher re-triggered on its own writes.",
				"XDM for KDE: replaced Xtreme Download Manager's Windows and GTK screens with a native Qt 6 / Kirigami interface, and fixed a deadlock where the UI waited for a reply on the same thread that had to read it.",
			],
			contributionType: "solo",
			tags: ["JavaScript", "Bash", "systemd", "Qt 6", "QML", "Kirigami", "KDE Plasma"],
			years: "2026",
			links: [
				{
					label: "Icon fixer code",
					url: "https://github.com/wkdkavishka/fix-chrome-PWA-icons-linux",
					type: "code",
				},
			],
			image: [],
			updated: "2026-10-28T21:22:36Z",
		},
		{
			slug: "gpt-shell-4o-mini",
			title: "GPT-shell-4o-mini",
			section: "open-source",
			engagement: "Personal",
			seoTitle: "GPT-shell-4o-mini — Python ChatGPT CLI",
			summary:
				"Lightweight Python CLI to use OpenAI's ChatGPT and DALL-E from the terminal, published on PyPI.",
			description:
				"A small command-line tool for chatting with ChatGPT and generating DALL-E images without leaving the terminal.",
			highlights: [
				"Installable with pip from PyPI.",
				"Chat and image generation from the shell.",
			],
			contributionType: "solo",
			tags: ["Python", "OpenAI API", "CLI", "PyPI"],
			links: [
				{
					label: "PyPI",
					url: "https://pypi.org/project/gpt-shell-4o-mini/",
					type: "package",
				},
				{
					label: "Code",
					url: "https://github.com/wkdkavishka/gpt-shell-4o-mini",
					type: "code",
				},
			],
			image: [
				"/images/projects/gpt-shell-4o-mini/1.webp",
				"/images/projects/gpt-shell-4o-mini/2.webp",
				"/images/projects/gpt-shell-4o-mini/3.webp",
				"/images/projects/gpt-shell-4o-mini/4.webp",
			],
			updated: "2026-10-28T21:22:36Z",
		},
	],
	socialLinks: [
		{
			name: "GitHub",
			url: "https://github.com/wkdkavishka",
			icon: FaGithub,
			placements: ["hero"],
		},
		{
			name: "LinkedIn",
			url: "https://linkedin.com/in/wkdkavishka",
			icon: FaLinkedin,
			placements: ["hero", "contact"],
		},
		{
			name: "X",
			url: "https://x.com/wkdkavishka",
			icon: FaXTwitter,
			placements: ["footer"],
		},
		{
			name: "Instagram",
			url: "https://www.instagram.com/w.k.d.kavishka/",
			icon: FaInstagram,
			placements: ["footer"],
		},
		{
			name: "Facebook",
			url: "https://facebook.com/W.K.D.Kavishka",
			icon: FaFacebook,
			placements: ["footer"],
		},
		{
			name: "WhatsApp",
			url: "https://wa.me/94757676968",
			icon: FaWhatsapp,
			placements: ["hero", "contact"],
		},
	],
};

export default siteData;
