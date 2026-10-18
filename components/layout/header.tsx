"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../mode-toggle";

// "/#…" rather than "#…" so the links also work from project pages
const navItems = [
	{ name: "About", href: "/#about" },
	{ name: "Experience", href: "/#experience" },
	{ name: "Projects", href: "/#projects" },
	{ name: "Skills", href: "/#skills" },
	{ name: "Services", href: "/#services" },
	{ name: "Contact", href: "/#contact" },
];

// Takes the name as a prop instead of importing siteData: importing it here would ship all the
// site content (every project description) to the browser as JavaScript.
export function Header({ name }: { name: string }) {
	const [isOpen, setIsOpen] = React.useState(false);
	const [isScrolled, setIsScrolled] = React.useState(false);

	React.useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

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
				<nav className="hidden md:flex items-center gap-6">
					{navItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							// All nav links point at the home page: prefetching it from the home page itself
							// downloads its whole payload again for nothing
							prefetch={false}
							className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
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
					className="md:hidden p-2 text-muted-foreground hover:text-foreground"
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
				<div
					id="mobile-nav"
					className="md:hidden border-b bg-background/95 backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200"
				>
					<div className="container mx-auto flex flex-col gap-4 p-4">
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								prefetch={false}
								className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
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
				</div>
			)}
		</header>
	);
}
