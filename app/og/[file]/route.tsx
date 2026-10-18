import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import siteData, { type Project } from "@/data/site-data";

// Share images (og:image) for the home page and every project, rendered at build time.
// A route handler named "<slug>.png" rather than an opengraph-image file: static export writes
// opengraph-image with no file extension, and GitHub Pages would then serve it as
// application/octet-stream instead of an image.
export const dynamic = "force-static";
export const dynamicParams = false;

const size = { width: 1200, height: 630 };
const colors = {
	background: "#0a0a0a",
	text: "#fafafa",
	muted: "#a3a3a3",
	chip: "#262626",
};

export function generateStaticParams() {
	return ["home", ...siteData.projects.map((project) => project.slug)].map(
		(slug) => ({ file: `${slug}.png` }),
	);
}

// next/og can't decode WebP, so the photo is converted to a PNG data URL
async function profilePhoto() {
	const file = await readFile(
		join(process.cwd(), "public", siteData.personal.profileImage),
	);
	const png = await sharp(file).resize(320, 320).png().toBuffer();
	return `data:image/png;base64,${png.toString("base64")}`;
}

function Chips({ items }: { items: string[] }) {
	return (
		<div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
			{items.map((item) => (
				<div
					key={item}
					style={{
						display: "flex",
						padding: "8px 18px",
						borderRadius: 999,
						background: colors.chip,
						color: colors.text,
						fontSize: 24,
					}}
				>
					{item}
				</div>
			))}
		</div>
	);
}

function HomeImage({ photo }: { photo: string }) {
	const { personal } = siteData;
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				gap: 64,
				width: "100%",
				height: "100%",
				padding: 80,
				background: colors.background,
				color: colors.text,
			}}
		>
			{/* eslint-disable-next-line @next/next/no-img-element -- next/og only renders plain img */}
			<img
				src={photo}
				alt=""
				width={300}
				height={300}
				style={{ borderRadius: 999, border: `6px solid ${colors.chip}` }}
			/>
			<div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
				<div style={{ display: "flex", fontSize: 84, letterSpacing: -2 }}>
					{personal.name}
				</div>
				<div style={{ display: "flex", fontSize: 40, color: colors.muted }}>
					{personal.headline}
				</div>
				<div style={{ display: "flex", fontSize: 30, color: colors.muted }}>
					{`Full-stack · ${personal.location}`}
				</div>
				<div style={{ display: "flex", marginTop: 16 }}>
					<Chips items={["Flutter", "Android", "Kotlin", "Next.js"]} />
				</div>
			</div>
		</div>
	);
}

function ProjectImage({ photo, project }: { photo: string; project: Project }) {
	const { personal } = siteData;
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				width: "100%",
				height: "100%",
				padding: 72,
				background: colors.background,
				color: colors.text,
			}}
		>
			<div style={{ display: "flex", alignItems: "center", gap: 24 }}>
				{/* eslint-disable-next-line @next/next/no-img-element -- next/og only renders plain img */}
				<img
					src={photo}
					alt=""
					width={88}
					height={88}
					style={{ borderRadius: 999 }}
				/>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<div style={{ display: "flex", fontSize: 36 }}>{personal.name}</div>
					<div style={{ display: "flex", fontSize: 26, color: colors.muted }}>
						{personal.headline}
					</div>
				</div>
			</div>
			<div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
				<div style={{ display: "flex", fontSize: 64, letterSpacing: -1.5 }}>
					{project.title}
				</div>
				<div style={{ display: "flex", fontSize: 30, color: colors.muted }}>
					{project.summary}
				</div>
			</div>
			<Chips items={project.tags.slice(0, 5)} />
		</div>
	);
}

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ file: string }> },
) {
	const slug = (await params).file.replace(/\.png$/, "");
	const project = siteData.projects.find((item) => item.slug === slug);
	const photo = await profilePhoto();
	return new ImageResponse(
		project ? (
			<ProjectImage photo={photo} project={project} />
		) : (
			<HomeImage photo={photo} />
		),
		size,
	);
}
