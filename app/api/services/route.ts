import { getServices } from "@/lib/actions";

export async function GET() {
	try {
		const services = await getServices();
		return Response.json(services);
	} catch (error) {
		console.error("Failed to get services:", error);
		return Response.json(
			{ error: "Failed to fetch services" },
			{ status: 500 }
		);
	}
}
