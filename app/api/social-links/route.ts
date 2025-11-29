import { getSocialLinks } from "@/lib/actions";

export async function GET() {
	try {
		const socialLinks = await getSocialLinks();
		return Response.json(socialLinks);
	} catch (error) {
		console.error("Failed to get social links:", error);
		return Response.json(
			{ error: "Failed to fetch social links" },
			{ status: 500 }
		);
	}
}
