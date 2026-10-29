import { MotionDiv } from "@/components/motion";

export function SectionHeading({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) {
	return (
		<MotionDiv
			data-motion-reveal
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			viewport={{ once: false, amount: 0.3 }}
			transition={{ duration: 0.5 }}
			className="mb-16 space-y-2 text-center"
		>
			<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
				{title}
			</h2>
			<p className="mx-auto max-w-175 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
				{subtitle}
			</p>
		</MotionDiv>
	);
}
