export function SectionHeading({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) {
	return (
		<div className="reveal mb-16 space-y-2 text-center">
			<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
				{title}
			</h2>
			<p className="mx-auto max-w-175 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
				{subtitle}
			</p>
		</div>
	);
}
