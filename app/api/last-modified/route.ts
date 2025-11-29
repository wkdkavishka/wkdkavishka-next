import { getLastModified } from "@/lib/db";

export async function GET() {
	try {
		const lastModified = await getLastModified();
		return Response.json({ lastModified });
	} catch (error) {
		console.error("Failed to get last modified timestamp:", error);
		return Response.json(
			{ error: "Failed to fetch timestamp" },
			{ status: 500 }
		);
	}
}
