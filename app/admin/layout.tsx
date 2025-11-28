import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen flex-col">
			<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="container flex h-14 items-center">
					<div className="mr-4 hidden md:flex">
						<Link href="/admin" className="mr-6 flex items-center space-x-2">
							<span className="hidden font-bold sm:inline-block">
								Admin Dashboard
							</span>
						</Link>
						<nav className="flex items-center space-x-6 text-sm font-medium">
							<Link
								href="/admin"
								className="transition-colors hover:text-foreground/80 text-foreground"
							>
								Overview
							</Link>
							<Link
								href="/"
								className="transition-colors hover:text-foreground/80 text-foreground/60"
								target="_blank"
							>
								View Site
							</Link>
						</nav>
					</div>
					<div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
						<div className="w-full flex-1 md:w-auto md:flex-none">
							{/* Add search or other controls here if needed */}
						</div>
						<UserButton afterSignOutUrl="/" />
					</div>
				</div>
			</header>
			<main className="flex-1 container py-6">{children}</main>
		</div>
	);
}
