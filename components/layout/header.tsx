"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../mode-toggle";

const navItems = [
	{ name: "Home", href: "/" },
	{ name: "About", href: "#about" },
	{ name: "Projects", href: "#projects" },
	{ name: "Skills", href: "#skills" },
	{ name: "Contact", href: "#contact" },
];

export function Header() {
	const [isOpen, setIsOpen] = React.useState(false);
	const [isScrolled, setIsScrolled] = React.useState(false);
	const pathname = usePathname();

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
					className="text-xl font-bold tracking-tight hover:text-primary/80 transition-colors"
				>
					WKDKavishka
				</Link>

				{/* Desktop Nav */}
				<nav className="hidden md:flex items-center gap-6">
					{navItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								"text-sm font-medium transition-colors hover:text-primary",
								pathname === item.href
									? "text-primary"
									: "text-muted-foreground",
							)}
						>
							{item.name}
						</Link>
					))}
					<ModeToggle />
					<Button size="sm">Hire Me</Button>
				</nav>

				{/* Mobile Menu Toggle */}
				<button
					type="button"
					className="md:hidden p-2 text-muted-foreground hover:text-foreground"
					onClick={() => setIsOpen(!isOpen)}
				>
					{isOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</div>

			{/* Mobile Nav */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						className="md:hidden border-b bg-background/95 backdrop-blur-md"
					>
						<div className="container mx-auto flex flex-col gap-4 p-4">
							{navItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
									onClick={() => setIsOpen(false)}
								>
									{item.name}
								</Link>
							))}
							<div className="flex gap-2 items-center">
								<ModeToggle />
								<Button size="sm" className="flex-1">
									Hire Me
								</Button>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
