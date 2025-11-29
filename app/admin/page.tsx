import { Briefcase, Code, LayoutDashboard, Share2, User } from "lucide-react";
import { PersonalForm } from "@/components/admin/personal-form";
import { ProjectsManager } from "@/components/admin/projects-manager";
import { SkillsManager } from "@/components/admin/skills-manager";
import { SocialManager } from "@/components/admin/social-manager";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	getPersonalData,
	getProjects,
	getServices,
	getSocialLinks,
} from "@/lib/actions";

export default async function AdminPage() {
	const personalData = await getPersonalData();
	const skills = await getServices();
	const projects = await getProjects();
	const socialLinks = await getSocialLinks();

	if (!personalData) {
		return (
			<div className="flex h-[50vh] items-center justify-center">
				<div className="text-center space-y-4">
					<h2 className="text-2xl font-bold">No Data Found</h2>
					<p className="text-muted-foreground">
						Please seed the database to get started.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-8 max-w-5xl mx-auto">
			<div className="flex flex-col gap-2">
				<h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
					<LayoutDashboard className="h-8 w-8" /> Dashboard
				</h2>
				<p className="text-muted-foreground">
					Manage your portfolio content, projects, and personal details.
				</p>
			</div>

			<Tabs defaultValue="personal" className="space-y-6">
				<TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto p-1 bg-muted/50">
					<TabsTrigger
						value="personal"
						className="flex items-center gap-2 py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
					>
						<User className="h-4 w-4" />
						<span>Personal Info</span>
					</TabsTrigger>
					<TabsTrigger
						value="skills"
						className="flex items-center gap-2 py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
					>
						<Code className="h-4 w-4" />
						<span>Services</span>
					</TabsTrigger>
					<TabsTrigger
						value="projects"
						className="flex items-center gap-2 py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
					>
						<Briefcase className="h-4 w-4" />
						<span>Projects</span>
					</TabsTrigger>
					<TabsTrigger
						value="social"
						className="flex items-center gap-2 py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
					>
						<Share2 className="h-4 w-4" />
						<span>Social Links</span>
					</TabsTrigger>
				</TabsList>

				<TabsContent
					value="personal"
					className="space-y-4 focus-visible:outline-none focus-visible:ring-0"
				>
					<Card className="border-muted-foreground/20 shadow-sm">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<User className="h-5 w-5 text-primary" /> Personal Information
							</CardTitle>
							<CardDescription>
								Update your bio, contact details, and other personal
								information.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<PersonalForm initialData={personalData} />
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent
					value="skills"
					className="space-y-4 focus-visible:outline-none focus-visible:ring-0"
				>
					<Card className="border-muted-foreground/20 shadow-sm">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Code className="h-5 w-5 text-primary" /> Services & Skills
							</CardTitle>
							<CardDescription>
								Manage the services you offer and your technical skills.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<SkillsManager initialSkills={skills} />
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent
					value="projects"
					className="space-y-4 focus-visible:outline-none focus-visible:ring-0"
				>
					<Card className="border-muted-foreground/20 shadow-sm">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Briefcase className="h-5 w-5 text-primary" /> Projects
							</CardTitle>
							<CardDescription>
								Showcase your best work. Add, edit, or remove projects.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ProjectsManager initialProjects={projects} />
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent
					value="social"
					className="space-y-4 focus-visible:outline-none focus-visible:ring-0"
				>
					<Card className="border-muted-foreground/20 shadow-sm">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Share2 className="h-5 w-5 text-primary" /> Social Links
							</CardTitle>
							<CardDescription>
								Manage your social media profiles and external links.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<SocialManager initialLinks={socialLinks} />
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
