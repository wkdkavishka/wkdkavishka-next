import type { IconType } from "react-icons";
import {
	FaCloud,
	FaCode,
	FaFacebook,
	FaGithub,
	FaLinkedin,
	FaMobileAlt,
	FaPalette,
	FaReact,
	FaWhatsapp,
} from "react-icons/fa";

export interface Service {
	name: string;
	description: string;
	icon: IconType;
}

export interface Project {
	id: string;
	title: string;
	description: string;
	tags: string[];
	link: string;
	image: string[];
	github?: string;
}

export interface SocialLink {
	name: string;
	url: string;
	icon: IconType;
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
	name: string;
	title: string;
	location: string;
	email: string;
	phone: string;
	profileImage: string;
	about: string[];
	getInTouch: string;
	resumeUrl: string;
	description: string;
	startYear: number;
}

export interface SiteData {
	personal: PersonalData;
	services: Service[];
	projects: Project[];
	socialLinks: SocialLink[];
	siteUrl: string;
}

// Create the site data with proper typing
const siteData: SiteData = {
	siteUrl: "https://wkdkavishka.github.io",
	personal: {
		name: "W.K.D.Kavishka",
		title: "Software Engineer",
		location: "Colombo, Sri Lanka",
		email: "w.k.d.kavishka@gmail.com",
		phone: "+94757676968",
		profileImage: "/images/profile/profile.webp",
		about: [
			"Helping businesses elevate their digital presence through modern software solutions.",
			"Passionate about tackling challenging projects and delivering scalable, high-performance applications.",
			"Committed to clean architecture, efficient DevOps practices, and seamless user experiences.",
			"Building long-term partnerships through innovation, reliability, and transparent communication.",
			"Dedicated to continuous improvement and excellence in every stage of software development.",
		],
		getInTouch:
			"Looking to turn your ideas into powerful, scalable solutions? Let’s connect! I’m available for freelance projects, collaborations, or consulting. Drop me a message, and I’ll get back to you promptly.",
		resumeUrl: "/resume.pdf",
		description:
			"W.K.D. Kavishka is a Software Engineer and DevOps Engineer in Colombo, Sri Lanka, specializing in full-stack web development, cloud infrastructure, and automation using React, Next.js, Node.js, Docker, Kubernetes, and AWS.",
		startYear: 2021,
	},
	services: [
		{
			name: "Web Applications",
			description:
				"Custom web applications built with modern technologies like React, Next.js, and TypeScript",
			icon: FaReact,
		},
		{
			name: "Custom Software Solutions",
			description:
				"Tailored software solutions designed to meet your specific business needs",
			icon: FaCode,
		},
		{
			name: "Mobile Apps (Android & iOS)",
			description:
				"Cross-platform mobile applications for both Android and iOS platforms",
			icon: FaMobileAlt,
		},
		{
			name: "Cloud Services",
			description: "Cloud infrastructure setup, deployment, and management",
			icon: FaCloud,
		},
		{
			name: "UI/UX Design",
			description:
				"Beautiful and intuitive user interfaces with exceptional user experience",
			icon: FaPalette,
		},
	],
	projects: [
		{
			id: "Korean Class",
			title: "Korean Class",
			description:
				"A Korean online exam platform ",
			tags: ["Next.js", "SQLite", "Clerk", "Fastify", "Vercel", "Serverless"],
			link: "https://www.sanduni-sonsenim-korean-academy.online/",
			github:
				"",
			image: [
				"/images/projects/korean-class/1.webp",
				"/images/projects/korean-class/2.webp",
				"/images/projects/korean-class/3.webp",
				"/images/projects/korean-class/4.webp",
				"/images/projects/korean-class/5.webp",
				"/images/projects/korean-class/6.webp",
			],
		},
		{
			id: "SG-Life",
			title: "SG Life",
			description:
				"An E-commerse platfor for Mr.Surangith Godagama , {{ update ethe description }} ",
			tags: ["Next.js", "PostgreSQL", "AWS", "Firebase", "Docker", "Express", "Payhere"],
			link: "https://sglife.net/",
			github:
				"",
			image: [
				"/images/projects/korean-class/1.webp",
				"/images/projects/korean-class/2.webp",
				"/images/projects/korean-class/3.webp",
				"/images/projects/korean-class/4.webp",
				"/images/projects/korean-class/5.webp",
				"/images/projects/korean-class/6.webp",
			],
		},
		{
			id: "irs-calculator",
			title: "ADHD Self-Assessment Tool",
			description:
				"An interactive Internal Restlessness Scale (IRS) assessment tool that helps evaluate ADHD-related inner restlessness. Features a responsive questionnaire with instant results and detailed insights.",
			tags: ["Next.js", "Tailwind CSS", "GitHub Pages"],
			link: "https://wkdkavishka.github.io/IRS-Calculate_Inner_restlessnes_score/",
			github:
				"https://github.com/wkdkavishka/IRS-Calculate_Inner_restlessnes_score",
			image: [
				"/images/projects/irs-calculator/1.webp",
				"/images/projects/irs-calculator/2.webp",
				"/images/projects/irs-calculator/3.webp",
			],
		},
		{
			id: "wkdkavishka-vue",
			title: "My old Portfolio Template",
			description:
				"A full-stack e-commerce platform with user authentication, product catalog, shopping cart, and payment integration. Built with Next.js, TypeScript, and MongoDB.",
			tags: ["Vue.js","Tailwind CSS"],
			link: "https://ecommerce-demo.wkdkavishka.vercel.app",
			github: "https://github.com/wkdkavishka/wkdkavishka-vue",
			image: [
				"/images/projects/wkdkavishka-vue/1.webp",
				"/images/projects/wkdkavishka-vue/2.webp",
				"/images/projects/wkdkavishka-vue/3.webp",
				"/images/projects/wkdkavishka-vue/4.webp",
			],
		},
	],
	socialLinks: [
		{
			name: "GitHub",
			url: "https://github.com/wkdkavishka",
			icon: FaGithub,
		},
		{
			name: "LinkedIn",
			url: "https://linkedin.com/in/wkdkavishka",
			icon: FaLinkedin,
		},
		{
			name: "Facebook",
			url: "https://facebook.com/W.K.D.Kavishka",
			icon: FaFacebook,
		},
		{
			name: "WhatsApp",
			url: "https://wa.me/94757676968",
			icon: FaWhatsapp,
		},
	],
};

export default siteData;
