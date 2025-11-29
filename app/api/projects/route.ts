import { getProjects } from "@/lib/actions";

export async function GET() {
	try {
		const projects = await getProjects();
		return Response.json(projects);
	} catch (error) {
		console.error("Failed to get projects:", error);
		return Response.json(
			{ error: "Failed to fetch projects" },
			{ status: 500 }
		);
	}
}
