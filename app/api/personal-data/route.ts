import { getPersonalData } from "@/lib/actions";

export async function GET() {
	try {
		const personalData = await getPersonalData();
		return Response.json(personalData);
	} catch (error) {
		console.error("Failed to get personal data:", error);
		return Response.json(
			{ error: "Failed to fetch personal data" },
			{ status: 500 }
		);
	}
}
