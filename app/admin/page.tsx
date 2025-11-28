import { PersonalForm } from "@/components/admin/personal-form";
import { ProjectsManager } from "@/components/admin/projects-manager";
import { SkillsManager } from "@/components/admin/skills-manager";
import { SocialManager } from "@/components/admin/social-manager";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
		return <div>Loading... or No Data Found. Please seed the database.</div>;
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
			</div>
			<Tabs defaultValue="personal" className="space-y-4">
				<TabsList>
					<TabsTrigger value="personal">Personal Info</TabsTrigger>
					<TabsTrigger value="skills">Skills</TabsTrigger>
					<TabsTrigger value="projects">Projects</TabsTrigger>
					<TabsTrigger value="social">Social Links</TabsTrigger>
				</TabsList>
				<TabsContent value="personal" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Personal Information</CardTitle>
						</CardHeader>
						<CardContent>
							<PersonalForm initialData={personalData} />
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="skills" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Skills & Services</CardTitle>
						</CardHeader>
						<CardContent>
							<SkillsManager initialSkills={skills} />
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="projects" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Projects</CardTitle>
						</CardHeader>
						<CardContent>
							<ProjectsManager initialProjects={projects} />
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="social" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Social Links</CardTitle>
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
