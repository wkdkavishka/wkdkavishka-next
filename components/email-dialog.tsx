"use client";

import { Slot } from "@radix-ui/react-slot";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";

// The form, Radix dialog and EmailJS load only once someone reaches for the trigger (hover, focus
// or click), so they stay out of every page's first download.
const EmailDialogContent = dynamic(
	() => import("@/components/email-dialog-content"),
	{ ssr: false },
);

// `children` is the trigger and must be a single element, ideally a <button>.
export function EmailDialog({
	email,
	children,
}: {
	email: string;
	children: React.ReactElement;
}) {
	const [loaded, setLoaded] = useState(false);
	const [open, setOpen] = useState(false);
	const triggerRef = useRef<HTMLElement>(null);
	const load = () => setLoaded(true);

	return (
		<>
			<Slot
				ref={triggerRef}
				aria-haspopup="dialog"
				aria-expanded={open}
				onPointerEnter={load}
				onTouchStart={load}
				onFocus={load}
				onClick={() => {
					setLoaded(true);
					setOpen(true);
				}}
			>
				{children}
			</Slot>
			{loaded && (
				<EmailDialogContent
					email={email}
					open={open}
					onOpenChange={setOpen}
					// Safari and Firefox don't focus a button on click, so return focus explicitly
					onCloseAutoFocus={(event) => {
						event.preventDefault();
						triggerRef.current?.focus();
					}}
				/>
			)}
		</>
	);
}
