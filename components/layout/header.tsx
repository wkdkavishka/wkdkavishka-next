"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import type { ProjectSection } from "@/data/site-data";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../mode-toggle";

// "/#…" rather than "#…" so the links also work from project pages
const navItems = [
	{ name: "About", href: "/#about" },
	{ name: "Projects", href: "/#projects" },
	{ name: "Open Source", href: "/#open-source" },
	{ name: "Experience", href: "/#experience" },
	{ name: "Services", href: "/#services" },
	{ name: "Contact", href: "/#contact" },
];

// Takes the name as a prop instead of importing siteData: importing it here would ship all the
// site content (every project description) to the browser as JavaScript.
export function Header({
	name,
	projectSection,
}: {
	name: string;
	projectSection?: ProjectSection;
}) {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = React.useState(false);
	const [isScrolled, setIsScrolled] = React.useState(false);
	const [activeSection, setActiveSection] = React.useState<string | null>(null);
	const activeHref = pathname.startsWith("/projects/")
		? projectSection === "open-source"
			? "/#open-source"
			: "/#projects"
		: pathname === "/"
			? activeSection
			: null;

	React.useEffect(() => {
		const sections =
			pathname === "/"
				? navItems
						.map((item) => document.getElementById(item.href.slice(2)))
						.filter((section): section is HTMLElement => section !== null)
				: [];
		let observer: IntersectionObserver | undefined;
		let frame = 0;
		let activationTop = 0;
		let wasAtBottom = false;

		const isAtBottom = () =>
			window.scrollY > 0 &&
			Math.ceil(window.scrollY + window.innerHeight) >=
				document.documentElement.scrollHeight - 1;

		const updateActiveSection = () => {
			frame = 0;
			setIsScrolled(window.scrollY > 0);
			if (pathname !== "/") return;

			let current: string | null = null;
			for (const section of sections) {
				if (section.getBoundingClientRect().top <= activationTop + 1) {
					current = `/#${section.id}`;
				}
			}
			wasAtBottom = isAtBottom();
			// A short final section may never reach the header on a tall screen.
			if (wasAtBottom && sections.length > 0) {
				current = `/#${sections[sections.length - 1].id}`;
			}
			setActiveSection(current);
		};

		const scheduleUpdate = () => {
			if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
		};

		const observeSections = () => {
			observer?.disconnect();
			activationTop = Math.min(
				Number.parseFloat(
					getComputedStyle(document.documentElement).scrollPaddingTop,
				) || 0,
				Math.max(0, window.innerHeight - 1),
			);
			if (sections.length > 0 && "IntersectionObserver" in window) {
				// A one-pixel band below the header works even when Projects spans many screens.
				const bottom = Math.max(0, window.innerHeight - activationTop - 1);
				observer = new IntersectionObserver(scheduleUpdate, {
					rootMargin: `-${activationTop}px 0px -${bottom}px 0px`,
					threshold: 0,
				});
				sections.forEach((section) => observer?.observe(section));
			}
			scheduleUpdate();
		};

		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0);
			if (!observer || isAtBottom() !== wasAtBottom) scheduleUpdate();
		};
		const resizeObserver = new ResizeObserver(scheduleUpdate);
		resizeObserver.observe(document.body);
		observeSections();
		window.addEventListener("scroll", handleScroll, { passive: true });
		window.addEventListener("resize", observeSections);
		window.addEventListener("hashchange", scheduleUpdate);
		window.addEventListener("popstate", scheduleUpdate);
		window.addEventListener("pageshow", scheduleUpdate);
		return () => {
			observer?.disconnect();
			resizeObserver.disconnect();
			window.cancelAnimationFrame(frame);
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", observeSections);
			window.removeEventListener("hashchange", scheduleUpdate);
			window.removeEventListener("popstate", scheduleUpdate);
			window.removeEventListener("pageshow", scheduleUpdate);
		};
	}, [pathname]);

	return (
		<header
			className={cn(
				"fixed top-0 z-50 w-full border-b border-transparent transition-all duration-300",
				isScrolled
					? "bg-background/80 backdrop-blur-md border-border/40"
					: "bg-transparent",
			)}
		>
			<div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
				<Link
					href="/"
					prefetch={false}
					className="text-xl font-bold tracking-tight hover:text-primary/80 transition-colors"
				>
					{name}
				</Link>

				{/* Desktop Nav */}
				<nav aria-label="Primary" className="hidden lg:flex items-center gap-6">
					{navItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							// All nav links point at the home page: prefetching it from the home page itself
							// downloads its whole payload again for nothing
							prefetch={false}
							aria-current={activeHref === item.href ? "location" : undefined}
							className={cn(
								"text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
								activeHref === item.href &&
									"font-semibold text-primary underline decoration-2 underline-offset-8",
							)}
						>
							{item.name}
						</Link>
					))}
					<ModeToggle />
					{/* <Button size="sm">Hire Me</Button> */}
				</nav>

				{/* Mobile Menu Toggle */}
				<button
					type="button"
					className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
					aria-label={isOpen ? "Close menu" : "Open menu"}
					aria-expanded={isOpen}
					aria-controls="mobile-nav"
					onClick={() => setIsOpen(!isOpen)}
				>
					{isOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</div>

			{/* Mobile Nav */}
			{isOpen && (
				<nav
					id="mobile-nav"
					aria-label="Mobile primary"
					className="lg:hidden border-b bg-background/95 backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200"
				>
					<div className="container mx-auto flex flex-col gap-4 p-4">
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								prefetch={false}
								aria-current={activeHref === item.href ? "location" : undefined}
								className={cn(
									"text-sm font-medium text-muted-foreground hover:text-primary transition-colors",
									activeHref === item.href &&
										"font-semibold text-primary underline decoration-2 underline-offset-8",
								)}
								onClick={() => setIsOpen(false)}
							>
								{item.name}
							</Link>
						))}
						<div className="flex gap-2 items-center">
							<ModeToggle />
{/* 
							<Button size="sm" className="flex-1">
								Hire Me
							</Button> */}
						</div>
					</div>
				</nav>
			)}
		</header>
	);
}
